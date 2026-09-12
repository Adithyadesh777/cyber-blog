"use client";

import { useState } from "react";
import { Terminal, Shield, Play, CheckCircle2, AlertTriangle } from "lucide-react";

interface ProbeRule {
    id: string;
    name: string;
    category: string;
    status: "ACTIVE" | "ANALYZING";
    description: string;
    payloadExample: string;
}

const probeRules: ProbeRule[] = [
    {
        id: "RULE-01",
        name: "Adversarial Prompt Guard",
        category: "LLM DEFENSE",
        status: "ACTIVE",
        description: "Detects instruction injection vectors and multi-token jailbreak overrides.",
        payloadExample: "SYSTEM_OVERRIDE // [ignore previous instructions] -> TRUNCATE",
    },
    {
        id: "RULE-02",
        name: "eBPF Syscall Monitor",
        category: "KERNEL SECURITY",
        status: "ACTIVE",
        description: "Intercepts hidden rootkit privilege escalations at ring 0 in real-time.",
        payloadExample: "sys_enter_ptrace [PID: 4092] -> VERDICT: DENY",
    },
    {
        id: "RULE-03",
        name: "Post-Quantum Handshake",
        category: "CRYPTO ENGINE",
        status: "ANALYZING",
        description: "Simulates ML-KEM / Kyber-1024 lattice key agreement latency benchmarks.",
        payloadExample: "TLS_1.3_PQ_DRAFT // KeyExchange: kyber1024 -> Latency: 1.12ms",
    },
];

export default function AILabShowcase() {
    const [activeRule, setActiveRule] = useState<ProbeRule>(probeRules[0]);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState<string[]>([
        "Kernel initialization sequence complete.",
        "AegisMind sandbox isolated at sandbox_0x4f12.",
        "Ready for telemetry execution.",
    ]);

    const runSimulation = () => {
        setIsRunning(true);
        setLogs((prev) => [...prev, `> Executing simulation: ${activeRule.name}...`]);

        setTimeout(() => {
            setLogs((prev) => [
                ...prev,
                `[INSPECT] Payload: ${activeRule.payloadExample}`,
                `[STATUS] Telemetry verified. Zero vulnerabilities breached.`,
            ]);
            setIsRunning(false);
        }, 900);
    };

    return (
        <section id="ai-lab" className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-28">
            {/* Section Header */}
            <div className="mb-8 pb-4 border-b border-cyber-border flex flex-col sm:flex-row sm:items-end justify-between">
                <div>
                    <span className="text-xs font-mono text-cyber-emerald uppercase tracking-widest block mb-1">
            // EXPERIMENTAL SANDBOX
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                        AI Threat Simulation Lab
                    </h2>
                </div>
                <span className="text-xs font-mono text-cyber-muted mt-2 sm:mt-0">
                    Status: Interactive Sandbox v0.8
                </span>
            </div>

            {/* Main Terminal Window */}
            <div className="rounded-xl border border-cyber-border bg-cyber-card/90 overflow-hidden shadow-neon-cyan/10 backdrop-blur-md">
                {/* Terminal Titlebar */}
                <div className="px-4 py-3 bg-[#080c14] border-b border-cyber-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-cyber-emerald/80" />
                        <span className="ml-2 text-xs font-mono text-cyber-muted">
                            aegis-core // sandbox-console
                        </span>
                    </div>
                    <span className="text-[11px] font-mono text-cyber-cyan">
                        MODE: ISOLATED RUNTIME
                    </span>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left Rule Selector (4 cols) */}
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-cyber-border p-4 space-y-2">
                        <span className="text-[11px] font-mono text-cyber-muted uppercase tracking-wider block mb-3">
                            Defensive Modules:
                        </span>
                        {probeRules.map((rule) => {
                            const isSelected = activeRule.id === rule.id;
                            return (
                                <button
                                    key={rule.id}
                                    onClick={() => setActiveRule(rule)}
                                    className={`w-full text-left p-3 rounded-lg border font-mono transition-all duration-200 ${isSelected
                                            ? "bg-cyber-bg border-cyber-cyan text-white shadow-neon-cyan/20"
                                            : "bg-transparent border-transparent text-cyber-muted hover:border-cyber-border hover:text-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="font-bold text-white">{rule.name}</span>
                                        <span className="text-[10px] text-cyber-cyan">{rule.id}</span>
                                    </div>
                                    <p className="text-[11px] text-cyber-muted line-clamp-2">
                                        {rule.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Interactive Console (8 cols) */}
                    <div className="lg:col-span-8 p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-cyber-cyan" />
                                    <span className="text-xs font-mono text-cyber-cyan">
                                        {activeRule.category} // {activeRule.id}
                                    </span>
                                </div>
                                <button
                                    onClick={runSimulation}
                                    disabled={isRunning}
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-cyber-emerald text-cyber-bg font-mono font-bold text-xs hover:bg-cyber-cyan transition-colors disabled:opacity-50"
                                >
                                    <Play className="w-3 h-3 fill-current" />
                                    <span>{isRunning ? "Simulating..." : "Execute Test"}</span>
                                </button>
                            </div>

                            {/* Console Output Box */}
                            <div className="p-4 rounded-lg bg-[#05080e] border border-cyber-border/70 font-mono text-xs text-gray-300 space-y-1.5 min-h-[160px] max-h-[220px] overflow-y-auto">
                                {logs.map((log, index) => (
                                    <div key={index} className="leading-relaxed">
                                        <span className="text-cyber-muted select-none mr-2">$</span>
                                        <span
                                            className={
                                                log.startsWith("[STATUS]")
                                                    ? "text-cyber-emerald"
                                                    : log.startsWith("[INSPECT]")
                                                        ? "text-cyber-cyan"
                                                        : log.startsWith(">")
                                                            ? "text-amber-400"
                                                            : "text-gray-400"
                                            }
                                        >
                                            {log}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Micro Specs Footer */}
                        <div className="mt-4 pt-4 border-t border-cyber-border/50 flex flex-wrap items-center justify-between text-[11px] font-mono text-cyber-muted gap-2">
                            <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" />
                                Deterministic Guardrails Active
                            </span>
                            <span>Memory Footprint: 8.2MB</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}