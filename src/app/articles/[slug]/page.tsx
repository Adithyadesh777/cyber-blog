import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticleBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/MdxComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Tag } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticleDossier({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const { meta, content } = article;
    const isCritical = meta.severity === "CRITICAL";
    const isHigh = meta.severity === "HIGH";

    return (
        <div className="min-h-screen bg-cyber-bg cyber-grid text-white flex flex-col">
            <Navbar />

            <main className="flex-1 pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Return Link */}
                <Link
                    href="/#articles"
                    className="inline-flex items-center gap-2 text-xs font-mono text-cyber-muted hover:text-cyber-cyan transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>RETURN TO ARCHIVE INDEX</span>
                </Link>

                {/* Dossier Header */}
                <header className="border border-cyber-border rounded-lg bg-cyber-card/80 p-6 sm:p-8 backdrop-blur-sm mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-muted uppercase">
                            <Tag className="w-3.5 h-3.5 text-cyber-cyan" />
                            {meta.category}
                        </span>

                        <div className="flex items-center gap-3">
                            {meta.cveRef && (
                                <span className="text-xs font-mono text-cyber-cyan bg-cyber-card border border-cyber-cyan/30 px-2 py-0.5 rounded">
                                    {meta.cveRef}
                                </span>
                            )}
                            <span
                                className={`text-xs font-mono px-2 py-0.5 rounded border font-semibold ${isCritical
                                        ? "text-red-400 border-red-500/40 bg-red-950/20"
                                        : isHigh
                                            ? "text-amber-400 border-amber-500/40 bg-amber-950/20"
                                            : "text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10"
                                    }`}
                            >
                                {meta.severity}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-bold font-mono text-white mb-4 leading-snug">
                        {meta.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyber-muted pt-4 border-t border-cyber-border/50">
                        <span>ANALYST: {meta.author}</span>
                        <span>•</span>
                        <span>DATE: {meta.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {meta.readTime}
                        </span>
                    </div>
                </header>

                {/* Rendered MDX Content */}
                <article className="border border-cyber-border/60 rounded-lg bg-cyber-card/40 p-6 sm:p-8 backdrop-blur-sm">
                    <MDXRemote source={content} components={mdxComponents} />
                </article>
            </main>

            <Footer />
        </div>
    );
}