import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/treino")({ component: TrainingApp });

type Exercise = {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  rest: number;
  tip: string;
  how: string[];
};

type DayPlan = {
  day: number;
  title: string;
  subtitle: string;
  duration: string;
  exercises: Exercise[];
};

const days: DayPlan[] = [
  {
    day: 1,
    title: "Começo com energia",
    subtitle: "Uma rotina de corpo inteiro para começar sem complicar.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento", name:"Agachamento livre", muscle:"Pernas e glúteos", sets:3, reps:"10–12", rest:60, tip:"Mantenha os pés firmes e desça apenas até onde conseguir com conforto.", how:["Pés aproximadamente na largura dos ombros.","Leve o quadril para trás e flexione os joelhos.","Suba empurrando o chão e mantendo o tronco estável."] },
      { id:"ponte", name:"Ponte de glúteos", muscle:"Glúteos", sets:3, reps:"12–15", rest:45, tip:"Evite arquear demais a lombar no topo do movimento.", how:["Deite de costas com os joelhos flexionados.","Apoie os pés no chão e eleve o quadril.","Pause brevemente no alto e desça com controle."] },
      { id:"parede", name:"Flexão na parede", muscle:"Peito e braços", sets:3, reps:"8–12", rest:45, tip:"Quanto mais distante da parede, maior a dificuldade.", how:["Apoie as mãos na parede na altura do peito.","Flexione os cotovelos levando o corpo em direção à parede.","Empurre a parede até voltar à posição inicial."] },
      { id:"marcha", name:"Marcha parada", muscle:"Corpo inteiro", sets:3, reps:"40 s", rest:30, tip:"Mantenha um ritmo confortável e aumente gradualmente.", how:["Fique em pé com postura confortável.","Alterne a elevação dos joelhos.","Balance os braços naturalmente durante o movimento."] }
    ]
  },
  {
    day: 2,
    title: "Pernas em movimento",
    subtitle: "Foco em força e controle, sem precisar de equipamentos.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento-pausa", name:"Agachamento com pausa", muscle:"Pernas e glúteos", sets:3, reps:"8–10", rest:60, tip:"Faça uma pausa curta no ponto mais baixo confortável.", how:["Posicione os pés com estabilidade.","Desça controlando o movimento.","Pause por um instante e suba sem impulsos."] },
      { id:"passo", name:"Passada para trás", muscle:"Pernas e glúteos", sets:3, reps:"8 cada lado", rest:60, tip:"Use uma amplitude confortável e mantenha o joelho alinhado.", how:["Fique em pé e dê um passo para trás.","Flexione os dois joelhos de forma controlada.","Volte à posição inicial e alterne os lados."] },
      { id:"panturrilha", name:"Elevação de panturrilhas", muscle:"Panturrilhas", sets:3, reps:"15", rest:40, tip:"Suba e desça lentamente, sem balançar o corpo.", how:["Fique em pé com apoio próximo se precisar.","Eleve os calcanhares.","Desça devagar até a posição inicial."] }
    ]
  },
  {
    day: 3,
    title: "Centro forte",
    subtitle: "Movimentos simples para trabalhar a região do abdômen e estabilidade.",
    duration: "15–20 min",
    exercises: [
      { id:"dead-bug", name:"Dead bug", muscle:"Core", sets:3, reps:"8 cada lado", rest:45, tip:"Priorize o controle em vez da velocidade.", how:["Deite de costas com braços e pernas elevados.","Estenda braço e perna opostos sem perder o controle do tronco.","Volte e alterne o lado."] },
      { id:"bird-dog", name:"Bird dog", muscle:"Core e costas", sets:3, reps:"8 cada lado", rest:45, tip:"Imagine que há um copo sobre suas costas: tente não deixá-lo cair.", how:["Comece em quatro apoios.","Estenda braço e perna opostos.","Retorne lentamente e troque o lado."] },
      { id:"prancha", name:"Prancha inclinada", muscle:"Core e ombros", sets:3, reps:"20–30 s", rest:45, tip:"Use uma superfície firme e estável para apoiar as mãos.", how:["Apoie as mãos em uma superfície estável.","Afaste os pés e forme uma linha confortável com o corpo.","Contraia suavemente o abdômen e respire."] }
    ]
  },
  {
    day: 4,
    title: "Corpo inteiro",
    subtitle: "Uma sessão curta para movimentar vários grupos musculares.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento-bracos", name:"Agachamento + elevação de braços", muscle:"Pernas e ombros", sets:3, reps:"10", rest:60, tip:"Faça o movimento em um ritmo que permita boa técnica.", how:["Agache confortavelmente.","Ao subir, eleve os braços até uma altura confortável.","Baixe os braços e repita."] },
      { id:"flexao", name:"Flexão inclinada", muscle:"Peito, braços e ombros", sets:3, reps:"8–12", rest:60, tip:"Use uma superfície firme e alta se estiver começando.", how:["Apoie as mãos em uma superfície estável.","Mantenha o corpo alinhado.","Flexione os cotovelos e empurre de volta."] },
      { id:"marcha-alta", name:"Marcha com joelhos altos", muscle:"Corpo inteiro", sets:3, reps:"40 s", rest:40, tip:"A altura dos joelhos deve permitir que você mantenha o controle.", how:["Comece em pé.","Eleve um joelho de cada vez.","Aumente o ritmo somente se continuar confortável."] }
    ]
  },
  {
    day: 5,
    title: "Glúteos e pernas",
    subtitle: "Mais uma sessão de força, respeitando seu ritmo.",
    duration: "20–25 min",
    exercises: [
      { id:"ponte-unilateral", name:"Ponte de glúteos alternada", muscle:"Glúteos", sets:3, reps:"8 cada lado", rest:50, tip:"Se ficar difícil, volte para a ponte tradicional.", how:["Deite de costas e eleve o quadril.","Mantenha uma perna estável enquanto a outra fica levemente elevada.","Alterne com controle."] },
      { id:"sumo", name:"Agachamento sumô", muscle:"Pernas e glúteos", sets:3, reps:"10–12", rest:60, tip:"Mantenha os joelhos acompanhando a direção dos pés.", how:["Afaste um pouco mais os pés e gire levemente as pontas para fora.","Desça mantendo o peito confortável.","Suba sem travar os joelhos."] },
      { id:"panturrilha-2", name:"Panturrilha com pausa", muscle:"Panturrilhas", sets:3, reps:"12–15", rest:40, tip:"Faça uma pausa breve no alto.", how:["Eleve os calcanhares lentamente.","Pause no alto.","Desça com controle."] }
    ]
  },
  {
    day: 6,
    title: "Movimento e disposição",
    subtitle: "Uma sessão leve para manter a consistência.",
    duration: "15–20 min",
    exercises: [
      { id:"step", name:"Step no lugar", muscle:"Pernas e cardio", sets:4, reps:"45 s", rest:30, tip:"Mantenha uma intensidade em que ainda consiga controlar a respiração.", how:["Alterne os pés como se estivesse subindo um degrau baixo.","Use os braços naturalmente.","Mantenha o ritmo confortável."] },
      { id:"parede-2", name:"Flexão na parede", muscle:"Peito e braços", sets:3, reps:"10–15", rest:45, tip:"Ajuste a distância da parede para controlar a dificuldade.", how:["Apoie as mãos na parede.","Aproxime o corpo com controle.","Empurre para retornar."] },
      { id:"ponte-2", name:"Ponte de glúteos", muscle:"Glúteos", sets:3, reps:"15", rest:45, tip:"Movimente o quadril com controle.", how:["Deite de costas com os pés apoiados.","Eleve o quadril.","Desça lentamente."] }
    ]
  },
  {
    day: 7,
    title: "Fechando a semana",
    subtitle: "Uma rotina de corpo inteiro para completar os 7 dias.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento-final", name:"Agachamento", muscle:"Pernas e glúteos", sets:3, reps:"12", rest:60, tip:"Qualidade do movimento antes de aumentar repetições.", how:["Pés firmes e postura confortável.","Desça controlando.","Suba mantendo o equilíbrio."] },
      { id:"bird-dog-final", name:"Bird dog", muscle:"Core e costas", sets:3, reps:"10 cada lado", rest:45, tip:"Mantenha o tronco estável.", how:["Comece em quatro apoios.","Estenda braço e perna opostos.","Volte e alterne."] },
      { id:"marcha-final", name:"Marcha moderada", muscle:"Corpo inteiro", sets:4, reps:"45 s", rest:30, tip:"Finalize em um ritmo sustentável.", how:["Comece devagar.","Aumente o ritmo gradualmente.","Reduza o ritmo no último minuto."] }
    ]
  }
];

