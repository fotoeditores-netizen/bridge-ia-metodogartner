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

const DIMENSIONS = ["Adopción", "Liderazgo", "Gobernanza", "Capacitación", "Integración", "Medición"];

const QUESTIONS = [
  {
    dimension: "Adopción",
    icon: "🚀",
    text: "¿Cuál describe mejor el estado de adopción de IA en tu organización?",
    options: [
      { text: "No hemos implementado ninguna herramienta de IA formal", score: 1 },
      { text: "Algunos equipos usan herramientas aisladas de forma individual", score: 2 },
      { text: "Hay proyectos piloto en áreas específicas con resultados mixtos", score: 3 },
      { text: "La IA está integrada en procesos core y genera valor medible", score: 4 },
    ],
  },
  {
    dimension: "Liderazgo",
    icon: "👑",
    text: "¿Cómo está involucrado el liderazgo de tu empresa en la estrategia de IA?",
    options: [
      { text: "La dirección no tiene una posición clara sobre IA", score: 1 },
      { text: "Hay interés pero sin un ejecutivo responsable (Chief AI Officer o similar)", score: 2 },
      { text: "El liderazgo tiene una visión pero la ejecución es inconsistente", score: 3 },
      { text: "Hay un roadmap ejecutivo de IA con sponsors de nivel C activos", score: 4 },
    ],
  },
  {
    dimension: "Gobernanza",
    icon: "⚖️",
    text: "¿Qué políticas de uso responsable de IA tiene tu organización?",
    options: [
      { text: "No existen políticas formales de uso de IA", score: 1 },
      { text: "Hay lineamientos informales pero no están documentados", score: 2 },
      { text: "Existen políticas básicas de uso de datos e IA documentadas", score: 3 },
      { text: "Marco completo de gobernanza IA: ética, privacidad, auditoría y cumplimiento", score: 4 },
    ],
  },
  {
    dimension: "Capacitación",
    icon: "🎓",
    text: "¿Cómo se capacita a los colaboradores en competencias de IA?",
    options: [
      { text: "No hay programas de formación en IA", score: 1 },
      { text: "Acceso esporádico a recursos externos (cursos libres, tutoriales)", score: 2 },
      { text: "Programas de capacitación estructurados para equipos técnicos", score: 3 },
      { text: "Programa integral de alfabetización IA para todos los niveles de la organización", score: 4 },
    ],
  },
  {
    dimension: "Integración",
    icon: "🔗",
    text: "¿Cómo está integrada la IA con los sistemas y procesos existentes?",
    options: [
      { text: "La IA opera de forma completamente aislada de los sistemas actuales", score: 1 },
      { text: "Integraciones manuales o semi-manuales en procesos no críticos", score: 2 },
      { text: "Integración técnica en algunos sistemas core con supervisión humana", score: 3 },
      { text: "IA nativa integrada en flujos de trabajo, APIs y decisiones automatizadas", score: 4 },
    ],
  },
  {
    dimension: "Medición",
    icon: "📊",
    text: "¿Cómo mide tu empresa el impacto y ROI de sus iniciativas de IA?",
    options: [
      { text: "No medimos el impacto de IA formalmente", score: 1 },
      { text: "Seguimiento informal de resultados sin KPIs definidos", score: 2 },
      { text: "KPIs de IA establecidos pero revisados esporádicamente", score: 3 },
      { text: "Dashboard de IA con métricas en tiempo real alineadas al negocio", score: 4 },
    ],
  },
];

const DEPTH_QUESTIONS = [
  {
    text: "¿Cuántos proyectos activos de IA tiene tu empresa hoy?",
    options: ["Ninguno", "1-3", "4-10", "Más de 10"],
  },
  {
    text: "¿Cuál es tu mayor obstáculo para escalar IA?",
    options: ["Presupuesto", "Talento interno", "Cultura organizacional", "Regulación / compliance"],
  },
  {
    text: "¿En qué área generaría más impacto la IA en tu empresa?",
    options: ["Operaciones", "Ventas y Marketing", "RR.HH.", "Servicio al Cliente"],
  },
  {
    text: "¿Cuál sería tu inversión anual disponible para IA?",
    options: ["Menos de $50K", "$50K - $200K", "$200K - $1M", "Más de $1M"],
  },
];

