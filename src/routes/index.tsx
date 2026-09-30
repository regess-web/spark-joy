import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "BOLSA FAMÍLIA", q: "Qual lei instituiu o Programa Bolsa Família em sua nova versão, em 2023?", options: ["Lei nº 14.601/2023", "Lei nº 15.077/2024", "Lei nº 14.133/2021", "Lei nº 13.709/2018"], answer: 0 },
  { category: "HABITAÇÃO", q: "Qual programa habitacional passou a ser disciplinado pela Lei nº 14.620, de 2023?", options: ["Casa Verde e Amarela", "Minha Casa, Minha Vida", "PAC Habitação", "Programa Nacional de Aluguel"], answer: 1 },
  { category: "CONSTITUIÇÃO", q: "Qual é uma função central da Constituição Federal de 1988?", options: ["Regular somente impostos", "Organizar o Estado e estabelecer direitos e garantias fundamentais", "Regular apenas contratos privados", "Definir somente regras eleitorais"], answer: 1 },
  { category: "REFORMA TRIBUTÁRIA", q: "A Emenda Constitucional nº 132, de 2023, alterou principalmente qual sistema?", options: ["Sistema Tributário Nacional", "Sistema eleitoral municipal", "Código de Trânsito", "Regras de naturalização"], answer: 0 },
  { category: "ASSISTÊNCIA SOCIAL", q: "A Lei nº 15.077, de 2024, alterou dispositivos da legislação do:", options: ["Bolsa Família", "Código de Trânsito", "Marco Civil da Internet", "Estatuto do Torcedor"], answer: 0 },
  { category: "TRANSIÇÃO ENERGÉTICA", q: "Qual programa foi instituído pela Lei nº 15.103, de 2025?", options: ["Paten", "ProUni", "Pronampe", "Pé-de-Meia"], answer: 0 },
  { category: "PODER LEGISLATIVO", q: "Qual instituição compõe o Congresso Nacional junto com a Câmara dos Deputados?", options: ["Senado Federal", "Supremo Tribunal Federal", "Banco Central", "Tribunal de Contas da União"], answer: 0 },
  { category: "PROCESSO LEGISLATIVO", q: "Uma lei federal aprovada pelo Congresso segue para qual etapa presidencial, quando aplicável?", options: ["Sanção ou veto", "Nomeação de ministro", "Julgamento pelo TCU", "Referendo automático"], answer: 0 },
  { category: "FONTES", q: "Qual fonte oficial é adequada para consultar o texto de uma lei federal?", options: ["Portal da Legislação/Planalto e Diário Oficial da União", "Somente redes sociais", "Somente blogs", "Somente fóruns"], answer: 0 },
  { category: "DESAFIO FINAL", q: "Por que é útil separar fato documentado de interpretação política?", options: ["Para conferir a informação antes de tirar conclusões", "Para impedir qualquer debate", "Para eliminar fontes oficiais", "Para substituir leis por opiniões"], answer: 0 }
];

