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
  visual: string;
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
      { id:"agachamento", name:"Agachamento livre", muscle:"Pernas e glúteos", sets:3, reps:"10–12", rest:60, tip:"Mantenha os pés firmes e desça apenas até onde conseguir com conforto.", how:["Pés aproximadamente na largura dos ombros.","Leve o quadril para trás e flexione os joelhos.","Suba empurrando o chão e mantendo o tronco estável."], visual:"agachamento" },
      { id:"ponte", name:"Ponte de glúteos", muscle:"Glúteos", sets:3, reps:"12–15", rest:45, tip:"Evite arquear demais a lombar no topo do movimento.", how:["Deite de costas com os joelhos flexionados.","Apoie os pés no chão e eleve o quadril.","Pause brevemente no alto e desça com controle."], visual:"ponte" },
      { id:"parede", name:"Flexão na parede", muscle:"Peito e braços", sets:3, reps:"8–12", rest:45, tip:"Quanto mais distante da parede, maior a dificuldade.", how:["Apoie as mãos na parede na altura do peito.","Flexione os cotovelos levando o corpo em direção à parede.","Empurre a parede até voltar à posição inicial."], visual:"parede" },
      { id:"marcha", name:"Marcha parada", muscle:"Corpo inteiro", sets:3, reps:"40 s", rest:30, tip:"Mantenha um ritmo confortável e aumente gradualmente.", how:["Fique em pé com postura confortável.","Alterne a elevação dos joelhos.","Balance os braços naturalmente durante o movimento."], visual:"marcha" }
    ]
  },
  {
    day: 2,
    title: "Pernas em movimento",
    subtitle: "Foco em força e controle, sem precisar de equipamentos.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento-pausa", name:"Agachamento com pausa", muscle:"Pernas e glúteos", sets:3, reps:"8–10", rest:60, tip:"Faça uma pausa curta no ponto mais baixo confortável.", how:["Posicione os pés com estabilidade.","Desça controlando o movimento.","Pause por um instante e suba sem impulsos."], visual:"agachamento" },
      { id:"passo", name:"Passada para trás", muscle:"Pernas e glúteos", sets:3, reps:"8 cada lado", rest:60, tip:"Use uma amplitude confortável e mantenha o joelho alinhado.", how:["Fique em pé e dê um passo para trás.","Flexione os dois joelhos de forma controlada.","Volte à posição inicial e alterne os lados."], visual:"passo" },
      { id:"panturrilha", name:"Elevação de panturrilhas", muscle:"Panturrilhas", sets:3, reps:"15", rest:40, tip:"Suba e desça lentamente, sem balançar o corpo.", how:["Fique em pé com apoio próximo se precisar.","Eleve os calcanhares.","Desça devagar até a posição inicial."], visual:"panturrilha" }
    ]
  },
  {
    day: 3,
    title: "Centro forte",
    subtitle: "Movimentos simples para trabalhar a região do abdômen e estabilidade.",
    duration: "15–20 min",
    exercises: [
      { id:"dead-bug", name:"Dead bug", muscle:"Core", sets:3, reps:"8 cada lado", rest:45, tip:"Priorize o controle em vez da velocidade.", how:["Deite de costas com braços e pernas elevados.","Estenda braço e perna opostos sem perder o controle do tronco.","Volte e alterne o lado."], visual:"core" },
      { id:"bird-dog", name:"Bird dog", muscle:"Core e costas", sets:3, reps:"8 cada lado", rest:45, tip:"Imagine que há um copo sobre suas costas: tente não deixá-lo cair.", how:["Comece em quatro apoios.","Estenda braço e perna opostos.","Retorne lentamente e troque o lado."], visual:"core" },
      { id:"prancha", name:"Prancha inclinada", muscle:"Core e ombros", sets:3, reps:"20–30 s", rest:45, tip:"Use uma superfície firme e estável para apoiar as mãos.", how:["Apoie as mãos em uma superfície estável.","Afaste os pés e forme uma linha confortável com o corpo.","Contraia suavemente o abdômen e respire."], visual:"prancha" }
    ]
  },
  {
    day: 4,
    title: "Corpo inteiro",
    subtitle: "Uma sessão curta para movimentar vários grupos musculares.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento-bracos", name:"Agachamento + elevação de braços", muscle:"Pernas e ombros", sets:3, reps:"10", rest:60, tip:"Faça o movimento em um ritmo que permita boa técnica.", how:["Agache confortavelmente.","Ao subir, eleve os braços até uma altura confortável.","Baixe os braços e repita."], visual:"agachamento" },
      { id:"flexao", name:"Flexão inclinada", muscle:"Peito, braços e ombros", sets:3, reps:"8–12", rest:60, tip:"Use uma superfície firme e alta se estiver começando.", how:["Apoie as mãos em uma superfície estável.","Mantenha o corpo alinhado.","Flexione os cotovelos e empurre de volta."], visual:"parede" },
      { id:"marcha-alta", name:"Marcha com joelhos altos", muscle:"Corpo inteiro", sets:3, reps:"40 s", rest:40, tip:"A altura dos joelhos deve permitir que você mantenha o controle.", how:["Comece em pé.","Eleve um joelho de cada vez.","Aumente o ritmo somente se continuar confortável."], visual:"marcha" }
    ]
  },
  {
    day: 5,
    title: "Glúteos e pernas",
    subtitle: "Mais uma sessão de força, respeitando seu ritmo.",
    duration: "20–25 min",
    exercises: [
      { id:"ponte-unilateral", name:"Ponte de glúteos alternada", muscle:"Glúteos", sets:3, reps:"8 cada lado", rest:50, tip:"Se ficar difícil, volte para a ponte tradicional.", how:["Deite de costas e eleve o quadril.","Mantenha uma perna estável enquanto a outra fica levemente elevada.","Alterne com controle."], visual:"ponte" },
      { id:"sumo", name:"Agachamento sumô", muscle:"Pernas e glúteos", sets:3, reps:"10–12", rest:60, tip:"Mantenha os joelhos acompanhando a direção dos pés.", how:["Afaste um pouco mais os pés e gire levemente as pontas para fora.","Desça mantendo o peito confortável.","Suba sem travar os joelhos."], visual:"agachamento" },
      { id:"panturrilha-2", name:"Panturrilha com pausa", muscle:"Panturrilhas", sets:3, reps:"12–15", rest:40, tip:"Faça uma pausa breve no alto.", how:["Eleve os calcanhares lentamente.","Pause no alto.","Desça com controle."], visual:"panturrilha" }
    ]
  },
  {
    day: 6,
    title: "Movimento e disposição",
    subtitle: "Uma sessão leve para manter a consistência.",
    duration: "15–20 min",
    exercises: [
      { id:"step", name:"Step no lugar", muscle:"Pernas e cardio", sets:4, reps:"45 s", rest:30, tip:"Mantenha uma intensidade em que ainda consiga controlar a respiração.", how:["Alterne os pés como se estivesse subindo um degrau baixo.","Use os braços naturalmente.","Mantenha o ritmo confortável."], visual:"marcha" },
      { id:"parede-2", name:"Flexão na parede", muscle:"Peito e braços", sets:3, reps:"10–15", rest:45, tip:"Ajuste a distância da parede para controlar a dificuldade.", how:["Apoie as mãos na parede.","Aproxime o corpo com controle.","Empurre para retornar."], visual:"parede" },
      { id:"ponte-2", name:"Ponte de glúteos", muscle:"Glúteos", sets:3, reps:"15", rest:45, tip:"Movimente o quadril com controle.", how:["Deite de costas com os pés apoiados.","Eleve o quadril.","Desça lentamente."], visual:"ponte" }
    ]
  },
  {
    day: 7,
    title: "Fechando a semana",
    subtitle: "Uma rotina de corpo inteiro para completar os 7 dias.",
    duration: "20–25 min",
    exercises: [
      { id:"agachamento-final", name:"Agachamento", muscle:"Pernas e glúteos", sets:3, reps:"12", rest:60, tip:"Qualidade do movimento antes de aumentar repetições.", how:["Pés firmes e postura confortável.","Desça controlando.","Suba mantendo o equilíbrio."], visual:"agachamento" },
      { id:"bird-dog-final", name:"Bird dog", muscle:"Core e costas", sets:3, reps:"10 cada lado", rest:45, tip:"Mantenha o tronco estável.", how:["Comece em quatro apoios.","Estenda braço e perna opostos.","Volte e alterne."], visual:"core" },
      { id:"marcha-final", name:"Marcha moderada", muscle:"Corpo inteiro", sets:4, reps:"45 s", rest:30, tip:"Finalize em um ritmo sustentável.", how:["Comece devagar.","Aumente o ritmo gradualmente.","Reduza o ritmo no último minuto."], visual:"marcha" }
    ]
  }
];

