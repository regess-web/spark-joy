import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({ component: WeightLossQuiz });

type Answer = { text: string; tag: "autoestima" | "rotina" | "corpo" | "energia" };

const questions: { question: string; subtitle: string; answers: Answer[] }[] = [
  {
    question: "Você se sente cansada de chegar aos eventos e não se sentir do jeito que gostaria?",
    subtitle: "Não existe resposta certa. Escolha o que mais combina com você hoje.",
    answers: [
      { text: "Sim, isso mexe bastante comigo", tag: "autoestima" },
      { text: "Às vezes, principalmente em fotos", tag: "autoestima" },
      { text: "Quero começar a mudar isso", tag: "corpo" },
      { text: "Não penso muito nisso", tag: "rotina" }
    ]
  },
  {
    question: "Quando você se olha no espelho, como gostaria de se sentir?",
    subtitle: "Pense mais na sensação que você quer ter do que em um número na balança.",
    answers: [
      { text: "Mais confiante comigo mesma", tag: "autoestima" },
      { text: "Mais confortável com minhas roupas", tag: "corpo" },
      { text: "Mais leve e disposta", tag: "energia" },
      { text: "Mais satisfeita com minha rotina", tag: "rotina" }
    ]
  },
  {
    question: "O que mais dificulta cuidar do seu corpo atualmente?",
    subtitle: "Sua rotina não precisa ser perfeita para começar.",
    answers: [
      { text: "Falta de tempo", tag: "rotina" },
      { text: "Falta de constância", tag: "rotina" },
      { text: "Não sei quais exercícios fazer", tag: "corpo" },
      { text: "Começo e acabo desistindo", tag: "autoestima" }
    ]
  },
  {
    question: "Como você se sente quando uma roupa que gostava não veste como antes?",
    subtitle: "Escolha a alternativa que mais se aproxima da sua experiência.",
    answers: [
      { text: "Fico insegura", tag: "autoestima" },
      { text: "Fico frustrada", tag: "corpo" },
      { text: "Penso que preciso voltar à rotina", tag: "rotina" },
      { text: "Uso outra roupa e sigo o dia", tag: "energia" }
    ]
  },
  {
    question: "Se você tivesse mais disposição no dia a dia, o que mudaria?",
    subtitle: "Imagine sua rotina alguns meses a partir de agora.",
    answers: [
      { text: "Eu aproveitaria mais os momentos fora de casa", tag: "energia" },
      { text: "Me sentiria melhor nas fotos", tag: "autoestima" },
      { text: "Voltaria a usar algumas roupas", tag: "corpo" },
      { text: "Conseguiria manter uma rotina de exercícios", tag: "rotina" }
    ]
  },
  {
    question: "Qual dessas situações mais parece com você?",
    subtitle: "Não é um teste. É só para entender o que você procura.",
    answers: [
      { text: "Quero mudar, mas não sei por onde começar", tag: "corpo" },
      { text: "Sei o que fazer, mas tenho dificuldade em manter", tag: "rotina" },
      { text: "Quero voltar a me sentir bem comigo mesma", tag: "autoestima" },
      { text: "Quero ter mais energia para minha rotina", tag: "energia" }
    ]
  },
  {
    question: "Quanto tempo você conseguiria reservar para cuidar de você?",
    subtitle: "Escolha pensando na sua rotina real, não na rotina perfeita.",
    answers: [
      { text: "10 a 20 minutos", tag: "rotina" },
      { text: "20 a 30 minutos", tag: "corpo" },
      { text: "30 a 45 minutos", tag: "energia" },
      { text: "Ainda não sei, preciso de algo simples", tag: "autoestima" }
    ]
  },
  {
    question: "O que faria você olhar para trás e pensar: 'valeu a pena começar'?",
    subtitle: "Essa resposta ajuda a personalizar sua experiência.",
    answers: [
      { text: "Me sentir mais confiante", tag: "autoestima" },
      { text: "Perceber mudanças no meu corpo", tag: "corpo" },
      { text: "Ter mais disposição", tag: "energia" },
      { text: "Conseguir manter uma rotina", tag: "rotina" }
    ]
  },
  {
    question: "Como você gostaria de chegar ao verão?",
    subtitle: "Sem comparação com ninguém. Pense em você.",
    answers: [
      { text: "Mais confiante e confortável comigo", tag: "autoestima" },
      { text: "Com uma rotina de exercícios que eu consiga manter", tag: "rotina" },
      { text: "Sentindo meu corpo mais leve e ativo", tag: "corpo" },
      { text: "Com mais energia para aproveitar", tag: "energia" }
    ]
  },
  {
    question: "Se existisse um plano simples para você começar hoje, o que seria mais importante?",
    subtitle: "Última pergunta. Escolha o que mais importa para você.",
    answers: [
      { text: "Exercícios práticos e objetivos", tag: "corpo" },
      { text: "Uma rotina fácil de seguir", tag: "rotina" },
      { text: "Voltar a gostar do que vejo no espelho", tag: "autoestima" },
      { text: "Ter mais disposição no dia a dia", tag: "energia" }
    ]
  }
];