function parseDurationSeconds(reps: string, sets: number, rest: number) {
  const value = Number((reps.match(/\d+(?:[.,]\d+)?/)?.[0] ?? "0").replace(",", "."));
  const isTimed = /s$/.test(reps.trim());
  const isEachSide = /cada lado/i.test(reps);
  const repetitionsPerSet = isTimed ? 0 : value * (isEachSide ? 2 : 1);
  const workPerSet = isTimed ? value : repetitionsPerSet * 2.5;
  return Math.round(workPerSet * sets + rest * Math.max(0, sets - 1));
}

function formatExerciseDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return minutes > 0 ? minutes + ":" + String(secs).padStart(2, "0") : "0:" + String(secs).padStart(2, "0");
}

function DurationClock({ exercise }: { exercise: Exercise }) {
  const total = parseDurationSeconds(exercise.reps, exercise.sets, exercise.rest);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  const minuteAngle = (minutes % 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="exercise-duration-clock" aria-label={"Tempo total estimado: " + formatExerciseDuration(total)}>
      <svg viewBox="0 0 180 180" className="duration-clock-svg" role="img" aria-hidden="true">
        <circle cx="90" cy="90" r="72" className="clock-face" />
        <circle cx="90" cy="90" r="64" className="clock-inner" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = i * 30;
          const rad = (angle - 90) * Math.PI / 180;
          const x1 = 90 + Math.cos(rad) * 60;
          const y1 = 90 + Math.sin(rad) * 60;
          const x2 = 90 + Math.cos(rad) * 66;
          const y2 = 90 + Math.sin(rad) * 66;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="clock-mark" />;
        })}
        <g transform={"rotate(" + minuteAngle + " 90 90)"}>
          <line x1="90" y1="90" x2="90" y2="39" className="clock-minute-hand" />
        </g>
        <g transform={"rotate(" + secondAngle + " 90 90)"}>
          <line x1="90" y1="90" x2="90" y2="27" className="clock-second-hand" />
        </g>
        <circle cx="90" cy="90" r="5" className="clock-center" />
        <text x="90" y="116" textAnchor="middle" className="clock-duration">{formatExerciseDuration(total)}</text>
      </svg>
      <div className="clock-label">TEMPO TOTAL</div>
      <div className="clock-breakdown">{exercise.sets} séries • {exercise.rest}s de descanso</div>
    </div>
  );
}

