"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  {
    number: "01",
    title: "Sensibilización y alineación",
    icon: "🌱",
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    textColor: "text-emerald-400",
    description:
      "Creamos conciencia colectiva sobre el potencial transformador de la IA. Alineamos al liderazgo con una visión común y eliminamos los miedos infundados que bloquean la adopción.",
    outcomes: ["Visión compartida de IA", "Mapa de actores clave", "Superación de resistencias iniciales"],
    duration: "2-4 semanas",
  },
  {
    number: "02",
    title: "Diagnóstico de perfiles",
    icon: "🔍",
    color: "from-blue-500 to-indigo-600",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    textColor: "text-blue-400",
    description:
      "Evaluamos el estado actual de madurez de cada área. Identificamos perfiles individuales y colectivos de adopción para diseñar rutas personalizadas de transformación.",
    outcomes: ["Mapa de madurez organizacional", "10 perfiles individuales identificados", "Hoja de ruta personalizada"],
    duration: "1-2 semanas",
  },
  {
    number: "03",
    title: "Fundamentos teóricos",
    icon: "📚",
    color: "from-violet-500 to-purple-600",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    textColor: "text-violet-400",
    description:
      "Dotamos a los equipos de los conceptos, marcos de trabajo y vocabulario común necesarios para tomar decisiones informadas sobre IA, sin necesidad de ser ingenieros.",
    outcomes: ["Vocabulario IA común", "Marcos de gobernanza", "Casos de uso por industria"],
    duration: "3-6 semanas",
  },
  {
    number: "04",
    title: "Talleres de la industria",
    icon: "🏭",
    color: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    textColor: "text-amber-400",
    description:
      "Aplicamos el aprendizaje en contextos reales del sector. Talleres prácticos adaptados a la industria específica donde los equipos experimentan con herramientas de IA en escenarios propios.",
    outcomes: ["Aplicaciones sectoriales validadas", "Casos de uso implementados", "Redes de práctica IA"],
    duration: "4-8 semanas",
  },
  {
    number: "05",
    title: "Casos propios",
    icon: "🚀",
    color: "from-rose-500 to-pink-600",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    textColor: "text-rose-400",
    description:
      "El equipo diseña, prototipa e implementa sus propios proyectos de IA. Con acompañamiento experto, la organización desarrolla capacidad interna sostenible y escala lo aprendido.",
    outcomes: ["Proyectos IA propios en producción", "Equipo interno capacitado", "Cultura de IA instalada"],
    duration: "6-12 semanas",
  },
];

const ACRONYM = [
  { letter: "G", word: "Generar oportunidades con IA", description: "Genera conciencia y alineación organizacional en torno al potencial transformador de la IA.", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" },
  { letter: "A", word: "Alinear IA con negocio", description: "Alinea el liderazgo con una visión estratégica clara y objetivos de IA medibles.", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30" },
  { letter: "R", word: "Reconocer impacto y riesgos", description: "Reconoce los perfiles individuales y colectivos para diseñar rutas de adopción personalizadas.", color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30" },
  { letter: "T", word: "Traducir necesidades en soluciones", description: "Teoriza y establece los fundamentos conceptuales que permiten tomar decisiones informadas.", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30" },
  { letter: "N", word: "Navegar implementación", description: "Navega los talleres sectoriales aplicando IA en el contexto real de tu industria.", color: "text-orange-400", bg: "bg-orange-500/15 border-orange-500/30" },
  { letter: "E", word: "Experimentar", description: "Experimenta con casos propios desarrollando capacidad interna real y sostenible.", color: "text-rose-400", bg: "bg-rose-500/15 border-rose-500/30" },
  { letter: "R", word: "Resultados", description: "Consolida los resultados y escala la cultura IA de forma sostenible en toda la organización.", color: "text-pink-400", bg: "bg-pink-500/15 border-pink-500/30" },
];

export default function MetodologiaGartner() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  return (
    <section id="metodologia" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium mb-4">
            El Framework
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            La Metodología{" "}
            <span className="gradient-text-gold">GARTNER</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Un proceso probado de 5 fases que transforma organizaciones, no solo las equipa con herramientas.
          </p>
        </motion.div>

        {/* 5 Phases */}
        <div className="mb-24">
          <div className="flex flex-col gap-4">
            {PHASES.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <button
                  onClick={() => setActivePhase(activePhase === i ? null : i)}
                  className={`w-full text-left rounded-2xl border p-6 transition-all duration-300 ${
                    activePhase === i
                      ? `${phase.bg} ${phase.border} bg-opacity-20`
                      : "glass border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl shrink-0`}>
                      {phase.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-black tracking-widest ${phase.textColor}`}>
                          FASE {phase.number}
                        </span>
                        <span className="text-xs text-slate-500 border border-slate-700 rounded-full px-2 py-0.5">
                          {phase.duration}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white">{phase.title}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activePhase === i ? 180 : 0 }}
                      className={`text-slate-500 shrink-0 ${activePhase === i ? phase.textColor : ""}`}
                    >
                      ▾
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activePhase === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 pl-[4.75rem]">
                          <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            {phase.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {phase.outcomes.map((outcome) => (
                              <span
                                key={outcome}
                                className={`text-xs px-3 py-1 rounded-full ${phase.bg} border ${phase.border} ${phase.textColor}`}
                              >
                                ✓ {outcome}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GARTNER Acronym */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-black mb-3">
            El acrónimo que lo explica todo
          </h3>
          <p className="text-slate-400">Cada letra es un principio de transformación</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {ACRONYM.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onHoverStart={() => setHoveredLetter(i)}
              onHoverEnd={() => setHoveredLetter(null)}
              className={`rounded-2xl border p-5 text-center cursor-default transition-all duration-300 ${item.bg} ${
                hoveredLetter === i ? "scale-105 -translate-y-1" : ""
              }`}
            >
              <div className={`text-5xl font-black mb-2 ${item.color}`}>{item.letter}</div>
              <div className="text-sm font-bold text-white mb-2">{item.word}</div>
              <AnimatePresence>
                {hoveredLetter === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-slate-400 leading-snug overflow-hidden"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA to next section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">
            ¿Dónde está tu empresa hoy en este camino?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("test-madurez")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300"
          >
            Diagnosticar madurez corporativa →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
