import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({ component: WeightLossQuiz });

type Tag = "autoestima" | "rotina" | "corpo" | "energia";
type Answer = {
  text: string;
  tag: Tag;
  recommendation: string;
  followUp: string;
};

type QuizQuestion = {
  question: string;
  subtitle: string;
  answers: Answer[];
};

const baseQuestions: QuizQuestion[] = [
  {
    question: "Você se sente cansada de chegar aos eventos e não se sentir do jeito que gostaria?",
    subtitle: "Não existe resposta certa. Escolha o que mais combina com você hoje.",
    answers: [
      { text: "Sim, isso mexe bastante comigo", tag: "autoestima", recommendation: "Vamos priorizar uma rotina que ajude você a se sentir mais confortável e confiante.", followUp: "O que faria você se sentir mais confortável nesses momentos?" },
      { text: "Às vezes, principalmente em fotos", tag: "autoestima", recommendation: "Vamos pensar em passos pequenos e consistentes, sem transformar sua rotina em uma obrigação.", followUp: "Em que situação você gostaria de perceber mais confiança?" },
      { text: "Quero começar a mudar isso", tag: "corpo", recommendation: "Ótimo ponto de partida: vamos buscar exercícios simples, progressivos e fáceis de acompanhar.", followUp: "Qual tipo de mudança você gostaria de começar a perceber primeiro?" },
      { text: "Não penso muito nisso", tag: "rotina", recommendation: "Então vamos focar no que realmente importa: uma rotina ativa que caiba no seu dia.", followUp: "O que faria uma rotina de exercícios valer a pena para você?" }
    ]
  },
  {
    question: "Quando você se olha no espelho, como gostaria de se sentir?",
    subtitle: "Sua resposta anterior ajuda a direcionar esta etapa.",
    answers: [
      { text: "Mais confiante comigo mesma", tag: "autoestima", recommendation: "Seu plano deve ser simples o bastante para gerar constância e não cobrança.", followUp: "O que costuma ajudar você a manter algo novo por mais tempo?" },
      { text: "Mais confortável com minhas roupas", tag: "corpo", recommendation: "Vamos priorizar movimentos de corpo inteiro e uma evolução gradual.", followUp: "Você prefere exercícios mais tranquilos ou um ritmo um pouco mais ativo?" },
      { text: "Mais leve e disposta", tag: "energia", recommendation: "Vamos combinar força leve com movimentos que façam você se sentir ativa.", followUp: "Você gostaria de terminar o treino se sentindo mais energizada ou mais desafiada?" },
      { text: "Mais satisfeita com minha rotina", tag: "rotina", recommendation: "A melhor estratégia para você é uma rotina realista, curta e repetível.", followUp: "Qual parte do dia costuma ser mais fácil para você reservar alguns minutos?" }
    ]
  },
  {
    question: "O que mais dificulta cuidar do seu corpo atualmente?",
    subtitle: "Agora vamos adaptar o plano ao obstáculo que mais aparece na sua rotina.",
    answers: [
      { text: "Falta de tempo", tag: "rotina", recommendation: "Vamos priorizar sessões enxutas, com poucos exercícios e descansos bem definidos.", followUp: "Se a sessão fosse curta, você preferiria 10, 15 ou 20 minutos?" },
      { text: "Falta de constância", tag: "rotina", recommendation: "Vamos reduzir a complexidade: quanto mais simples o treino, mais fácil acompanhar a sequência.", followUp: "Você prefere repetir alguns movimentos até pegar confiança ou variar bastante?" },
      { text: "Não sei quais exercícios fazer", tag: "corpo", recommendation: "Vamos usar movimentos básicos com instruções claras e demonstrações no próprio site.", followUp: "Você gostaria de aprender primeiro exercícios para pernas, braços ou corpo inteiro?" },
      { text: "Começo e acabo desistindo", tag: "autoestima", recommendation: "Vamos trabalhar com metas pequenas para que terminar uma sessão já seja uma vitória.", followUp: "O que faria você sentir que conseguiu cumprir o treino mesmo em um dia corrido?" }
    ]
  },
  {
    question: "Qual formato combina mais com a sua rotina?",
    subtitle: "Escolha pensando no que você realmente conseguiria repetir durante a semana.",
    answers: [
      { text: "Treinos curtos e objetivos", tag: "rotina", recommendation: "Seu plano pode usar blocos rápidos, sem exigir uma longa sessão.", followUp: "Você prefere uma sessão única curta ou dois blocos pequenos no dia?" },
      { text: "Treinos moderados e completos", tag: "corpo", recommendation: "Vamos aproveitar seu tempo para trabalhar vários grupos musculares em uma mesma sessão.", followUp: "Você se sente confortável treinando por cerca de 20 a 30 minutos?" },
      { text: "Movimentos leves ao longo do dia", tag: "energia", recommendation: "Seu plano pode distribuir movimento em pequenas doses para deixar a rotina mais ativa.", followUp: "Você teria facilidade para fazer pequenos blocos de movimento durante o dia?" },
      { text: "Uma rotina pronta para eu só seguir", tag: "rotina", recommendation: "Você não precisa decidir o treino todos os dias: a sequência pronta vai diminuir essa fricção.", followUp: "Você prefere receber um treino diferente a cada dia ou repetir uma base simples?" }
    ]
  },
  {
    question: "Que tipo de exercício você teria mais vontade de fazer?",
    subtitle: "Não precisa escolher o exercício perfeito; escolha o estilo que parece mais confortável.",
    answers: [
      { text: "Pernas e glúteos", tag: "corpo", recommendation: "Podemos dar mais atenção a movimentos de pernas e glúteos, mantendo o treino equilibrado.", followUp: "Você prefere exercícios em pé ou no chão?" },
      { text: "Braços e parte superior", tag: "corpo", recommendation: "Vamos incluir movimentos simples para a parte superior sem depender de equipamentos.", followUp: "Você prefere usar uma parede/superfície de apoio ou fazer tudo sem apoio?" },
      { text: "Corpo inteiro", tag: "energia", recommendation: "Uma rotina de corpo inteiro pode ser prática quando você quer aproveitar poucos minutos.", followUp: "Você gosta mais de movimentos lentos e controlados ou de um ritmo contínuo?" },
      { text: "Algo bem simples para começar", tag: "rotina", recommendation: "Vamos começar pelo básico e deixar a progressão acontecer aos poucos.", followUp: "Você quer começar com movimentos muito fáceis ou com um pequeno desafio?" }
    ]
  },
  {
    question: "Como você gostaria que o treino se encaixasse no seu dia?",
    subtitle: "Estamos chegando à parte mais prática: adaptar o programa ao seu tempo e energia.",
    answers: [
      { text: "Antes de começar o dia", tag: "rotina", recommendation: "Uma sessão curta no começo do dia pode funcionar como um compromisso rápido consigo mesma.", followUp: "Quanto tempo você normalmente consegue reservar de manhã?" },
      { text: "Depois da escola ou trabalho", tag: "rotina", recommendation: "Vamos evitar uma sessão complicada para não aumentar o cansaço do fim do dia.", followUp: "Nesse horário você teria mais ou menos 15, 30 ou 45 minutos?" },
      { text: "À noite", tag: "energia", recommendation: "Podemos priorizar uma sessão controlada, especialmente se você estiver cansada no fim do dia.", followUp: "Você prefere uma sessão relaxada ou ainda quer sentir que treinou?" },
      { text: "Quando surgir um espaço", tag: "rotina", recommendation: "Flexibilidade será importante: o treino precisa funcionar mesmo quando o horário mudar.", followUp: "Se aparecer uma janela inesperada, qual duração seria realista?" }
    ]
  },
  {
    question: "Quanto tempo você conseguiria reservar para cuidar de você?",
    subtitle: "Agora vamos usar o seu tempo real para personalizar o próximo passo.",
    answers: [
      { text: "10 a 15 minutos", tag: "rotina", recommendation: "Com 10–15 minutos, a melhor escolha é um treino compacto: poucos movimentos, pouca espera e foco no essencial.", followUp: "Com esse tempo, você prefere um treino de corpo inteiro ou focado em uma região?" },
      { text: "15 a 20 minutos", tag: "corpo", recommendation: "Com 15–20 minutos, dá para montar uma sessão curta com aquecimento, exercícios principais e descanso organizado.", followUp: "Você prefere usar quase todo o tempo em exercícios ou deixar alguns minutos para uma volta à calma?" },
      { text: "30 minutos", tag: "energia", recommendation: "Com 30 minutos, podemos distribuir melhor o treino e incluir mais de um bloco de exercícios sem correr.", followUp: "Como você tem 30 minutos, prefere dividir em aquecimento + força + movimento ou fazer um circuito contínuo?" },
      { text: "Mais de 30 minutos", tag: "corpo", recommendation: "Com mais tempo disponível, podemos usar uma sessão mais completa sem precisar acelerar cada exercício.", followUp: "Você prefere usar esse tempo em uma sessão completa ou guardar parte dele para mobilidade e descanso?" }
    ]
  },
  {
    question: "Como você quer organizar o seu tempo de treino?",
    subtitle: "Sua resposta sobre duração já foi considerada nesta pergunta.",
    answers: [
      { text: "Um bloco direto, sem enrolação", tag: "rotina", recommendation: "Vamos manter a estrutura objetiva: começar, executar e terminar sem etapas desnecessárias.", followUp: "Você gostaria que cada exercício já mostrasse séries, repetições e descanso na tela?" },
      { text: "Aquecimento + exercícios + finalização", tag: "energia", recommendation: "Uma estrutura em etapas pode deixar a sessão mais fácil de acompanhar.", followUp: "Você prefere que o site avise quando for hora de trocar de exercício?" },
      { text: "Circuito com vários movimentos", tag: "corpo", recommendation: "Um circuito pode deixar o treino mais dinâmico, desde que a intensidade continue confortável.", followUp: "Você prefere repetir o circuito 2 ou 3 vezes?" },
      { text: "Poucos exercícios, mas bem explicados", tag: "autoestima", recommendation: "Vamos valorizar clareza: menos movimentos, mais orientação para você saber exatamente o que fazer.", followUp: "Você gostaria de abrir uma demonstração antes de começar cada exercício?" }
    ]
  },
  {
    question: "O que mais ajudaria você a manter o programa por 7 dias?",
    subtitle: "Pensando no formato que você escolheu, qual apoio faria mais diferença?",
    answers: [
      { text: "Ter tudo pronto", tag: "rotina", recommendation: "Seu programa deve tirar decisões do caminho: abrir o dia e saber exatamente o que fazer.", followUp: "Você gostaria de ver um checklist diário de exercícios concluídos?" },
      { text: "Ver minha evolução", tag: "autoestima", recommendation: "Vamos transformar consistência em algo visível, acompanhando o que você concluiu.", followUp: "Você prefere acompanhar por exercícios concluídos ou por dias completos?" },
      { text: "Ter demonstrações dos exercícios", tag: "corpo", recommendation: "As demonstrações podem reduzir a dúvida sobre como executar cada movimento.", followUp: "Você prefere uma animação curta ou instruções passo a passo junto da animação?" },
      { text: "Receber um lembrete do próximo dia", tag: "energia", recommendation: "Um próximo passo claro ajuda a manter o ritmo sem precisar pensar no que vem depois.", followUp: "Você prefere um aviso do horário do próximo treino ou apenas um contador até o próximo dia?" }
    ]
  },
  {
    question: "Se você pudesse escolher uma prioridade para a próxima semana, qual seria?",
    subtitle: "Última pergunta. Sua resposta vai ajudar a definir a recomendação final.",
    answers: [
      { text: "Criar constância", tag: "rotina", recommendation: "Sua recomendação final vai priorizar simplicidade e consistência, sem exigir uma rotina perfeita.", followUp: "Você quer começar com uma meta pequena e fácil de repetir?" },
      { text: "Me sentir mais confiante", tag: "autoestima", recommendation: "Sua recomendação final vai valorizar pequenas vitórias e uma progressão que respeite seu ritmo.", followUp: "Você prefere medir sua evolução pelo que consegue fazer ou pelo que consegue manter?" },
      { text: "Ficar mais ativa", tag: "energia", recommendation: "Sua recomendação final vai combinar movimento e sessões práticas para manter você ativa.", followUp: "Você gostaria de alternar dias mais leves e dias um pouco mais ativos?" },
      { text: "Aprender a treinar melhor", tag: "corpo", recommendation: "Sua recomendação final vai dar destaque à execução, às séries, às repetições e ao descanso.", followUp: "Você gostaria que cada exercício tivesse uma explicação curta e uma demonstração animada?" }
    ]
  }
];

