import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostingSchema } from "@/components/SeoJsonLd";
import { buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/seo";

type PayloadPost = {
  id: string;
  title: string;
  slug: string;
  content?: unknown;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: { name?: string; email?: string } | string | null;
};

type PayloadResponse<T> = {
  docs: T[];
};

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost";

async function fetchPost(slug: string): Promise<PayloadPost | null> {
  const url = new URL(`${siteUrl}/api/payload/posts`);
  url.searchParams.set("where[slug][equals]", slug);
  url.searchParams.set("depth", "1");
  url.searchParams.set("limit", "1");

  const response = await fetch(url.toString(), { cache: "no-store" });
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as PayloadResponse<PayloadPost>;
  return data.docs?.[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    return {};
  }

  const title = post.title;
  const description = "Blog post";
  const pageUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: buildCanonical(pageUrl),
    openGraph: buildOpenGraph({
      title,
      description,
      url: pageUrl,
      type: "article",
    }),
    twitter: buildTwitter({
      title,
      description,
    }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    notFound();
  }

  const authorName =
    typeof post.author === "object"
      ? post.author?.name ?? post.author?.email
      : undefined;
  const pageUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <main className="min-h-screen px-6 py-12">
      <BlogPostingSchema
        headline={post.title}
        description="Blog post"
        url={pageUrl}
        datePublished={post.publishedAt ?? post.createdAt}
        dateModified={post.updatedAt}
        authorName={authorName}
      />
      <article className="mx-auto w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Blog
          </p>
          <h1 className="text-3xl font-semibold">{post.title}</h1>
        </header>
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <p className="text-muted-foreground">
            Rich text rendering not wired yet. Payload content shown below:
          </p>
          <pre className="mt-3 max-h-[420px] overflow-auto text-xs">
            {JSON.stringify(post.content ?? {}, null, 2)}
          </pre>
        </div>
      </article>
    </main>
  );
}
