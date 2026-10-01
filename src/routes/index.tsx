import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "NOTÍCIAS", q: "Você está cansado de abrir as redes sociais e não saber mais o que é notícia verdadeira e o que é informação distorcida?", options: ["Sim, muito", "Às vezes", "Pouco", "Não"] },
  { category: "ELEIÇÕES", q: "Você quer acompanhar tudo o que está acontecendo nas eleições sem precisar ficar procurando informações em vários lugares?", options: ["Sim, quero acompanhar tudo", "Quero acompanhar o principal", "Só algumas coisas", "Não tenho interesse"] },
  { category: "CANDIDATOS", q: "Você gostaria de saber o que os candidatos estão fazendo, dizendo e propondo durante o período eleitoral?", options: ["Sim, tudo", "As principais coisas", "Só sobre alguns candidatos", "Não faço questão"] },
  { category: "CHECAGEM", q: "Quando aparece uma afirmação política nas redes sociais, você sente dificuldade para descobrir se ela é verdadeira?", options: ["Muita dificuldade", "Às vezes", "Raramente", "Nunca"] },
  { category: "PROPOSTAS", q: "Você gostaria de comparar as propostas dos candidatos em um só lugar, em vez de depender apenas de vídeos e manchetes?", options: ["Sim", "Seria útil", "Talvez", "Não"] },
  { category: "DECISÕES", q: "Você quer acompanhar as decisões, votações e posicionamentos que podem afetar o país durante o período eleitoral?", options: ["Sim, de perto", "Só as mais importantes", "Às vezes", "Não acompanho"] },
  { category: "DEBATES", q: "Você costuma assistir a debates, entrevistas ou pronunciamentos e depois fica com dúvida sobre o que realmente foi prometido?", options: ["Frequentemente", "Às vezes", "Raramente", "Nunca"] },
  { category: "FONTES", q: "Você gostaria de ter as fontes originais para conferir uma informação antes de acreditar ou compartilhar?", options: ["Com certeza", "Seria útil", "Talvez", "Não faz diferença"] },
  { category: "ACOMPANHAMENTO", q: "Se houvesse um único local reunindo notícias, propostas, decisões, declarações e checagens, você usaria para acompanhar as eleições?", options: ["Usaria diariamente", "Usaria com frequência", "Consultaria quando necessário", "Provavelmente não"] },
  { category: "ÚLTIMA PERGUNTA", q: "O que mais faria diferença para você acompanhar as eleições com mais informação?", options: ["Notícias verificadas", "Ações e propostas dos candidatos", "Tudo reunido em um só lugar", "Fontes para conferir por conta própria"] }
];

function TLSHome() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [paidArea, setPaidArea] = useState(false);

  const current = questions[step];
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
    setStarted(true);
  }

  return (
    <div className="tls-app">
      <div className="tls-glow tls-glow-a" />
      <div className="tls-glow tls-glow-b" />

      <header className="tls-nav">
        <div className="tls-logo"><span>T</span> TLS</div>
        <div className="tls-nav-links"><a href="#como">COMO FUNCIONA</a><a href="#fontes">FONTES</a></div>
        <div className="tls-status"><i /> ELEIÇÕES ONLINE</div>
      </header>

      {!started && (
        <main className="tls-landing">
          <section className="tls-hero">
            <div className="tls-kicker"><b /> CENTRAL DE INFORMAÇÃO ELEITORAL</div>
            <h1>Cansado de notícias falsas? <em>Quer saber o que realmente está acontecendo?</em></h1>
            <p>Responda algumas perguntas sobre como você acompanha as eleições, candidatos, propostas e notícias. Sem respostas certas ou erradas.</p>
            <button className="tls-cta" onClick={() => setStarted(true)}>COMEÇAR AGORA <span>→</span></button>
            <div className="tls-proof"><span>10</span> perguntas <span>•</span> sem respostas certas <span>•</span> informação em um só lugar</div>
          </section>
          <section className="tls-cards" id="como">
            <div><strong>01</strong><h3>Responda</h3><p>Conte como você acompanha notícias, candidatos e acontecimentos eleitorais.</p></div>
            <div><strong>02</strong><h3>Continue</h3><p>As perguntas mostram quais tipos de informação você gostaria de acompanhar.</p></div>
            <div><strong>03</strong><h3>Tenha contexto</h3><p>Conheça uma central organizada para consultar notícias, propostas e fontes.</p></div>
          </section>
        </main>
      )}

      {started && !done && !paidArea && (
        <main className="tls-quiz">
          <div className="tls-quiz-top">
            <div><div className="tls-kicker"><b /> AUTOAVALIAÇÃO TLS</div><h2>Você está acompanhando as eleições?</h2></div>
            <div className="tls-progress-meta"><span>0{step + 1}</span> / 10</div>
          </div>
          <div className="tls-progress"><div style={{ width: progress + "%" }} /></div>
          <section className="tls-question">
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

      {paidArea && (
        <main className="tls-paywall">
          <div className="tls-lock">ACESSO PREMIUM</div>
          <div className="tls-kicker center"><b /> INFORMAÇÃO ELEITORAL <b /></div>
          <h2>Saiba de tudo que está acontecendo<br /><em>em um só local.</em></h2>
          <p className="tls-paywall-lead">Uma central organizada para acompanhar notícias e acontecimentos eleitorais, propostas e declarações de candidatos, decisões relevantes e referências para você conferir as informações por conta própria.</p>
          <div className="tls-price"><small>PREÇO ÚNICO</small><div><s>R$ 29,90</s></div><strong>R$ 19,90</strong></div>
          <div className="tls-benefits"><span>✓ Notícias organizadas por assunto</span><span>✓ Acompanhamento de candidatos</span><span>✓ Propostas e declarações</span><span>✓ Fontes para conferência</span></div>
          <button className="tls-cta wide" onClick={() => alert("Conecte aqui o link do seu checkout.")}>ACESSAR POR R$ 19,90 <span>→</span></button>
          <p className="tls-small">O conteúdo premium deve ser liberado somente após a confirmação do pagamento pelo checkout.</p>
          <button className="tls-reset" onClick={() => setPaidArea(false)}>← Voltar</button>
        </main>
      )}

      <section className="tls-sources" id="fontes">
        <div><div className="tls-kicker"><b /> FONTES</div><h2>Informação antes de opinião.</h2><p>Use fontes originais para conferir notícias, propostas, declarações e acontecimentos eleitorais.</p></div>
        <div className="tls-source-grid"><div><b>01</b><span>Tribunal Superior Eleitoral</span></div><div><b>02</b><span>Câmara dos Deputados</span></div><div><b>03</b><span>Senado Federal</span></div><div><b>04</b><span>Fontes oficiais e imprensa</span></div></div>
      </section>

      <footer className="tls-footer">TLS • CENTRAL DE INFORMAÇÃO ELEITORAL • 2026</footer>
    </div>
  );
}