function TLSHome() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [paidArea, setPaidArea] = useState(false);
  const current = questions[step];
  const progress = ((step + (picked !== null ? 1 : 0)) / questions.length) * 100;

  const resultLabel = useMemo(() => {
    if (score >= 8) return "Você chegou bem longe.";
    if (score >= 5) return "Você já tem uma boa base.";
    return "Agora você sabe onde começar.";
  }, [score]);

  function answer(index: number) {
    if (picked !== null) return;
    setPicked(index);
    if (index === current.answer) setScore((s) => s + 1);
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
    setStep(0); setPicked(null); setScore(0); setDone(false); setPaidArea(false); setStarted(true);
  }

  return (
    <div className="tls-app">
      <div className="tls-glow tls-glow-a" />
      <div className="tls-glow tls-glow-b" />

      <header className="tls-nav">
        <div className="tls-logo"><span>T</span> TLS</div>
        <div className="tls-nav-links"><a href="#como">COMO FUNCIONA</a><a href="#fontes">FONTES</a></div>
        <div className="tls-status"><i /> QUIZ ONLINE</div>
      </header>

      {!started && (
        <main className="tls-landing">
          <section className="tls-hero">
            <div className="tls-kicker"><b /> TESTE SEU CONHECIMENTO</div>
            <h1>Quanto você realmente sabe sobre a <em>política brasileira?</em></h1>
            <p>10 perguntas. Leis, programas, instituições e decisões públicas. Você responde primeiro — o contexto vem depois.</p>
            <button className="tls-cta" onClick={() => setStarted(true)}>COMEÇAR O DESAFIO <span>→</span></button>
            <div className="tls-proof"><span>10</span> perguntas <span>•</span> resultado imediato <span>•</span> gratuito</div>
          </section>
          <section className="tls-cards" id="como">
            <div><strong>01</strong><h3>Responda</h3><p>Escolha uma alternativa em cada pergunta.</p></div>
            <div><strong>02</strong><h3>Descubra</h3><p>Veja sua pontuação e confira o contexto.</p></div>
            <div><strong>03</strong><h3>Aprofunde</h3><p>O material completo fica disponível após o desbloqueio.</p></div>
          </section>
        </main>
      )}

      {started && !done && !paidArea && (
        <main className="tls-quiz">
          <div className="tls-quiz-top">
            <div><div className="tls-kicker"><b /> DESAFIO TLS</div><h2>Você sabe mesmo?</h2></div>
            <div className="tls-progress-meta"><span>0{step + 1}</span> / 10</div>
          </div>
          <div className="tls-progress"><div style={{ width: progress + "%" }} /></div>
          <section className="tls-question">
            <div className="tls-category">{current.category}</div>
            <div className="tls-question-number">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
            <h3>{current.q}</h3>
            <div className="tls-options">
              {current.options.map((option, i) => {
                const correct = picked !== null && i === current.answer;
                const wrong = picked === i && i !== current.answer;
                return <button key={option} className={"tls-option " + (correct ? "correct " : "") + (wrong ? "wrong" : "")} onClick={() => answer(i)}><span>{String.fromCharCode(65 + i)}</span>{option}</button>;
              })}
            </div>
            <div className="tls-question-footer">
              <div className={picked === null ? "tls-feedback muted" : picked === current.answer ? "tls-feedback good" : "tls-feedback bad"}>
                {picked === null ? "Escolha uma alternativa para continuar." : picked === current.answer ? "✓ Acertou. Continue para a próxima." : "Resposta registrada. Confira a alternativa destacada."}
              </div>
              <button className="tls-next" disabled={picked === null} onClick={next}>{step === questions.length - 1 ? "VER RESULTADO" : "CONTINUAR"} <span>→</span></button>
            </div>
          </section>
        </main>
      )}

      {started && done && !paidArea && (
        <main className="tls-result">
          <div className="tls-result-card">
            <div className="tls-kicker center"><b /> QUIZ CONCLUÍDO <b /></div>
            <div className="tls-score"><span>{score}</span><small>/10</small></div>
            <h2>{resultLabel}</h2>
            <p>Você acertou {score} de 10. O resultado é apenas uma medida de desempenho neste quiz — não representa sua posição política.</p>
            <button className="tls-cta wide" onClick={() => setPaidArea(true)}>VER O QUE EXISTE ALÉM DO QUIZ <span>→</span></button>
            <button className="tls-reset" onClick={restart}>Refazer desafio</button>
          </div>
        </main>
      )}

      {paidArea && (
        <main className="tls-paywall">
          <div className="tls-lock">LOCKED</div>
          <div className="tls-kicker center"><b /> ÁREA PREMIUM <b /></div>
          <h2>Você viu o quiz.<br /><em>Agora vem o contexto.</em></h2>
          <p className="tls-paywall-lead">A biblioteca completa organiza leis, programas e decisões públicas por período e tema, sempre diferenciando fato documentado, contexto e interpretação.</p>
          <div className="tls-price"><small>ACESSO ÚNICO</small><strong>R$ 19,90</strong></div>
          <div className="tls-benefits"><span>✓ Linha do tempo organizada</span><span>✓ Leis e programas com datas</span><span>✓ Contexto institucional</span><span>✓ Referências oficiais para conferência</span></div>
          <button className="tls-cta wide" onClick={() => alert("Conecte aqui o link do seu checkout.")}>DESBLOQUEAR POR R$ 19,90 <span>→</span></button>
          <p className="tls-small">O conteúdo premium não é exibido nesta página antes da compra. O checkout real deve confirmar o pagamento no servidor antes de liberar o acesso.</p>
          <button className="tls-reset" onClick={() => setPaidArea(false)}>← Voltar ao resultado</button>
        </main>
      )}

      <section className="tls-sources" id="fontes">
        <div><div className="tls-kicker"><b /> TRANSPARÊNCIA</div><h2>Fatos primeiro.</h2><p>As perguntas são formuladas para testar fatos verificáveis. Fontes oficiais devem ser usadas para conferir a redação e a vigência das normas.</p></div>
        <div className="tls-source-grid"><div><b>01</b><span>Presidência / Planalto</span></div><div><b>02</b><span>Câmara dos Deputados</span></div><div><b>03</b><span>Senado Federal</span></div><div><b>04</b><span>Diário Oficial da União</span></div></div>
      </section>

      <footer className="tls-footer">TLS • QUIZ EDUCACIONAL • 2026</footer>
    </div>
  );
}
