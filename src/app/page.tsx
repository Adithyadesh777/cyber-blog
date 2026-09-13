import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TelemetryMetrics from "@/components/TelemetryMetrics";
import FeaturedArticles from "@/components/FeaturedArticles";
import AILabShowcase from "@/components/AILabShowcase";
import Footer from "@/components/Footer";
import CyberDigitsBackground from "@/components/CyberDigitsBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid text-white flex flex-col relative overflow-x-hidden">
      {/* Animated Floating Digits Canvas (Fixed in Background) */}
      <CyberDigitsBackground />

      {/* Sticky HUD Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center relative z-10">
        <Hero />
        <TelemetryMetrics />
        <FeaturedArticles />
        <AILabShowcase />
      </main>

      {/* Tactical HUD Footer */}
      <Footer />
    </div>
  );
}