const categories = {
  elections: 'eleições Brasil 2026',
  right: 'direita partidos candidatos Brasil eleições 2026',
  interviews: 'entrevista candidato eleições Brasil 2026',
  debates: 'debate candidatos eleições Brasil 2026',
  newspapers: 'eleições Brasil 2026 notícias',
  campaign: 'propaganda eleitoral Brasil 2026',
  candidates: 'candidatos eleições Brasil 2026',
  proposals: 'propostas candidatos eleições Brasil 2026',
  'fact-checking': 'checagem fatos eleições Brasil 2026',
  polls: 'pesquisa eleitoral Brasil 2026',
  sources: 'TSE eleições 2026',
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing Supabase secrets');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
}

function itemsFromRss(xml) {
  return [...xml.matchAll(/<item>([\\s\\S]*?)<\\/item>/g)].map((m) => {
    const block = m[1];
    const get = (tag) => {
      const hit = block.match(new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>'));
      return hit ? stripHtml(hit[1]) : '';
    };
    return { title: get('title'), url: get('link'), published_at: get('pubDate'), description: get('description'), source_name: get('source') || 'Google News' };
  }).filter((x) => x.title && x.url);
}

async function articleImage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 TLS-NewsBot/1.0' }, signal: AbortSignal.timeout(8000) });
    const html = await res.text();
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)/i,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m?.[1]) return m[1];
    }
  } catch {}
  return null;
}

async function summarize(title, description) {
  if (!OPENAI_API_KEY) return description?.slice(0, 400) || 'Resumo indisponível. Consulte a fonte original.';
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + OPENAI_API_KEY },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      input: 'Resuma esta notícia eleitoral brasileira em até 3 frases, de forma factual e neutra. Não faça campanha, não elogie nem ataque candidatos ou partidos. Diferencie fatos de alegações. Título: ' + title + '\\nDescrição: ' + description,
      max_output_tokens: 180,
    }),
  });
  if (!res.ok) return description?.slice(0, 400) || 'Resumo indisponível. Consulte a fonte original.';
  const data = await res.json();
  return data.output_text || description?.slice(0, 400) || 'Resumo indisponível. Consulte a fonte original.';
}

async function insert(item) {
  const image_url = await articleImage(item.url);
  const summary = await summarize(item.title, item.description);
  const body = {
    title: item.title,
    summary,
    url: item.url,
    image_url,
    source_name: item.source_name,
    published_at: new Date(item.published_at || Date.now()).toISOString(),
    category: item.category,
  };
  const res = await fetch(SUPABASE_URL + '/rest/v1/news?on_conflict=url', {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error('Insert failed', await res.text());
}

for (const [category, query] of Object.entries(categories)) {
  const rssUrl = 'https://news.google.com/rss/search?q=' + encodeURIComponent(query) + '&hl=pt-BR&gl=BR&ceid=BR:pt-419';
  const res = await fetch(rssUrl, { headers: { 'User-Agent': 'Mozilla/5.0 TLS-NewsBot/1.0' } });
  const xml = await res.text();
  const items = itemsFromRss(xml).slice(0, 8).map((x) => ({ ...x, category }));
  for (const item of items) {
    await insert(item);
    await sleep(250);
  }
}
