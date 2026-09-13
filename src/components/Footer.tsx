import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-cyber-border bg-[#030712]/90 backdrop-blur-md text-cyber-muted font-mono text-xs">
            {/* Top telemetry ticker strip */}
            <div className="border-b border-cyber-border/40 py-2.5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px]">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
                    <span className="text-gray-300">STATUS: ALL DEFENSE SYSTEMS OPERATIONAL</span>
                </div>
                <div className="flex items-center gap-4 text-cyber-muted">
                    <span>NODE: SG-01-PROD</span>
                    <span>LATENCY: 12ms</span>
                    <span>PROTOCOL: TLS 1.3 / ML-KEM</span>
                </div>
            </div>

            {/* Main footer brand area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-3 text-center sm:text-left max-w-md">
                    <Link href="/" className="inline-flex items-center gap-2 text-white font-bold tracking-wider">
                        <Shield className="w-5 h-5 text-cyber-cyan" />
                        <span className="text-base font-mono tracking-widest text-cyber-cyan">AEGIS_MIND</span>
                    </Link>
                    <p className="text-cyber-muted leading-relaxed text-xs">
                        Autonomous threat intelligence, zero-day research, and weaponized AI defense systems.
                    </p>
                </div>

                {/* Social Links (Inlined SVGs) */}
                <div className="flex items-center gap-3">
                    {/* GitHub Icon */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="p-2.5 rounded-lg border border-cyber-border bg-cyber-card/60 hover:border-cyber-cyan hover:text-white transition-all duration-200"
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </a>

                    {/* X / Twitter Icon */}
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X Profile"
                        className="p-2.5 rounded-lg border border-cyber-border bg-cyber-card/60 hover:border-cyber-cyan hover:text-white transition-all duration-200"
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Bottom copyright notice */}
            <div className="border-t border-cyber-border/40 py-4 px-4 sm:px-6 text-center text-[10px] text-cyber-muted/80">
                © {new Date().getFullYear()} AEGIS_MIND // ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
}