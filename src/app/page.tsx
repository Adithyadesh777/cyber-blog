import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TelemetryMetrics from "@/components/TelemetryMetrics";
import FeaturedArticles from "@/components/FeaturedArticles";
import AILabShowcase from "@/components/AILabShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid text-white flex flex-col">
      {/* Sticky HUD Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <Hero />
        <TelemetryMetrics />
        <FeaturedArticles />
        <AILabShowcase />
      </main>

      {/* HUD Telemetry Footer */}
      <Footer />
    </div>
  );
}