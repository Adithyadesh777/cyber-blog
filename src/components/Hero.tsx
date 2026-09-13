import Link from "next/link";
import { Terminal, Shield, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full max-w-5xl mx-auto pt-16 pb-20 px-4 sm:px-6 flex flex-col items-center text-center font-mono">
            {/* Top Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs tracking-wider mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
                <span>SYSTEM V1.0 // AUTONOMOUS DEFENSE ACTIVE</span>
            </div>

            {/* Main Headline styled in Space Mono */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                Architecting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-teal-300 to-cyber-emerald">
                    Autonomous
                </span>
                <br />
                Defense & AI Exploits
            </h1>

            {/* Subtext */}
            <p className="max-w-2xl text-sm sm:text-base text-cyber-muted leading-relaxed mb-10">
                Engineered for adversarial resilience. Cataloging autonomous AI jailbreak vectors,
                real-time zero-day disclosures, and high-assurance cryptographic primitives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                    href="#articles"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyber-cyan text-cyber-bg font-bold text-xs hover:bg-cyber-emerald transition-all duration-200 shadow-lg shadow-cyber-cyan/10"
                >
                    <Shield className="w-4 h-4" />
                    <span>ACCESS INTEL ARCHIVE</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                    href="#ai-lab"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-cyber-border bg-cyber-card/80 text-white text-xs hover:border-cyber-cyan transition-all duration-200"
                >
                    <Terminal className="w-4 h-4 text-cyber-cyan" />
                    <span>LAUNCH CRYPTO LAB</span>
                </Link>
            </div>

            {/* Subtle Terminal Scan Line Indicator */}
            <div className="mt-14 flex items-center gap-3 text-[11px] text-cyber-muted/70">
                <span className="text-cyber-cyan select-none">&gt;</span>
                <span>INITIALIZING TELEMETRY PIPELINE...</span>
                <span className="w-2 h-4 bg-cyber-cyan inline-block animate-pulse" />
            </div>
        </section>
    );
}