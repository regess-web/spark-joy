import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: TLSHome });

const questions = [
  { category: "VIDA REAL", q: "Você sente que as decisões tomadas em Brasília acabam afetando coisas do seu dia a dia?", options: ["Sim, bastante", "Às vezes", "Pouco", "Nunca parei para pensar nisso"] },
  { category: "DINHEIRO", q: "Quando sobra pouco dinheiro no fim do mês, você costuma tentar entender quais despesas, impostos e preços mais pesaram no orçamento?", options: ["Sempre", "Às vezes", "Raramente", "Nunca"] },
  { category: "TRABALHO", q: "Você já ficou na dúvida sobre como uma mudança de lei poderia afetar seu trabalho, negócio ou renda?", options: ["Sim, várias vezes", "Algumas vezes", "Uma vez", "Nunca"] },
  { category: "PREÇOS", q: "Quando um produto fica mais caro, você costuma procurar entender se houve mudança de imposto, custo, câmbio ou outro fator?", options: ["Sim", "Às vezes", "Raramente", "Não"] },
  { category: "IMPOSTOS", q: "Você sabe, pelo menos de forma geral, quais impostos aparecem no preço de produtos e serviços que compra?", options: ["Sim", "Tenho uma noção", "Muito pouco", "Não sei"] },
  { category: "LEIS", q: "Quando ouve falar de uma nova lei, você normalmente consegue descobrir o que ela realmente mudou?", options: ["Sim", "Às vezes", "Tenho dificuldade", "Nunca procuro"] },
  { category: "CONGRESSO", q: "Você sabe diferenciar o papel da Câmara dos Deputados, do Senado e do Poder Executivo?", options: ["Sim", "Mais ou menos", "Pouco", "Não"] },
  { category: "INFORMAÇÃO", q: "Quando recebe uma informação política nas redes sociais, você costuma conferir a fonte original?", options: ["Quase sempre", "Às vezes", "Raramente", "Nunca"] },
  { category: "CONTEXTO", q: "Você já quis entender a história completa por trás de uma medida pública, em vez de apenas ver um vídeo ou manchete?", options: ["Muitas vezes", "Algumas vezes", "Poucas vezes", "Nunca"] },
  { category: "DESAFIO FINAL", q: "Se existisse uma biblioteca organizada com leis, programas públicos, datas, mudanças e fontes oficiais, isso ajudaria você a entender melhor as notícias?", options: ["Ajudaria muito", "Ajudaria", "Talvez", "Não faria diferença"] }
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
            <div className="tls-kicker"><b /> AUTOAVALIAÇÃO CÍVICA</div>
            <h1>Você entende como as decisões públicas <em>afetam a vida real?</em></h1>
            <p>Não existem respostas certas ou erradas. São perguntas sobre dinheiro, trabalho, leis, impostos e instituições para mostrar quais temas você acompanha mais.</p>
            <button className="tls-cta" onClick={() => setStarted(true)}>COMEÇAR AGORA <span>→</span></button>
            <div className="tls-proof"><span>10</span> perguntas <span>•</span> sem respostas certas <span>•</span> gratuito</div>
          </section>
          <section className="tls-cards" id="como">
            <div><strong>01</strong><h3>Responda</h3><p>Conte como você se relaciona com os temas do dia a dia.</p></div>
            <div><strong>02</strong><h3>Veja seu perfil</h3><p>Ao final, você recebe um resumo educacional dos temas abordados.</p></div>
            <div><strong>03</strong><h3>Aprofunde</h3><p>Se quiser, conheça uma biblioteca organizada por tema e fonte oficial.</p></div>
          </section>
        </main>
      )}

      {started && !done && !paidArea && (
        <main className="tls-quiz">
          <div className="tls-quiz-top">
            <div><div className="tls-kicker"><b /> AUTOAVALIAÇÃO TLS</div><h2>Vamos descobrir o que você acompanha?</h2></div>
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
                {picked === null ? "Não há resposta certa. Escolha a que mais combina com você." : "Resposta registrada. Continue."}
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
            <p>Suas respostas mostram quais temas da vida pública você acompanha e quais podem merecer mais contexto. Este resultado não classifica sua ideologia nem tenta prever sua posição política.</p>
            <button className="tls-cta wide" onClick={() => setPaidArea(true)}>CONHECER A BIBLIOTECA COMPLETA <span>→</span></button>
            <button className="tls-reset" onClick={restart}>Refazer autoavaliação</button>
          </div>
        </main>
      )}

      {paidArea && (
        <main className="tls-paywall">
          <div className="tls-lock">LOCKED</div>
          <div className="tls-kicker center"><b /> ÁREA PREMIUM <b /></div>
          <h2>Você viu a autoavaliação.<br /><em>Agora vem o contexto.</em></h2>
          <p className="tls-paywall-lead">Uma biblioteca organizada para consultar leis, programas públicos, mudanças institucionais, datas e fontes oficiais sem depender apenas de manchetes ou posts.</p>
          <div className="tls-price"><small>ACESSO ÚNICO</small><strong>R$ 19,90</strong></div>
          <div className="tls-benefits"><span>✓ Linha do tempo por tema</span><span>✓ Leis e programas com datas</span><span>✓ Contexto institucional</span><span>✓ Referências oficiais para conferência</span></div>
          <button className="tls-cta wide" onClick={() => alert("Conecte aqui o link do seu checkout.")}>DESBLOQUEAR POR R$ 19,90 <span>→</span></button>
          <p className="tls-small">O conteúdo premium não é exibido nesta página antes da compra. O checkout real deve confirmar o pagamento no servidor antes de liberar o acesso.</p>
          <button className="tls-reset" onClick={() => setPaidArea(false)}>← Voltar ao resultado</button>
        </main>
      )}

      <section className="tls-sources" id="fontes">
        <div><div className="tls-kicker"><b /> TRANSPARÊNCIA</div><h2>Fontes antes de opiniões.</h2><p>O conteúdo educacional deve diferenciar fatos documentados, contexto e interpretação. Consulte sempre a fonte original quando quiser verificar uma afirmação.</p></div>
        <div className="tls-source-grid"><div><b>01</b><span>Presidência / Planalto</span></div><div><b>02</b><span>Câmara dos Deputados</span></div><div><b>03</b><span>Senado Federal</span></div><div><b>04</b><span>Diário Oficial da União</span></div></div>
      </section>

      <footer className="tls-footer">TLS • AUTOAVALIAÇÃO CÍVICA • 2026</footer>
    </div>
  );
}
