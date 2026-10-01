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

function TrainingVisual({ type, id = "" }: { type: string; id?: string }) {
  const kind =
    id.includes("dead-bug") ? "deadbug" :
    id.includes("bird-dog") ? "birddog" :
    type === "ponte" ? "bridge" :
    type === "parede" ? "push" :
    type === "passo" ? "lunge" :
    type === "panturrilha" ? "calf" :
    type === "marcha" ? "march" :
    type === "sumo" ? "sumo" :
    id.includes("agachamento-bracos") ? "squatarms" :
    "squat";

  const standing = kind === "squat" || kind === "sumo" || kind === "squatarms" || kind === "calf" || kind === "march";
  const sidePose = kind === "lunge";

  return (
    <div className={"training-visual-v3 pose-" + kind} aria-label="Ilustração feminina do exercício">
      <svg viewBox="0 0 420 230" className="exercise-illustration-v3" role="img" aria-hidden="true">
        <ellipse className="v3-shadow" cx="210" cy="205" rx="116" ry="8" />

        {kind === "push" && (
          <g className="v3-prop">
            <rect x="310" y="35" width="7" height="148" rx="3.5" />
            <rect x="317" y="35" width="47" height="7" rx="3.5" />
          </g>
        )}

        {kind === "bridge" && <rect className="v3-mat" x="78" y="185" width="260" height="9" rx="4.5" />}
        {kind === "birddog" && <rect className="v3-mat" x="70" y="190" width="280" height="9" rx="4.5" />}
        {kind === "deadbug" && <rect className="v3-mat" x="78" y="190" width="260" height="9" rx="4.5" />}
        {kind === "lunge" && (
          <g className="v3-bench">
            <rect x="54" y="142" width="110" height="12" rx="3" />
            <rect x="70" y="154" width="9" height="47" rx="2" />
          </g>
        )}

        {standing && (
          <g className={"v3-standing v3-" + kind}>
            <g className="v3-hair">
              <path d="M189 39c-8-20 4-37 28-37 23 0 36 16 31 37-3 13-11 21-22 25l-8-12c-9 5-19 1-29-13Z"/>
              <path d="M194 25c-9 9-11 26-9 43-12-12-14-31-7-45 7-14 23-21 36-17-8 4-14 11-20 19Z"/>
            </g>
            <circle className="v3-skin" cx="218" cy="43" r="17"/>
            <path className="v3-face" d="M229 42c7 1 7 5 0 7-3 1-6-1-7-4Z"/>
            <path className="v3-neck" d="M211 57h14v17h-14Z"/>

            <path className="v3-top" d="M196 70c13-9 32-9 47 0l7 49c-14 8-36 8-51-1Z"/>
            <path className="v3-mid" d="M199 116c15 5 31 5 47 0l8 18c-15 9-38 9-55 0Z"/>
            <path className="v3-legwear left" d="M200 129c7 3 17 5 26 4l-1 48c-2 12-8 17-19 17h-17c-4-5 0-10 7-14Z"/>
            <path className="v3-legwear right" d="M226 133c10 0 18-2 26-5l8 53c2 10 8 14 17 18-5 6-15 7-26 3l-17-15Z"/>

            <path className="v3-skin v3-leg-left" d="M197 177l27 1-3 23c-1 8-5 14-12 16h-25c-3-6 1-12 8-16Z"/>
            <path className="v3-skin v3-leg-right" d="M248 180l22-1 7 18c3 7 9 11 18 14-6 6-17 7-27 3l-17-13Z"/>
            <path className="v3-shoe" d="M183 200c12-5 27-3 39 4 6 4 5 10-3 11h-48c-5-6 1-11 12-15Z"/>
            <path className="v3-shoe" d="M268 201c13-2 28 3 39 10 5 4 3 9-5 10h-48c-3-6 2-12 14-20Z"/>

            <path className="v3-skin v3-arm-left" d="M201 74c-9 10-15 25-18 42l14 4c7-13 12-27 15-41Z"/>
            <path className="v3-skin v3-arm-left2" d="M184 114c-3 11-3 21 2 30l13-4-1-27Z"/>
            <circle className="v3-skin" cx="191" cy="145" r="7"/>
            <path className="v3-skin v3-arm-right" d="M242 74c10 9 16 25 19 42l-14 4c-7-13-12-27-16-41Z"/>
            <path className="v3-skin v3-arm-right2" d="M259 114c4 11 4 21-1 30l-13-4 1-27Z"/>
            <circle className="v3-skin" cx="253" cy="145" r="7"/>
          </g>
        )}

        {kind === "lunge" && (
          <g className="v3-lunge-figure">
            <g className="v3-hair"><path d="M207 40c-8-19 4-36 26-36 23 0 35 15 31 36-3 13-11 21-22 25l-8-12c-9 5-18 1-27-13Z"/><path d="M212 25c-9 10-10 26-8 43-12-13-14-31-7-45 7-13 21-20 34-18-8 5-14 12-19 20Z"/></g>
            <circle className="v3-skin" cx="233" cy="43" r="17"/>
            <path className="v3-face" d="M244 42c7 1 7 5 0 7-3 1-6-1-7-4Z"/>
            <path className="v3-neck" d="M226 57h14v16h-14Z"/>
            <path className="v3-top" d="M211 69c13-9 31-9 46 0l9 49c-17 8-38 8-53-1Z"/>
            <path className="v3-legwear" d="M214 113c13 6 29 7 43 2l17 23-24 13-20-16-13 27-28-7 12-39Z"/>
            <path className="v3-skin" d="M199 153l28 8-13 34c-4 10-10 15-19 18l-17-6c1-7 7-12 13-18Z"/>
            <path className="v3-skin" d="M274 136l25 4 22 35c5 8 13 12 23 15-5 8-17 9-28 3l-37-29Z"/>
            <path className="v3-shoe" d="M176 196c11-7 27-7 42-1 6 3 7 9 0 13h-49c-5-4-2-8 7-12Z"/>
            <path className="v3-shoe" d="M316 185c14-1 29 4 40 12 5 4 4 9-4 11h-48c-3-7 1-14 12-23Z"/>
            <path className="v3-skin" d="M213 74c-10 10-15 24-17 39l13 5c8-12 12-26 16-39Z"/>
            <path className="v3-skin" d="M266 74c9 9 15 24 17 39l-13 5c-8-12-12-26-15-39Z"/>
            <path className="v3-skin" d="M196 111c-3 10-3 20 2 28l12-4-1-27Z"/>
            <path className="v3-skin" d="M280 111c4 10 4 20-1 28l-12-4 1-27Z"/>
            <rect className="v3-dumbbell" x="184" y="135" width="20" height="9" rx="4"/>
            <rect className="v3-dumbbell" x="273" y="135" width="20" height="9" rx="4"/>
            <path className="v3-bench-top" d="M54 142h110v12H54Z"/>
          </g>
        )}

        {kind === "push" && (
          <g className="v3-push-figure">
            <g className="v3-hair"><path d="M130 68c-7-16 3-31 22-31 19 0 29 13 25 31-3 10-9 17-18 20l-6-10c-8 4-15 0-23-10Z"/></g>
            <circle className="v3-skin" cx="149" cy="70" r="14"/>
            <path className="v3-face" d="M158 69c6 1 6 4 0 6-2 1-4-1-5-3Z"/>
            <path className="v3-top" d="M137 84c11-7 24-7 35 0l8 42c-12 6-29 6-40-1Z"/>
            <path className="v3-legwear" d="M169 123c20 5 42 13 61 23l-9 15c-21-7-39-10-58-15Z"/>
            <path className="v3-skin" d="M220 145l12 14-27 21c-7 5-12 11-16 18l-12-5c2-11 7-18 16-27Z"/>
            <path className="v3-shoe" d="M180 190c11-2 22 1 31 7 5 3 4 8-2 10h-34c-3-6-1-11 5-17Z"/>
            <path className="v3-skin" d="M140 88c-10 7-19 14-26 25l9 8c9-8 17-14 27-20Z"/>
            <path className="v3-skin" d="M122 112c-9 4-15 11-20 20l10 5c6-8 12-12 19-16Z"/>
            <circle className="v3-skin" cx="106" cy="135" r="6"/>
          </g>
        )}

        {kind === "bridge" && (
          <g className="v3-bridge-figure">
            <g className="v3-hair"><path d="M83 140c-7-14 3-28 20-28 17 0 27 12 23 28-2 9-8 15-16 18l-6-9c-7 3-14 0-21-9Z"/></g>
            <circle className="v3-skin" cx="102" cy="143" r="14"/>
            <path className="v3-top" d="M112 151c20-9 42-5 60 9l-7 18-62-10Z"/>
            <path className="v3-legwear" d="M165 163c18 5 34 13 47 24l-11 13-42-23Z"/>
            <path className="v3-skin" d="M205 187c10 0 19 4 27 10 4 3 2 8-4 9h-34c-3-7 1-13 11-19Z"/>
            <path className="v3-legwear" d="M162 164c-2 10-7 18-15 25l-12-8c5-11 10-18 18-25Z"/>
            <path className="v3-skin" d="M136 181c-6 8-12 13-20 17l-10-7c5-8 11-14 18-19Z"/>
            <path className="v3-skin" d="M92 153c-8 0-16 3-23 9l5 8c8-4 15-5 22-5Z"/>
          </g>
        )}

        {kind === "deadbug" && (
          <g className="v3-deadbug">
            <g className="v3-hair"><path d="M105 115c-6-14 3-27 19-27 16 0 25 11 22 26-2 8-7 13-15 16l-5-8c-6 3-13 0-21-7Z"/></g>
            <circle className="v3-skin" cx="122" cy="117" r="13"/>
            <path className="v3-top" d="M132 126c24-8 48-5 67 5l-6 17-69-8Z"/>
            <path className="v3-legwear" d="M194 136c20 1 37 8 54 18l-7 14c-19-7-35-9-53-12Z"/>
            <path className="v3-skin" d="M247 151c13 0 24 4 34 11 4 3 3 8-4 9h-38c-2-7 1-13 8-20Z"/>
            <path className="v3-skin" d="M137 126c-10-10-18-17-28-23l-8 9c10 9 17 16 24 25Z"/>
            <path className="v3-skin" d="M106 104c-8-3-16-2-23 3l4 10c7-2 13-1 19 3Z"/>
            <path className="v3-skin" d="M145 127c9-11 18-19 28-27l9 9c-9 10-16 18-23 27Z"/>
            <path className="v3-skin" d="M174 101c8-4 16-4 24 1l-5 10c-7-2-13-1-19 4Z"/>
          </g>
        )}

        {kind === "birddog" && (
          <g className="v3-birddog">
            <g className="v3-hair"><path d="M106 117c-7-14 3-28 20-28 17 0 27 12 23 28-2 9-8 15-16 18l-6-9c-7 4-14 0-21-9Z"/></g>
            <circle className="v3-skin" cx="126" cy="119" r="14"/>
            <path className="v3-top" d="M136 130c20-9 39-8 57 2l-4 20-62-9Z"/>
            <path className="v3-legwear" d="M188 144c18 3 34 9 50 18l-7 15c-19-6-34-9-51-12Z"/>
            <path className="v3-skin" d="M231 160c12 0 23 4 32 10 4 3 3 8-4 9h-37c-3-7 1-13 9-19Z"/>
            <path className="v3-skin" d="M138 132c-12 8-22 17-31 28l9 8c11-9 20-16 31-22Z"/>
            <path className="v3-skin" d="M107 158c-8 6-13 13-17 21l10 6c5-8 11-14 18-19Z"/>
            <path className="v3-skin" d="M188 145c14-8 29-17 43-28l9 10c-14 13-28 22-44 30Z"/>
            <path className="v3-skin" d="M230 117c10-3 18-2 26 4l-5 10c-7-3-13-3-19 0Z"/>
          </g>
        )}

        {kind === "calf" && <circle className="v3-rise" cx="211" cy="197" r="3" />}
      </svg>
      <span className="v3-caption">DEMONSTRAÇÃO DO MOVIMENTO</span>
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
                <TrainingVisual type={exercise.visual} id={exercise.id} />
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
            <TrainingVisual type={selectedExercise.visual} id={selectedExercise.id} />
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
