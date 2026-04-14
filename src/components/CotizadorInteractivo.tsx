"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Module = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unitLabel: string;
  unitPrice: number;
  monthlyPrice: number;
  quantity: number;
  enabled: boolean;
  type: "counter" | "toggle" | "bootcamp";
  min: number;
  max: number;
  attendees?: number; // only used when type === "bootcamp"
};

// Economía de escala: precio por persona según rango de asistentes
function pricePerPerson(attendees: number): number {
  if (attendees <= 20) return 125;
  if (attendees <= 50) return 100;
  if (attendees <= 100) return 80;
  return 60;
}

function bootcampTotal(sessions: number, attendees: number): number {
  return pricePerPerson(attendees) * attendees * sessions;
}

const INITIAL_MODULES: Module[] = [
  {
    id: "sensibilizacion",
    name: "BootCamp de Sensibilización",
    description: "Inmersión ejecutiva de alineación cultural (½ día)",
    icon: "🌱",
    unitLabel: "sesiones",
    unitPrice: 0,
    monthlyPrice: 0,
    quantity: 1,
    attendees: 10,
    enabled: true,
    type: "bootcamp",
    min: 1,
    max: 5,
  },
  {
    id: "diagnostico",
    name: "Diagnóstico de Madurez IA",
    description: "Evaluación profunda + reporte ejecutivo",
    icon: "🔍",
    unitLabel: "diagnósticos",
    unitPrice: 3800,
    monthlyPrice: 0,
    quantity: 1,
    enabled: true,
    type: "counter",
    min: 1,
    max: 3,
  },
  {
    id: "formacion",
    name: "Programa de Formación",
    description: "Capacitación por equipo (hasta 20 personas)",
    icon: "📚",
    unitLabel: "grupos",
    unitPrice: 4500,
    monthlyPrice: 0,
    quantity: 1,
    enabled: false,
    type: "counter",
    min: 1,
    max: 10,
  },
  {
    id: "bootcamp-industria",
    name: "BootCamp de Industria",
    description: "Sesiones aplicadas al sector con casos reales (full day)",
    icon: "🏭",
    unitLabel: "sesiones",
    unitPrice: 0,
    monthlyPrice: 0,
    quantity: 2,
    attendees: 10,
    enabled: false,
    type: "bootcamp",
    min: 1,
    max: 8,
  },
  {
    id: "proyectos",
    name: "Desarrollo de Caso Propio",
    description: "Prototipo IA + implementación guiada",
    icon: "🚀",
    unitLabel: "proyectos",
    unitPrice: 8500,
    monthlyPrice: 0,
    quantity: 1,
    enabled: false,
    type: "counter",
    min: 1,
    max: 5,
  },
  {
    id: "acompanamiento",
    name: "Acompañamiento Mensual",
    description: "Mentoría continua + revisión de avances",
    icon: "🤝",
    unitLabel: "meses",
    unitPrice: 0,
    monthlyPrice: 1800,
    quantity: 3,
    enabled: false,
    type: "counter",
    min: 1,
    max: 12,
  },
  {
    id: "plataforma",
    name: "Plataforma de Seguimiento",
    description: "Dashboard de madurez + KPIs en tiempo real",
    icon: "📊",
    unitLabel: "licencia",
    unitPrice: 1500,
    monthlyPrice: 490,
    quantity: 1,
    enabled: false,
    type: "toggle",
    min: 1,
    max: 1,
  },
  {
    id: "gobernanza",
    name: "Marco de Gobernanza IA",
    description: "Políticas, ética y compliance personalizado",
    icon: "⚖️",
    unitLabel: "paquete",
    unitPrice: 5200,
    monthlyPrice: 0,
    quantity: 1,
    enabled: false,
    type: "toggle",
    min: 1,
    max: 1,
  },
  {
    id: "comunidad",
    name: "Red de Práctica IA",
    description: "Acceso a comunidad + eventos exclusivos",
    icon: "🌐",
    unitLabel: "licencia",
    unitPrice: 0,
    monthlyPrice: 250,
    quantity: 1,
    enabled: false,
    type: "toggle",
    min: 1,
    max: 1,
  },
];

