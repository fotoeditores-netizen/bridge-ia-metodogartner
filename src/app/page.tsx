import HeroSection from "@/components/HeroSection";
import TestPerfilIA from "@/components/TestPerfilIA";
import MetodologiaGartner from "@/components/MetodologiaGartner";
import TestMadurezCorporativa from "@/components/TestMadurezCorporativa";
import CotizadorInteractivo from "@/components/CotizadorInteractivo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TestPerfilIA />
      <MetodologiaGartner />
      <TestMadurezCorporativa />
      <CotizadorInteractivo />
      <Footer />
    </main>
  );
}
