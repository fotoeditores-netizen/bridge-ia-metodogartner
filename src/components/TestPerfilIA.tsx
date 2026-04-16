"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const QUESTIONS = [
  {
    id: 1,
    text: "¿Cómo reaccionas cuando tu empresa anuncia la implementación de una nueva herramienta de IA?",
    options: [
      { text: "Analizo el ROI antes de adoptarla", value: "B" },
      { text: "Espero ver resultados en otros antes de usarla", value: "D" },
      { text: "La instalo antes de la capacitación oficial", value: "A" },
      { text: "Pregunto cómo mejora la colaboración del equipo", value: "C" },
    ],
  },
  {
    id: 2,
    text: "¿Qué describe mejor tu relación actual con herramientas de IA?",
    options: [
      { text: "Prefiero usarlas en proyectos colaborativos", value: "C" },
      { text: "Las uso a diario y experimento con nuevas constantemente", value: "A" },
      { text: "Las conozco pero no las he integrado a mi rutina", value: "D" },
      { text: "Las uso estratégicamente cuando hay un caso de uso claro", value: "B" },
    ],
  },
  {
    id: 3,
    text: "Cuando un proceso de IA da resultados inesperados, ¿qué haces?",
    options: [
      { text: "Itero rápidamente para mejorar el prompt o modelo", value: "A" },
      { text: "Lo comparto con el equipo para aprender juntos", value: "C" },
      { text: "Vuelvo al proceso manual hasta entender qué pasó", value: "D" },
      { text: "Documento el fallo y analizo el impacto en el negocio", value: "B" },
    ],
  },
  {
    id: 4,
    text: "¿Cómo defines el éxito de la IA en tu organización?",
    options: [
      { text: "Mejora en colaboración y satisfacción del equipo", value: "C" },
      { text: "Estabilidad y ausencia de errores críticos", value: "D" },
      { text: "Eficiencia medible y reducción de costos", value: "B" },
      { text: "Velocidad de innovación y ventaja competitiva", value: "A" },
    ],
  },
  {
    id: 5,
    text: "¿Qué papel juegas cuando tu equipo debate sobre IA?",
    options: [
      { text: "Señalo riesgos y pido más evidencia", value: "D" },
      { text: "Evalúo viabilidad y alinéo con objetivos estratégicos", value: "B" },
      { text: "Propongo ideas y prototipos antes que los demás", value: "A" },
      { text: "Facilito el consenso y aseguro que todos participen", value: "C" },
    ],
  },
  {
    id: 6,
    text: "¿Cómo aprendes mejor sobre Inteligencia Artificial?",
    options: [
      { text: "Con formación estructurada y conceptos validados", value: "D" },
      { text: "En talleres grupales y proyectos colaborativos", value: "C" },
      { text: "Experimentando directamente sin guía previa", value: "A" },
      { text: "Con casos de estudio y aplicaciones de negocio reales", value: "B" },
    ],
  },
  {
    id: 7,
    text: "¿Cuál es tu mayor preocupación respecto a la IA en tu empresa?",
    options: [
      { text: "No tener métricas claras de retorno sobre la inversión", value: "B" },
      { text: "Que nos quedemos atrás respecto a la competencia", value: "A" },
      { text: "Los riesgos de privacidad, sesgos y errores graves", value: "D" },
      { text: "Que la IA fragmente la cohesión del equipo", value: "C" },
    ],
  },
  {
    id: 8,
    text: "Si pudieras describir tu relación ideal con la IA, sería:",
    options: [
      { text: "Una herramienta confiable y bien gobernada", value: "D" },
      { text: "Una carrera constante por liderar la frontera tecnológica", value: "A" },
      { text: "Un co-piloto que potencia a las personas del equipo", value: "C" },
      { text: "Una palanca estratégica que optimiza resultados clave", value: "B" },
    ],
  },
];