const MATURITY_LEVELS = [
  {
    range: [1, 1.75],
    level: 1,
    name: "Iniciante",
    emoji: "🌱",
    color: "text-slate-400",
    gradient: "from-slate-500 to-slate-700",
    border: "border-slate-500/30",
    bg: "bg-slate-500/10",
    description: "La organización está en el punto de partida. La IA no está en la agenda estratégica y hay un alto desconocimiento del potencial.",
    actions: [
      "Sensibilizar al liderazgo con casos de éxito del sector",
      "Realizar un workshop de alfabetización IA para C-Suite",
      "Identificar 1-2 quick wins de IA con bajo riesgo",
      "Designar un responsable interno de la agenda IA",
    ],
  },
  {
    range: [1.75, 2.5],
    level: 2,
    name: "En Exploración",
    emoji: "🔭",
    color: "text-blue-400",
    gradient: "from-blue-500 to-blue-700",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    description: "Hay movimiento pero sin estrategia unificada. Iniciativas aisladas que no escalan ni generan ventaja competitiva real.",
    actions: [
      "Crear un Centro de Excelencia de IA (CoE) con mandato claro",
      "Estandarizar herramientas IA y crear política de uso",
      "Lanzar programa de capacitación para roles clave",
      "Definir 3-5 casos de uso prioritarios con ROI claro",
    ],
  },
  {
    range: [2.5, 3.25],
    level: 3,
    name: "En Desarrollo",
    emoji: "⚡",
    color: "text-amber-400",
    gradient: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    description: "La IA genera valor en áreas clave pero falta coherencia. El siguiente paso es escalar lo que funciona y cerrar brechas críticas.",
    actions: [
      "Escalar proyectos piloto exitosos a nivel organizacional",
      "Implementar marco de gobernanza IA robusto",
      "Desarrollar capacidades internas para reducir dependencia externa",
      "Crear dashboard ejecutivo de métricas IA",
    ],
  },
  {
    range: [3.25, 4.0],
    level: 4,
    name: "Líder en IA",
    emoji: "🏆",
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    description: "La IA es parte del ADN organizacional. Tu empresa genera ventaja competitiva sostenible y es referente en adopción de IA.",
    actions: [
      "Publicar casos de éxito y posicionarse como referente sectorial",
      "Explorar IA generativa y agentes autónomos para próxima frontera",
      "Crear programas de mentoría IA para el ecosistema",
      "Escalar hacia IA predictiva y prescriptiva en decisiones estratégicas",
    ],
  },
];

function getMaturityLevel(avgScore: number) {
  return MATURITY_LEVELS.find((l) => avgScore >= l.range[0] && avgScore <= l.range[1]) ?? MATURITY_LEVELS[0];
}

