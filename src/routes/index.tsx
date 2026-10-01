import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchNews, type NewsItem } from "../lib/news";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "HISTÓRICO", image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Presidente_Jair_Messisas_Bolsonaro%28cropped%29.jpg", q: "Você gostaria de consultar informações documentadas sobre o governo de Jair Bolsonaro em um só lugar?", options: ["Sim", "Talvez", "Só alguns temas", "Não"] },
  { category: "CANDIDATOS", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio_Bolsonaro_01.09.26_%28cropped_2%29.jpg", q: "Você gostaria de acompanhar declarações e posicionamentos públicos de candidatos e políticos?", options: ["Sim, todos", "Os principais", "Só alguns", "Não"] },
  { category: "BRASIL", image: "https://commons.wikimedia.org/wiki/Special:FilePath/States_of_Brazil.svg", q: "Você quer acompanhar acontecimentos políticos de diferentes estados e regiões do Brasil?", options: ["Sim", "Principalmente meu estado", "Só os principais fatos", "Não"] },
  { category: "POSICIONAMENTOS", image: "https://imgs.search.brave.com/wNUFu72w9kLL0IqGTRFJH8zx5NPcSKlcQ8SMfwaisTs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9taWRp/YXMuY29ycmVpb2Jy/YXppbGllbnNlLmNvbS5ici9fbWlk/aWFzL2pwZy8yMDI0LzA5LzA3LzAwMF8zNmZuNzRyLTM5ODU0Mzc3LmpwZw", q: "Você gostaria de ver cobertura de diferentes partidos e correntes políticas, com as fontes originais?", options: ["Sim", "Seria útil", "Talvez", "Não"] },
  { category: "FONTES", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Brazil.svg", q: "Quando uma informação política chama sua atenção, você gostaria de ter acesso à fonte original?", options: ["Sempre", "Na maioria das vezes", "Às vezes", "Não"] },
  { category: "ELEIÇÕES", image: "https://imgs.search.brave.com/z3yXCmj8i13yre0yMCy2dt-_12Egcs5rC_yvvBPYXLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcuZnJlZXBpay5jb20vZm90b3MtcHJlbWl1bS9tdWxoZXItZGUt cGUtY29tLWJhbmRlaXJhLWJyYXNpbGVpcmEtYS1iZWlyYS1kYS1waXNjaW5hXzEwNDg5NDQtMTc4NzMxNzEuanBnP3NlbXQ9YWlzX2h5YnJpZCZ3PTc0MA", q: "Você gostaria de acompanhar notícias eleitorais organizadas por tema e data?", options: ["Sim, diariamente", "Com frequência", "Quando necessário", "Não"] },
  { category: "DECLARAÇÕES", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio_Bolsonaro_01.09.26_%28cropped_2%29.jpg", q: "Você gostaria de encontrar declarações públicas completas, em vez de depender apenas de cortes e manchetes?", options: ["Sim", "Seria útil", "Às vezes", "Não"] },
  { category: "HISTÓRICO", image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Presidente_Jair_Messisas_Bolsonaro%28cropped%29.jpg", q: "Você gostaria de consultar fatos, decisões e registros oficiais do período de cada governo?", options: ["Sim", "Os principais", "Só alguns assuntos", "Não"] },
  { category: "CONFERÊNCIA", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Brazil.svg", q: "Você prefere conferir uma informação em fontes diferentes antes de formar sua própria opinião?", options: ["Sempre", "Na maioria das vezes", "Às vezes", "Raramente"] },
  { category: "CENTRAL", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio_Bolsonaro_01.09.26_%28cropped_2%29.jpg", q: "Se existisse uma central com notícias, documentos, propostas e fontes originais reunidas, isso ajudaria você a acompanhar o período eleitoral?", options: ["Ajudaria muito", "Ajudaria", "Talvez", "Não"] }
];

function TLSHome() {
  const [started, setStarted] = useState(false);
  const [voteCode, setVoteCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [gateError, setGateError] = useState("");
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [paidArea, setPaidArea] = useState(false);
  const [portalArea, setPortalArea] = useState(false);
  const [activeCategory, setActiveCategory] = useState("HOJE");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState("");

  const current = questions[step];

  function unlockQuiz() {
    if (voteCode.trim() === "22") {
      setGateError("");
      setVerified(true);
      window.setTimeout(() => setStarted(true), 1800);
    } else {
      setGateError("Digite 22 para liberar o quiz.");
      setVerified(false);
    }
  }

  useEffect(() => {
    if (!portalArea) return;
    setNewsLoading(true);
    fetchNews(activeCategory).then((items) => { setNews(items); setNewsError(""); }).catch(() => setNewsError("Não foi possível carregar as notícias agora.")).finally(() => setNewsLoading(false));
  }, [portalArea, activeCategory]);
  const progress = ((step + (picked !== null ? 1 : 0)) / questions.length) * 100;

  function answer(index: number) {
    if (picked !== null) return;
    setPicked(index);
  }

  function next() {
    if (picked === null) return;
    if (step === questions.length - 1) setDone(true);
    else {
      setStep((s) => s + 1);
      setPicked(null);
    }
  }

  function restart() {
    setStep(0);
    setPicked(null);
    setDone(false);
    setPaidArea(false);
    setPortalArea(false);
    setStarted(true);
  }

  return (
    <div className="tls-app">
      <div className="tls-glow tls-glow-a" />
      <div className="tls-glow tls-glow-b" />

      <header className="tls-nav">
        <div className="tls-logo"><span>T</span> TLS</div>
        <div className="tls-nav-links"><a href="#quiz">QUIZ</a><a href="#portal">CENTRAL</a></div>
        <div className="tls-status"><i /> ELEIÇÕES ONLINE</div>
      </header>

      {!started && (
        <main className="tls-ballot-gate">
          <section className="tls-ballot-card">
            <div className={"tls-ballot-art " + (verified ? "verified" : "")}>
              <img src="/urna-eleitoral.svg" alt="Urna eletrônica" />
              {verified && <div className="tls-ballot-photo"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio_Bolsonaro_01.09.26_%28cropped_2%29.jpg" alt="Flávio Bolsonaro" /><span>22</span></div>}
            </div>
            <div className="tls-ballot-copy">
              <div className="tls-kicker"><b /> ACESSO AO QUIZ</div>
              <h1>Antes de começar, <em>confirme o código.</em></h1>
              <p>{verified ? "Código confirmado. A urna registrou o número e liberou o acesso." : "Digite o número indicado na urna para liberar as perguntas."}</p>
              <div className="tls-ballot-input">
                <input
                  inputMode="numeric"
                  maxLength={2}
                  value={voteCode}
                  onChange={(e) => { setVoteCode(e.target.value.replace(/\D/g, "").slice(0, 2)); setGateError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") unlockQuiz(); }}
                  placeholder="00"
                  aria-label="Código de acesso"
                />
                <button className="tls-cta" onClick={unlockQuiz} disabled={verified}>{verified ? "CONFIRMADO ✓" : "CONFIRMAR"} <span>→</span></button>
              </div>
              {gateError && <div className="tls-gate-error">{gateError}</div>}
              <div className="tls-proof"><span>10</span> perguntas <span>•</span> sem respostas certas <span>•</span> acesso liberado pela urna</div>
            </div>
          </section>
        </main>
      )}

      {started && !done && !paidArea && (
        <main className="tls-quiz" id="quiz">
          <div className="tls-quiz-top">
            <div><div className="tls-kicker"><b /> AUTOAVALIAÇÃO TLS</div><h2>Você está acompanhando as eleições?</h2></div>
            <div className="tls-progress-meta"><span>0{step + 1}</span> / 10</div>
          </div>
          <div className="tls-progress"><div style={{ width: progress + "%" }} /></div>
          <section className="tls-question tls-question-horizontal">
            <div className="tls-question-image-wrap">
              <img src={current.image} alt="" className="tls-question-image" onError={(e) => { e.currentTarget.src = "/question-fallback.svg"; }} />
              <div className="tls-image-caption">{current.category}</div>
            </div>
            <div className="tls-question-content">
              <div className="tls-category">{current.category}</div>
              <div className="tls-question-number">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
              <h3>{current.q}</h3>
            <div className="tls-options">
              {current.options.map((option, i) => (
                <button key={option} className={"tls-option " + (picked === i ? "selected" : "")} onClick={() => answer(i)}>
                  <span>{String.fromCharCode(65 + i)}</span>{option}
                </button>
              ))}
            </div>
              <div className="tls-question-footer">
              <div className={picked === null ? "tls-feedback muted" : "tls-feedback good"}>
                {picked === null ? "Não há resposta certa. Escolha a alternativa que mais representa você." : "Resposta registrada. Continue."}
              </div>
              <button className="tls-next" disabled={picked === null} onClick={next}>{step === questions.length - 1 ? "CONTINUAR" : "CONTINUAR"} <span>→</span></button>
              </div>
            </div>
          </section>
        </main>
      )}

      {started && done && !paidArea && (
        <main className="tls-result">
          <div className="tls-result-card">
            <div className="tls-kicker center"><b /> AUTOAVALIAÇÃO CONCLUÍDA <b /></div>
            <div className="tls-score"><span>✓</span></div>
            <h2>Quer saber tudo que está ocorrendo nas eleições?</h2>
            <p>Tenha acesso a uma central organizada para acompanhar acontecimentos, propostas, declarações, decisões e fontes, sem precisar procurar cada informação separadamente.</p>
            <button className="tls-cta wide" onClick={() => setPaidArea(true)}>CLIQUE AQUI PARA SABER MAIS <span>→</span></button>
            <button className="tls-reset" onClick={restart}>Refazer perguntas</button>
          </div>
        </main>
      )}

      {paidArea && !portalArea && (
        <main className="tls-paywall">
          <div className="tls-lock">ACESSO PREMIUM</div>
          <div className="tls-kicker center"><b /> INFORMAÇÃO ELEITORAL <b /></div>
          <h2>Saiba de tudo que está acontecendo<br /><em>em um só local.</em></h2>
          <p className="tls-paywall-lead">Uma central organizada para acompanhar notícias e acontecimentos eleitorais, propostas e declarações de candidatos, decisões relevantes e referências para você conferir as informações por conta própria.</p>
          <div className="tls-price"><small>PREÇO ÚNICO</small><div><s>R$ 29,90</s></div><strong>R$ 19,90</strong></div>
          <div className="tls-benefits"><span>✓ Notícias organizadas por assunto</span><span>✓ Acompanhamento de candidatos</span><span>✓ Propostas e declarações</span><span>✓ Fontes para conferência</span></div>
          <button className="tls-cta wide" onClick={() => setPortalArea(true)}>VISUALIZAR A CENTRAL <span>→</span></button>
          <p className="tls-small">Na versão real, este acesso deve ser liberado somente após a confirmação do pagamento pelo checkout.</p>
          <button className="tls-reset" onClick={() => setPaidArea(false)}>← Voltar</button>
        </main>
      )}

      {paidArea && portalArea && (
        <main className="tls-portal" id="portal">
          <div className="tls-portal-head">
            <div>
              <div className="tls-kicker"><b /> CENTRAL DE INFORMAÇÃO ELEITORAL</div>
              <h2>Tudo organizado para você acompanhar o que aconteceu.</h2>
              <p>Conteúdo separado por tema, com contexto, data e fontes para consulta. A seção “Direita” reúne cobertura factual sobre partidos e candidatos desse campo político, sem substituir as fontes originais.</p>
            </div>
            <div className="tls-portal-date">PAINEL • 2026</div>
          </div>

          <div className="tls-category-nav">
            {["HOJE","ELEIÇÕES","DIREITA","ENTREVISTAS","DEBATES","JORNAIS","PROPAGANDA","CANDIDATOS","PROPOSTAS","CHECAGENS","PESQUISAS","FONTES"].map((cat) => (
              <button key={cat} className={activeCategory === cat ? "active" : ""} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>

          <section className="tls-portal-grid">
            <article className="tls-feature-card">
              <span className="tls-tag">{activeCategory}</span>
              <h3>{news[0]?.title || (activeCategory === "DIREITA" ? "Acompanhe os principais acontecimentos envolvendo partidos e candidatos de direita" : "O que aconteceu hoje em " + activeCategory.toLowerCase())}</h3>
              <p>{news[0]?.summary || "As notícias aparecerão aqui automaticamente quando a integração estiver configurada."}</p>
              {news[0]?.image_url && <img className="tls-feature-image" src={news[0].image_url} alt="" onError={(e) => { e.currentTarget.src = "/news-fallback.svg"; }} />}
              <small>{news[0] ? news[0].source_name + " • " + new Date(news[0].published_at).toLocaleString("pt-BR") : "AGUARDANDO INTEGRAÇÃO • FONTE A INSERIR"}</small>
            </article>
            <article className="tls-news-list">
              {newsLoading && <div className="tls-news-loading">Atualizando notícias...</div>}
              {!newsLoading && news.length === 0 && <div className="tls-news-loading">Nenhuma notícia disponível nesta categoria.</div>}
              {news.slice(0, 5).map((item, i) => (
                <a className="tls-news-item" key={item.id} href={item.url} target="_blank" rel="noreferrer">
                  <img src={item.image_url || "/news-fallback.svg"} alt="" onError={(e) => { e.currentTarget.src = "/news-fallback.svg"; }} />
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span><strong>{item.title}</strong><small>{item.source_name} • {new Date(item.published_at).toLocaleString("pt-BR")}</small></span>
                </a>
              ))}
              {newsError && <div className="tls-news-error">{newsError}</div>}
            </article>
          </section>

          <section className="tls-portal-columns">
            <div><h3>ACONTECIMENTOS DO DIA</h3><p>Timeline com os fatos relevantes, organizada por horário e assunto.</p></div>
            <div><h3>PARTIDOS E CANDIDATOS</h3><p>Páginas individuais com declarações, propostas, agenda e registros públicos.</p></div>
            <div><h3>FONTES ORIGINAIS</h3><p>Acesso direto a TSE, documentos públicos, entrevistas e veículos de imprensa.</p></div>
          </section>

          <div className="tls-portal-disclaimer">Este painel é uma demonstração de produto. Informações eleitorais reais devem ser verificadas, datadas e acompanhadas da fonte original antes de serem publicadas.</div>
          <button className="tls-reset" onClick={() => setPortalArea(false)}>← Voltar para a oferta</button>
        </main>
      )}

      <footer className="tls-footer">TLS • CENTRAL DE INFORMAÇÃO ELEITORAL • 2026</footer>
    </div>
  );
}
