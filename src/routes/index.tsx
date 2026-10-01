import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "BOLSO", q: "Depois que o 9 dedos voltou ao poder, você sentiu que seu dinheiro passou a render diferente no dia a dia?", options: ["Rende menos", "Rende mais", "Quase igual", "Não sei dizer"] },
  { category: "MERCADO", q: "Desde a volta do barbudo ao Planalto, como você percebeu os preços no mercado e nas despesas de casa?", options: ["Ficaram mais pesados", "Ficaram mais leves", "Mudaram pouco", "Não acompanho"] },
  { category: "CONTAS", q: "Depois que o petista reassumiu a Presidência, você ou sua família sentiu alguma mudança no quanto sobra no fim do mês?", options: ["Sobrou menos", "Sobrou mais", "Praticamente igual", "Não sei comparar"] },
  { category: "IMPOSTOS", q: "Desde que ele voltou ao Planalto, você passou a prestar mais atenção em impostos e no impacto deles nos produtos que compra?", options: ["Sim, bastante", "Um pouco", "Quase nada", "Nunca parei para pensar nisso"] },
  { category: "TRABALHO E RENDA", q: "Depois da volta do 9 dedos, você ou alguém próximo percebeu alguma mudança no emprego, salário ou renda?", options: ["Melhorou", "Piorou", "Ficou parecido", "Não sei avaliar"] },
  { category: "SALÁRIO", q: "Com os reajustes do salário mínimo durante esse período, você percebeu alguma diferença concreta no orçamento da sua família?", options: ["Melhorou", "O aumento ajudou, mas outras despesas pesaram", "Pouca ou nenhuma diferença", "Não se aplica / não sei"] },
  { category: "PROGRAMAS", q: "Quando pensa em programas como Bolsa Família e Minha Casa, Minha Vida durante o governo do barbudo, você ou alguém próximo foi afetado por eles?", options: ["Sim, positivamente", "Sim, de outra forma", "Conheço apenas pelas notícias", "Não acompanho"] },
  { category: "GASTOS PÚBLICOS", q: "Quando você ouve falar dos gastos do governo do petista, você entende como isso pode se relacionar com juros, impostos e a economia?", options: ["Entendo", "Tenho uma noção", "Tenho muitas dúvidas", "Não sei como funciona"] },
  { category: "NOTÍCIAS", q: "Quando aparece uma notícia dizendo que uma decisão do 9 dedos melhorou ou piorou a vida dos brasileiros, você costuma conferir os números e a fonte original?", options: ["Quase sempre", "Às vezes", "Raramente", "Nunca"] },
  { category: "A VERDADE POR TRÁS DOS DADOS", q: "Se você pudesse conferir documentos, leis e números sobre o período do barbudo no poder, qual assunto mais gostaria de investigar?", options: ["Meu bolso, preços e impostos", "Emprego, salário e renda", "Programas sociais e investimentos", "Contas públicas e decisões do governo"] }
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
        <div className="tls-status"><i /> QUIZ ONLINE</div>
      </header>

      {!started && (
        <main className="tls-landing">
          <section className="tls-hero">
            <div className="tls-kicker"><b /> AUTOAVALIAÇÃO POLÍTICA E ECONÔMICA</div>
            <h1>Depois que o <em>9 dedos</em> voltou ao poder, você sentiu no bolso?</h1>
            <p>Sem respostas certas ou erradas. Perguntas sobre preços, impostos, trabalho, renda, programas públicos e decisões tomadas em Brasília.</p>
            <button className="tls-cta" onClick={() => setStarted(true)}>COMEÇAR AGORA <span>→</span></button>
            <div className="tls-proof"><span>10</span> perguntas <span>•</span> sem respostas certas <span>•</span> temas verificáveis</div>
          </section>
          <section className="tls-cards" id="como">
            <div><strong>01</strong><h3>Responda</h3><p>Conte como você percebeu as mudanças na sua vida cotidiana.</p></div>
            <div><strong>02</strong><h3>Compare</h3><p>As alternativas contemplam experiências econômicas e sociais diferentes.</p></div>
            <div><strong>03</strong><h3>Confira</h3><p>Ao final, você pode consultar documentos, leis, números e fontes oficiais.</p></div>
          </section>
        </main>
      )}

      {started && !done && !paidArea && (
        <main className="tls-quiz">
          <div className="tls-quiz-top">
            <div><div className="tls-kicker"><b /> AUTOAVALIAÇÃO TLS</div><h2>Vamos falar do que aconteceu no seu dia a dia.</h2></div>
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
                {picked === null ? "Não há resposta certa. Escolha a alternativa que mais representa sua experiência." : "Resposta registrada. Continue."}
              </div>
              <button className="tls-next" disabled={picked === null} onClick={next}>{step === questions.length - 1 ? "VER RESULTADO" : "CONTINUAR"} <span>→</span></button>
            </div>
          </section>
        </main>
      )}

      {started && done && !paidArea && (
        <main className="tls-result">
          <div className="tls-result-card">
            <div className="tls-kicker center"><b /> AUTOAVALIAÇÃO CONCLUÍDA <b /></div>
            <div className="tls-score"><span>✓</span></div>
            <h2>Você chegou até o fim.</h2>
            <p>Suas respostas mostram quais aspectos do período analisado você quer entender melhor. O questionário não classifica sua ideologia nem considera uma resposta como politicamente correta.</p>
            <button className="tls-cta wide" onClick={() => setPaidArea(true)}>VER O QUE PODE SER CONFERIDO NOS DADOS <span>→</span></button>
            <button className="tls-reset" onClick={restart}>Refazer autoavaliação</button>
          </div>
        </main>
      )}

      {paidArea && (
        <main className="tls-paywall">
          <div className="tls-lock">LOCKED</div>
          <div className="tls-kicker center"><b /> ÁREA PREMIUM <b /></div>
          <h2>Você viu as perguntas.<br /><em>Agora vem a documentação.</em></h2>
          <p className="tls-paywall-lead">Uma biblioteca organizada para consultar leis, programas públicos, decisões, indicadores econômicos, datas e fontes oficiais — com contexto para você conferir as afirmações por conta própria.</p>
          <div className="tls-price"><small>ACESSO ÚNICO</small><strong>R$ 19,90</strong></div>
          <div className="tls-benefits"><span>✓ Linha do tempo por tema</span><span>✓ Leis e programas com datas</span><span>✓ Dados econômicos e sociais</span><span>✓ Referências oficiais para conferência</span></div>
          <button className="tls-cta wide" onClick={() => alert("Conecte aqui o link do seu checkout.")}>DESBLOQUEAR POR R$ 19,90 <span>→</span></button>
          <p className="tls-small">O conteúdo premium não é exibido nesta página antes da compra. O checkout real deve confirmar o pagamento no servidor antes de liberar o acesso.</p>
          <button className="tls-reset" onClick={() => setPaidArea(false)}>← Voltar ao resultado</button>
        </main>
      )}

      <section className="tls-sources" id="fontes">
        <div><div className="tls-kicker"><b /> TRANSPARÊNCIA</div><h2>Fontes antes de opiniões.</h2><p>O conteúdo educacional deve diferenciar fatos documentados, contexto e interpretação. Consulte sempre a fonte original quando quiser verificar uma afirmação.</p></div>
        <div className="tls-source-grid"><div><b>01</b><span>Presidência / Planalto</span></div><div><b>02</b><span>Câmara dos Deputados</span></div><div><b>03</b><span>Senado Federal</span></div><div><b>04</b><span>IBGE / indicadores oficiais</span></div></div>
      </section>

      <footer className="tls-footer">TLS • AUTOAVALIAÇÃO CÍVICA • 2026</footer>
    </div>
  );
}
