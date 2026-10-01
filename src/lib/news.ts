export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  image_url: string | null;
  source_name: string;
  published_at: string;
  category: string;
};

const categories: Record<string,string> = {
  HOJE: "all",
  ELEIÇÕES: "elections",
  DIREITA: "right",
  ENTREVISTAS: "interviews",
  DEBATES: "debates",
  JORNAIS: "newspapers",
  PROPAGANDA: "campaign",
  CANDIDATOS: "candidates",
  PROPOSTAS: "proposals",
  CHECAGENS: "fact-checking",
  PESQUISAS: "polls",
  FONTES: "sources",
};

export async function fetchNews(category: string): Promise<NewsItem[]> {
  const base = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!base || !key) return [];

  const filter = categories[category] || "all";
  const query = new URLSearchParams({
    select: "*",
    order: "published_at.desc",
    limit: "20",
  });
  if (filter !== "all") query.set("category", filter);

  const response = await fetch(base + "/rest/v1/news?" + query.toString(), {
    headers: { apikey: key, Authorization: "Bearer " + key },
  });
  if (!response.ok) throw new Error("news_fetch_failed");
  return response.json();
}