export default function CotizadorInteractivo() {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [sent, setSent] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, quantity: Math.max(m.min, Math.min(m.max, m.quantity + delta)) }
          : m
      )
    );
  };

  const updateAttendees = (id: string, value: number) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, attendees: Math.max(1, Math.min(200, value)) }
          : m
      )
    );
  };

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const getModuleTotal = (m: Module): number => {
    if (m.type === "bootcamp") {
      return bootcampTotal(m.quantity, m.attendees ?? 10);
    }
    return m.unitPrice * m.quantity;
  };

  const activeModules = modules.filter((m) => m.enabled);

  const totalUpfront = activeModules.reduce(
    (sum, m) => sum + getModuleTotal(m),
    0
  );

  const totalMonthly = activeModules.reduce(
    (sum, m) => sum + m.monthlyPrice * m.quantity,
    0
  );

  const buildSummary = () => {
    const lines = activeModules.map((m) => {
      if (m.type === "bootcamp") {
        const attendees = m.attendees ?? 10;
        const total = bootcampTotal(m.quantity, attendees);
        return `• ${m.name} (${m.quantity} sesiones x ${attendees} personas): $${total.toLocaleString()} USD`;
      }
      const upfront = m.unitPrice * m.quantity;
      const monthly = m.monthlyPrice * m.quantity;
      return `• ${m.name} (${m.quantity} ${m.unitLabel})${upfront > 0 ? ` — $${upfront.toLocaleString()} USD` : ""}${monthly > 0 ? ` — $${monthly.toLocaleString()}/mes` : ""}`;
    });
    return [
      "Solicitud de Cotización — Método GARTNER",
      "",
      "Módulos seleccionados:",
      ...lines,
      "",
      `Total inicial: $${totalUpfront.toLocaleString()} USD`,
      totalMonthly > 0 ? `Recurrente mensual: $${totalMonthly.toLocaleString()} USD/mes` : "",
      "",
      "Me gustaría recibir una propuesta formal. ¿Podemos agendar una llamada?",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(buildSummary());
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setSent(true);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Cotización Método GARTNER");
    const body = encodeURIComponent(buildSummary());
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <section id="cotizador" className="py-24 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-medium mb-4">
            Cotizador en tiempo real
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Diseña tu{" "}
            <span className="gradient-text">Programa GARTNER</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Activa los módulos que necesitas y configura la cantidad. El precio se actualiza al instante.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Modules list */}
          <div className="lg:col-span-2 space-y-3">
            {modules.map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border p-5 transition-all duration-300 ${
                  module.enabled
                    ? module.type === "bootcamp"
                      ? "border-violet-500/30 bg-violet-500/5 glass"
                      : "glass border-blue-500/30 bg-blue-500/5"
                    : "glass border-white/10 opacity-70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{module.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-bold ${module.enabled ? "text-white" : "text-slate-400"}`}>
                          {module.name}
                        </h4>
                        {module.type === "bootcamp" && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 font-semibold uppercase tracking-wide">
                            Economía de escala
                          </span>
                        )}
                      </div>
                      {/* Toggle for toggle-type */}
                      {module.type === "toggle" && (
                        <button
                          onClick={() => toggleModule(module.id)}
                          className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${
                            module.enabled ? "bg-blue-500" : "bg-slate-700"
                          }`}
                        >
                          <motion.div
                            animate={{ x: module.enabled ? 24 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 rounded-full bg-white"
                          />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{module.description}</p>

                    {/* BootCamp card — dual controls */}
                    {module.type === "bootcamp" && (
                      <div className="space-y-3">
                        {/* Pricing tiers hint */}
                        {module.enabled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="grid grid-cols-4 gap-1 text-center overflow-hidden"
                          >
                            {[
                              { range: "1–20", price: "$125", active: (module.attendees ?? 10) <= 20 },
                              { range: "21–50", price: "$100", active: (module.attendees ?? 10) > 20 && (module.attendees ?? 10) <= 50 },
                              { range: "51–100", price: "$80", active: (module.attendees ?? 10) > 50 && (module.attendees ?? 10) <= 100 },
                              { range: "100+", price: "$60", active: (module.attendees ?? 10) > 100 },
                            ].map((tier) => (
                              <div
                                key={tier.range}
                                className={`rounded-lg py-1.5 border text-[10px] transition-all duration-300 ${
                                  tier.active
                                    ? "border-violet-400/60 bg-violet-500/20 text-violet-200"
                                    : "border-white/5 bg-slate-800/40 text-slate-600"
                                }`}
                              >
                                <div className="font-bold">{tier.price}</div>
                                <div className="opacity-70">{tier.range} p.</div>
                              </div>
                            ))}
                          </motion.div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {/* Variable A: Cantidad de sesiones */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Sesiones</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  if (!module.enabled) toggleModule(module.id);
                                  else updateQuantity(module.id, -1);
                                }}
                                disabled={module.enabled && module.quantity <= module.min}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                                  module.enabled && module.quantity > module.min
                                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                                    : "bg-slate-800 text-slate-600 cursor-not-allowed"
                                }`}
                              >
                                −
                              </button>
                              <motion.div
                                key={module.quantity}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className={`w-10 text-center font-bold text-sm ${
                                  module.enabled ? "text-white" : "text-slate-500"
                                }`}
                              >
                                {module.enabled ? module.quantity : "0"}
                              </motion.div>
                              <button
                                onClick={() => {
                                  if (!module.enabled) toggleModule(module.id);
                                  else updateQuantity(module.id, 1);
                                }}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                                  !module.enabled || module.quantity < module.max
                                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                                    : "bg-slate-800 text-slate-600 cursor-not-allowed"
                                }`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Variable B: Asistentes por sesión */}
                          <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                                Asistentes por sesión
                              </span>
                              {module.enabled && (
                                <span className="text-[10px] text-violet-400 font-bold">
                                  ${pricePerPerson(module.attendees ?? 10)}/persona
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min={1}
                                max={200}
                                value={module.attendees ?? 10}
                                onChange={(e) => {
                                  if (!module.enabled) toggleModule(module.id);
                                  updateAttendees(module.id, Number(e.target.value));
                                }}
                                className="flex-1 h-2 appearance-none rounded-full cursor-pointer"
                                style={{
                                  background: module.enabled
                                    ? `linear-gradient(to right, #7c3aed ${((module.attendees ?? 10) / 200) * 100}%, #334155 ${((module.attendees ?? 10) / 200) * 100}%)`
                                    : "#1e293b",
                                }}
                              />
                              <input
                                type="number"
                                min={1}
                                max={200}
                                value={module.attendees ?? 10}
                                onChange={(e) => {
                                  if (!module.enabled) toggleModule(module.id);
                                  updateAttendees(module.id, Number(e.target.value));
                                }}
                                className={`w-14 text-center text-sm font-bold rounded-lg px-1 py-1 border bg-slate-800 transition-all ${
                                  module.enabled
                                    ? "text-white border-violet-500/40"
                                    : "text-slate-500 border-slate-700"
                                }`}
                              />
                            </div>
                          </div>

                          {/* Toggle on/off */}
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Activar</span>
                            <button
                              onClick={() => toggleModule(module.id)}
                              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                                module.enabled ? "bg-violet-500" : "bg-slate-700"
                              }`}
                            >
                              <motion.div
                                animate={{ x: module.enabled ? 20 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                              />
                            </button>
                          </div>
                        </div>

                        {/* Live price preview */}
                        {module.enabled && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between pt-2 border-t border-violet-500/10"
                          >
                            <span className="text-xs text-slate-500">
                              {module.quantity} sesión{module.quantity !== 1 ? "es" : ""} × {module.attendees ?? 10} personas × ${pricePerPerson(module.attendees ?? 10)}/p.
                            </span>
                            <motion.span
                              key={bootcampTotal(module.quantity, module.attendees ?? 10)}
                              initial={{ scale: 1.1, color: "#a78bfa" }}
                              animate={{ scale: 1, color: "#e2e8f0" }}
                              className="text-sm font-black"
                            >
                              ${bootcampTotal(module.quantity, module.attendees ?? 10).toLocaleString()} USD
                            </motion.span>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Standard counter-type controls */}
                    {module.type === "counter" && (
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex gap-3 text-sm">
                          {module.unitPrice > 0 && (
                            <span className={module.enabled ? "text-blue-300" : "text-slate-500"}>
                              ${module.unitPrice.toLocaleString()}/{module.unitLabel}
                            </span>
                          )}
                          {module.monthlyPrice > 0 && (
                            <span className={module.enabled ? "text-amber-300" : "text-slate-500"}>
                              ${module.monthlyPrice.toLocaleString()}/mes
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              if (!module.enabled) toggleModule(module.id);
                              else updateQuantity(module.id, -1);
                            }}
                            disabled={module.enabled && module.quantity <= module.min}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                              module.enabled && module.quantity > module.min
                                ? "bg-slate-700 hover:bg-slate-600 text-white"
                                : "bg-slate-800 text-slate-600 cursor-not-allowed"
                            }`}
                          >
                            −
                          </button>
                          <motion.div
                            key={module.quantity}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={`w-10 text-center font-bold text-sm ${
                              module.enabled ? "text-white" : "text-slate-500"
                            }`}
                          >
                            {module.enabled ? module.quantity : "0"}
                          </motion.div>
                          <button
                            onClick={() => {
                              if (!module.enabled) toggleModule(module.id);
                              else updateQuantity(module.id, 1);
                            }}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                              !module.enabled || module.quantity < module.max
                                ? "bg-blue-600 hover:bg-blue-500 text-white"
                                : "bg-slate-800 text-slate-600 cursor-not-allowed"
                            }`}
                          >
                            +
                          </button>
                          <button
                            onClick={() => toggleModule(module.id)}
                            className={`ml-2 relative w-10 h-5 rounded-full transition-all duration-300 ${
                              module.enabled ? "bg-blue-500" : "bg-slate-700"
                            }`}
                          >
                            <motion.div
                              animate={{ x: module.enabled ? 20 : 2 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                            />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Toggle-type pricing */}
                    {module.type === "toggle" && (
                      <div className="flex gap-3 text-sm">
                        {module.unitPrice > 0 && (
                          <span className={module.enabled ? "text-blue-300" : "text-slate-500"}>
                            ${module.unitPrice.toLocaleString()} inicial
                          </span>
                        )}
                        {module.monthlyPrice > 0 && (
                          <span className={module.enabled ? "text-amber-300" : "text-slate-500"}>
                            ${module.monthlyPrice.toLocaleString()}/mes
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <motion.div
                className="glass rounded-3xl p-6 border border-white/10"
                layout
              >
                <h3 className="text-lg font-bold text-white mb-4">Resumen</h3>

                <div className="space-y-2 mb-6 min-h-[60px]">
                  <AnimatePresence>
                    {activeModules.length === 0 ? (
                      <p className="text-slate-500 text-sm text-center py-4">
                        Activa módulos para ver el resumen
                      </p>
                    ) : (
                      activeModules.map((m) => (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-between items-start gap-2 text-sm"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="text-slate-400 flex items-center gap-1 truncate">
                              {m.icon}
                              <span className="truncate">{m.name}</span>
                            </span>
                            {m.type === "bootcamp" ? (
                              <span className="text-[10px] text-violet-400 ml-5">
                                {m.quantity} ses., {m.attendees ?? 10} p. c/u
                              </span>
                            ) : m.type === "counter" && m.enabled ? (
                              <span className="text-[10px] text-slate-600 ml-5">×{m.quantity}</span>
                            ) : null}
                          </div>
                          <div className="text-right shrink-0">
                            {m.type === "bootcamp" ? (
                              <div className="text-violet-300 text-xs font-bold">
                                ${bootcampTotal(m.quantity, m.attendees ?? 10).toLocaleString()}
                              </div>
                            ) : (
                              <>
                                {m.unitPrice > 0 && (
                                  <div className="text-blue-300 text-xs">
                                    ${(m.unitPrice * m.quantity).toLocaleString()}
                                  </div>
                                )}
                                {m.monthlyPrice > 0 && (
                                  <div className="text-amber-300 text-xs">
                                    +${(m.monthlyPrice * m.quantity).toLocaleString()}/mo
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-400 text-sm">Total inicial</span>
                    <motion.span
                      key={totalUpfront}
                      initial={{ scale: 1.2, color: "#60a5fa" }}
                      animate={{ scale: 1, color: "#ffffff" }}
                      className="text-2xl font-black text-white"
                    >
                      ${totalUpfront.toLocaleString()}
                    </motion.span>
                  </div>
                  <div className="text-xs text-slate-600 text-right -mt-2">USD · pago único</div>

                  {totalMonthly > 0 && (
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-400 text-sm">Recurrente mensual</span>
                      <motion.span
                        key={totalMonthly}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold text-amber-400"
                      >
                        +${totalMonthly.toLocaleString()}<span className="text-sm">/mes</span>
                      </motion.span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <AnimatePresence>
                    {sent ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-3 glass-light rounded-2xl text-emerald-400 text-sm font-semibold"
                      >
                        ✓ Solicitud enviada correctamente
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                        <button
                          onClick={handleWhatsApp}
                          disabled={activeModules.length === 0}
                          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white font-bold hover:from-green-500 hover:to-emerald-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span>📱</span>
                          Enviar por WhatsApp
                        </button>
                        <button
                          onClick={handleEmail}
                          disabled={activeModules.length === 0}
                          className="w-full py-3 glass rounded-2xl text-slate-200 font-bold border border-white/10 hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span>📧</span>
                          Enviar por Email
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <p className="text-xs text-slate-600 text-center">
                    Sin compromiso · Respuesta en 24h hábiles
                  </p>
                </div>
              </motion.div>

              <div className="glass rounded-2xl p-4 text-center">
                <p className="text-xs text-slate-500 leading-relaxed">
                  🔒 Cotización confidencial. Tus datos no son compartidos con terceros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
