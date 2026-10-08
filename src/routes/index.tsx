import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Método Leve | Sua Rotina de Treino" },
      { name: "description", content: "Responda ao quiz e encontre uma rotina de treino adequada ao seu momento." },
      { property: "og:title", content: "Método Leve | Sua Rotina de Treino" },
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
  image?: string;
};

const baseQuestions: [QuizQuestion, ...QuizQuestion[]] = [
{question:"Qual faixa de idade representa melhor você?",subtitle:"Escolha a pessoa que mais se parece com a sua fase de vida.",image:"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",answers:[
{text:"18 a 24 anos",tag:"corpo",recommendation:"Vamos buscar uma rotina dinâmica e simples.",followUp:"Agora vamos entender seu principal objetivo."},{text:"25 a 34 anos",tag:"corpo",recommendation:"Vamos equilibrar resultado e praticidade.",followUp:"Agora vamos entender seu principal objetivo."},{text:"35 a 44 anos",tag:"rotina",recommendation:"Vamos priorizar uma rotina que caiba na vida real.",followUp:"Agora vamos entender seu principal objetivo."},{text:"45 anos ou mais",tag:"energia",recommendation:"Vamos priorizar progressão e constância.",followUp:"Agora vamos entender seu principal objetivo."}]},
{question:"O que você mais gostaria de mudar no seu corpo hoje?",subtitle:"Escolha o resultado que mais representa o que você procura.",image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Diminuir medidas e perder gordura",tag:"corpo",recommendation:"Vamos priorizar uma rotina prática e progressiva.",followUp:"Agora vamos entender o que mais atrapalha você."},{text:"Definir e tonificar meu corpo",tag:"corpo",recommendation:"Vamos combinar força e uma rotina sustentável.",followUp:"Agora vamos entender o que mais atrapalha você."},{text:"Me sentir mais confiante comigo mesma",tag:"autoestima",recommendation:"Vamos focar em pequenas vitórias e constância.",followUp:"Agora vamos entender o que mais atrapalha você."},{text:"Ter mais disposição e condicionamento",tag:"energia",recommendation:"Vamos buscar uma rotina que coloque você em movimento.",followUp:"Agora vamos entender o que mais atrapalha você."}]},
{question:"Qual dessas situações mais parece com você?",subtitle:"A ideia é encontrar uma rotina que funcione na sua vida real.",image:"https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Começo motivada e depois paro",tag:"rotina",recommendation:"Seu plano precisa reduzir a fricção e criar pequenas vitórias.",followUp:"Vamos descobrir o principal obstáculo."},{text:"Não tenho tempo para treinos longos",tag:"rotina",recommendation:"Sessões curtas podem ser mais realistas para você.",followUp:"Vamos descobrir o principal obstáculo."},{text:"Não sei exatamente o que fazer",tag:"corpo",recommendation:"Uma sequência pronta elimina a dúvida sobre o treino.",followUp:"Vamos descobrir o principal obstáculo."},{text:"Não consigo manter uma rotina",tag:"rotina",recommendation:"A prioridade será tornar o programa simples de repetir.",followUp:"Vamos descobrir o principal obstáculo."}]},
{question:"O que mais dificulta sua evolução atualmente?",subtitle:"Escolha o obstáculo que mais aparece no seu dia a dia.",image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Falta de tempo",tag:"rotina",recommendation:"Vamos priorizar treinos enxutos.",followUp:"Agora vamos definir seu tempo disponível."},{text:"Falta de constância",tag:"rotina",recommendation:"Vamos diminuir a complexidade e trabalhar com uma sequência clara.",followUp:"Agora vamos definir seu tempo disponível."},{text:"Não saber qual treino fazer",tag:"corpo",recommendation:"Vamos organizar exercícios, séries e descanso.",followUp:"Agora vamos definir seu tempo disponível."},{text:"Desânimo depois de algumas tentativas",tag:"autoestima",recommendation:"Vamos trabalhar com metas pequenas e progresso visível.",followUp:"Agora vamos definir seu tempo disponível."}]},
{question:"Quanto tempo você conseguiria reservar por dia?",subtitle:"Escolha o tempo que você realmente conseguiria repetir.",image:"https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Até 15 minutos",tag:"rotina",recommendation:"Uma rotina curta reduz a barreira para começar.",followUp:"Agora vamos descobrir onde você prefere treinar."},{text:"15 a 30 minutos",tag:"corpo",recommendation:"Esse intervalo permite uma rotina equilibrada.",followUp:"Agora vamos descobrir onde você prefere treinar."},{text:"30 a 45 minutos",tag:"energia",recommendation:"Com mais tempo, podemos combinar diferentes estímulos.",followUp:"Agora vamos descobrir onde você prefere treinar."},{text:"Depende do dia",tag:"rotina",recommendation:"Flexibilidade será importante para não perder a sequência.",followUp:"Agora vamos descobrir onde você prefere treinar."}]},
{question:"Onde você teria mais facilidade para treinar?",subtitle:"Escolha o ambiente em que você realmente conseguiria manter o programa.",image:"https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Em casa, sem equipamentos",tag:"rotina",recommendation:"Vamos priorizar exercícios simples e acessíveis.",followUp:"Agora vamos entender sua motivação."},{text:"Na academia",tag:"corpo",recommendation:"Podemos aproveitar equipamentos e organizar uma rotina completa.",followUp:"Agora vamos entender sua motivação."},{text:"Em casa e na academia",tag:"energia",recommendation:"Uma rotina flexível pode funcionar melhor.",followUp:"Agora vamos entender sua motivação."},{text:"Ainda não sei",tag:"autoestima",recommendation:"Vamos começar pelo caminho mais simples e guiado.",followUp:"Agora vamos entender sua motivação."}]},
{question:"O que você gostaria de sentir quando perceber sua evolução?",subtitle:"Pense no sentimento que faria você perceber que valeu a pena.",image:"https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Mais confiança nas minhas roupas",tag:"autoestima",recommendation:"Vamos conectar pequenas ações a uma evolução acompanhável.",followUp:"Agora vamos entender o que faria você continuar."},{text:"Mais satisfeita quando me olho no espelho",tag:"autoestima",recommendation:"A constância será mais importante do que fazer tudo de uma vez.",followUp:"Agora vamos entender o que faria você continuar."},{text:"Mais disposta no dia a dia",tag:"energia",recommendation:"Vamos priorizar uma rotina progressiva e sustentável.",followUp:"Agora vamos entender o que faria você continuar."},{text:"Orgulhosa por manter uma rotina",tag:"rotina",recommendation:"Seu plano deve ser claro, simples e fácil de acompanhar.",followUp:"Agora vamos entender o que faria você continuar."}]},
{question:"O que faria você ter mais chances de completar os próximos 7 dias?",subtitle:"Escolha o que mais ajudaria você a não depender só da motivação.",image:"https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Saber exatamente o que fazer em cada dia",tag:"rotina",recommendation:"Uma sequência pronta reduz decisões.",followUp:"Vamos fazer mais uma pergunta importante."},{text:"Treinos curtos e objetivos",tag:"rotina",recommendation:"Uma barreira menor facilita começar.",followUp:"Vamos fazer mais uma pergunta importante."},{text:"Exercícios explicados de forma simples",tag:"corpo",recommendation:"Instruções claras deixam tudo mais guiado.",followUp:"Vamos fazer mais uma pergunta importante."},{text:"Acompanhar cada treino concluído",tag:"autoestima",recommendation:"Marcar pequenas vitórias ajuda a transformar intenção em hábito.",followUp:"Vamos fazer mais uma pergunta importante."}]},
{question:"Qual frase mais combina com o seu momento?",subtitle:"Escolha sem pensar demais. A primeira que fizer sentido costuma ser a melhor.",image:"https://images.unsplash.com/photo-1517964603305-11c0f6f66012?auto=format&fit=crop&w=900&q=85",answers:[
{text:"Quero voltar a cuidar de mim",tag:"autoestima",recommendation:"Vamos começar com algo simples e possível.",followUp:"Agora só faltam suas medidas."},{text:"Quero finalmente criar constância",tag:"rotina",recommendation:"Vamos estruturar uma sequência fácil de repetir.",followUp:"Agora só faltam suas medidas."},{text:"Quero ver mudanças no meu corpo",tag:"corpo",recommendation:"Vamos organizar uma rotina clara para você seguir.",followUp:"Agora só faltam suas medidas."},{text:"Quero ter mais disposição",tag:"energia",recommendation:"Vamos priorizar movimento e progressão.",followUp:"Agora só faltam suas medidas."}]},
{question:"Qual é o seu peso atual?",subtitle:"Arraste ou digite o valor. Essa informação ajuda a personalizar sua experiência.",image:"https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=85",answers:[],kind:"weight",min:30,max:250,unit:"kg"},
{question:"Qual é a sua altura?",subtitle:"Arraste ou digite o valor exato para finalizar seu perfil.",image:"https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=85",answers:[],kind:"height",min:120,max:220,unit:"cm"},
];

