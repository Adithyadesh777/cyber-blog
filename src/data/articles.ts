export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    severity: "CRITICAL" | "HIGH" | "ELEVATED";
    readTime: string;
    date: string;
    author: string;
    cveRef?: string;
    content: string[];
}

export const articles: Article[] = [
    {
        slug: "llm-jailbreak-heuristics",
        title: "Adversarial Prompt Injection & Autonomous Agent Hijacking",
        excerpt:
            "Deep dive into indirect prompt injection attacks targeting multi-tool LLM agents operating within isolated production perimeters.",
        category: "AI RED TEAM",
        severity: "CRITICAL",
        readTime: "7 min read",
        date: "2026.09.10",
        author: "SecOps Core",
        cveRef: "CVE-2026-8812",
        content: [
            "Autonomous agents integrated with runtime toolchains (shell execution, SQL drivers, internal APIs) present a vast attack surface when untrusted contextual data feeds into the prompt context window.",
            "By utilizing multi-vector payload fragmentation across markdown comment blocks, adversarial inputs bypass conventional heuristic classifiers and force tool execution without user confirmation.",
            "Mitigation requires strict context boundary demarcation, deterministic capability scoping, and out-of-band policy verification filters."
        ]
    },
    {
        slug: "ebpf-kernel-telemetry",
        title: "Zero-Overhead Threat Hunting via eBPF Kernel Probes",
        excerpt:
            "Engineering low-latency kernel telemetry pipelines to detect rootkits and privilege escalation attempts in real-time.",
        category: "KERNEL DEFENSE",
        severity: "HIGH",
        readTime: "12 min read",
        date: "2026.09.04",
        author: "Kernel Team",
        cveRef: "CVE-2026-3104",
        content: [
            "Traditional user-space daemon monitoring incurs prohibitive performance overhead and is blind to ring-0 stealth rootkits that alter kernel function dispatch tables.",
            "Deploying verified eBPF bytecode hooked into tracepoints such as sys_enter_execve and sys_enter_ptrace enables telemetry capture directly within ring 0 before unauthorized instructions return.",
            "Telemetry buffers stream asynchronously through ring buffers directly to security analytical pipelines with near-zero latency."
        ]
    },
    {
        slug: "quantum-resistant-pki",
        title: "Transitioning Production TLS to Kyber-1024 Post-Quantum Handshakes",
        excerpt:
            "Benchmarking handshake latency and cipher overhead across hybrid classical and post-quantum cryptographic primitives.",
        category: "CRYPTOGRAPHY",
        severity: "ELEVATED",
        readTime: "9 min read",
        date: "2026.08.28",
        author: "Crypto Lab",
        content: [
            "Adversaries continue harvesting encrypted network communications under 'Harvest Now, Decrypt Later' (HNDL) strategies, anticipating practical quantum cryptanalysis against classical RSA and ECC.",
            "Hybrid key encapsulation mechanisms combining ECDH with ML-KEM-1024 (Kyber) ensure current forward secrecy while maintaining resilience against post-quantum lattice attacks.",
            "Real-world handshake benchmarks show a 14% increase in round-trip serialization overhead, requiring tuned MTU sizing to prevent TCP packet fragmentation."
        ]
    }
];