function TrainingVisual({ type, animate = false }: { type: string; animate?: boolean }) {
  return (
    <div className={"training-visual visual-" + type + (animate ? " is-playing" : "")} aria-label="Demonstração animada do movimento">
      <span className="visual-motion" aria-hidden="true">↕</span>
      <div className="visual-person" aria-hidden="true">
        <span className="visual-head" />
        <span className="visual-neck" />
        <span className="visual-torso" />
        <span className="visual-hip" />
        <span className="visual-arm arm-left"><i /><b /></span>
        <span className="visual-arm arm-right"><i /><b /></span>
        <span className="visual-leg leg-left"><i /><b /></span>
        <span className="visual-leg leg-right"><i /><b /></span>
      </div>
      <span className="visual-floor" />
      <span className="visual-label">DEMONSTRAÇÃO ANIMADA</span>
      <span className="visual-loop">↻ movimento em loop</span>
    </div>
  );
}

function TrainingApp() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("viva-training-start");
    const done = localStorage.getItem("viva-training-completed");
    if (saved) setStartedAt(Number(saved));
    if (done) setCompleted(JSON.parse(done));
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

  function markComplete(id: string) {
    const key = "d" + selectedDay + "-" + id;
    const next = completed.includes(key) ? completed.filter(x => x !== key) : [...completed, key];
    setCompleted(next);
    localStorage.setItem("viva-training-completed", JSON.stringify(next));
  }

  if (!startedAt) {
    return (
      <main className="training-app training-welcome">
        <section className="training-welcome-card">
          <div className="training-logo">VIVA<span>+</span></div>
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
        <div className="training-logo">VIVA<span>+</span></div>
        <div className="training-top-status">SEMANA 1 <strong>{unlockedDay}/7</strong></div>
      </header>

      <section className="training-hero">
        <div>
          <div className="training-kicker">SEU PLANO • 7 DIAS</div>
          <h1>Um dia de cada vez.<br /><em>Sem pressa.</em></h1>
          <p>Complete a rotina de hoje e volte amanhã para encontrar o próximo treino liberado.</p>
        </div>
        <div className="training-progress-ring"><strong>{Math.round((unlockedDay / 7) * 100)}%</strong><span>liberado</span></div>
      </section>

      <section className="training-days">
        <div className="training-section-head"><div><span>JORNADA</span><h2>Seu calendário</h2></div><small>{unlockedDay < 7 ? "Próximo dia em " + formatRemaining((startedAt ?? now) + unlockedDay * 86400000 - now) : "Semana completa"}</small></div>
        <div className="training-day-grid">
          {days.map(day => {
            const locked = day.day > unlockedDay;
            const active = day.day === selectedDay;
            return (
              <button key={day.day} disabled={locked} className={"training-day " + (active ? "active " : "") + (locked ? "locked" : "")} onClick={() => setSelectedDay(day.day)}>
                <span className="day-number">DIA {String(day.day).padStart(2, "0")}</span>
                <strong>{day.title}</strong>
                <small>{locked ? "🔒 Libera depois" : day.duration}</small>
              </button>
            );
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
            return (
              <button key={exercise.id} className={"exercise-card " + (done ? "done" : "")} onClick={() => setSelectedExercise(exercise)}>
                <TrainingVisual type={exercise.visual} />
                <div className="exercise-info">
                  <span>EXERCÍCIO {String(index + 1).padStart(2, "0")}</span>
                  <h3>{exercise.name}</h3>
                  <p>{exercise.muscle}</p>
                  <div className="exercise-stats"><b>{exercise.sets} séries</b><b>{exercise.reps} reps</b><b>{exercise.rest}s descanso</b></div>
                </div>
                <i>{done ? "✓" : "→"}</i>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="training-note">Material educativo de bem-estar. Adapte a intensidade ao seu nível e procure orientação profissional quando necessário.</footer>

      {selectedExercise && (
        <div className="exercise-modal" role="dialog" aria-modal="true" onClick={() => setSelectedExercise(null)}>
          <div className="exercise-modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedExercise(null)}>×</button>
            <TrainingVisual type={selectedExercise.visual} animate={true} />
            <div className="modal-kicker">{selectedExercise.muscle}</div>
            <h2>{selectedExercise.name}</h2>
            <div className="modal-stats"><span><b>{selectedExercise.sets}</b> séries</span><span><b>{selectedExercise.reps}</b> repetições</span><span><b>{selectedExercise.rest}s</b> descanso</span></div>
            <h4>COMO FAZER</h4>
            <ol>{selectedExercise.how.map(step => <li key={step}>{step}</li>)}</ol>
            <div className="modal-tip">💡 {selectedExercise.tip}</div>
            <button className={"complete-btn " + (completed.includes("d" + selectedDay + "-" + selectedExercise.id) ? "completed" : "")} onClick={() => markComplete(selectedExercise.id)}>
              {completed.includes("d" + selectedDay + "-" + selectedExercise.id) ? "EXERCÍCIO CONCLUÍDO ✓" : "MARCAR COMO CONCLUÍDO"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