const resultCopy = {
  autoestima: { title: "Você encontrou o lugar certo.", text: "Pelas suas respostas, o que você procura vai além de simplesmente fazer exercícios: você quer voltar a se sentir bem, confiante e confortável consigo mesma." },
  rotina: { title: "Você encontrou o lugar certo.", text: "Suas respostas mostram que o mais importante para você é ter algo simples o suficiente para entrar na sua rotina e que você consiga manter de verdade." },
  corpo: { title: "Você encontrou o lugar certo.", text: "Pelas suas respostas, você está buscando uma forma mais prática de cuidar do corpo, com exercícios objetivos e uma rotina que faça sentido para você." },
  energia: { title: "Você encontrou o lugar certo.", text: "Suas respostas mostram que você quer mais do que uma mudança estética: você quer se sentir mais ativa, disposta e preparada para aproveitar seus dias." }
};

function WeightLossQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({ autoestima: 0, rotina: 0, corpo: 0, energia: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [offer, setOffer] = useState(false);

  const current = questions[step];
  const progress = ((step + (selected !== null ? 1 : 0)) / questions.length) * 100;

  const dominant = useMemo(() => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "autoestima";
  }, [scores]);

  function choose(index: number) {
    if (selected !== null) return;
    setSelected(index);
  }

  function next() {
    if (selected === null) return;
    const tag = current.answers[selected].tag;
    const nextScores = { ...scores, [tag]: (scores[tag] || 0) + 1 };
    setScores(nextScores);
    if (step === questions.length - 1) {
      const finalTag = Object.entries(nextScores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(finalTag);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  }

  function restart() {
    setStarted(false);
    setStep(0);
    setSelected(null);
    setScores({ autoestima: 0, rotina: 0, corpo: 0, energia: 0 });
    setResult(null);
    setOffer(false);
  }

  if (offer) {
    return (
      <main className="fit-app fit-offer">
        <div className="fit-offer-card">
          <div className="fit-kicker">SEU PRÓXIMO PASSO</div>
          <h1>Comece a cuidar de você<br /><em>do seu jeito.</em></h1>
          <p>Por apenas <strong>R$ 19,90</strong>, tenha acesso a um guia de exercícios práticos para ajudar você a construir uma rotina ativa e chegar ao verão se sentindo mais confiante.</p>
          <div className="fit-price"><s>R$ 39,90</s><strong>R$ 19,90</strong><span>acesso ao guia</span></div>
          <div className="fit-benefits">
            <span>✓ Exercícios organizados por objetivo</span>
            <span>✓ Rotinas simples para começar</span>
            <span>✓ Guia para acompanhar sua evolução</span>
            <span>✓ Acesso imediato ao material</span>
          </div>
          <button className="fit-primary">QUERO COMEÇAR AGORA <span>→</span></button>
          <small>O material é educativo e não substitui orientação individual de profissional de saúde ou educação física.</small>
        </div>
      </main>
    );
  }

  if (result) {
    const copy = resultCopy[result as keyof typeof resultCopy];
    return (
      <main className="fit-app fit-result">
        <div className="fit-result-card">
          <div className="fit-kicker">SEU RESULTADO</div>
          <div className="fit-result-icon">✓</div>
          <p className="fit-overline">PELO QUE VOCÊ RESPONDEU...</p>
          <h1>{copy.title}</h1>
          <p className="fit-result-text">{copy.text}</p>
          <div className="fit-special">✨ Este é o seu momento de começar a olhar para você com mais carinho.</div>
          <button className="fit-primary" onClick={() => setOffer(true)}>CONTINUAR <span>→</span></button>
          <button className="fit-secondary" onClick={restart}>Refazer quiz</button>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="fit-app fit-start">
        <div className="fit-start-card">
          <div className="fit-kicker">SEU MOMENTO • 10 PERGUNTAS</div>
          <h1>Você está cansada de ir aos eventos e não se sentir <em>do jeito que gostaria?</em></h1>
          <p>Responda algumas perguntas rápidas para entender o que você realmente procura neste momento. Não existe resposta certa ou errada.</p>
          <button className="fit-primary" onClick={() => setStarted(true)}>COMEÇAR MEU QUIZ <span>→</span></button>
          <div className="fit-trust"><span>10 perguntas</span><i>•</i><span>sem resposta certa</span><i>•</i><span>resultado personalizado</span></div>
        </div>
      </main>
    );
  }

  return (
    <main className="fit-app fit-quiz">
      <header className="fit-header"><div className="fit-brand">VIVA<span>+</span></div><div className="fit-count">{String(step + 1).padStart(2, "0")} / 10</div></header>
      <div className="fit-progress"><div style={{ width: progress + "%" }} /></div>
      <section className="fit-question-card">
        <div className="fit-question-kicker">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
        <h2>{current.question}</h2>
        <p className="fit-subtitle">{current.subtitle}</p>
        <div className="fit-answers">
          {current.answers.map((answer, i) => (
            <button key={answer.text} className={selected === i ? "selected" : ""} onClick={() => choose(i)}>
              <span>{String.fromCharCode(65 + i)}</span>{answer.text}
            </button>
          ))}
        </div>
        <div className="fit-footer">
          <small>{selected === null ? "Escolha a alternativa que mais combina com você." : "Resposta registrada."}</small>
          <button className="fit-next" disabled={selected === null} onClick={next}>{step === 9 ? "VER MEU RESULTADO" : "CONTINUAR"} <span>→</span></button>
        </div>
      </section>
    </main>
  );
}
