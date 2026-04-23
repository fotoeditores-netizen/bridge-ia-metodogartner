"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ALL_MODULES,
  MAX_TOTAL_SCORE,
  MASTERY_LEVELS,
  GARTNER_ACRONYM,
  type GameQuestion,
  type GameModule,
} from "./data";

// ─────────────────────────────────────────────
// TIPOS DE ESTADO
// ─────────────────────────────────────────────
type GamePhase = "intro" | "playing" | "feedback" | "transition" | "results";

interface GameState {
  phase: GamePhase;
  moduleIndex: number;
  questionIndex: number;
  scores: number[];
  selectedAnswer: number | null;
  earnedPoints: number;
  isPartial: boolean;
}

const INITIAL_STATE: GameState = {
  phase: "intro",
  moduleIndex: 0,
  questionIndex: 0,
  scores: [0, 0, 0, 0, 0, 0],
  selectedAnswer: null,
  earnedPoints: 0,
  isPartial: false,
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function getTotalScore(scores: number[]) {
  return scores.reduce((a, b) => a + b, 0);
}

function getMasteryLevel(score: number) {
  return MASTERY_LEVELS.find((l) => score >= l.min && score <= l.max) ?? MASTERY_LEVELS[0];
}

function getModuleColor(color: string): { bg: string; border: string; text: string; btn: string; badge: string } {
  const map: Record<string, { bg: string; border: string; text: string; btn: string; badge: string }> = {
    blue:    { bg: "bg-blue-900/20",   border: "border-blue-500/40",   text: "text-blue-400",   btn: "bg-blue-600 hover:bg-blue-500",   badge: "bg-blue-500/20 text-blue-300" },
    purple:  { bg: "bg-purple-900/20", border: "border-purple-500/40", text: "text-purple-400", btn: "bg-purple-600 hover:bg-purple-500", badge: "bg-purple-500/20 text-purple-300" },
    violet:  { bg: "bg-violet-900/20", border: "border-violet-500/40", text: "text-violet-400", btn: "bg-violet-600 hover:bg-violet-500", badge: "bg-violet-500/20 text-violet-300" },
    cyan:    { bg: "bg-cyan-900/20",   border: "border-cyan-500/40",   text: "text-cyan-400",   btn: "bg-cyan-600 hover:bg-cyan-500",     badge: "bg-cyan-500/20 text-cyan-300" },
    emerald: { bg: "bg-emerald-900/20",border: "border-emerald-500/40",text: "text-emerald-400",btn: "bg-emerald-600 hover:bg-emerald-500",badge: "bg-emerald-500/20 text-emerald-300" },
    amber:   { bg: "bg-amber-900/20",  border: "border-amber-500/40",  text: "text-amber-400",  btn: "bg-amber-600 hover:bg-amber-500",   badge: "bg-amber-500/20 text-amber-300" },
  };
  return map[color] ?? map.blue;
}

// ─────────────────────────────────────────────
// COMPONENTES REUTILIZABLES
// ─────────────────────────────────────────────

function ScoreBar({ scores, moduleIndex }: { scores: number[]; moduleIndex: number }) {
  const total = getTotalScore(scores);
  const pct = Math.round((total / MAX_TOTAL_SCORE) * 100);
  const mastery = getMasteryLevel(total);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/8">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <span className="text-white font-bold text-sm tracking-wider hidden sm:block">Cracks de IA</span>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {ALL_MODULES.map((m, i) => (
            <div
              key={m.id}
              className={`h-2 rounded-full transition-all duration-500 ${
                i < moduleIndex
                  ? "bg-green-400 w-6"
                  : i === moduleIndex
                  ? "bg-blue-400 w-8 animate-pulse"
                  : "bg-white/20 w-2"
              }`}
            />
          ))}
        </div>
        {/* Score */}
        <div className="ml-auto flex items-center gap-3">
          <div className="text-xs text-slate-400">{mastery.badge} {mastery.level}</div>
          <div className="text-white font-bold">
            <span className="text-yellow-400">{total}</span>
            <span className="text-slate-500 font-normal"> / {MAX_TOTAL_SCORE} pts</span>
          </div>
          <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GartnerLetters({ unlockedCount }: { unlockedCount: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {GARTNER_ACRONYM.map((item, i) => (
        <motion.div
          key={item.letter + i}
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{
            scale: i < unlockedCount ? 1 : 0.8,
            opacity: i < unlockedCount ? 1 : 0.25,
          }}
          transition={{ delay: i * 0.08 }}
          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm border transition-all ${
            i < unlockedCount
              ? "bg-gradient-to-br from-blue-600 to-purple-700 border-blue-400/50 text-white shadow-lg shadow-blue-500/20"
              : "bg-slate-800/50 border-slate-700/50 text-slate-600"
          }`}
          title={item.word}
        >
          {item.letter}
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA INTRO
// ─────────────────────────────────────────────
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-grid px-4 py-16">
      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-300 text-xs font-medium mb-8"
        >
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Simulador Oficial · Método GARTNER · v1.0
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-4">
          <span className="gradient-text">Cracks</span>
          <span className="text-white"> de </span>
          <span className="text-blue-400">IA</span>
        </h1>
        <p className="text-lg text-slate-400 mb-3 font-medium">
          El simulador interactivo del Método GARTNER para consultores
        </p>
        <p className="text-slate-500 text-sm mb-10 max-w-xl mx-auto">
          5 módulos progresivos · 38 desafíos · hasta 615 puntos · retroalimentación inmediata
        </p>

        {/* GARTNER Acronym preview */}
        <div className="glass rounded-2xl p-6 mb-8 text-left max-w-2xl mx-auto">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-4 text-center">El Método que vas a dominar</p>
          <div className="grid grid-cols-1 gap-2">
            {GARTNER_ACRONYM.map((item) => (
              <div key={item.letter + item.word} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/40 to-purple-700/40 border border-blue-500/30 flex items-center justify-center font-bold text-blue-300 text-sm shrink-0">
                  {item.letter}
                </span>
                <div>
                  <span className="text-white font-semibold text-sm">{item.word}</span>
                  <span className="text-slate-500 text-xs ml-2">— {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {ALL_MODULES.map((m) => {
            const colors = getModuleColor(m.color);
            return (
              <div key={m.id} className={`${colors.bg} border ${colors.border} rounded-xl p-3 text-left`}>
                <div className="text-xl mb-1">{m.icon}</div>
                <div className={`text-xs font-bold ${colors.text}`}>{m.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{m.maxPoints} pts</div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/20 transition-all"
        >
          Comenzar el simulador →
        </motion.button>
        <p className="text-slate-600 text-xs mt-4">~15 min · Respuesta inmediata tras cada pregunta</p>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA DE PREGUNTA
// ─────────────────────────────────────────────
function QuestionScreen({
  module,
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: {
  module: GameModule;
  question: GameQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const colors = getModuleColor(module.color);
  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    onAnswer(i);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl">
        {/* Module header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{module.icon}</span>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>{module.title}</p>
                <p className="text-xs text-slate-500">{module.subtitle}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
              {questionNumber} / {totalQuestions}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${
                module.color === "blue" ? "from-blue-500 to-blue-400" :
                module.color === "purple" ? "from-purple-500 to-purple-400" :
                module.color === "violet" ? "from-violet-500 to-violet-400" :
                module.color === "cyan" ? "from-cyan-500 to-cyan-400" :
                module.color === "emerald" ? "from-emerald-500 to-emerald-400" :
                "from-amber-500 to-amber-400"
              }`}
              initial={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>

        {/* Question card */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className={`glass rounded-2xl p-6 mb-5 border ${colors.border}`}
        >
          {(() => {
            const subtitleIsQuestion = question.subtitle &&
              (question.subtitle.startsWith("¿") || question.subtitle.startsWith("Identifica"));
            if (subtitleIsQuestion) {
              return (
                <>
                  <h2 className="text-white font-bold text-lg sm:text-xl leading-relaxed mb-3">
                    {question.subtitle}
                  </h2>
                  <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4 text-slate-200 text-sm leading-relaxed">
                    {question.prompt}
                  </div>
                </>
              );
            }
            return (
              <>
                <h2 className="text-white font-bold text-lg sm:text-xl leading-relaxed mb-1">
                  {question.prompt}
                </h2>
                {question.subtitle && (
                  <p className="text-white text-sm font-medium mt-2 pt-2 border-t border-white/8">
                    {question.subtitle}
                  </p>
                )}
              </>
            );
          })()}
        </motion.div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={selected === null ? { scale: 1.01, x: 4 } : {}}
              whileTap={selected === null ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm leading-relaxed ${
                selected === null
                  ? "glass-light border-white/8 text-slate-300 hover:border-white/20 hover:text-white cursor-pointer"
                  : selected === i
                  ? "border-blue-400/50 bg-blue-900/20 text-white"
                  : "border-white/5 bg-slate-900/30 text-slate-600 cursor-not-allowed"
              }`}
            >
              <span className={`inline-block w-6 h-6 rounded-full border text-xs font-bold mr-3 text-center leading-5 shrink-0 ${
                selected === null
                  ? "border-slate-600 text-slate-500"
                  : selected === i
                  ? "border-blue-400 text-blue-400"
                  : "border-slate-700 text-slate-700"
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA DE RETROALIMENTACIÓN
// ─────────────────────────────────────────────
function FeedbackScreen({
  module,
  question,
  selectedAnswer,
  earnedPoints,
  isPartial,
  questionNumber,
  totalQuestions,
  onContinue,
}: {
  module: GameModule;
  question: GameQuestion;
  selectedAnswer: number;
  earnedPoints: number;
  isPartial: boolean;
  questionNumber: number;
  totalQuestions: number;
  onContinue: () => void;
}) {
  const isCorrect = selectedAnswer === question.correctIndex;
  const colors = getModuleColor(module.color);
  const isLastQuestion = questionNumber === totalQuestions;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl">
        {/* Result banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-5 mb-5 border ${
            isCorrect && !isPartial
              ? "bg-green-900/20 border-green-500/40"
              : isPartial
              ? "bg-yellow-900/20 border-yellow-500/40"
              : "bg-red-900/20 border-red-500/40"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl mt-0.5">
              {isCorrect && !isPartial ? "✅" : isPartial ? "⚡" : "❌"}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-bold text-base ${
                  isCorrect && !isPartial ? "text-green-300" :
                  isPartial ? "text-yellow-300" : "text-red-300"
                }`}>
                  {isCorrect && !isPartial ? "¡Correcto!" : isPartial ? "¡Casi! Segunda mejor opción" : "No es la respuesta óptima"}
                </h3>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className={`font-black text-xl ${
                    earnedPoints > 0 ? "text-yellow-400" : "text-slate-500"
                  }`}
                >
                  +{earnedPoints} pts
                </motion.span>
              </div>

              {/* Selected answer */}
              <p className="text-slate-400 text-xs mb-3">
                Tu respuesta: <span className="text-slate-200">{question.options[selectedAnswer]}</span>
              </p>

              {/* Correct answer if wrong */}
              {(!isCorrect || isPartial) && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-3">
                  <p className="text-xs text-green-400 font-medium mb-1">Respuesta óptima:</p>
                  <p className="text-green-200 text-sm">{question.options[question.correctIndex]}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Feedback explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-5 mb-4 border border-white/8"
        >
          <p className="text-slate-300 text-sm leading-relaxed">{question.feedback}</p>
        </motion.div>

        {/* Best practice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`${colors.bg} rounded-2xl p-5 mb-6 border ${colors.border}`}
        >
          <p className={`text-sm leading-relaxed ${colors.text}`}>{question.bestPractice}</p>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${colors.btn}`}
        >
          {isLastQuestion ? `Completar ${module.title} →` : `Siguiente pregunta →`}
        </motion.button>

        <p className="text-center text-slate-600 text-xs mt-3">
          Pregunta {questionNumber} de {totalQuestions}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA DE TRANSICIÓN ENTRE MÓDULOS
// ─────────────────────────────────────────────
function TransitionScreen({
  completedModule,
  nextModule,
  moduleScore,
  totalScore,
  unlockedCount,
  onContinue,
}: {
  completedModule: GameModule;
  nextModule: GameModule | null;
  moduleScore: number;
  totalScore: number;
  unlockedCount: number;
  onContinue: () => void;
}) {
  const colors = getModuleColor(completedModule.color);
  const pct = Math.round((moduleScore / completedModule.maxPoints) * 100);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg text-center">
        {/* Completed badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {pct >= 80 ? "🏆" : pct >= 50 ? "⭐" : "📚"}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black text-white mb-1"
        >
          {completedModule.icon} {completedModule.title} completado
        </motion.h2>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border ${colors.border} mb-6`}
        >
          <span className={`font-black text-xl ${colors.text}`}>{moduleScore}</span>
          <span className="text-slate-500 text-sm">/ {completedModule.maxPoints} pts</span>
          <span className={`text-sm font-medium ${pct >= 80 ? "text-green-400" : pct >= 50 ? "text-yellow-400" : "text-slate-400"}`}>
            ({pct}%)
          </span>
        </motion.div>

        {/* GARTNER letter unlocked */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-5 mb-6 border border-white/8"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Progreso del Método GARTNER</p>
          <GartnerLetters unlockedCount={unlockedCount} />
          <p className={`text-sm font-medium mt-3 ${colors.text}`}>
            Letra <strong>{completedModule.gartnerLetter}</strong> desbloqueada —{" "}
            <span className="text-slate-300">{completedModule.gartnerWord}</span>
          </p>
        </motion.div>

        {/* Total score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-4 mb-6 border border-white/8"
        >
          <p className="text-slate-500 text-xs mb-1">Puntuación acumulada</p>
          <p className="text-3xl font-black text-white">
            <span className="text-yellow-400">{totalScore}</span>
            <span className="text-slate-600 text-lg font-normal"> / {MAX_TOTAL_SCORE} pts</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Nivel actual: {getMasteryLevel(totalScore).badge} {getMasteryLevel(totalScore).level}</p>
        </motion.div>

        {/* Continue */}
        {nextModule ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="text-slate-400 text-sm mb-3">
              Siguiente: <span className="text-white font-medium">{nextModule.icon} {nextModule.title}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all ${getModuleColor(nextModule.color).btn}`}
            >
              Comenzar {nextModule.title} →
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 transition-all"
          >
            Ver resultados finales →
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA DE RESULTADOS FINALES
// ─────────────────────────────────────────────
function ResultsScreen({
  scores,
  onRestart,
}: {
  scores: number[];
  onRestart: () => void;
}) {
  const total = getTotalScore(scores);
  const mastery = getMasteryLevel(total);
  const pct = Math.round((total / MAX_TOTAL_SCORE) * 100);

  return (
    <div className="min-h-screen pt-16 pb-16 px-4 flex flex-col items-center justify-start">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Trophy */}
        <motion.div
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
          className="text-7xl mb-4"
        >
          {mastery.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-black text-white mb-2"
        >
          Nivel: <span className="gradient-text">{mastery.level}</span>
        </motion.h1>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-6xl font-black text-yellow-400">{total}</p>
          <p className="text-slate-400 text-sm">de {MAX_TOTAL_SCORE} puntos posibles ({pct}%)</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="h-3 bg-white/8 rounded-full overflow-hidden mb-8 mx-4"
        >
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${mastery.color}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Mastery description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 mb-6 border border-white/8 text-left"
        >
          <h3 className="text-white font-bold mb-2">¿Qué significa ser {mastery.level}?</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{mastery.description}</p>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
            <p className="text-xs text-blue-400 font-medium mb-1 uppercase tracking-wide">Próximo paso recomendado</p>
            <p className="text-blue-200 text-sm">{mastery.nextStep}</p>
          </div>
        </motion.div>

        {/* Module breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-5 mb-6 border border-white/8"
        >
          <h3 className="text-white font-bold mb-4 text-left">Puntaje por módulo</h3>
          <div className="space-y-3">
            {ALL_MODULES.map((m, i) => {
              const s = scores[i] ?? 0;
              const mpct = Math.round((s / m.maxPoints) * 100);
              const colors = getModuleColor(m.color);
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="text-base shrink-0">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400 truncate">{m.title}</span>
                      <span className={`text-xs font-bold ${colors.text} shrink-0 ml-2`}>
                        {s}/{m.maxPoints}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${
                          m.color === "blue" ? "from-blue-500 to-blue-400" :
                          m.color === "purple" ? "from-purple-500 to-purple-400" :
                          m.color === "violet" ? "from-violet-500 to-violet-400" :
                          m.color === "cyan" ? "from-cyan-500 to-cyan-400" :
                          m.color === "emerald" ? "from-emerald-500 to-emerald-400" :
                          "from-amber-500 to-amber-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${mpct}%` }}
                        transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* GARTNER complete */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-5 mb-8 border border-amber-500/20"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Método GARTNER — Completado</p>
          <GartnerLetters unlockedCount={7} />
          <div className="mt-4 grid grid-cols-1 gap-1.5">
            {GARTNER_ACRONYM.map((item) => (
              <div key={item.letter + item.word} className="flex items-center gap-2 text-left">
                <span className="w-6 h-6 rounded bg-gradient-to-br from-blue-600/50 to-purple-700/50 border border-blue-500/30 flex items-center justify-center font-bold text-blue-300 text-xs shrink-0">
                  {item.letter}
                </span>
                <span className="text-slate-300 text-xs">
                  <strong className="text-white">{item.word}</strong> — {item.description}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mastery thresholds */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-4 mb-6 border border-white/8"
        >
          <p className="text-xs text-slate-500 mb-3 uppercase tracking-wide">Niveles de maestría</p>
          <div className="flex gap-2">
            {MASTERY_LEVELS.map((l) => (
              <div
                key={l.level}
                className={`flex-1 rounded-xl p-3 border transition-all ${
                  total >= l.min && total <= l.max
                    ? "border-yellow-500/50 bg-yellow-900/10"
                    : "border-white/8 opacity-50"
                }`}
              >
                <p className="text-lg mb-0.5">{l.badge}</p>
                <p className="text-white font-bold text-xs">{l.level}</p>
                <p className="text-slate-500 text-xs">{l.min}–{l.max} pts</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-green-900/30"
          >
            🔄 Volver a jugar — ¡llega al 100%!
          </button>
          <a
            href="/"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm text-center transition-all"
          >
            Volver al Método GARTNER
          </a>
        </motion.div>

        <p className="text-slate-600 text-xs mt-6">
          Cracks de IA — Simulador oficial del Método GARTNER · metodogartner.com
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function BridgeIA() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  const currentModule = ALL_MODULES[state.moduleIndex];
  const currentQuestion = currentModule?.questions[state.questionIndex];
  const totalScore = getTotalScore(state.scores);
  const unlockedCount = state.moduleIndex + (state.phase === "transition" || state.phase === "results" ? 1 : 0);

  // Handle user selecting an answer
  const handleAnswer = useCallback((selectedIndex: number) => {
    const q = currentQuestion;
    if (!q) return;

    let earned = 0;
    let partial = false;

    if (selectedIndex === q.correctIndex) {
      earned = q.points;
    } else if (q.secondBestIndex !== undefined && selectedIndex === q.secondBestIndex && q.partialPoints) {
      earned = q.partialPoints;
      partial = true;
    }

    setState((prev) => ({
      ...prev,
      phase: "feedback",
      selectedAnswer: selectedIndex,
      earnedPoints: earned,
      isPartial: partial,
      scores: prev.scores.map((s, i) => (i === prev.moduleIndex ? s + earned : s)),
    }));
  }, [currentQuestion]);

  // Handle continue after feedback
  const handleContinue = useCallback(() => {
    setState((prev) => {
      const mod = ALL_MODULES[prev.moduleIndex];
      const isLastQuestion = prev.questionIndex >= mod.questions.length - 1;

      if (isLastQuestion) {
        // Move to transition screen
        return { ...prev, phase: "transition", selectedAnswer: null, earnedPoints: 0, isPartial: false };
      } else {
        // Next question
        return { ...prev, phase: "playing", questionIndex: prev.questionIndex + 1, selectedAnswer: null, earnedPoints: 0, isPartial: false };
      }
    });
  }, []);

  // Handle continue from transition screen
  const handleTransitionContinue = useCallback(() => {
    setState((prev) => {
      const isLastModule = prev.moduleIndex >= ALL_MODULES.length - 1;
      if (isLastModule) {
        return { ...prev, phase: "results" };
      } else {
        return { ...prev, phase: "playing", moduleIndex: prev.moduleIndex + 1, questionIndex: 0, selectedAnswer: null };
      }
    });
  }, []);

  const handleRestart = () => setState(INITIAL_STATE);

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Score bar (hidden on intro and results) */}
      {state.phase !== "intro" && state.phase !== "results" && (
        <ScoreBar scores={state.scores} moduleIndex={state.moduleIndex} />
      )}

      <AnimatePresence mode="wait">
        {state.phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <IntroScreen onStart={() => setState((p) => ({ ...p, phase: "playing" }))} />
          </motion.div>
        )}

        {state.phase === "playing" && currentQuestion && (
          <motion.div key={`q-${state.moduleIndex}-${state.questionIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuestionScreen
              module={currentModule}
              question={currentQuestion}
              questionNumber={state.questionIndex + 1}
              totalQuestions={currentModule.questions.length}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}

        {state.phase === "feedback" && currentQuestion && state.selectedAnswer !== null && (
          <motion.div key={`fb-${state.moduleIndex}-${state.questionIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FeedbackScreen
              module={currentModule}
              question={currentQuestion}
              selectedAnswer={state.selectedAnswer}
              earnedPoints={state.earnedPoints}
              isPartial={state.isPartial}
              questionNumber={state.questionIndex + 1}
              totalQuestions={currentModule.questions.length}
              onContinue={handleContinue}
            />
          </motion.div>
        )}

        {state.phase === "transition" && (
          <motion.div key={`trans-${state.moduleIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TransitionScreen
              completedModule={currentModule}
              nextModule={ALL_MODULES[state.moduleIndex + 1] ?? null}
              moduleScore={state.scores[state.moduleIndex]}
              totalScore={totalScore}
              unlockedCount={unlockedCount}
              onContinue={handleTransitionContinue}
            />
          </motion.div>
        )}

        {state.phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsScreen scores={state.scores} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