function TrainingApp() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [now, setNow] = useState(Date.now());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"treino" | "chat" | "dieta">("treino");
  const [dietMode, setDietMode] = useState<"dieta" | "contador">("contador");
  const [foodName, setFoodName] = useState("");
  const [foodAmount, setFoodAmount] = useState("");
  const [foodUnit, setFoodUnit] = useState<"g" | "un">("g");
  const [foodItems, setFoodItems] = useState<Array<{name:string; amount:number; unit:string; calories:number}>>([]);
  const [showDietOffer, setShowDietOffer] = useState(false);
  const [showHomeUpgrade, setShowHomeUpgrade] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("viva-training-start");
    const done = localStorage.getItem("viva-training-completed");
    const savedNotes = localStorage.getItem("viva-training-notes");
    if (saved) setStartedAt(Number(saved));
    if (done) setCompleted(JSON.parse(done));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  function startProgram() {
    const now = Date.now();
    localStorage.setItem("viva-training-start", String(now));
    setStartedAt(now);
  }

  const unlockedDay = useMemo(() => {
    if (!startedAt) return 1;
    const elapsed = Math.floor((now - startedAt) / 86400000);
    return Math.min(7, elapsed + 1);
  }, [startedAt, now]);

  const currentDay = days[selectedDay - 1];
  const progress = Math.round((completed.filter(id => id.startsWith("d" + selectedDay + "-")).length / currentDay.exercises.length) * 100);

  function formatRemaining(ms: number) {
    const safe = Math.max(0, ms);
    const h = Math.floor(safe / 3600000);
    const m = Math.floor((safe % 3600000) / 60000);
    const s = Math.floor((safe % 60000) / 1000);
    return String(h).padStart(2,"0") + ":" + String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }

  function saveNote(id: string, value: string) {
    const key = "d" + selectedDay + "-" + id;
    const next = { ...notes, [key]: value };
    setNotes(next);
    localStorage.setItem("viva-training-notes", JSON.stringify(next));
  }

  function markComplete(id: string) {
    const key = "d" + selectedDay + "-" + id;
    const next = completed.includes(key) ? completed.filter(x => x !== key) : [...completed, key];
    setCompleted(next);
    localStorage.setItem("viva-training-completed", JSON.stringify(next));
  }

  function openSection(section: "treino" | "chat" | "dieta") { setActiveSection(section); setMenuOpen(false); }
  function addFood() {
    setShowDietOffer(true);
  }
  function openHomeUpgrade() {
    setShowHomeUpgrade(true);
    setMenuOpen(false);
  }
  const foodTotal = foodItems.reduce((sum, item) => sum + item.calories, 0);

  if (!startedAt) {
    return (
      <main className="training-app training-welcome">
        <section className="training-welcome-card">
          <div className="training-logo">ViradaFIT</div>
          <div className="training-kicker">SEU PROGRAMA DE 7 DIAS</div>
          <h1>Uma semana para colocar <em>você</em> em movimento.</h1>
          <p>As rotinas foram organizadas em pequenas sessões para você acompanhar um dia de cada vez. O próximo dia fica disponível após 24 horas.</p>
          <div className="training-preview"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span></div>
          <button className="training-main-btn" onClick={startProgram}>COMEÇAR MEU DIA 1 <b>→</b></button>
          <small>Faça os movimentos dentro do seu nível de conforto e pare se sentir dor, tontura ou mal-estar.</small>
        </section>
      </main>
    );
  }

  return (
    <main className="training-app">
      <header className="training-topbar">
        <div className="training-header-left"><button className="training-menu-btn" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>☰</button><button className="training-logo training-logo-btn" onClick={() => openSection("treino")}>ViradaFIT</button></div>
        <div className="training-top-status">SEMANA 1 <strong>{unlockedDay}/7</strong></div>
      </header>
      {menuOpen && <><button className="training-menu-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} /><aside className="training-side-menu"><div className="side-menu-head"><strong>ViradaFIT</strong><button onClick={() => setMenuOpen(false)}>×</button></div>
        <button className="side-menu-item" onClick={openHomeUpgrade}><span className="minimal-menu-icon minimal-home-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M9 20v-6h6v6"/></svg></span><div><b>Upgrade de treino</b><small>Treino completo em casa • R$ 11,99</small></div></button>
        <button className={activeSection === "chat" ? "side-menu-item active" : "side-menu-item"} onClick={() => openSection("chat")}><span className="minimal-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 5h14v10H9l-4 4z"/></svg></span><div><b>Chat global</b><small>R$ 4,90/mês</small></div></button>
        <button className={activeSection === "dieta" ? "side-menu-item active" : "side-menu-item"} onClick={() => openSection("dieta")}><span className="minimal-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 5c2 2 2 4 2 6a3 3 0 0 1-6 0c0-2 2-4 4-6z"/><path d="M7 11v9M14 5v15M14 5c4 0 6 2 6 5s-2 5-6 5"/></svg></span><div><b>Dieta + contador</b><small>Dieta R$ 7,90 • completo R$ 12,90</small></div></button>
      </aside></>}
      {activeSection === "treino" ? (
        <>
          <section className="training-days">
            <div className="training-section-head"><div><span>JORNADA</span><h2>Seu calendário</h2></div><small>{unlockedDay < 7 ? "Próximo dia em " + formatRemaining((startedAt ?? now) + unlockedDay * 86400000 - now) : "Semana completa"}</small></div>
            <div className="training-day-grid">
              {days.map(day => {
                const locked = day.day > unlockedDay;
                const active = day.day === selectedDay;
                return <button key={day.day} disabled={locked} className={"training-day " + (active ? "active " : "") + (locked ? "locked" : "")} onClick={() => setSelectedDay(day.day)}>
                  <span className="day-number">DIA {String(day.day).padStart(2, "0")}</span>
                  <strong>{day.title}</strong>
                  <small>{locked ? "🔒 Libera depois" : day.duration}</small>
                </button>;
              })}
            </div>
          </section>

          <section className="training-routine">
            <div className="training-routine-head">
              <div><span>DIA {String(currentDay.day).padStart(2, "0")}</span><h2>{currentDay.title}</h2><p>{currentDay.subtitle}</p></div>
              <div className="routine-progress"><strong>{progress}%</strong><small>concluído</small></div>
            </div>
            <div className="exercise-grid">
              {currentDay.exercises.map((exercise, index) => {
                const done = completed.includes("d" + selectedDay + "-" + exercise.id);
                return <button key={exercise.id} className={"exercise-card " + (done ? "done" : "")} onClick={() => setSelectedExercise(exercise)}>
                  <DurationClock exercise={exercise} />
                  <div className="exercise-info">
                    <span>EXERCÍCIO {String(index + 1).padStart(2, "0")}</span>
                    <h3>{exercise.name}</h3>
                    <p>{exercise.muscle}</p>
                    <div className="exercise-stats"><b>{exercise.sets} séries</b><b>{exercise.reps} reps</b><b>{exercise.rest}s descanso</b></div>
                  </div>
                  <i>{done ? "✓" : "→"}</i>
                </button>;
              })}
            </div>
          </section>
        </>
      ) : activeSection === "chat" ? (
        <section className="feature-page">
          <div className="feature-page-kicker">COMUNIDADE VIRADAFIT</div>
          <h1>Chat <em>global.</em></h1>
          <p>Converse, troque experiências e acompanhe outras pessoas na jornada.</p>
          <div className="feature-coming-card">
            <span>💬</span><h2>Comunidade</h2>
            <p>Acesso por assinatura de <strong>R$ 4,90/mês</strong>.</p>
            <button className="training-main-btn">ASSINAR • R$ 4,90/MÊS →</button>
          </div>
        </section>
      ) : (
        <section className="feature-page diet-page">
          <div className="feature-page-kicker">NUTRIÇÃO VIRADAFIT</div>
          <h1>Dieta que acompanha <em>sua rotina.</em></h1>
          <p>Escolha a dieta simples ou a versão com contador de calorias.</p>
          <div className="diet-plans">
            <button className={dietMode === "dieta" ? "diet-plan active" : "diet-plan"} onClick={() => setDietMode("dieta")}><span>DIETA</span><strong>R$ 7,90</strong><small>Plano alimentar organizado.</small></button>
            <button className={dietMode === "contador" ? "diet-plan active" : "diet-plan"} onClick={() => setDietMode("contador")}><span>DIETA + CONTADOR</span><strong>R$ 12,90</strong><small>Dieta + contador diário.</small></button>
          </div>
          {dietMode === "dieta" ? (
            <div className="diet-content-card">
              <h2>Seu plano alimentar</h2>
              <div className="diet-meal"><b>CAFÉ DA MANHÃ</b><span>Proteína + fruta + acompanhamento.</span></div>
              <div className="diet-meal"><b>ALMOÇO</b><span>Proteína + carboidrato + vegetais.</span></div>
              <div className="diet-meal"><b>LANCHE</b><span>Uma opção simples e prática.</span></div>
              <div className="diet-meal"><b>JANTAR</b><span>Uma refeição equilibrada.</span></div>
              <button className="training-main-btn">LIBERAR DIETA • R$ 7,90 →</button>
            </div>
          ) : (
            <div className="diet-content-card calorie-card">
              <h2>Contador de calorias</h2>
              <p className="calorie-disclaimer">Estimativas podem variar conforme marca, preparo e porção.</p>
              <div className="food-input-grid">
                <input value={foodName} onChange={e => setFoodName(e.target.value)} placeholder="Alimento" />
                <input value={foodAmount} onChange={e => setFoodAmount(e.target.value)} inputMode="decimal" placeholder="Quantidade" />
                <select value={foodUnit} onChange={e => setFoodUnit(e.target.value as "g" | "un")}><option value="g">g</option><option value="un">un.</option></select>
                <button className="training-main-btn" onClick={addFood}>+ ADICIONAR ALIMENTO</button>
              </div>
              <div className="food-list">{foodItems.length === 0 ? <div className="food-empty">Adicione um alimento para começar.</div> : foodItems.map((item,index) => <div className="food-row" key={index}><span>{item.name}</span><small>{item.amount} {item.unit}</small><b>{item.calories} kcal</b></div>)}</div>
              <div className="food-total"><span>TOTAL</span><strong>{foodTotal} kcal</strong></div>
              <button className="training-main-btn">LIBERAR DIETA + CONTADOR • R$ 12,90 →</button>
            </div>
          )}
        </section>
      )}

      {showHomeUpgrade && (
        <div className="diet-offer-overlay" role="dialog" aria-modal="true" aria-labelledby="home-upgrade-title" onClick={() => setShowHomeUpgrade(false)}>
          <div className="diet-offer-modal home-upgrade-modal" onClick={e => e.stopPropagation()}>
            <button className="diet-offer-close" aria-label="Fechar oferta" onClick={() => setShowHomeUpgrade(false)}>×</button>
            <div className="diet-offer-icon">🏠</div>
            <div className="feature-page-kicker">UPGRADE VIRADAFIT</div>
            <h2 id="home-upgrade-title">Evolua seu treino em casa</h2>
            <p>Libere um <strong>treino completo em casa</strong>, com uma rotina mais completa para continuar evoluindo sem precisar de academia.</p>
            <div className="diet-offer-price"><small>ACESSO COMPLETO</small><strong>R$ 11,99</strong></div>
            <button className="training-main-btn diet-offer-cta">EVOLUIR MEU TREINO • R$ 11,99 →</button>
            <button className="diet-offer-later" onClick={() => setShowHomeUpgrade(false)}>Agora não</button>
          </div>
        </div>
      )}
      {showDietOffer && (
        <div className="diet-offer-overlay" role="dialog" aria-modal="true" aria-labelledby="diet-offer-title" onClick={() => setShowDietOffer(false)}>
          <div className="diet-offer-modal" onClick={e => e.stopPropagation()}>
            <button className="diet-offer-close" aria-label="Fechar oferta" onClick={() => setShowDietOffer(false)}>×</button>
            <div className="diet-offer-icon">🥗</div>
            <div className="feature-page-kicker">DIETA + CONTADOR</div>
            <h2 id="diet-offer-title">Libere seu contador de calorias</h2>
            <p>Para adicionar alimentos e acompanhar seu total diário, você precisa do plano completo <strong>Dieta + Contador</strong>.</p>
            <div className="diet-offer-price"><small>ACESSO COMPLETO</small><strong>R$ 12,90</strong></div>
            <button className="training-main-btn diet-offer-cta">COMPRAR DIETA + CONTADOR →</button>
            <button className="diet-offer-later" onClick={() => setShowDietOffer(false)}>Agora não</button>
          </div>
        </div>
      )}

      <footer className="training-note">Material educativo de bem-estar. Adapte a intensidade ao seu nível e procure orientação profissional quando necessário.</footer>

      {selectedExercise && (
        <div className="exercise-modal" role="dialog" aria-modal="true" onClick={() => setSelectedExercise(null)}>
          <div className="exercise-modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedExercise(null)}>×</button>
            <DurationClock exercise={selectedExercise} />
            <div className="modal-kicker">{selectedExercise.muscle}</div>
            <h2>{selectedExercise.name}</h2>
            <div className="modal-stats"><span><b>{selectedExercise.sets}</b> séries</span><span><b>{selectedExercise.reps}</b> repetições</span><span><b>{selectedExercise.rest}s</b> descanso</span></div>
            <h4>COMO FAZER</h4>
            <ol>{selectedExercise.how.map(step => <li key={step}>{step}</li>)}</ol>
            <div className="modal-tip">💡 {selectedExercise.tip}</div>
            <button className={"complete-btn " + (completed.includes("d" + selectedDay + "-" + selectedExercise.id) ? "completed" : "")} onClick={() => markComplete(selectedExercise.id)}>
              {completed.includes("d" + selectedDay + "-" + selectedExercise.id) ? "EXERCÍCIO CONCLUÍDO ✓" : "MARCAR COMO CONCLUÍDO"}
            </button>
            <div className="exercise-notes">
              <label htmlFor={"note-" + selectedExercise.id}>MINHAS NOTAS</label>
              <textarea
                id={"note-" + selectedExercise.id}
                value={notes["d" + selectedDay + "-" + selectedExercise.id] ?? ""}
                onChange={e => saveNote(selectedExercise.id, e.target.value)}
                maxLength={500}
                placeholder="Anote como foi o exercício, cargas, repetições ou como você se sentiu..."
                rows={3}
              />
              <small>{(notes["d" + selectedDay + "-" + selectedExercise.id] ?? "").length}/500</small>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
