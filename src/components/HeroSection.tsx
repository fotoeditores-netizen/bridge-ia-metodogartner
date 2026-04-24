"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToTest = () => {
    document.getElementById("test-perfil")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMethodology = () => {
    document.getElementById("metodologia")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Metodología de Adopción de IA Empresarial
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
        >
          Adoptar IA no es{" "}
          <span className="gradient-text">tecnología.</span>
          <br />
          Es un cambio{" "}
          <span className="gradient-text-gold">cultural.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Más del 80% de las iniciativas de IA fracasan porque las organizaciones
          implementan herramientas sin transformar a las personas que las usan.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mb-12"
        >
          El <strong className="text-white">Método GARTNER</strong> es el framework que alinea cultura, liderazgo
          y capacidades para que tu equipo no solo use IA, sino que la haga parte de su ADN.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={scrollToTest}
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl text-white font-bold text-lg hover:from-blue-500 hover:to-violet-500 transition-all duration-300 glow-blue hover:scale-105 active:scale-95"
          >
            Descubre tu Perfil IA
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
          <a
            href="/bridge-ia"
            className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl text-white font-bold text-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <span>🎮</span>
            Jugar CRACKS IA
            <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
          </a>
          <button
            onClick={scrollToMethodology}
            className="px-8 py-4 glass rounded-2xl text-slate-200 font-semibold text-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            Ver la Metodología
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { number: "+100", label: "Líderes impactados", color: "text-blue-400" },
            { number: "5", label: "Fases de adopción progresiva", color: "text-violet-400" },
            { number: "10", label: "Perfiles de liderazgo IA", color: "text-amber-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-2xl p-6 text-center cursor-default"
            >
              <div className={`text-4xl font-black mb-1 ${stat.color}`}>{stat.number}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Descubre más</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
