import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

export default function FeaturedArticles() {
    const articles = getAllArticles();

    return (
        <section id="articles" className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-28">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cyber-border">
                <div>
                    <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest block mb-1">
            // INTEL ARCHIVE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                        Latest Threat Dispatches
                    </h2>
                </div>
                <span className="text-xs font-mono text-cyber-muted mt-2 sm:mt-0">
                    Showing {articles.length} Logs
                </span>
            </div>

            {articles.length === 0 ? (
                <div className="p-8 border border-cyber-border rounded-lg bg-cyber-card text-center font-mono text-cyber-muted text-sm">
                    No articles detected in <code className="text-cyber-cyan">content/articles/</code>.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => {
                        const isCritical = article.severity === "CRITICAL";
                        const isHigh = article.severity === "HIGH";

                        return (
                            <article
                                key={article.slug}
                                className="flex flex-col justify-between p-6 rounded-lg bg-cyber-card/80 border border-cyber-border hover:border-cyber-cyan/60 transition-all duration-300 group backdrop-blur-sm relative"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyber-muted uppercase tracking-wider">
                                            <Tag className="w-3 h-3 text-cyber-cyan" />
                                            {article.category}
                                        </span>
                                        <span
                                            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${isCritical
                                                    ? "text-red-400 border-red-500/40 bg-red-950/20"
                                                    : isHigh
                                                        ? "text-amber-400 border-amber-500/40 bg-amber-950/20"
                                                        : "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10"
                                                }`}
                                        >
                                            {article.severity}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors mb-3 leading-snug">
                                        <Link href={`/articles/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h3>

                                    <p className="text-sm text-cyber-muted font-mono leading-relaxed mb-6">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-cyber-border/50 flex items-center justify-between text-xs font-mono text-cyber-muted">
                                    <div className="flex items-center gap-3">
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {article.readTime}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/articles/${article.slug}`}
                                        className="text-cyber-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                    >
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}