const PROFILES: Record<string, {
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  growth: string;
  color: string;
  gradient: string;
}> = {
  AA: {
    name: "El Acelerador",
    emoji: "⚡",
    tagline: "Velocidad sobre todo",
    description: "Eres el primero en adoptar cualquier herramienta de IA. Tu entusiasmo impulsa la innovación, aunque a veces vas más rápido que tu equipo.",
    strengths: ["Pionero en adopción", "Alta tolerancia al riesgo", "Experimentación constante"],
    growth: "Aprende a calibrar el ritmo para arrastrar al equipo contigo",
    color: "text-amber-400",
    gradient: "from-amber-500 to-orange-600",
  },
  AB: {
    name: "El Pragmático Estratégico",
    emoji: "🎯",
    tagline: "Resultados medibles primero",
    description: "Combinas agilidad con criterio. Adoptas IA cuando el caso de negocio es sólido y los KPIs son claros.",
    strengths: ["Orientado a resultados", "Pensamiento estratégico", "Equilibrio velocidad-rigor"],
    growth: "Permite más espacio para la exploración sin ROI inmediato",
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-600",
  },
  AC: {
    name: "El Innovador Disruptivo",
    emoji: "🚀",
    tagline: "Rompe los moldes con IA",
    description: "Tu visión combina velocidad e inclusión. Quieres transformar la organización a gran velocidad y asegurarte de que todos suban al cohete.",
    strengths: ["Visión transformadora", "Energía contagiosa", "Rompe silos organizacionales"],
    growth: "Trabaja en gestión del cambio para reducir resistencias",
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-600",
  },
  BA: {
    name: "El Visionario Cauteloso",
    emoji: "🔭",
    tagline: "Ve lejos, avanza con paso firme",
    description: "Tienes una visión clara del futuro con IA pero avanzas con datos y evidencia. Buscas el equilibrio entre innovación y estabilidad.",
    strengths: ["Pensamiento a largo plazo", "Rigor analítico", "Gestión responsable del cambio"],
    growth: "Practica tomar decisiones con información incompleta",
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-600",
  },
  BB: {
    name: "El Analista Sistemático",
    emoji: "📊",
    tagline: "Si no se mide, no existe",
    description: "Tu fortaleza es convertir datos en decisiones. Abordas la IA como un sistema de optimización con entradas, procesos y salidas medibles.",
    strengths: ["Pensamiento cuantitativo", "Diseño de métricas", "Optimización continua"],
    growth: "Desarrolla intuición para actuar ante ambigüedad",
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-600",
  },
  BC: {
    name: "El Líder Transformador",
    emoji: "🌟",
    tagline: "IA para potenciar personas",
    description: "Eres el puente entre la estrategia de IA y las personas. Tu liderazgo hace que la tecnología y el talento humano coexistan en armonía.",
    strengths: ["Liderazgo empático", "Comunicación estratégica", "Gestión del cambio cultural"],
    growth: "Fortalece tus fundamentos técnicos para mayor credibilidad",
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-600",
  },
  CA: {
    name: "El Colaborador Simbiótico",
    emoji: "🤝",
    tagline: "Humanos e IA, juntos",
    description: "Crees en la simbiosis entre talento humano e inteligencia artificial. Diseñas procesos donde ambos se potencian mutuamente.",
    strengths: ["Diseño de flujos humano-IA", "Cultura de colaboración", "Empatía organizacional"],
    growth: "Aprende a priorizar proyectos de IA de alto impacto estratégico",
    color: "text-teal-400",
    gradient: "from-teal-500 to-emerald-600",
  },
  DA: {
    name: "El Explorador Curioso",
    emoji: "🧭",
    tagline: "La curiosidad como motor",
    description: "Tu incertidumbre no es debilidad, es el punto de partida. Estás en el umbral de convertirte en un referente de IA dentro de tu organización.",
    strengths: ["Mentalidad de crecimiento", "Apertura genuina", "Capacidad de síntesis"],
    growth: "Da el primer paso: elige una herramienta y comprométete 30 días",
    color: "text-lime-400",
    gradient: "from-lime-500 to-green-600",
  },
  DB: {
    name: "El Adaptador Dinámico",
    emoji: "🔄",
    tagline: "Cautela inteligente",
    description: "Tu prudencia es un activo. Adoptas IA cuando está validada y el riesgo está controlado. Eres el guardián de la estabilidad durante el cambio.",
    strengths: ["Gestión de riesgos", "Estabilidad operativa", "Aprendizaje validado"],
    growth: "Reduce el ciclo de validación para no perder ventanas de oportunidad",
    color: "text-orange-400",
    gradient: "from-orange-500 to-amber-600",
  },
  DC: {
    name: "El Resistente Reflexivo",
    emoji: "🛡️",
    tagline: "Primero entender, luego actuar",
    description: "Tu escepticismo saludable es valioso. Planteas las preguntas difíciles que todos evitan y eso hace mejores los proyectos de IA.",
    strengths: ["Pensamiento crítico", "Gestión de riesgos éticos", "Análisis profundo"],
    growth: "Busca un quick win de IA de bajo riesgo para cambiar tu narrativa interna",
    color: "text-slate-300",
    gradient: "from-slate-400 to-slate-600",
  },
};

