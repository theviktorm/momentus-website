import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type InsightFrontmatter = {
  title: string;
  dek: string;
  date: string;
  author: string;
  readMinutes: number;
  tags: string[];
  draft?: boolean;
};

export type Insight = InsightFrontmatter & {
  slug: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

function readSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/i, ""));
}

export function getAllInsights(): Insight[] {
  return readSlugs()
    .map((slug) => getInsightBySlug(slug))
    .filter((p): p is Insight => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsightBySlug(slug: string): Insight | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const file = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Partial<InsightFrontmatter>;
  return {
    slug,
    title: data.title ?? slug,
    dek: data.dek ?? "",
    date: data.date ?? "1970-01-01",
    author: data.author ?? "Momentus",
    readMinutes: Number(data.readMinutes ?? 5),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: Boolean(data.draft),
    content: parsed.content,
  };
}

export function getRelatedInsights(slug: string, limit = 3): Insight[] {
  return getAllInsights()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}

export function formatDate(d: string): string {
  try {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d;
  }
}
