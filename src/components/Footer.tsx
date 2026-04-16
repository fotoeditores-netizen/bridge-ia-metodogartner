"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-4xl font-black gradient-text-gold mb-2">MÉTODO GARTNER</div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Transformando organizaciones a través de la adopción cultural e inteligente de la IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "El Método",
              links: ["Fase 1: Sensibilización", "Fase 2: Diagnóstico", "Fase 3: Fundamentos", "Fase 4: Talleres", "Fase 5: Casos propios"],
            },
            {
              title: "Herramientas",
              links: ["Test de Perfil IA", "Diagnóstico Madurez", "Cotizador Modular", "Plan de Acción"],
            },
            {
              title: "Conectar",
              links: ["Agendar reunión", "Solicitar propuesta", "Newsletter IA", "LinkedIn"],
            },
          ].map((col, i) => (
            <div key={i}>
              <h5 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
                {col.title}
              </h5>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 Método GARTNER. Todos los derechos reservados.
          </p>
          <p className="text-slate-700 text-xs">
            Construido con propósito · Impulsado por IA · Transformado por personas
          </p>
        </div>
      </div>
    </footer>
  );
}