const resultCopy = {
  autoestima: { title: "Seu perfil pede uma rotina que você consiga manter.", text: "Pelas suas respostas, confiança e constância parecem andar juntas. O melhor ponto de partida é uma sequência simples, com pequenas vitórias e progresso que você consiga acompanhar." },
  rotina: { title: "Seu perfil pede praticidade e constância.", text: "Suas respostas mostram que o maior desafio é encaixar o cuidado com o corpo na vida real. Por isso, a recomendação é uma rotina objetiva, organizada e fácil de repetir." },
  corpo: { title: "Seu perfil pede uma rotina clara e guiada.", text: "Você quer saber exatamente o que fazer para evoluir. A recomendação é uma sequência organizada com exercícios, séries, repetições e descanso definidos." },
  energia: { title: "Seu perfil pede mais movimento no dia a dia.", text: "Suas respostas mostram que disposição e condicionamento são importantes para você. A recomendação é uma rotina progressiva, prática e sustentável." }
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
  const [advancing, setAdvancing] = useState(false);
  const advanceTimer = useRef<number | null>(null);

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
    if (advancing) return;
    const answer = current.answers[index];
    if (!answer) return;
    const nextAnswers = [...answers];
    nextAnswers[step] = index;
    const nextScores = calculateScores(nextAnswers);
    setAnswers(nextAnswers);
    setScores(nextScores);
    setContext(answer.followUp);
    setAdvancing(true);
    trackQuizEvent("QuizQuestion" + (step + 1), { question_number: step + 1, total_questions: baseQuestions.length });
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      setAdvancing(false);
      finishStep(nextScores);
    }, 380);
  }

  function confirmMeasurement() {
    if (!isMeasurement || advancing) return;
    setMeasurementComplete((prev) => ({ ...prev, [step]: true }));
    setAdvancing(true);
    trackQuizEvent(current.kind === "weight" ? "QuizWeight" : "QuizHeight", { question_number: step + 1, value: current.kind === "weight" ? weight : height, unit: current.unit || "" });
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      setAdvancing(false);
      finishStep(scores);
    }, 380);
  }

  function goBack() {
    if (step === 0 || advancing) return;
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
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setAdvancing(false);
  }

  if (loading) {
    return (
      <main className="fit-app fit-loading">        <div className="fit-loading-card">
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
              <div className="side-menu-head"><strong>Método Leve</strong><button type="button" onClick={() => setMenuOpen(false)}>×</button></div>
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
      <main className="fit-app fit-offer">        <div className="fit-offer-card">
          <div className="fit-kicker">SEU PLANO ESTÁ PRONTO</div>
          <h1>Uma rotina feita para você<br /><em>começar de verdade.</em></h1>
          <p>Com base no seu perfil, você pode liberar um programa de 7 dias com exercícios organizados para não precisar decidir o que fazer a cada dia.</p>
          <div className="fit-price"><s>R$ 49,90</s><strong>R$ 27,99</strong><span>acesso ao guia</span></div>
          <div className="fit-benefits">
            <span>✓ 7 dias organizados passo a passo</span><span>✓ 26+ exercícios para variar a rotina</span><span>✓ Séries, repetições e descansos definidos</span><span>✓ Acompanhamento do que você concluiu</span>
          </div>
          <button
            className="fit-primary"
            type="button"
            onClick={() => { window.location.href = "https://pay.cakto.com.br/34rfhf7_1160901"; }}
          >LIBERAR MEU PLANO <span>→</span></button>
          <small>O material é educativo e não substitui orientação individual de profissional de saúde ou educação física.</small>
        </div>
      </main>
    );
  }

  if (result) {
    const copy = resultCopy[result as keyof typeof resultCopy];
    return (
      <main className="fit-app fit-result">        <div className="fit-result-card">
          <div className="fit-kicker">SEU RESULTADO</div>
          <div className="fit-result-icon">✓</div>
          <p className="fit-overline">SEU PERFIL FOI IDENTIFICADO</p>
          <h1>{copy.title}</h1>
          <p className="fit-result-text">{copy.text}</p>
          <div className="fit-special"><strong>Seu próximo passo:</strong><br />começar com uma rotina organizada para os próximos 7 dias, sem precisar montar o treino do zero.</div>
          <button className="fit-primary" onClick={() => setOffer(true)}>VER MEU PLANO <span>→</span></button>
          <button className="fit-secondary" onClick={restart}>Refazer quiz</button>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="fit-app fit-start">        <div className="fit-start-card">
          <div className="fit-start-content">
            <div className="fit-kicker">SEU MOMENTO • 12 PERGUNTAS</div>
            <h1>Você está cansada de <em>começar e parar?</em></h1>
            <p>Descubra a sua rotina ideal a partir de um mini quiz interativo</p>
            <button type="button" className="fit-primary fit-start-button" onPointerUp={(event) => { event.preventDefault(); event.currentTarget.blur(); setStarted(true);
                trackQuizEvent("QuizStart", { total_questions: baseQuestions.length });
              }}>COMEÇAR MEU QUIZ <span>→</span></button>
            <div className="fit-trust"><span>12 perguntas</span><i>•</i><span>26+ exercícios</span><i>•</i><span>7 dias de rotina</span></div>
            <div className="fit-transformation-showcase">
              <span className="fit-transformation-badge">Evolução • Um passo de cada vez</span>
              <div className="fit-transformation-grid">
                <div className="fit-transformation-item">
                  <div className="fit-transformation-img-wrap">
                    <img src="/images/shape 1.jpg" alt="Antes de iniciar a rotina" loading="eager" decoding="async" />
                  </div>
                  <span className="fit-transformation-label">Antes</span>
                </div>
                <div className="fit-transformation-arrow" aria-label="Evolução da foto 1 para a foto 2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
                <div className="fit-transformation-item">
                  <div className="fit-transformation-img-wrap">
                    <img src="/images/shape 2.jpg" alt="Depois da rotina" loading="eager" decoding="async" />
                  </div>
                  <span className="fit-transformation-label">Depois</span>
                </div>
              </div>
              <div className="fit-transformation-result">Uma rotina para começar e continuar</div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fit-app fit-quiz">        <header className="fit-header"><div className="fit-brand">Método Leve</div><div className="fit-count">{String(step + 1).padStart(2, "0")} / {baseQuestions.length}</div></header>
      <div className="fit-progress"><div style={{ width: progress + "%" }} /></div>
      <section className="fit-question-card">
        <div className="fit-question-kicker">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
        <h2>{current.question}</h2>
        <p className="fit-subtitle">{step > 0 ? current.subtitle + " " + context : current.subtitle}</p>
        {current.image && <div className="fit-question-image"><img src={current.image} alt="" /></div>}
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
            <button className="fit-measurement-confirm" type="button" onClick={confirmMeasurement} disabled={advancing}>
              {measurementDone ? "VALOR CONFIRMADO ✓" : "CONTINUAR"} <span>→</span>
            </button>
          </div>
        ) : (
          <>
            <div className="fit-answers">
              {current.answers.map((answer, i) => (
                <button key={answer.text} className={selected === i ? "selected" : ""} onClick={() => choose(i)} disabled={advancing}>
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
          <button className="fit-back" type="button" disabled={step === 0 || advancing} onClick={goBack}>← Voltar</button>
          <small>{isMeasurement ? "Arraste ou digite o valor exato no quadrinho." : selected === null ? "Escolha uma alternativa para avançar automaticamente." : "Avançando para a próxima pergunta..."}</small>
        </div>
      </section>
    </main>
  );
}
