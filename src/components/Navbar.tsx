import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
    return (
        <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-cyber-bg/85 border-b border-cyber-border">
            {/* 1. Top Live Telemetry Feed */}
            <div className="w-full bg-cyber-card/50 border-b border-cyber-border/40 py-1 px-4 text-xs font-mono flex items-center justify-between text-cyber-muted">
                <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                    <span className="text-cyber-emerald font-semibold flex items-center gap-1.5 shrink-0">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-emerald opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-emerald"></span>
                        </span>
                        LIVE FEED:
                    </span>
                    <span className="text-gray-300 truncate">
                        AEGIS_MIND Intel // Autonomous Agents Threat Defense Online
                    </span>
                </div>

                <div className="hidden sm:flex items-center gap-4 shrink-0 text-[11px] text-cyber-muted">
                    <span>LATENCY: 14ms</span>
                    <span className="text-cyber-cyan">STATUS: OPTIMAL</span>
                </div>
            </div>

            {/* 2. Main HUD Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand Logo: Aegis Shield + Wordmark */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-1.5 rounded-lg bg-cyber-card border border-cyber-cyan/30 group-hover:border-cyber-cyan shadow-neon-cyan/20 transition-all duration-300">
                        <svg
                            viewBox="0 0 100 100"
                            className="w-7 h-7 text-cyber-cyan"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                        >
                            <polygon
                                points="50,6 90,24 90,62 50,94 10,62 10,24"
                                className="stroke-cyber-cyan"
                                strokeLinejoin="round"
                            />
                            <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="50" y1="50" x2="24" y2="34" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="50" y1="50" x2="76" y2="34" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="50" y1="50" x2="30" y2="72" stroke="currentColor" strokeWidth="2.5" />
                            <line x1="50" y1="50" x2="70" y2="72" stroke="currentColor" strokeWidth="2.5" />
                            <circle
                                cx="50"
                                cy="50"
                                r="10"
                                className="fill-cyber-emerald stroke-cyber-emerald"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-wider text-white group-hover:text-cyber-cyan transition-colors">
                            AEGIS<span className="text-cyber-cyan">_MIND</span>
                        </span>
                        <span className="text-[9px] font-mono text-cyber-muted -mt-1 tracking-widest uppercase">
                            AI Security Lab
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-7 font-mono text-sm">
                    <Link href="/" className="text-cyber-cyan transition-colors">
            // Home
                    </Link>
                    <Link href="#articles" className="text-gray-400 hover:text-white transition-colors">
            // Articles
                    </Link>
                    <Link href="#ai-lab" className="text-gray-400 hover:text-white transition-colors">
            // AI Lab
                    </Link>
                    <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
            // About
                    </Link>
                </nav>

                {/* Action Button / Terminal Search */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyber-card border border-cyber-border text-xs font-mono text-cyber-muted hover:text-white hover:border-cyber-cyan/50 transition-all">
                        <Search className="w-3.5 h-3.5 text-cyber-cyan" />
                        <span className="hidden sm:inline">Search logs...</span>
                        <kbd className="hidden sm:inline bg-cyber-bg px-1.5 py-0.5 rounded text-[10px] text-cyber-muted border border-cyber-border">
                            ⌘K
                        </kbd>
                    </button>
                </div>
            </div>
        </header>
    );
}