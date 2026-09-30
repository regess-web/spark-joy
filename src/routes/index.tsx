import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "GOVERNO LULA", q: "Desde o início do terceiro mandato de Luiz Inácio Lula da Silva, você percebeu alguma mudança no quanto o dinheiro rende no seu dia a dia?", options: ["Rende mais", "Rende menos", "Praticamente igual", "Não sei dizer"] },
  { category: "BOLSO", q: "Nos últimos anos, como você sentiu as despesas da sua casa ou da sua família em relação à renda?", options: ["Ficaram mais pesadas", "Ficaram mais leves", "Não mudaram muito", "Não acompanho"] },
  { category: "PREÇOS", q: "Quando você vai ao mercado, abastece o carro ou paga uma conta, você sente que as mudanças econômicas do período do governo Lula chegaram ao seu bolso?", options: ["Sim, claramente", "Um pouco", "Quase não percebi", "Nunca parei para relacionar"] },
  { category: "IMPOSTOS", q: "Ao ouvir sobre mudanças em impostos e no sistema tributário durante o governo Lula, você sente que entende quanto isso pode representar no preço das coisas que compra?", options: ["Entendo bem", "Entendo parcialmente", "Tenho muita dúvida", "Nunca fui atrás"] },
  { category: "TRABALHO E RENDA", q: "Desde 2023, você ou alguém próximo percebeu alguma mudança nas oportunidades de emprego, renda ou atividade profissional?", options: ["Melhorou", "Piorou", "Ficou parecido", "Não sei avaliar"] },
  { category: "SALÁRIO MÍNIMO", q: "Quando o salário mínimo foi reajustado acima da inflação em diferentes anos do período Lula, você sentiu algum efeito concreto no orçamento da sua família?", options: ["Sim, positivo", "Sim, mas o aumento dos preços anulou parte do efeito", "Pouco ou nenhum", "Não se aplica / não sei"] },
  { category: "PROGRAMAS SOCIAIS", q: "Quando você pensa em medidas como o Bolsa Família e o Minha Casa, Minha Vida retomados ou ampliados no período Lula, qual é a sua relação com esses programas?", options: ["Eu ou alguém próximo foi beneficiado", "Conheço pessoas beneficiadas", "Conheço apenas pelas notícias", "Não acompanho"] },
  { category: "GASTOS DO GOVERNO", q: "Quando você ouve discussões sobre gastos públicos, déficit e dívida durante o governo Lula, você costuma pensar em como isso pode afetar juros, impostos ou a economia?", options: ["Sim, penso nisso", "Às vezes", "Raramente", "Não sei como funciona"] },
  { category: "NOTÍCIAS", q: "Quando aparece uma notícia dizendo que uma medida do governo Lula melhorou ou piorou a vida dos brasileiros, você costuma procurar os números e a fonte original antes de formar uma opinião?", options: ["Quase sempre", "Às vezes", "Raramente", "Nunca"] },
  { category: "A VERDADE POR TRÁS DOS DADOS", q: "Se você pudesse abrir uma biblioteca com leis, decisões, números econômicos e fontes oficiais para conferir o que realmente aconteceu durante o governo Lula, o que mais gostaria de investigar?", options: ["Meu bolso, preços e impostos", "Emprego, salário e renda", "Programas sociais e investimentos", "Contas públicas, leis e decisões do governo"] }
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
            <div className="tls-kicker"><b /> AUTOAVALIAÇÃO SOBRE O GOVERNO LULA</div>
            <h1>Você sentiu as decisões do governo Lula <em>no seu bolso?</em></h1>
            <p>Sem respostas certas ou erradas. As perguntas partem de situações do cotidiano e passam por preços, impostos, trabalho, renda, programas públicos e contas do governo.</p>
            <button className="tls-cta" onClick={() => setStarted(true)}>COMEÇAR AGORA <span>→</span></button>
            <div className="tls-proof"><span>10</span> perguntas <span>•</span> sem respostas certas <span>•</span> baseado em temas verificáveis</div>
          </section>
          <section className="tls-cards" id="como">
            <div><strong>01</strong><h3>Responda</h3><p>Conte como você percebeu os efeitos do período Lula na vida cotidiana.</p></div>
            <div><strong>02</strong><h3>Compare</h3><p>As respostas abordam experiências e percepções diferentes, sem gabarito político.</p></div>
            <div><strong>03</strong><h3>Aprofunde</h3><p>Ao final, você pode consultar uma biblioteca com leis, dados, datas e fontes oficiais.</p></div>
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
            <p>Suas respostas mostram quais aspectos do período Lula você quer entender melhor. O questionário não classifica sua ideologia nem considera uma resposta como politicamente correta.</p>
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
          <p className="tls-paywall-lead">Uma biblioteca organizada para consultar leis, programas públicos, decisões, indicadores econômicos, datas e fontes oficiais do período do governo Lula — com contexto para você conferir as afirmações por conta própria.</p>
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
