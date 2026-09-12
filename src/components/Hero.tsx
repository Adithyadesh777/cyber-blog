import Link from "next/link";
import { Terminal, Cpu, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full pt-12 pb-20 flex flex-col items-center justify-center text-center px-4">
            {/* 1. Terminal Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card/80 border border-cyber-cyan/30 shadow-neon-cyan/20 backdrop-blur-sm mb-6">
                <span className="h-2 w-2 rounded-full bg-cyber-emerald animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-cyber-cyan uppercase">
                    System v1.0 // Autonomous Defense Active
                </span>
            </div>

            {/* 2. Main Cyber Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
                Architecting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-cyan animate-pulse">
                    Autonomous Defense
                </span>{" "}
                &amp; AI Exploits
            </h1>

            {/* 3. Subtitle Paragraph */}
            <p className="text-base sm:text-lg md:text-xl text-cyber-muted max-w-2xl mx-auto leading-relaxed mb-10 font-mono">
                Field notes, zero-day research, and weaponized AI workflows. Documenting
                the frontlines of cybersecurity and intelligent system resilience.
            </p>

            {/* 4. Action Buttons (CTA) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                    href="#articles"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyber-cyan text-cyber-bg font-mono font-bold text-sm hover:bg-cyber-emerald transition-all duration-300 shadow-neon-cyan hover:shadow-neon-emerald group"
                >
                    <Terminal className="w-4 h-4" />
                    <span>Access Research</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                    href="#ai-lab"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyber-card border border-cyber-border font-mono text-sm text-gray-300 hover:text-white hover:border-cyber-cyan/60 hover:bg-cyber-card/80 transition-all duration-300 backdrop-blur-sm"
                >
                    <Cpu className="w-4 h-4 text-cyber-cyan" />
                    <span>Explore AI Lab</span>
                </Link>
            </div>
        </section>
    );
}