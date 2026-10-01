import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchNews, type NewsItem } from "../lib/news";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "HISTÓRICO", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Jair%20Bolsonaro%202022%20%28cropped%29.jpg", q: "Informações documentadas sobre o governo de Jair Bolsonaro reunidas em um só lugar.", options: ["Quero consultar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "CANDIDATOS", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio%20Bolsonaro%2001.09.26%20%28cropped%202%29.jpg", q: "Declarações e posicionamentos públicos de candidatos e políticos organizados por tema e data.", options: ["Quero acompanhar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "CONGRESSO", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Imagens%20de%20Bras%C3%ADlia%20-%20Congresso%20Nacional%20%2850060213016%29.jpg", q: "Acontecimentos e decisões do Congresso Nacional apresentados com contexto e fontes.", options: ["Quero acompanhar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "JUSTIÇA", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Supremo%20Tribunal%20Federal%2C%20Brasilia.jpg", q: "Decisões relevantes do STF e de outros tribunais, acompanhadas dos documentos correspondentes.", options: ["Quero consultar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "GOVERNO", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pal%C3%A1cio%20do%20Planalto%20%2830890615422%29.jpg", q: "Atos, medidas e informações oficiais do Governo Federal reunidos para consulta.", options: ["Quero acompanhar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "ELEIÇÕES", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sede%20do%20Tribunal%20Superior%20Eleitoral%20%281%29.jpg", q: "Informações eleitorais organizadas por assunto, data, órgão responsável e fonte original.", options: ["Quero consultar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "LEGISLATIVO", image: "https://commons.wikimedia.org/wiki/Special:FilePath/C%C3%A2mara%20dos%20Deputados%20%285944392503%29.jpg", q: "Atividades da Câmara dos Deputados acompanhadas de referências para conferência.", options: ["Quero acompanhar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "SENADO", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Senado%20Federal%20do%20Brasil%20%2814588978177%29.jpg", q: "Projetos, votações e declarações do Senado Federal organizados em um único painel.", options: ["Quero acompanhar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "VOTAÇÃO", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Urna%20Eletr%C3%B4nica%20Brasileira.jpg", q: "Explicações e referências sobre o funcionamento da votação e da urna eletrônica.", options: ["Quero consultar", "Tenho interesse", "Talvez", "Não preciso"] },
  { category: "CONFERÊNCIA", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alexandre%20de%20Moraes.jpg", q: "Fontes originais e registros públicos para conferir uma informação antes de formar sua própria opinião.", options: ["Quero consultar", "Tenho interesse", "Talvez", "Não preciso"] }
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
              <div className={"tls-ballot-screen " + (verified ? "show-photo" : "")}>
                {verified ? (
                  <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio%20Bolsonaro%2001.09.26%20%28cropped%202%29.jpg" alt="Flávio Bolsonaro" />
                ) : (
                  <strong>{voteCode || "--"}</strong>
                )}
                {verified && <span>22</span>}
              </div>
            </div>
            <div className="tls-ballot-copy">
              <div className="tls-kicker"><b /> ACESSO AO QUIZ</div>
              <h1>Antes de começar, <em>confirme o código.</em></h1>
              <p>{verified ? "Código confirmado. A tela da urna exibiu o registro e liberou o acesso." : "Digite o número indicado na urna para liberar o acesso ao quiz."}</p>
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
            <h2>Tudo que você precisa saber sobre as eleições</h2>
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
          <p className="tls-paywall-lead">Uma central atualizada com notícias e acontecimentos eleitorais, propostas e declarações dos candidatos à Presidência, decisões relevantes e referências para conferência. Você também encontra um histórico organizado da eleição de 2026, o que cada candidato propõe e já fez até o momento, além de pesquisas de intenção de voto sempre acompanhadas da data, instituto e fonte.</p>
          <div className="tls-price"><small>PREÇO ÚNICO</small><div><s>R$ 29,90</s></div><strong>R$ 19,90</strong></div>
          <div className="tls-benefits"><span>✓ Notícias e acontecimentos eleitorais</span><span>✓ Propostas e declarações dos candidatos</span><span>✓ Histórico e decisões relevantes</span><span>✓ Pesquisas com data, instituto e fonte</span><span>✓ Referências para conferência</span></div>
          <button className="tls-cta wide" onClick={() => setPortalArea(true)}>VISUALIZAR A CENTRAL <span>→</span></button>
          <p className="tls-small">Na versão real, este acesso deve ser liberado somente após a confirmação do pagamento pelo checkout.</p>
          <button className="tls-reset" onClick={() => setPaidArea(false)}>← Voltar</button>
        </main>
      )}

      {paidArea && portalArea && (
        <main className="tls-ebook" id="portal">
          <div className="tls-ebook-cover">
            <div className="tls-kicker"><b /> EDIÇÃO • 30 DE SETEMBRO DE 2026</div>
            <h2>ELEIÇÕES 2026<br /><em>o que aconteceu até agora</em></h2>
            <p>Um guia visual, em ordem cronológica, com os principais acontecimentos, candidatos, propostas, declarações, decisões eleitorais e pesquisas — sempre com data e referência.</p>
            <div className="tls-ebook-hint">DESLIZE PARA A DIREITA <span>→</span></div>
          </div>

          <div className="tls-ebook-track">
            <article className="tls-ebook-slide tls-slide-intro">
              <span className="tls-slide-no">01 / 08</span>
              <div className="tls-kicker"><b /> VISÃO GERAL</div>
              <h3>Onde a eleição está agora?</h3>
              <p>O primeiro turno está marcado para <strong>4 de outubro de 2026</strong>. Se nenhum candidato obtiver mais de 50% dos votos válidos, o segundo turno está previsto para <strong>25 de outubro</strong>.</p>
              <div className="tls-stat-row"><div><strong>30/09</strong><small>data desta edição</small></div><div><strong>2026</strong><small>ano eleitoral</small></div><div><strong>4/10</strong><small>1º turno</small></div></div>
              <small className="tls-source-line">Fonte: TSE • Eleições 2026</small>
            </article>

            <article className="tls-ebook-slide">
              <span className="tls-slide-no">02 / 08</span>
              <div className="tls-kicker"><b /> LINHA DO TEMPO</div>
              <h3>Os marcos da campanha</h3>
              <div className="tls-timeline">
                <div><b>15 AGO</b><span>Prazo para registro das candidaturas à Presidência.</span></div>
                <div><b>24 SET</b><span>O TSE lançou uma página que organiza os planos de governo por oito macrotemas.</span></div>
                <div><b>27 SET</b><span>Foram divulgados detalhes do plano de governo de Flávio Bolsonaro, incluindo propostas econômicas, administrativas e de segurança.</span></div>
                <div><b>29 SET</b><span>Pesquisa AtlasIntel/Bloomberg registrou cenário de primeiro turno com Lula em 45,3% e Flávio Bolsonaro em 42,2%.</span></div>
                <div><b>30 SET</b><span>Pesquisa Meio/Ideia apontou empate técnico entre Lula e Flávio nos cenários divulgados.</span></div>
              </div>
              <small className="tls-source-line">Fontes: TSE, UOL/Folha e pesquisas registradas no TSE.</small>
            </article>

            <article className="tls-ebook-slide">
              <span className="tls-slide-no">03 / 08</span>
              <div className="tls-kicker"><b /> QUEM ESTÁ NA DISPUTA</div>
              <h3>Candidatos registrados para o 1º turno</h3>
              <div className="tls-candidate-grid">
                {[
                  ["13","Lula","PT"],["22","Flávio Bolsonaro","PL"],["30","Romeu Zema","NOVO"],["55","Ronaldo Caiado","PSD"],
                  ["14","Renan Santos","Missão"],["70","Augusto Cury","Avante"],["16","Hertz Dias","PSTU"],["21","Edmilson Costa","PCB"],
                  ["27","Clariana Barão","DC"],["29","Rui Costa Pimenta","PCO"],["35","Wilson Grassi","Democrata"],["80","Samara Martins","UP"],["28","Leonardo Avalanche","PRTB"]
                ].map(([n,name,party]) => <div key={n}><b>{n}</b><span>{name}</span><small>{party}</small></div>)}
              </div>
              <p className="tls-note">A situação jurídica e eleitoral das candidaturas pode mudar até a eleição. Leonardo Avalanche teve sua retirada noticiada em 30/09; a relação do TSE consultada para esta edição ainda o listava.</p>
              <small className="tls-source-line">Fonte principal: TSE • planos de governo e registros de 2026. Atualização sobre Avalanche: Agência Brasil, 30/09/2026.</small>
            </article>

            <article className="tls-ebook-slide">
              <span className="tls-slide-no">04 / 08</span>
              <div className="tls-kicker"><b /> PROPOSTAS</div>
              <h3>O que os principais candidatos propõem?</h3>
              <div className="tls-proposal-grid">
                <div><h4>Lula • PT</h4><p>O plano apresenta continuidade de políticas públicas, com propostas em áreas como economia, saúde, educação, trabalho, desenvolvimento e meio ambiente.</p></div>
                <div><h4>Flávio Bolsonaro • PL</h4><p>Propõe reduzir ministérios e cargos comissionados, revisar a reforma tributária, retomar privatizações e endurecer políticas contra o crime organizado.</p></div>
                <div><h4>Romeu Zema • NOVO</h4><p>Defende uma agenda de maior liberdade econômica, eficiência administrativa, responsabilidade fiscal e reformas na gestão pública.</p></div>
                <div><h4>Ronaldo Caiado • PSD</h4><p>O plano aborda segurança, saúde, educação, desenvolvimento regional, gestão pública e fortalecimento de políticas de produção e infraestrutura.</p></div>
                <div><h4>Renan Santos • Missão</h4><p>O programa enfatiza mudanças institucionais, liberdade econômica e revisão de políticas públicas, com críticas a estruturas estatais existentes.</p></div>
                <div><h4>Augusto Cury • Avante</h4><p>O programa apresenta propostas ligadas a educação, saúde, desenvolvimento humano, economia e empreendedorismo.</p></div>
              </div>
              <small className="tls-source-line">Fonte: planos de governo oficiais reunidos pelo TSE. O resumo não substitui os documentos completos.</small>
            </article>

            <article className="tls-ebook-slide">
              <span className="tls-slide-no">05 / 08</span>
              <div className="tls-kicker"><b /> PESQUISAS</div>
              <h3>Intenção de voto: números datados</h3>
              <div className="tls-poll-card"><strong>AtlasIntel / Bloomberg • 29/09</strong><div><span>Lula</span><b>45,3%</b></div><div><span>Flávio Bolsonaro</span><b>42,2%</b></div><div><span>Renan Santos</span><b>5,2%</b></div><div><span>Augusto Cury</span><b>2,0%</b></div><div><span>Ronaldo Caiado</span><b>1,8%</b></div><div><span>Romeu Zema</span><b>0,9%</b></div><small>5.005 entrevistados • 23–28/09 • margem de erro ±1 p.p. • 95% de confiança • registro BR-04391/2026</small></div>
              <div className="tls-poll-card"><strong>Meio/Ideia • 30/09</strong><p>O levantamento divulgado em 30/09 apontou empate técnico entre Lula e Flávio Bolsonaro nos cenários de 1º e 2º turno apresentados.</p><small>2.000 eleitores • entrevistas por telefone • 25–28/09 • margem de erro ±2,2 p.p. • 95% de confiança • registro BR-08706/2026</small></div>
              <p className="tls-note">Pesquisas são retratos de um período e usam metodologias diferentes; não representam o resultado da eleição.</p>
            </article>

            <article className="tls-ebook-slide">
              <span className="tls-slide-no">06 / 08</span>
              <div className="tls-kicker"><b /> DECLARAÇÕES E ACONTECIMENTOS</div>
              <h3>O que marcou os últimos dias</h3>
              <div className="tls-event-list">
                <div><b>29/09</b><span>Debates e declarações sobre responsabilidade fiscal colocaram reforma tributária, gastos públicos e políticas econômicas no centro da discussão.</span></div>
                <div><b>27/09</b><span>Foram detalhadas propostas do plano de Flávio Bolsonaro em segurança, economia, administração, educação, saúde e meio ambiente.</span></div>
                <div><b>24/09</b><span>O TSE disponibilizou uma nova interface para consultar propostas presidenciais por assunto, usando os documentos apresentados pelas chapas.</span></div>
                <div><b>SET/26</b><span>Pesquisas sucessivas registraram variações nas intenções de voto conforme instituto, período e metodologia.</span></div>
              </div>
              <small className="tls-source-line">Fontes: TSE, Agência Brasil, UOL e levantamentos eleitorais registrados.</small>
            </article>

            <article className="tls-ebook-slide">
              <span className="tls-slide-no">07 / 08</span>
              <div className="tls-kicker"><b /> DECISÕES E CONFERÊNCIA</div>
              <h3>Onde conferir antes de acreditar</h3>
              <div className="tls-reference-grid">
                <a href="https://www.tse.jus.br/eleicoes/eleicoes-2026" target="_blank" rel="noreferrer"><b>TSE</b><span>Calendário, regras, estatísticas e informações oficiais da eleição.</span></a>
                <a href="https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/planos-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026" target="_blank" rel="noreferrer"><b>PLANOS DE GOVERNO</b><span>Documentos oficiais apresentados pelas chapas.</span></a>
                <a href="https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" target="_blank" rel="noreferrer"><b>DADOS ABERTOS TSE</b><span>Dados de candidaturas, propostas e registros eleitorais.</span></a>
                <a href="https://www.tse.jus.br/eleicoes/eleicoes-2026" target="_blank" rel="noreferrer"><b>DIVULGACANDCONTAS</b><span>Informações de candidaturas, contas, doadores e fornecedores.</span></a>
              </div>
              <p className="tls-note">A ideia desta seção é permitir que o leitor confira a fonte original em vez de depender apenas do resumo.</p>
            </article>

            <article className="tls-ebook-slide tls-slide-end">
              <span className="tls-slide-no">08 / 08</span>
              <div className="tls-kicker"><b /> FECHAMENTO DA EDIÇÃO</div>
              <h3>O cenário em 30 de setembro</h3>
              <p>A eleição entra na reta final com o primeiro turno marcado para 4 de outubro. As propostas oficiais estão disponíveis no TSE, enquanto pesquisas recentes mostram resultados diferentes conforme instituto e metodologia.</p>
              <div className="tls-final-box"><strong>Atualizado em 30/09/2026</strong><span>Próxima atualização: conforme novos fatos, decisões, pesquisas e declarações forem publicados.</span></div>
              <small className="tls-source-line">Esta edição organiza informações públicas e não indica em quem votar.</small>
            </article>
          </div>

          <div className="tls-ebook-bottom"><span>←→ DESLIZE HORIZONTALMENTE</span><button className="tls-reset" onClick={() => setPortalArea(false)}>← Voltar para a oferta</button></div>
        </main>
      )}

      <footer className="tls-footer">TLS • CENTRAL DE INFORMAÇÃO ELEITORAL • 2026</footer>
    </div>
  );
}
