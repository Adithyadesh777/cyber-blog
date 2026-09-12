import Link from "next/link";
import { Shield, Terminal, Cpu } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-cyber-border bg-[#05080e] relative z-10 font-mono">
            {/* Top Telemetry Strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-cyber-border/40 flex flex-wrap items-center justify-between text-xs text-cyber-muted gap-4">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyber-emerald animate-pulse" />
                    <span>STATUS: ALL DEFENSE SYSTEMS OPERATIONAL</span>
                </div>
                <div className="flex items-center gap-6 text-[11px]">
                    <span>NODE: SG-01-PROD</span>
                    <span>LATENCY: 12ms</span>
                    <span>PROTOCOL: TLS 1.3 / ML-KEM</span>
                </div>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand & Mission */}
                <div className="space-y-4 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-wider">
                        <Shield className="w-5 h-5 text-cyber-cyan" />
                        <span>
                            AEGIS<span className="text-cyber-cyan">_MIND</span>
                        </span>
                    </Link>
                    <p className="text-xs text-cyber-muted leading-relaxed">
                        Autonomous threat intelligence, zero-day research, and weaponized AI defense systems.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        {/* GitHub Link */}
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Repository"
                            className="p-2 rounded bg-cyber-card border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-cyan/50 transition-colors"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>

                        {/* X / Twitter Link */}
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="X Profile"
                            className="p-2 rounded bg-cyber-card border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-cyan/50 transition-colors"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Column 1: Research Links */}
                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-cyber-cyan">
            // Research Dispatches
                    </h4>
                    <ul className="space-y-2 text-xs text-cyber-muted">
                        <li>
                            <Link href="#articles" className="hover:text-cyber-cyan transition-colors">
                                LLM Jailbreak Vectors
                            </Link>
                        </li>
                        <li>
                            <Link href="#articles" className="hover:text-cyber-cyan transition-colors">
                                eBPF Kernel Probes
                            </Link>
                        </li>
                        <li>
                            <Link href="#articles" className="hover:text-cyber-cyan transition-colors">
                                Post-Quantum Handshakes
                            </Link>
                        </li>
                        <li>
                            <Link href="#articles" className="hover:text-cyber-cyan transition-colors">
                                Autonomous Red Teaming
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Sandbox Labs */}
                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-cyber-cyan">
            // Security Sandboxes
                    </h4>
                    <ul className="space-y-2 text-xs text-cyber-muted">
                        <li>
                            <Link href="#ai-lab" className="hover:text-cyber-cyan transition-colors">
                                Prompt Injection Guard
                            </Link>
                        </li>
                        <li>
                            <Link href="#ai-lab" className="hover:text-cyber-cyan transition-colors">
                                Syscall Interceptor
                            </Link>
                        </li>
                        <li>
                            <Link href="#ai-lab" className="hover:text-cyber-cyan transition-colors">
                                Lattice Benchmarks
                            </Link>
                        </li>
                        <li>
                            <Link href="#ai-lab" className="hover:text-cyber-cyan transition-colors">
                                Telemetry Decoder
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Intel Subscription */}
                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-cyber-cyan">
            // Intel Subscription
                    </h4>
                    <p className="text-xs text-cyber-muted mb-3 leading-relaxed">
                        Encrypted weekly vulnerability briefings sent directly to your terminal.
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="agent@domain.com"
                            className="w-full px-3 py-2 text-xs bg-cyber-card border border-cyber-border rounded text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-cyan/60"
                        />
                        <button className="px-3 py-2 bg-cyber-cyan text-cyber-bg font-bold rounded text-xs hover:bg-cyber-emerald transition-colors shrink-0">
                            JOIN
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright & Hash */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-cyber-border/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cyber-muted gap-2">
                <span>© 2026 AEGIS_MIND // ALL DEFENSIVE RIGHTS RESERVED</span>
                <span className="text-cyber-border hover:text-cyber-muted transition-colors">
                    BUILD: 0x7f4a // RUNTIME: NEXTJS_TURBOPACK
                </span>
            </div>
        </footer>
    );
}