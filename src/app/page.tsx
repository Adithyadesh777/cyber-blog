import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid text-white flex flex-col">
      {/* Sticky HUD Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="border border-cyber-cyan/30 bg-cyber-card/70 p-8 rounded-xl shadow-neon-cyan text-center max-w-lg backdrop-blur-sm">
          <span className="text-xs font-mono text-cyber-emerald uppercase tracking-widest block mb-2">
            ● AegisMind Security Kernel v1.0
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
            Autonomous Defense &amp; AI Exploits
          </h1>
          <p className="text-cyber-muted text-sm leading-relaxed">
            Navbar and live telemetry interface successfully mounted. Next: Hero section &amp; interactive particles.
          </p>
        </div>
      </main>
    </div>
  );
}