function getProfile(answers: string[]): string {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => counts[a]++);
  const sorted = Object.entries(counts).sort((x, y) => y[1] - x[1]);
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];
  const key = top1 + top2;
  return PROFILES[key] ? key : top1 + top1;
}

export default function TestPerfilIA() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleStart = () => setStarted(true);

  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelected(null);
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
      } else {
        setResult(getProfile(newAnswers));
      }
    }, 400);
  };

  const handleReset = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setSelected(null);
  };

  const progress = started ? ((current) / QUESTIONS.length) * 100 : 0;

  const profile = result ? (PROFILES[result] ?? PROFILES["AA"]) : null;

  const radarData = [
    { dimension: "Innovación", score: answers.filter((a) => a === "A").length, fullMark: 8 },
    { dimension: "Estrategia", score: answers.filter((a) => a === "B").length, fullMark: 8 },
    { dimension: "Colaboración", score: answers.filter((a) => a === "C").length, fullMark: 8 },
    { dimension: "Cautela", score: answers.filter((a) => a === "D").length, fullMark: 8 },
  ];

  return (
    <section id="test-perfil" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-4">
            Test de 8 preguntas · 2 minutos
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            ¿Cuál es tu{" "}
            <span className="gradient-text">Perfil IA</span>?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Descubre cómo tu mente aborda la Inteligencia Artificial y qué tipo de líder digital eres dentro de tu organización.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Intro */}
          {!started && !result && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-3xl p-10 text-center"
            >
              <div className="text-7xl mb-6 animate-float inline-block">🧠</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Test de Perfil IA Empresarial</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                8 preguntas para identificar tu arquetipo de liderazgo en adopción de IA.
                Elige la respuesta que más te represente, no la que crees correcta.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["10 perfiles únicos", "Resultados inmediatos", "100% gratuito"].map((tag) => (
                  <span key={tag} className="px-3 py-1 glass-light rounded-full text-xs text-slate-300">
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="px-10 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl text-white font-bold text-lg hover:from-violet-500 hover:to-purple-500 transition-all duration-300 glow-purple"
              >
                Comenzar Test →
              </motion.button>
            </motion.div>
          )}

          {/* Questions */}
          {started && !result && (
            <motion.div
              key={`question-${current}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-400">
                  Pregunta {current + 1} de {QUESTIONS.length}
                </span>
                <span className="text-sm font-semibold text-violet-400">
                  {Math.round(((current + 1) / QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  initial={{ width: `${progress}%` }}
                  animate={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                {QUESTIONS[current].text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {QUESTIONS[current].options.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 ${
                      selected === option.value
                        ? "border-violet-400 bg-violet-500/20 text-white"
                        : "border-white/10 glass-light text-slate-300 hover:border-violet-400/50 hover:text-white"
                    }`}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full border border-current/30 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result && profile && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="glass rounded-3xl p-8 md:p-12 text-center"
            >
              <div className="text-7xl mb-4 animate-float inline-block">{profile.emoji}</div>
              <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm mb-3">
                Tu perfil IA es
              </div>
              <h3 className={`text-4xl md:text-5xl font-black mb-2 ${profile.color}`}>
                {profile.name}
              </h3>
              <p className="text-slate-400 text-lg italic mb-6">"{profile.tagline}"</p>
              <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
                {profile.description}
              </p>

              {/* Radar Chart */}
              <div className="glass-light rounded-2xl p-5 mb-6">
                <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-4 text-center">Tu perfil de liderazgo IA</h4>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <Radar
                        name="Nivel máximo"
                        dataKey="fullMark"
                        stroke="rgba(139,92,246,0.2)"
                        fill="rgba(139,92,246,0.04)"
                        strokeDasharray="4 2"
                      />
                      <Radar
                        name="Tu perfil"
                        dataKey="score"
                        stroke="#a78bfa"
                        fill="rgba(167,139,250,0.2)"
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#1e293b",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          color: "#e2e8f0",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-3">Tus fortalezas</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.strengths.map((s) => (
                    <span
                      key={s}
                      className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${profile.gradient} text-white`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Growth area */}
              <div className="glass-light rounded-2xl p-5 mb-8 text-left max-w-md mx-auto">
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Área de crecimiento</div>
                <p className="text-slate-300 text-sm">💡 {profile.growth}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    document.getElementById("test-madurez")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`px-8 py-3 bg-gradient-to-r ${profile.gradient} rounded-2xl text-white font-bold hover:opacity-90 transition-all`}
                >
                  Ver diagnóstico corporativo →
                </motion.button>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 glass rounded-2xl text-slate-300 font-semibold hover:bg-white/10 transition-all border border-white/10"
                >
                  Repetir test
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
