import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleMeta {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    severity: "CRITICAL" | "HIGH" | "ELEVATED";
    readTime: string;
    date: string;
    author: string;
    cveRef?: string;
}

export function getAllArticles(): ArticleMeta[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const files = fs.readdirSync(contentDirectory);

    return files
        .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
        .map((file) => {
            const slug = file.replace(/\.mdx?$/, "");
            const fullPath = path.join(contentDirectory, file);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title ?? "Untitled Report",
                excerpt: data.excerpt ?? "",
                category: data.category ?? "SECURITY",
                severity: data.severity ?? "ELEVATED",
                readTime: data.readTime ?? "5 min read",
                date: data.date ?? "2026.01.01",
                author: data.author ?? "Aegis Core",
                cveRef: data.cveRef,
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string) {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        meta: {
            slug,
            title: data.title ?? "Untitled Report",
            excerpt: data.excerpt ?? "",
            category: data.category ?? "SECURITY",
            severity: data.severity ?? "ELEVATED",
            readTime: data.readTime ?? "5 min read",
            date: data.date ?? "2026.01.01",
            author: data.author ?? "Aegis Core",
            cveRef: data.cveRef,
        } as ArticleMeta,
        content,
    };
}