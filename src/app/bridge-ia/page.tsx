import type { Metadata } from "next";
import BridgeIA from "@/components/bridge-ia/BridgeIA";

export const metadata: Metadata = {
  title: "Cracks de IA — Simulador del Método GARTNER",
  description:
    "Pon a prueba tus conocimientos sobre Inteligencia Artificial con Cracks de IA: el simulador oficial del Método GARTNER para consultores. 5 módulos, 38 desafíos, hasta 615 puntos.",
  keywords: "IA, simulador, gamificación, método GARTNER, prompting, LLM, consultoría, Cracks de IA",
};

export default function BridgeIAPage() {
  return <BridgeIA />;
}
