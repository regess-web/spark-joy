import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ViradaFIT | Sua Rotina de Treino" },
      { name: "description", content: "Responda ao quiz e encontre uma rotina de treino adequada ao seu momento." },
      { property: "og:title", content: "ViradaFIT | Sua Rotina de Treino" },
      { property: "og:description", content: "Responda ao quiz e encontre uma rotina de treino adequada ao seu momento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeightLossQuiz,
});

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
  kind?: "choices" | "weight" | "height";
  min?: number;
  max?: number;
  unit?: string;
};

const baseQuestions: [QuizQuestion, ...QuizQuestion[]] = [
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
    subtitle: "Escolha o tempo que parece mais realista para a sua rotina atual.",
    answers: [
      { text: "Até 15 minutos", tag: "rotina", recommendation: "Vamos priorizar uma rotina curta e objetiva, para facilitar a constância.", followUp: "Você prefere fazer esses minutos de uma vez ou dividir em pequenos blocos?" },
      { text: "De 15 a 30 minutos", tag: "corpo", recommendation: "Esse tempo permite uma sequência equilibrada, sem deixar o treino pesado demais.", followUp: "Você prefere focar mais em força ou em movimentos para o corpo inteiro?" },
      { text: "De 30 a 45 minutos", tag: "energia", recommendation: "Com esse tempo, dá para combinar diferentes movimentos e construir uma sessão mais completa.", followUp: "Você gostaria de um treino mais intenso ou moderado?" },
      { text: "Depende do dia", tag: "rotina", recommendation: "Flexibilidade será importante para você, com opções que se adaptem aos dias mais corridos.", followUp: "Nos dias corridos, qual seria o mínimo de tempo que você conseguiria manter?" }
    ]
  },
  {
    question: "Onde você prefere fazer seus treinos?",
    subtitle: "Escolha o ambiente em que você realmente conseguiria manter uma rotina.",
    answers: [
      { text: "Em casa, sem equipamentos", tag: "rotina", recommendation: "Vamos priorizar exercícios simples que você consiga começar sem depender de academia.", followUp: "Você gostaria de receber tudo pronto para apenas abrir e seguir?" },
      { text: "Na academia", tag: "corpo", recommendation: "Podemos considerar uma rotina mais completa e organizada para acompanhar sua evolução.", followUp: "Você prefere uma rotina já estruturada para não perder tempo escolhendo exercícios?" },
      { text: "Um pouco de cada", tag: "energia", recommendation: "Flexibilidade pode ser a melhor estratégia para você manter o movimento mesmo quando a rotina muda.", followUp: "Você gostaria de ter opções diferentes conforme o tempo disponível?" },
      { text: "Ainda não sei", tag: "autoestima", recommendation: "Tudo bem começar pelo mais simples e descobrir aos poucos o que funciona para você.", followUp: "Você prefere começar com uma rotina bem guiada?" }
    ]
  },
  {
    question: "O que você mais gostaria de conquistar nos próximos 7 dias?",
    subtitle: "Pense em uma mudança que faria você sentir que valeu a pena começar.",
    answers: [
      { text: "Sentir que finalmente comecei", tag: "autoestima", recommendation: "Seu primeiro objetivo pode ser criar confiança através de pequenas vitórias.", followUp: "Ter uma sequência pronta ajudaria você a começar?" },
      { text: "Criar uma rotina", tag: "rotina", recommendation: "Vamos valorizar consistência e praticidade para você conseguir repetir o plano.", followUp: "Você gostaria de saber exatamente o que fazer em cada dia?" },
      { text: "Me sentir mais ativa", tag: "energia", recommendation: "Vamos priorizar movimentos simples que ajudem você a colocar o corpo em ação.", followUp: "Você prefere uma rotina curta que seja fácil de repetir?" },
      { text: "Cuidar mais do meu corpo", tag: "corpo", recommendation: "Vamos organizar uma sequência equilibrada para você saber como começar.", followUp: "Você gostaria de ter séries e repetições já definidas?" }
    ]
  },
  {
    question: "O que mais ajudaria você a manter o programa por 7 dias?",
    subtitle: "A última etapa ajuda a entender o que torna uma rotina mais fácil de seguir.",
    answers: [
      { text: "Ter um treino pronto", tag: "rotina", recommendation: "Uma sequência pronta reduz decisões e deixa mais simples começar.", followUp: "Você prefere receber tudo organizado por dia?" },
      { text: "Ver minha evolução", tag: "autoestima", recommendation: "Acompanhar pequenas conquistas pode ajudar a manter a motivação.", followUp: "Você gostaria de marcar cada treino concluído?" },
      { text: "Exercícios fáceis de entender", tag: "corpo", recommendation: "Instruções claras ajudam você a saber exatamente o que fazer em cada etapa.", followUp: "Você prefere explicações rápidas ou mais detalhadas?" },
      { text: "Sentir mais disposição", tag: "energia", recommendation: "Vamos priorizar movimentos que façam a rotina parecer ativa e sustentável.", followUp: "Você prefere começar devagar e aumentar o ritmo aos poucos?" }
    ]
  },
  {
    question: "Qual é o seu peso atual?",
    subtitle: "Arraste para escolher seu peso ou digite o valor exato no quadrinho.",
    answers: [],
    kind: "weight",
    min: 0,
    max: 250,
    unit: "kg"
  },
  {
    question: "Qual é a sua altura?",
    subtitle: "Arraste para escolher sua altura ou digite o valor exato no quadrinho.",
    answers: [],
    kind: "height",
    min: 0,
    max: 250,
    unit: "cm"
  },
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
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(baseQuestions.length).fill(null));
  const [scores, setScores] = useState<Record<string, number>>({ autoestima: 0, rotina: 0, corpo: 0, energia: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [offer, setOffer] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<"treino" | "dieta" | "contador" | "chat">("treino");
  const [selectedExercise, setSelectedExercise] = useState<{name:string; reps:string; rest:string} | null>(null);
  const [context, setContext] = useState<string>("");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [measurementComplete, setMeasurementComplete] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  function trackQuizEvent(eventName: string, params: Record<string, string | number> = {}) {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", eventName, params);
    }
  }

  const current = baseQuestions[step] ?? baseQuestions[0];
  const selected = answers[step];
  const isMeasurement = current.kind === "weight" || current.kind === "height";
  const measurementDone = !!measurementComplete[step];
  const progress = ((step + (isMeasurement ? (measurementDone ? 1 : 0) : selected !== null ? 1 : 0)) / baseQuestions.length) * 100;
  const selectedAnswer = selected == null ? null : (current.answers[selected] ?? null);

  const dominant = useMemo(() => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "autoestima";
  }, [scores]);

  function calculateScores(nextAnswers: (number | null)[]) {
    const nextScores = { autoestima: 0, rotina: 0, corpo: 0, energia: 0 };
    nextAnswers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        const question = baseQuestions[questionIndex];
        const answer = question?.answers[answerIndex];
        if (!answer) return;
        const tag = answer.tag;
        nextScores[tag] += 1;
      }
    });
    return nextScores;
  }

  function finishStep(nextScores = scores) {
    if (step === baseQuestions.length - 1) {
      const finalTag = Object.entries(nextScores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "autoestima";
      setLoading(true);
      setLoadingProgress(0);
      trackQuizEvent("QuizComplete", { total_questions: baseQuestions.length });
      const startedAt = Date.now();
      const interval = window.setInterval(() => {
        const elapsed = Date.now() - startedAt;
        const pct = Math.min(100, (elapsed / 10000) * 100);
        setLoadingProgress(pct);
        if (pct >= 100) {
          window.clearInterval(interval);
          setResult(finalTag);
          setLoading(false);
        }
      }, 100);
    } else {
      setStep((s) => s + 1);
    }
  }

  function choose(index: number) {
    const answer = current.answers[index];
    if (!answer) return;
    const nextAnswers = [...answers];
    nextAnswers[step] = index;
    const nextScores = calculateScores(nextAnswers);
    setAnswers(nextAnswers);
    setScores(nextScores);
    setContext(answer.followUp);
    trackQuizEvent(`QuizQuestion${step + 1}`, { question_number: step + 1, total_questions: baseQuestions.length });
    window.setTimeout(() => finishStep(nextScores), 220);
  }

  function confirmMeasurement() {
    if (!isMeasurement) return;
    setMeasurementComplete((prev) => ({ ...prev, [step]: true }));
    trackQuizEvent(current.kind === "weight" ? "QuizWeight" : "QuizHeight", {
      question_number: step + 1,
      value: current.kind === "weight" ? weight : height,
      unit: current.unit || ""
    });
    window.setTimeout(() => finishStep(scores), 220);
  }

  function goBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
    setContext("");
  }

  function restart() {
    setStarted(false);
    setStep(0);
    setAnswers(Array(baseQuestions.length).fill(null));
    setScores({ autoestima: 0, rotina: 0, corpo: 0, energia: 0 });
    setResult(null);
    setOffer(false);
    setContext("");
    setWeight(70);
    setHeight(170);
    setMeasurementComplete({});
    setLoading(false);
    setLoadingProgress(0);
  }

  if (loading) {
    return (
      <main className="fit-app fit-loading">
        <div className="fit-loading-card">
          <div className="fit-loading-spinner" aria-hidden="true" />
          <div className="fit-kicker">ANALISANDO SUAS RESPOSTAS</div>
          <h1>Montando seu<br /><em>resultado...</em></h1>
          <p>Estamos organizando suas respostas para preparar uma recomendação mais alinhada ao seu perfil.</p>
          <div className="fit-loading-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(loadingProgress)}>
            <div style={{ width: loadingProgress + "%" }} />
          </div>
          <div className="fit-loading-percent">{Math.round(loadingProgress)}%</div>
          <small>Isso leva alguns segundos. Não feche esta página.</small>
        </div>
      </main>
    );
  }


  if (purchased) {
    const trainingDays: Array<{ title: string; focus: string; time: string; exercises: Array<[string, string, string]> }> = [
      { title: "Começo com energia", focus: "Corpo inteiro", time: "12 min", exercises: [["Agachamento", "3 x 10", "30s"], ["Marcha parada", "3 x 30s", "20s"], ["Ponte de glúteos", "3 x 12", "30s"]] },
      { title: "Pernas em movimento", focus: "Pernas e glúteos", time: "14 min", exercises: [["Agachamento sumô", "3 x 10", "30s"], ["Elevação de panturrilha", "3 x 15", "20s"], ["Passo alternado", "3 x 8", "30s"]] },
      { title: "Centro forte", focus: "Abdômen e estabilidade", time: "11 min", exercises: [["Prancha", "3 x 20s", "30s"], ["Dead bug", "3 x 8", "25s"], ["Bird dog", "3 x 8", "25s"]] },
      { title: "Parte superior", focus: "Braços e tronco", time: "13 min", exercises: [["Flexão na parede", "3 x 10", "30s"], ["Elevação de braços", "3 x 12", "20s"], ["Marcha com braços", "3 x 30s", "20s"]] },
      { title: "Corpo inteiro", focus: "Força e movimento", time: "15 min", exercises: [["Agachamento", "3 x 12", "30s"], ["Ponte de glúteos", "3 x 12", "30s"], ["Marcha com joelhos altos", "3 x 30s", "20s"]] },
      { title: "Ritmo leve", focus: "Movimento e constância", time: "10 min", exercises: [["Passo lateral", "3 x 30s", "20s"], ["Panturrilha", "3 x 15", "20s"], ["Marcha parada", "3 x 40s", "20s"]] },
      { title: "Fechamento da semana", focus: "Corpo inteiro", time: "16 min", exercises: [["Agachamento com braços", "3 x 10", "30s"], ["Bird dog", "3 x 8", "25s"], ["Ponte de glúteos", "3 x 12", "30s"]] }
    ];
    const day = trainingDays[activeDay];
    if (!day) return null;
    const completedCount = Object.values(completedExercises).filter(Boolean).length;
    const goProduct = (product: "treino" | "dieta" | "contador" | "chat") => {
      setActiveProduct(product);
      setMenuOpen(false);
    };
    return (
      <main className="training-app">
        <header className="training-topbar">
          <div className="training-header-left">
            <button className="training-menu-btn" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>⋯</button>
            <button className="training-logo-btn" type="button" onClick={() => goProduct("treino")}><div className="training-logo">Virada<span>FIT</span></div></button>
          </div>
          <div className="training-top-status">PROGRAMA <strong>7 DIAS</strong></div>
        </header>

        {menuOpen && (
          <>
            <button className="training-menu-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
            <aside className="training-side-menu">
              <div className="side-menu-head"><strong>ViradaFIT</strong><button type="button" onClick={() => setMenuOpen(false)}>×</button></div>
              <button className={`side-menu-item ${activeProduct === "treino" ? "active" : ""}`} onClick={() => goProduct("treino")}><span>🏃</span><div><b>Treino</b><small>Programa completo de 7 dias</small></div></button>
              <button className={`side-menu-item ${activeProduct === "dieta" ? "active" : ""}`} onClick={() => goProduct("dieta")}><span>🥗</span><div><b>Dieta</b><small>Plano alimentar organizado</small></div></button>
              <button className={`side-menu-item ${activeProduct === "contador" ? "active" : ""}`} onClick={() => goProduct("contador")}><span>◉</span><div><b>Dieta + Contador</b><small>Plano + contador de calorias</small></div></button>
              <button className={`side-menu-item ${activeProduct === "chat" ? "active" : ""}`} onClick={() => goProduct("chat")}><span>💬</span><div><b>Chat Global</b><small>Espaço para dúvidas e comunidade</small></div></button>
            </aside>
          </>
        )}

        {activeProduct === "treino" ? (
          <>
            <section className="training-hero">
              <div><div className="training-kicker">ACESSO LIBERADO • SEU PROGRAMA</div><h1>Seu treino está<br /><em>pronto para começar.</em></h1><p>Bem-vinda ao seu programa de 7 dias. Clique em qualquer exercício para abrir as informações completas, séries, repetições, descanso e instruções.</p></div>
              <div className="training-progress-ring"><strong>{completedCount}</strong><span>concluídos</span></div>
            </section>
            <section className="training-days">
              <div className="training-section-head"><div><span>SUA SEMANA</span><h2>7 dias para seguir</h2></div><small>Comece pelo Dia 1</small></div>
              <div className="training-day-grid">{trainingDays.map((item,index)=><button key={item.title} className={`training-day ${activeDay===index?"active":""}`} onClick={()=>setActiveDay(index)}><span className="day-number">DIA {String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><small>{item.focus} • {item.time}</small></button>)}</div>
            </section>
            <section className="training-routine">
              <div className="training-routine-head"><div><span>DIA {String(activeDay+1).padStart(2,"0")} • {day.focus.toUpperCase()}</span><h2>{day.title}</h2><p>Clique no exercício para ver os detalhes.</p></div><div className="routine-progress"><strong>{day.time}</strong><small>tempo estimado</small></div></div>
              <div className="exercise-grid">{day.exercises.map(([name,reps,rest])=>{const key=`${activeDay}-${name}`;const done=!!completedExercises[key];return <button key={key} className={`exercise-card ${done?"done":""}`} onClick={()=>setSelectedExercise({name,reps,rest})}><div className="exercise-duration-clock"><span className="clock-label">EXERCÍCIO</span><span className="clock-breakdown">{reps} • descanso {rest}</span><svg className="duration-clock-svg" viewBox="0 0 120 120" aria-hidden="true"><circle className="clock-face" cx="60" cy="60" r="50"/><circle className="clock-inner" cx="60" cy="60" r="43"/>{[0,30,60,90,120,150,180,210,240,270,300,330].map(angle=>{const r=Math.PI*angle/180;return <line key={angle} className="clock-mark" x1={60+Math.cos(r)*44} y1={60+Math.sin(r)*44} x2={60+Math.cos(r)*48} y2={60+Math.sin(r)*48}/>})}<line className="clock-minute-hand" x1="60" y1="60" x2="60" y2="27"/><line className="clock-second-hand" x1="60" y1="60" x2="82" y2="72"/><circle className="clock-center" cx="60" cy="60" r="4"/><text className="clock-duration" x="60" y="84" textAnchor="middle">{reps.replace(" x ","×")}</text></svg></div><div className="exercise-info"><span>{done?"CONCLUÍDO ✓":"SEU EXERCÍCIO"}</span><h3>{name}</h3><p>Clique para ver execução e orientações.</p><div className="exercise-stats"><b>{reps}</b><b>Descanso {rest}</b></div></div></button>})}</div>
              <div className="exercise-notes"><label>ANOTAÇÕES DO TREINO</label><textarea placeholder="Escreva aqui como foi o treino, dificuldades ou observações..." /><small>Suas anotações ficam nesta tela enquanto você estiver nela.</small></div>
            </section>
          </>
        ) : (
          <section className="feature-page">
            <div className="feature-page-kicker">SEU PRODUTO</div>
            <h1>{activeProduct==="dieta"?"Dieta":activeProduct==="contador"?"Dieta + Contador":"Chat Global"} <em>liberado</em></h1>
            <p>{activeProduct==="dieta"?"Seu plano alimentar organizado para acompanhar durante a semana.":activeProduct==="contador"?"Registre alimentos e acompanhe seu consumo ao longo do dia.":"Espaço para dúvidas, acompanhamento e troca de experiências."}</p>
            {activeProduct==="dieta" && <div className="diet-content-card"><h2>Seu plano alimentar</h2><div className="diet-meal"><b>CAFÉ DA MANHÃ</b><span>Opção simples e equilibrada para começar o dia.</span></div><div className="diet-meal"><b>ALMOÇO</b><span>Proteína + acompanhamento + vegetais, conforme sua rotina.</span></div><div className="diet-meal"><b>LANCHE</b><span>Uma opção prática para manter a rotina.</span></div><div className="diet-meal"><b>JANTAR</b><span>Uma refeição leve e organizada.</span></div></div>}
            {activeProduct==="contador" && <div className="diet-content-card"><h2>Contador de calorias</h2><div className="food-input-grid"><input placeholder="Alimento" /><input placeholder="Quantidade" /><select defaultValue="g"><option value="g">g</option><option value="ml">ml</option><option value="un">un</option></select><button className="training-main-btn" type="button">Adicionar</button></div><div className="food-list"><div className="food-empty">Adicione um alimento para começar.</div></div><div className="food-total"><span>TOTAL DO DIA</span><strong>0 kcal</strong></div></div>}
            {activeProduct==="chat" && <div className="feature-coming-card"><span>💬</span><h2>Chat Global</h2><p>Área de comunidade e suporte. Esta versão de visualização está liberada para você revisar o entregável.</p><button className="training-main-btn" type="button">COMEÇAR CONVERSA</button></div>}
          </section>
        )}

        {selectedExercise && (
          <div className="exercise-modal" role="dialog" aria-modal="true">
            <div className="exercise-modal-card">
              <button className="modal-close" type="button" aria-label="Fechar" onClick={()=>setSelectedExercise(null)}>×</button>
              <div className="exercise-duration-clock"><span className="clock-label">DETALHES DO EXERCÍCIO</span><span className="clock-breakdown">{selectedExercise.reps} • descanso {selectedExercise.rest}</span><svg className="duration-clock-svg" viewBox="0 0 120 120" aria-hidden="true"><circle className="clock-face" cx="60" cy="60" r="50"/><circle className="clock-inner" cx="60" cy="60" r="43"/><line className="clock-minute-hand" x1="60" y1="60" x2="60" y2="27"/><line className="clock-second-hand" x1="60" y1="60" x2="82" y2="72"/><circle className="clock-center" cx="60" cy="60" r="4"/><text className="clock-duration" x="60" y="84" textAnchor="middle">{selectedExercise.reps.replace(" x ","×")}</text></svg></div>
              <div className="modal-kicker">COMO FAZER</div><h2>{selectedExercise.name}</h2>
              <div className="modal-stats"><span><b>{selectedExercise.reps.split(" x ")[0]}</b>séries</span><span><b>{selectedExercise.reps.split(" x ")[1]}</b>repetições</span><span><b>{selectedExercise.rest}</b>descanso</span></div>
              <h4>PASSO A PASSO</h4><ol><li>Posicione-se com postura confortável e estável.</li><li>Execute o movimento de forma controlada, sem pressa.</li><li>Respire durante o movimento e respeite o descanso indicado.</li></ol>
              <h4>ORIENTAÇÃO</h4><div className="modal-tip">Se sentir dor, interrompa o exercício. A proposta é aprender o movimento e manter uma rotina sustentável.</div>
              <button className={`complete-btn ${completedExercises[`${activeDay}-${selectedExercise.name}`]?"completed":""}`} type="button" onClick={()=>{const key=`${activeDay}-${selectedExercise.name}`;setCompletedExercises(prev=>({...prev,[key]:!prev[key]}));setSelectedExercise(null)}}>{completedExercises[`${activeDay}-${selectedExercise.name}`]?"MARCAR COMO NÃO CONCLUÍDO":"MARCAR COMO CONCLUÍDO"} </button>
            </div>
          </div>
        )}
        <p className="training-note">Modo de visualização ativado: esta tela simula o conteúdo liberado após a compra para você revisar o entregável.</p>
      </main>
    );
  }

  if (offer) {
    return (
      <main className="fit-app fit-offer">
        <div className="fit-offer-card">
          <div className="fit-kicker">SEU PRÓXIMO PASSO</div>
          <h1>Comece a cuidar de você<br /><em>do seu jeito.</em></h1>
          <p>Por apenas <strong>R$ 27,99</strong>, tenha acesso a um guia de exercícios práticos para ajudar você a construir uma rotina ativa e chegar ao verão se sentindo mais confiante.</p>
          <div className="fit-price"><s>R$ 49,90</s><strong>R$ 27,99</strong><span>acesso ao guia</span></div>
          <div className="fit-benefits">
            <span>✓ Exercícios organizados por objetivo</span><span>✓ Rotinas simples para começar</span><span>✓ Guia para acompanhar sua evolução</span><span>✓ Acesso imediato ao material</span>
          </div>
          <button
            className="fit-primary"
            type="button"
            onClick={() => { window.location.href = "/treino"; }}
          >VER MEU TREINO <span>→</span></button>
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
          <div className="fit-start-content">
            <div className="fit-kicker">SEU MOMENTO • 12 PERGUNTAS</div>
            <h1>Você está cansada de ir aos eventos e não se sentir <em>do jeito que gostaria?</em></h1>
            <p>Descubra a sua rotina ideal a partir de um mini quiz interativo</p>
            <button type="button" className="fit-primary fit-start-button" onPointerUp={(event) => { event.preventDefault(); event.currentTarget.blur(); setStarted(true);
                trackQuizEvent("QuizStart", { total_questions: baseQuestions.length });
              }}>COMEÇAR MEU QUIZ <span>→</span></button>
            <div className="fit-trust"><span>12 perguntas</span><i>•</i><span>26+ exercícios</span><i>•</i><span>7 dias de treino</span></div>
            <div className="fit-conversion">
              <div className="fit-conversion-block">
                <strong>Com isso você vai receber</strong>
                <span>✓ <b>26+ exercícios</b> para variar sua rotina</span>
                <span>✓ Treinos organizados para acompanhar por 7 dias</span>
                <span>✓ Séries, repetições, descanso e orientações</span>
                <span>✓ Uma rotina prática para não perder tempo decidindo o que fazer</span>
              </div>
              <div className="fit-conversion-block">
                <strong>Por que fazer o quiz?</strong>
                <span>① Você responde 12 perguntas rápidas</span>
                <span>② Suas respostas ajudam a direcionar a experiência</span>
                <span>③ Você conhece a proposta antes de decidir</span>
                <span>④ Depois, pode acessar o programa e começar no seu ritmo</span>
              </div>
              <div className="fit-value-grid">
                <div><b>26+</b><span>exercícios</span></div>
                <div><b>7</b><span>dias de treino</span></div>
                <div><b>12</b><span>perguntas</span></div>
                <div><b>100%</b><span>guiado</span></div>
              </div>
              <div className="fit-proof">
                <strong>Você não precisa montar seu treino do zero</strong>
                <p>Em vez de ficar procurando exercícios, séries e repetições, você recebe uma estrutura pronta para seguir durante a semana.</p>
              </div>
              <div className="fit-faq">
                <strong>Antes de começar</strong>
                <details><summary>Preciso saber treinar?</summary><p>Não. A proposta é justamente deixar o caminho mais simples, com exercícios e orientações organizados.</p></details>
                <details><summary>Quanto tempo leva o quiz?</summary><p>São 12 perguntas rápidas e você avança automaticamente a cada resposta.</p></details>
                <details><summary>Posso voltar uma pergunta?</summary><p>Sim. Use o botão “Voltar” para revisar ou alterar uma resposta.</p></details>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fit-app fit-quiz">
      <header className="fit-header"><div className="fit-brand">ViradaFIT</div><div className="fit-count">{String(step + 1).padStart(2, "0")} / 12</div></header>
      <div className="fit-progress"><div style={{ width: progress + "%" }} /></div>
      <section className="fit-question-card">
        <div className="fit-question-kicker">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
        <h2>{current.question}</h2>
        <p className="fit-subtitle">{step > 0 ? current.subtitle + " " + context : current.subtitle}</p>
        {isMeasurement ? (
          <div className="fit-measurement">
            <div className="fit-measurement-value">
              <div>
                <span>{current.kind === "weight" ? "PESO" : "ALTURA"}</span>
                <strong>{current.kind === "weight" ? weight : height}</strong>
                <small>{current.unit}</small>
              </div>
              <input
                aria-label={current.kind === "weight" ? "Peso em quilogramas" : "Altura em centímetros"}
                type="number"
                min={current.min}
                max={current.max}
                step="1"
                value={current.kind === "weight" ? weight : height}
                onChange={(event) => {
                  const raw = Number(event.target.value);
                  const safe = Number.isFinite(raw) ? Math.max(current.min || 0, Math.min(current.max || 250, raw)) : 0;
                  if (current.kind === "weight") setWeight(safe);
                  else setHeight(safe);
                }}
              />
            </div>
            <input
              className="fit-measurement-slider"
              aria-label={current.kind === "weight" ? "Selecionar peso" : "Selecionar altura"}
              type="range"
              min={current.min}
              max={current.max}
              step="1"
              value={current.kind === "weight" ? weight : height}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (current.kind === "weight") setWeight(value);
                else setHeight(value);
              }}
            />
            <div className="fit-measurement-scale"><span>0 {current.unit}</span><span>{current.max} {current.unit}</span></div>
            <button className="fit-measurement-confirm" type="button" onClick={confirmMeasurement}>
              {measurementDone ? "VALOR CONFIRMADO ✓" : "CONTINUAR"} <span>→</span>
            </button>
          </div>
        ) : (
          <>
            <div className="fit-answers">
              {current.answers.map((answer, i) => (
                <button key={answer.text} className={selected === i ? "selected" : ""} onClick={() => choose(i)}>
                  <span>{String.fromCharCode(65 + i)}</span>{answer.text}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <div className="fit-answer-confirmation">
                Resposta registrada. Avançando automaticamente...
              </div>
            )}
          </>
        )}
        <div className="fit-footer">
          <button className="fit-back" type="button" disabled={step === 0} onClick={goBack}>← Voltar</button>
          <small>{isMeasurement ? "Arraste ou digite o valor exato no quadrinho." : selected === null ? "Escolha uma alternativa para avançar automaticamente." : "Avançando para a próxima pergunta..."}</small>
        </div>
      </section>
    </main>
  );
}
