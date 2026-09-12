import { ShieldCheck, Activity, Cpu, Terminal } from "lucide-react";

interface MetricItem {
    id: string;
    label: string;
    value: string;
    subtext: string;
    icon: typeof ShieldCheck;
    accent: "cyan" | "emerald";
}

const metrics: MetricItem[] = [
    {
        id: "m-1",
        label: "THREAT AGENTS TRACKED",
        value: "14,892",
        subtext: "+12.4% this cycle",
        icon: Activity,
        accent: "cyan",
    },
    {
        id: "m-2",
        label: "ANALYSIS LATENCY",
        value: "1.4 ms",
        subtext: "Turbopack edge inference",
        icon: Cpu,
        accent: "emerald",
    },
    {
        id: "m-3",
        label: "ZERO-DAYS ARCHIVED",
        value: "328",
        subtext: "Verified CVE vectors",
        icon: ShieldCheck,
        accent: "cyan",
    },
    {
        id: "m-4",
        label: "DEFENSE RUNTIME",
        value: "99.99%",
        subtext: "Kernel fail-safe active",
        icon: Terminal,
        accent: "emerald",
    },
];

export default function TelemetryMetrics() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((item) => {
                    const Icon = item.icon;
                    const isCyan = item.accent === "cyan";

                    return (
                        <div
                            key={item.id}
                            className="relative p-5 rounded-lg bg-cyber-card/70 border border-cyber-border hover:border-cyber-cyan/40 transition-all duration-300 backdrop-blur-sm group overflow-hidden"
                        >
                            {/* Corner decorative HUD tick */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-cyan/40 group-hover:border-cyber-cyan transition-colors" />

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] font-mono tracking-widest text-cyber-muted uppercase">
                                    {item.label}
                                </span>
                                <Icon
                                    className={`w-4 h-4 ${isCyan ? "text-cyber-cyan" : "text-cyber-emerald"
                                        }`}
                                />
                            </div>

                            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1 tracking-tight">
                                {item.value}
                            </div>

                            <p className="text-xs font-mono text-cyber-muted">
                                {item.subtext}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}