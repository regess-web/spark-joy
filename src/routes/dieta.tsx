import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import "../diet-quiz.css";

export const Route = createFileRoute("/dieta")({
  head: () => ({
    meta: [
      { title: "Quiz de Dieta | ViradaFIT" },
      { name: "description", content: "Descubra um plano alimentar de 7 dias alinhado à sua rotina." },
      { property: "og:title", content: "Quiz de Dieta | ViradaFIT" },
      { property: "og:description", content: "Descubra um plano alimentar de 7 dias alinhado à sua rotina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DietQuiz,
});

type PlanId = "equilibrada" | "proteica" | "pratica" | "economica";
type Answer = { text: string; tags: Partial<Record<PlanId, number>> };
type Question = { question: string; subtitle: string; answers: Answer[] };



type Day = {
  title: string;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
};

type DietPlan = {
  id: PlanId;
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  days: Day[];
};

const questions: [Question, ...Question[]] = [
  {
    question: "Qual é o seu principal objetivo agora?",
    subtitle: "Escolha o resultado que mais combina com o momento em que você está.",
    answers: [
      { text: "Emagrecer com uma rotina sustentável", tags: { equilibrada: 2, pratica: 1 } },
      { text: "Sentir mais saciedade e preservar massa muscular", tags: { proteica: 3 } },
      { text: "Comer melhor sem passar muito tempo na cozinha", tags: { pratica: 3 } },
      { text: "Gastar pouco e ainda comer bem", tags: { economica: 3 } }
    ]
  },
  {
    question: "Como é seu nível de atividade durante a semana?",
    subtitle: "Pense em trabalho, escola, treino, caminhada e outras atividades.",
    answers: [
      { text: "Pouco ativo(a)", tags: { equilibrada: 2, pratica: 1 } },
      { text: "Ativo(a) algumas vezes por semana", tags: { equilibrada: 1, proteica: 2 } },
      { text: "Treino 3 a 5 vezes por semana", tags: { proteica: 3 } },
      { text: "Muito ativo(a) ou treino quase todos os dias", tags: { proteica: 2, pratica: 1 } }
    ]
  },
  {
    question: "Quantas refeições você prefere fazer por dia?",
    subtitle: "Não existe um número obrigatório. A ideia é escolher uma estrutura que você consiga manter.",
    answers: [
      { text: "3 refeições principais", tags: { pratica: 2, economica: 1 } },
      { text: "3 refeições + 1 lanche", tags: { equilibrada: 2 } },
      { text: "3 refeições + 2 lanches", tags: { proteica: 2, equilibrada: 1 } },
      { text: "Prefiro comer quando tenho fome, sem horários rígidos", tags: { pratica: 2, economica: 1 } }
    ]
  },
  {
    question: "Quanto tempo você costuma ter para preparar comida?",
    subtitle: "Escolha pensando na sua rotina real, não na rotina ideal.",
    answers: [
      { text: "Quase nenhum tempo", tags: { pratica: 4 } },
      { text: "Até 20 minutos", tags: { pratica: 2, economica: 1 } },
      { text: "20 a 40 minutos", tags: { equilibrada: 2, economica: 1 } },
      { text: "Tenho tempo para cozinhar e organizar marmitas", tags: { economica: 2, proteica: 1 } }
    ]
  },
  {
    question: "Qual estilo de alimentação parece mais fácil para você seguir?",
    subtitle: "Aqui a dieta começa a ficar com a sua cara.",
    answers: [
      { text: "Comida caseira e equilibrada", tags: { equilibrada: 3 } },
      { text: "Mais proteína em todas as refeições", tags: { proteica: 3 } },
      { text: "Receitas rápidas e poucos ingredientes", tags: { pratica: 3 } },
      { text: "Ingredientes baratos e fáceis de encontrar", tags: { economica: 3 } }
    ]
  },
  {
    question: "Qual dessas opções você mais gostaria de ter no cardápio?",
    subtitle: "Escolha a opção que mais combina com o que você gostaria de comer.",
    answers: [
      { text: "Arroz, feijão, carne e salada", tags: { equilibrada: 2, economica: 2 } },
      { text: "Ovos, frango, carne, peixe e iogurte", tags: { proteica: 3 } },
      { text: "Sanduíches, tapioca, omelete e bowls rápidos", tags: { pratica: 3 } },
      { text: "Arroz, feijão, ovos, sardinha e frango", tags: { economica: 3 } }
    ]
  },
  {
    question: "Qual é a sua maior dificuldade para manter uma alimentação melhor?",
    subtitle: "Pense no que mais costuma fazer você sair do plano.",
    answers: [
      { text: "Falta de organização", tags: { pratica: 3 } },
      { text: "Fome ou pouca saciedade", tags: { proteica: 3 } },
      { text: "Enjoar de comer sempre as mesmas coisas", tags: { equilibrada: 3 } },
      { text: "O preço dos alimentos", tags: { economica: 3 } }
    ]
  },
  {
    question: "Qual rotina de alimentação você conseguiria manter por uma semana?",
    subtitle: "A melhor estrutura é aquela que cabe de verdade na sua rotina.",
    answers: [
      { text: "Um cardápio variado e simples", tags: { equilibrada: 3 } },
      { text: "Refeições com bastante proteína e boa saciedade", tags: { proteica: 3 } },
      { text: "Poucas receitas e preparo rápido", tags: { pratica: 3 } },
      { text: "Alimentos básicos e econômicos", tags: { economica: 3 } }
    ]
  }
]
const plans: Record<PlanId, DietPlan> = {
  equilibrada: {
    id: "equilibrada",
    eyebrow: "PLANO 01 • EQUILÍBRIO",
    title: "Dieta Equilibrada",
    description: "Uma semana com comida caseira, variedade e uma estrutura simples de repetir.",
    note: "Ajuste as porções ao seu apetite e rotina. Priorize água, verduras e frutas e evite transformar o plano em uma regra rígida.",
    days: [
      { title: "Dia 01", breakfast: "2 ovos mexidos + tapioca com queijo branco + café sem açúcar", lunch: "Arroz + feijão + frango grelhado + salada variada", snack: "Iogurte natural + banana + aveia", dinner: "Omelete de legumes + batata cozida + salada" },
      { title: "Dia 02", breakfast: "Cuscuz + 2 ovos + queijo branco + café", lunch: "Arroz + feijão + carne moída + legumes", snack: "Maçã + iogurte natural", dinner: "Frango desfiado + mandioca + salada" },
      { title: "Dia 03", breakfast: "Pão integral + ovos mexidos + fruta", lunch: "Arroz + feijão + peixe + salada", snack: "Banana com aveia e canela", dinner: "Tapioca recheada com frango e queijo + tomate" },
      { title: "Dia 04", breakfast: "Cuscuz + ovos + fruta", lunch: "Arroz + feijão + frango + cenoura e tomate", snack: "Iogurte + fruta", dinner: "Omelete de frango e legumes + batata" },
      { title: "Dia 05", breakfast: "Tapioca com ovo e queijo + café", lunch: "Arroz + feijão + carne bovina + salada", snack: "Banana + aveia + iogurte", dinner: "Sopa de legumes com frango desfiado + pão" },
      { title: "Dia 06", breakfast: "Pão integral + 2 ovos + mamão", lunch: "Arroz + feijão + sardinha + salada", snack: "Fruta + iogurte", dinner: "Cuscuz com frango desfiado + legumes" },
      { title: "Dia 07", breakfast: "Cuscuz + ovos + queijo + café", lunch: "Arroz + feijão + frango assado + salada", snack: "Banana + aveia", dinner: "Omelete com legumes + mandioca cozida" }
    ]
  },
  proteica: {
    id: "proteica",
    eyebrow: "PLANO 02 • SACIEDADE",
    title: "Dieta Proteica",
    description: "Mais presença de fontes de proteína ao longo do dia, combinadas com carboidratos e vegetais.",
    note: "Proteína não precisa significar comer apenas carne. O cardápio alterna ovos, frango, peixe, carne, leite e iogurte.",
    days: [
      { title: "Dia 01", breakfast: "3 ovos mexidos + cuscuz + iogurte natural", lunch: "Frango grelhado + arroz + feijão + salada", snack: "Iogurte + banana + aveia", dinner: "Omelete de 3 ovos com frango + legumes" },
      { title: "Dia 02", breakfast: "Omelete + pão integral + fruta", lunch: "Carne moída + arroz + feijão + salada", snack: "Iogurte + fruta", dinner: "Atum ou sardinha + batata + salada" },
      { title: "Dia 03", breakfast: "Cuscuz + 3 ovos + queijo branco", lunch: "Frango desfiado + arroz + feijão + legumes", snack: "Leite ou iogurte + banana + aveia", dinner: "Tapioca com frango + queijo + tomate" },
      { title: "Dia 04", breakfast: "2 ovos + iogurte + fruta + aveia", lunch: "Peixe + arroz + feijão + salada", snack: "2 ovos cozidos + fruta", dinner: "Frango grelhado + mandioca + legumes" },
      { title: "Dia 05", breakfast: "Omelete de 3 ovos + cuscuz", lunch: "Carne bovina + arroz + feijão + salada", snack: "Iogurte + aveia + fruta", dinner: "Ovos mexidos + frango desfiado + legumes" },
      { title: "Dia 06", breakfast: "Pão integral + ovos + queijo + café", lunch: "Frango assado + arroz + feijão + salada", snack: "Iogurte + banana", dinner: "Sardinha + batata + legumes" },
      { title: "Dia 07", breakfast: "Cuscuz + 3 ovos + fruta", lunch: "Frango + arroz + feijão + salada", snack: "Iogurte + aveia + fruta", dinner: "Omelete de frango + mandioca + salada" }
    ]
  },
  pratica: {
    id: "pratica",
    eyebrow: "PLANO 03 • SEM COMPLICAÇÃO",
    title: "Dieta Prática",
    description: "Refeições rápidas, com poucos ingredientes e opções que funcionam em dias corridos.",
    note: "Use alimentos prontos de boa qualidade quando necessário. Congelar porções e deixar ovos cozidos, arroz e frango preparados facilita bastante.",
    days: [
      { title: "Dia 01", breakfast: "Iogurte natural + banana + aveia", lunch: "Frango pronto + arroz + feijão + salada", snack: "Sanduíche de pão integral + queijo", dinner: "Omelete de 2–3 ovos + tomate + pão" },
      { title: "Dia 02", breakfast: "Tapioca com ovos + café", lunch: "Arroz + feijão + carne moída + salada pronta", snack: "Fruta + iogurte", dinner: "Wrap ou pão com frango desfiado e salada" },
      { title: "Dia 03", breakfast: "Cuscuz + ovos", lunch: "Marmita de arroz, feijão e frango", snack: "Banana + aveia", dinner: "Tapioca de frango + queijo" },
      { title: "Dia 04", breakfast: "Pão + ovos + fruta", lunch: "Arroz + feijão + sardinha + tomate", snack: "Iogurte + fruta", dinner: "Omelete rápida + pão integral" },
      { title: "Dia 05", breakfast: "Iogurte + aveia + banana", lunch: "Frango + arroz + feijão + legumes congelados", snack: "Sanduíche de queijo + fruta", dinner: "Cuscuz + ovos + tomate" },
      { title: "Dia 06", breakfast: "Tapioca + ovos + café", lunch: "Arroz + feijão + carne moída", snack: "Iogurte + banana", dinner: "Sanduíche de frango + salada" },
      { title: "Dia 07", breakfast: "Cuscuz + ovos + fruta", lunch: "Frango + arroz + feijão + salada", snack: "Fruta + iogurte", dinner: "Omelete + batata cozida" }
    ]
  },
  economica: {
    id: "economica",
    eyebrow: "PLANO 04 • CUSTO INTELIGENTE",
    title: "Dieta Econômica",
    description: "Uma semana baseada em alimentos acessíveis, versáteis e fáceis de encontrar no mercado.",
    note: "Compare preços e compre alimentos da estação. Ovos, feijão, arroz, sardinha, frango e legumes podem formar uma base econômica.",
    days: [
      { title: "Dia 01", breakfast: "Cuscuz + 2 ovos + café", lunch: "Arroz + feijão + frango + cenoura", snack: "Banana + aveia", dinner: "Omelete + mandioca" },
      { title: "Dia 02", breakfast: "Pão + ovos + banana", lunch: "Arroz + feijão + carne moída + repolho", snack: "Mamão + aveia", dinner: "Cuscuz + sardinha + tomate" },
      { title: "Dia 03", breakfast: "Cuscuz + ovos", lunch: "Arroz + feijão + frango + abóbora", snack: "Banana + aveia", dinner: "Ovos mexidos + batata + salada" },
      { title: "Dia 04", breakfast: "Pão + ovos + café", lunch: "Arroz + feijão + sardinha + cenoura", snack: "Fruta da estação", dinner: "Cuscuz + frango desfiado" },
      { title: "Dia 05", breakfast: "Cuscuz + ovos + fruta", lunch: "Arroz + feijão + frango + repolho", snack: "Banana + aveia", dinner: "Omelete + mandioca + tomate" },
      { title: "Dia 06", breakfast: "Pão + ovos + café", lunch: "Arroz + feijão + carne moída + abóbora", snack: "Mamão + aveia", dinner: "Cuscuz + sardinha + salada" },
      { title: "Dia 07", breakfast: "Cuscuz + 2 ovos + fruta", lunch: "Arroz + feijão + frango + legumes", snack: "Banana + aveia", dinner: "Omelete + batata + salada" }
    ]
  }
};

function choosePlan(scores: Record<PlanId, number>): PlanId {
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "equilibrada") as PlanId;
}

function DietQuiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const advanceTimer = useRef<number | null>(null);
  const [scores, setScores] = useState<Record<PlanId, number>>({
    equilibrada: 0,
    proteica: 0,
    pratica: 0,
    economica: 0
  });
  const [result, setResult] = useState<PlanId | null>(null);
  const [openDay, setOpenDay] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const current = questions[step] ?? questions[0];
  const progress = ((step + (selected !== null ? 1 : 0)) / questions.length) * 100;
  const resultPlan = useMemo(() => (result ? plans[result] : null), [result]);

  function applyAnswer(answerIndex: number) {
    const answer = current.answers[answerIndex];
    if (!answer) return;
    const nextScores = { ...scores };
    (Object.keys(nextScores) as PlanId[]).forEach((id) => {
      nextScores[id] += answer.tags[id] ?? 0;
    });
    setScores(nextScores);
    setAnswers((prev) => [...prev.slice(0, step), answerIndex]);

    if (step === questions.length - 1) {
      setResult(choosePlan(nextScores));
      setOpenDay(0);
    } else {
      setStep((value) => value + 1);
      setSelected(null);
    }
  }

  function selectAnswer(index: number) {
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    setSelected(index);
    advanceTimer.current = window.setTimeout(() => applyAnswer(index), 220);
  }

  function goBack() {
    if (step === 0) return;
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    const previousIndex = answers[step - 1];
    const previousAnswer = questions[step - 1]?.answers[previousIndex];
    if (previousAnswer) {
      const nextScores = { ...scores };
      (Object.keys(nextScores) as PlanId[]).forEach((id) => {
        nextScores[id] -= previousAnswer.tags[id] ?? 0;
      });
      setScores(nextScores);
    }
    setAnswers((prev) => prev.slice(0, step - 1));
    setStep((value) => value - 1);
    setSelected(previousIndex ?? null);
  }

  function restart() {
    setStarted(false);
    setStep(0);
    setSelected(null);
    setAnswers([]);
    if (advanceTimer.current !== null) window.clearTimeout(advanceTimer.current);
    setResult(null);
    setOpenDay(0);
    setScores({ equilibrada: 0, proteica: 0, pratica: 0, economica: 0 });
  }

  if (result && resultPlan) {
    return (
      <main className="fit-app fit-diet-result">
        <button className="diet-result-menu-btn" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>⋮</button>
        {menuOpen && <>
          <button className="diet-result-menu-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
          <aside className="diet-result-side-menu">
            <div className="side-menu-head"><strong>ViradaFIT</strong><button aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>×</button></div>
            <button onClick={() => { window.location.href = "/treino"; }}>Treino</button>
            <button onClick={() => { setMenuOpen(false); restart(); }}>Dieta</button>
            <button onClick={() => { window.location.href = "/treino"; }}>Contador</button>
          </aside>
        </>}
        <div className="diet-result-shell">
          <div className="fit-kicker">SEU PLANO PERSONALIZADO</div>
          <div className="fit-result-icon">✓</div>
          <p className="fit-overline">PELAS SUAS RESPOSTAS...</p>
          <h1>{resultPlan.title}</h1>
          <p className="fit-result-text">{resultPlan.description}</p>
          <div className="diet-result-badge"><strong>4</strong><span>opções de dieta<br />analisadas no quiz</span></div>
          <div className="diet-scroll-plan">
            <div className="diet-plan-intro">
              <span>{resultPlan.eyebrow}</span>
              <h2>Seu cardápio de 7 dias</h2>
              <p>Role para baixo e acompanhe o que comer em cada dia. Toque em um dia para abrir ou fechar as refeições.</p>
            </div>
            {resultPlan.days.map((day, index) => (
              <article className={"diet-day-card " + (openDay === index ? "open" : "")} key={day.title}>
                <button className="diet-day-header" onClick={() => setOpenDay(openDay === index ? -1 : index)}>
                  <div><span>{day.title}</span><strong>{index === 0 ? "Comece por aqui" : index === 6 ? "Fechando a semana" : "Continue sua rotina"}</strong></div>
                  <b>{openDay === index ? "−" : "+"}</b>
                </button>
                {openDay === index && <div className="diet-day-meals">
                  <div><span>CAFÉ DA MANHÃ</span><p>{day.breakfast}</p></div>
                  <div><span>ALMOÇO</span><p>{day.lunch}</p></div>
                  <div><span>LANCHE</span><p>{day.snack}</p></div>
                  <div><span>JANTAR</span><p>{day.dinner}</p></div>
                </div>}
              </article>
            ))}
            <div className="diet-plan-note"><strong>Como usar</strong><p>{resultPlan.note}</p></div>
          </div>
          <button className="fit-secondary diet-refazer-btn" onClick={restart}>Refazer quiz</button>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="fit-app fit-start">
        <div className="fit-start-card">
          <div className="fit-kicker">VIRADAFIT • 8 PERGUNTAS</div>
          <h1>Descubra uma dieta que combina com <em>sua rotina.</em></h1>
          <p>Responda algumas perguntas sobre seu peso, objetivo, rotina e preferências. No final, você recebe uma das 4 estruturas de dieta e um cardápio vertical de 7 dias.</p>
          <button type="button" className="fit-primary fit-start-button" onClick={() => setStarted(true)}>COMEÇAR MEU QUIZ <span>→</span></button>
          <div className="fit-trust"><span>8 perguntas</span><i>•</i><span>4 perfis de dieta</span><i>•</i><span>7 dias</span></div>
        </div>
      </main>
    );
  }

  return (
    <main className="fit-app fit-quiz">
      <button className="diet-result-menu-btn diet-quiz-menu-btn" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>⋮</button>
      {menuOpen && <>
        <button className="diet-result-menu-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
        <aside className="diet-result-side-menu">
          <div className="side-menu-head"><strong>ViradaFIT</strong><button aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>×</button></div>
          <button onClick={() => { window.location.href = "/treino"; }}>Treino</button>
          <button onClick={() => setMenuOpen(false)}>Dieta</button>
          <button onClick={() => { window.location.href = "/treino"; }}>Contador</button>
        </aside>
      </>}
      <header className="fit-header"><div className="fit-brand">ViradaFIT</div><div className="fit-count">{String(step + 1).padStart(2, "0")} / 08</div></header>
      <div className="fit-progress"><div style={{ width: progress + "%" }} /></div>
      <section className="fit-question-card">
        <div className="fit-question-kicker">PERGUNTA {String(step + 1).padStart(2, "0")}</div>
        <h2>{current.question}</h2>
        <p className="fit-subtitle">{current.subtitle}</p>
        <div className="fit-answers">
          {current.answers.map((answer, index) => (
            <button key={answer.text} className={selected === index ? "selected" : ""} onClick={() => selectAnswer(index)}>
              <span>{String.fromCharCode(65 + index)}</span>{answer.text}
            </button>
          ))}
        </div>
        <div className="fit-footer">
          <button className="diet-back-btn" type="button" disabled={step === 0} onClick={goBack}>← VOLTAR</button>
          <small>{selected === null ? "Escolha uma alternativa para continuar." : "Resposta selecionada. Avançando..."}</small>
          <span className="diet-auto-next" aria-hidden="true">→</span>
        </div>
      </section>
    </main>
  );
}