const resultCopy = {
  autoestima: { title: "Seu plano deve começar leve.", text: "Pelas suas respostas, você tende a se beneficiar de uma experiência simples, com pequenas vitórias e uma rotina que ajude você a se sentir mais confortável consigo mesma." },
  rotina: { title: "Seu plano precisa caber na vida real.", text: "Suas respostas mostram que praticidade e constância são importantes. Por isso, a recomendação é uma sequência objetiva, organizada e fácil de acompanhar." },
  corpo: { title: "Seu plano pode ser mais prático e guiado.", text: "Pelas suas respostas, você quer entender o que fazer e acompanhar cada exercício. A recomendação é uma rotina com demonstrações, séries, repetições e descanso." },
  energia: { title: "Seu plano deve colocar você em movimento.", text: "Suas respostas mostram interesse em ficar mais ativa e disposta. A recomendação é combinar movimentos simples com uma rotina progressiva e sustentável." }
};

function WeightLossQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({ autoestima: 0, rotina: 0, corpo: 0, energia: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [offer, setOffer] = useState(false);
  const [context, setContext] = useState<string>("");

  const current = baseQuestions[step];
  const progress = ((step + (selected !== null ? 1 : 0)) / baseQuestions.length) * 100;
  const selectedAnswer = selected === null ? null : current.answers[selected];

  const dominant = useMemo(() => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "autoestima";
  }, [scores]);

  function choose(index: number) {
    // A resposta só é contabilizada ao avançar; até lá, o usuário pode trocar a opção.
    setSelected(index);
  }

  function next() {
    if (selected === null) return;
    const answer = current.answers[selected];
    const nextScores = { ...scores, [answer.tag]: (scores[answer.tag] || 0) + 1 };
    setScores(nextScores);
    setContext(answer.followUp);

    if (step === baseQuestions.length - 1) {
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
    setContext("");
  }

  if (offer) {
    return (
      <main className="fit-app fit-offer">
        <div className="fit-offer-card">
          <div className="fit-kicker">SEU PRÓXIMO PASSO</div>
          <h1>Comece a cuidar de você<br /><em>do seu jeito.</em></h1>
          <p>Por apenas <strong>R$ 27,99</strong>, tenha acesso a um guia de exercícios práticos para ajudar você a construir uma rotina ativa e chegar ao verão se sentindo mais confiante.</p>
          <div className="fit-price"><s>R$ 39,90</s><strong>R$ 27,99</strong><span>acesso ao guia</span></div>
          <div className="fit-benefits">
            <span>✓ Exercícios organizados por objetivo</span><span>✓ Rotinas simples para começar</span><span>✓ Guia para acompanhar sua evolução</span><span>✓ Acesso imediato ao material</span>
          </div>
          <button className="fit-primary" onClick={() => { window.location.href = "https://pay.cakto.com.br/34rfhf7_1160901"; }}>QUERO COMEÇAR AGORA <span>→</span></button>
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
          <div className="fit-special">✨ Sua recomendação foi montada a partir das respostas que você deu ao longo do quiz.</div>
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
          <p>Descubra a sua rotina ideal a partir de um mini quiz interativo</p>
          <button type="button" className="fit-primary fit-start-button" onPointerUp={(event) => { event.preventDefault(); event.currentTarget.blur(); setStarted(true); }}>COMEÇAR MEU QUIZ <span>→</span></button>
          <div className="fit-trust"><span>10 perguntas</span><i>•</i><span>perguntas adaptadas</span></div>
        </div>
      </main>
    );
  }

  return (
    <main className="fit-app fit-quiz">
      <header className="fit-header"><div className="fit-brand">ViradaFIT</div><div className="fit-count">{String(step + 1).padStart(2, "0")} / 10</div></header>
      <div className="fit-progress"><div style={{ width: progress + "%" }} /></div>
      <section className="fit-question-card">
        <div className="fit-question-kicker">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
        <h2>{current.question}</h2>
        <p className="fit-subtitle">{step > 0 ? current.subtitle + " " + context : current.subtitle}</p>
        <div className="fit-answers">
          {current.answers.map((answer, i) => (
            <button key={answer.text} className={selected === i ? "selected" : ""} onClick={() => choose(i)}>
              <span>{String.fromCharCode(65 + i)}</span>{answer.text}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <div className="fit-answer-confirmation">
            Resposta registrada. A próxima pergunta foi adaptada às suas respostas.
          </div>
        )}
        <div className="fit-footer">
          <small>{selected === null ? "Escolha uma alternativa para personalizar a próxima etapa." : "Resposta registrada e próxima etapa personalizada."}</small>
          <button className="fit-next" disabled={selected === null} onClick={next}>{step === 9 ? "VER MINHA RECOMENDAÇÃO" : "CONTINUAR"} <span>→</span></button>
        </div>
      </section>
    </main>
  );
}
