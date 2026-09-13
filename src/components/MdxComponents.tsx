import { ReactNode } from "react";
import { Terminal, ShieldAlert } from "lucide-react";

export const mdxComponents = {
    h2: ({ children }: { children?: ReactNode }) => (
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mt-10 mb-4 pb-2 border-b border-cyber-border/70 flex items-center gap-2">
            <span className="text-cyber-cyan select-none">#</span>
            {children}
        </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
        <h3 className="text-lg font-bold font-mono text-cyber-cyan mt-6 mb-3">
            {children}
        </h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
        <p className="font-mono text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
            {children}
        </p>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
        <ul className="list-none space-y-2 mb-6 font-mono text-sm text-gray-300">
            {children}
        </ul>
    ),
    li: ({ children }: { children?: ReactNode }) => (
        <li className="flex items-start gap-2">
            <span className="text-cyber-emerald mt-1 select-none">›</span>
            <span>{children}</span>
        </li>
    ),
    hr: () => <hr className="border-cyber-border my-8" />,
    pre: ({ children }: { children?: ReactNode }) => (
        <div className="my-6 rounded-lg border border-cyber-border bg-[#05080e] overflow-hidden">
            <div className="px-4 py-2 border-b border-cyber-border/60 bg-[#080c14] flex items-center justify-between text-xs font-mono text-cyber-muted">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                    <span>terminal-exec</span>
                </div>
                <span className="text-[10px] text-cyber-emerald">BASH</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-gray-200 leading-relaxed">
                {children}
            </pre>
        </div>
    ),
    code: ({ children }: { children?: ReactNode }) => (
        <code className="px-1.5 py-0.5 rounded bg-cyber-card border border-cyber-border font-mono text-xs text-cyber-cyan">
            {children}
        </code>
    ),
};