export default function TestMadurezCorporativa() {
  const [stage, setStage] = useState<"intro" | "main" | "depth" | "result">("intro");
  const [mainAnswers, setMainAnswers] = useState<number[]>([]);
  const [depthAnswers, setDepthAnswers] = useState<string[]>([]);
  const [currentMain, setCurrentMain] = useState(0);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedDepth, setSelectedDepth] = useState<string | null>(null);

  const handleMainAnswer = (score: number) => {
    setSelected(score);
    setTimeout(() => {
      const newAnswers = [...mainAnswers, score];
      setMainAnswers(newAnswers);
      setSelected(null);
      if (currentMain + 1 < QUESTIONS.length) {
        setCurrentMain(currentMain + 1);
      } else {
        setStage("depth");
      }
    }, 350);
  };

  const handleDepthAnswer = (answer: string) => {
    setSelectedDepth(answer);
    setTimeout(() => {
      const newAnswers = [...depthAnswers, answer];
      setDepthAnswers(newAnswers);
      setSelectedDepth(null);
      if (currentDepth + 1 < DEPTH_QUESTIONS.length) {
        setCurrentDepth(currentDepth + 1);
      } else {
        setStage("result");
      }
    }, 350);
  };

  const handleReset = () => {
    setStage("intro");
    setMainAnswers([]);
    setDepthAnswers([]);
    setCurrentMain(0);
    setCurrentDepth(0);
    setSelected(null);
    setSelectedDepth(null);
  };

  const avgScore = mainAnswers.length > 0
    ? mainAnswers.reduce((a, b) => a + b, 0) / mainAnswers.length
    : 0;

  const maturity = getMaturityLevel(Math.max(1, Math.min(4, avgScore)));

  const radarData = DIMENSIONS.map((dim, i) => ({
    dimension: dim,
    score: mainAnswers[i] ?? 0,
    fullMark: 4,
  }));

  const gapData = DIMENSIONS.map((dim, i) => ({
    dimension: dim,
    actual: mainAnswers[i] ?? 0,
    objetivo: 4,
    brecha: 4 - (mainAnswers[i] ?? 0),
  }));

  return (
    <section id="test-madurez" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-4">
            Diagnóstico Ejecutivo · 6 dimensiones
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Madurez{" "}
            <span className="gradient-text">Corporativa en IA</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Descubre dónde está tu organización en su camino hacia la adopción inteligente de IA y recibe un plan ejecutivo personalizado.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Intro */}
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-3xl p-10 text-center"
            >
              <div className="text-6xl mb-6">🏢</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Diagnóstico de Madurez IA</h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                6 preguntas para evaluar tus dimensiones críticas: Adopción, Liderazgo, Gobernanza,
                Capacitación, Integración y Medición.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto text-sm">
                {[
                  { icon: "📡", text: "Gráfico de brechas radar" },
                  { icon: "🏆", text: "4 niveles de madurez" },
                  { icon: "📋", text: "Plan de acción ejecutivo" },
                  { icon: "🔍", text: "10 preguntas de profundidad" },
                ].map((item) => (
                  <div key={item.text} className="glass-light rounded-xl p-3 text-slate-300 flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-xs">{item.text}</span>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage("main")}
                className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all"
              >
                Iniciar diagnóstico →
              </motion.button>
            </motion.div>
          )}

          {/* Main questions */}
          {stage === "main" && (
            <motion.div
              key={`main-${currentMain}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{QUESTIONS[currentMain].icon}</span>
                  <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                    {QUESTIONS[currentMain].dimension}
                  </span>
                </div>
                <span className="text-sm text-slate-400">
                  {currentMain + 1} / {QUESTIONS.length}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  animate={{ width: `${((currentMain + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                {QUESTIONS[currentMain].text}
              </h3>

              <div className="space-y-3">
                {QUESTIONS[currentMain].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMainAnswer(opt.score)}
                    className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 ${
                      selected === opt.score
                        ? "border-emerald-400 bg-emerald-500/20 text-white"
                        : "border-white/10 glass-light text-slate-300 hover:border-emerald-400/50 hover:text-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full border border-current/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {opt.text}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Depth questions */}
          {stage === "depth" && (
            <motion.div
              key={`depth-${currentDepth}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-6">
                Profundización personalizada — {currentDepth + 1} de {DEPTH_QUESTIONS.length}
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                  animate={{ width: `${((currentDepth + 1) / DEPTH_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                {DEPTH_QUESTIONS[currentDepth].text}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEPTH_QUESTIONS[currentDepth].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDepthAnswer(opt)}
                    className={`px-5 py-4 rounded-2xl border text-left transition-all duration-200 ${
                      selectedDepth === opt
                        ? "border-violet-400 bg-violet-500/20 text-white"
                        : "border-white/10 glass-light text-slate-300 hover:border-violet-400/40 hover:text-white"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results */}
          {stage === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Maturity badge */}
              <div className={`glass rounded-3xl p-8 text-center border ${maturity.border}`}>
                <div className="text-6xl mb-4">{maturity.emoji}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">Nivel de madurez</div>
                <h3 className={`text-4xl font-black mb-2 ${maturity.color}`}>
                  Nivel {maturity.level}: {maturity.name}
                </h3>
                <div className="flex justify-center gap-1 mb-4">
                  {[1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-2 rounded-full transition-all ${
                        lvl <= maturity.level
                          ? `bg-gradient-to-r ${maturity.gradient} w-12`
                          : "bg-slate-700 w-8"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                  {maturity.description}
                </p>
              </div>

              {/* Radar Chart */}
              <div className="glass rounded-3xl p-8">
                <h4 className="text-xl font-bold text-white mb-6 text-center">
                  Gráfico de Brechas por Dimensión
                </h4>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                      />
                      <Radar
                        name="Nivel objetivo"
                        dataKey="fullMark"
                        stroke="rgba(99,102,241,0.3)"
                        fill="rgba(99,102,241,0.05)"
                        strokeDasharray="4 2"
                      />
                      <Radar
                        name="Tu empresa"
                        dataKey="score"
                        stroke="#10b981"
                        fill="rgba(16,185,129,0.15)"
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

                {/* Dimension scores */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  {gapData.map((d, i) => (
                    <div key={i} className="glass-light rounded-xl p-3">
                      <div className="text-xs text-slate-500 mb-1">{d.dimension}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                            style={{ width: `${(d.actual / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-300">{d.actual}/4</span>
                      </div>
                      {d.brecha > 0 && (
                        <div className="text-xs text-amber-400 mt-1">▲ {d.brecha} de brecha</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action plan */}
              <div className={`glass rounded-3xl p-8 border ${maturity.border}`}>
                <h4 className="text-xl font-bold text-white mb-2">Plan de Acción Ejecutivo</h4>
                <p className="text-sm text-slate-500 mb-6">
                  Basado en tu diagnóstico — 4 acciones prioritarias
                </p>
                <div className="space-y-3">
                  {maturity.actions.map((action, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 glass-light rounded-xl p-4"
                    >
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${maturity.gradient} flex items-center justify-center text-white text-xs font-black shrink-0`}>
                        {i + 1}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{action}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById("cotizador")?.scrollIntoView({ behavior: "smooth" })}
                  className={`flex-1 py-4 bg-gradient-to-r ${maturity.gradient} rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-all`}
                >
                  Ver propuesta de valor →
                </motion.button>
                <button
                  onClick={handleReset}
                  className="px-6 py-4 glass rounded-2xl text-slate-300 font-semibold hover:bg-white/10 transition-all border border-white/10"
                >
                  Reiniciar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
