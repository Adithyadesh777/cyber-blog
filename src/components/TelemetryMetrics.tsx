import { getAllArticles } from "@/lib/mdx";
import { FileText, ShieldAlert, Database, Clock } from "lucide-react";

async function getCisaKevCount(): Promise<string> {
    try {
        const res = await fetch(
            "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
            {
                next: { revalidate: 3600 }, // Cached for 1 hour
            }
        );

        if (!res.ok) throw new Error("CISA feed unavailable");

        const data = await res.json();
        return data.count ? Number(data.count).toLocaleString() : "1,700+";
    } catch (error) {
        return "1,700+"; // Resilient fallback
    }
}

export default async function TelemetryMetrics() {
    const articles = getAllArticles();

    // 1. Published research count
    const publishedCount = articles.length;

    // 2. Identified CVEs / critical vulnerability vectors analyzed
    const analyzedVectors = articles.filter(
        (a) => Boolean(a.cveRef) || a.severity === "CRITICAL"
    ).length;

    // 3. Live CISA KEV count
    const cisaKevTotal = await getCisaKevCount();

    // 4. Latest intelligence dispatch timestamp
    const latestDate = articles.length > 0 ? articles[0].date : "2026.09.13";

    const metrics = [
        {
            id: "intel-published",
            label: "PUBLISHED INTEL",
            value: String(publishedCount),
            subtext: "Live research dossiers",
            icon: FileText,
            accent: "cyan" as const,
        },
        {
            id: "vulns-analyzed",
            label: "VECTORS ANALYZED",
            value: String(analyzedVectors),
            subtext: "CVE & zero-day reviews",
            icon: ShieldAlert,
            accent: "emerald" as const,
        },
        {
            id: "cisa-kev",
            label: "CISA KEV CATALOG",
            value: cisaKevTotal,
            subtext: "Global actively exploited flaws",
            icon: Database,
            accent: "cyan" as const,
        },
        {
            id: "latest-sync",
            label: "LATEST DISPATCH",
            value: latestDate,
            subtext: "Archive telemetry updated",
            icon: Clock,
            accent: "emerald" as const,
        },
    ];

    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-24 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((item) => {
                    const Icon = item.icon;
                    const isCyan = item.accent === "cyan";

                    return (
                        <div
                            key={item.id}
                            className="relative p-5 rounded-lg bg-cyber-card/70 border border-cyber-border hover:border-cyber-cyan/40 transition-all duration-300 backdrop-blur-sm group overflow-hidden"
                        >
                            {/* Tactical corner accent */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-cyan/40 group-hover:border-cyber-cyan transition-colors" />

                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] tracking-widest text-cyber-muted uppercase">
                                    {item.label}
                                </span>
                                <Icon
                                    className={`w-4 h-4 ${isCyan ? "text-cyber-cyan" : "text-cyber-emerald"
                                        }`}
                                />
                            </div>

                            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
                                {item.value}
                            </div>

                            <p className="text-xs text-cyber-muted">
                                {item.subtext}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}