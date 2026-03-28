"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const posts = [
  {
    slug: "building-a-second-brain-with-ai",
    title: "Building a second brain with AI (without the noise)",
    excerpt:
      "How to structure notes and prompts so your AI actually remembers what matters.",
    date: "Mar 12, 2026",
    read: "6 min read",
  },
  {
    slug: "from-chaos-to-clarity",
    title: "From chaos to clarity: workflows that stick",
    excerpt:
      "A simple weekly rhythm that keeps teams aligned on decisions and next steps.",
    date: "Mar 5, 2026",
    read: "4 min read",
  },
  {
    slug: "security-privacy",
    title: "Security & privacy for AI workspaces",
    excerpt:
      "What we think about data boundaries, retention, and team control.",
    date: "Feb 28, 2026",
    read: "8 min read",
  },
];

export default function LandingBlog() {
  return (
    <section
      id="blog"
      className="scroll-mt-24 py-24 md:py-28"
      aria-labelledby="blog-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Blog
            </p>
            <h2
              id="blog-heading"
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ideas for sharper thinking
            </h2>
            <p className="mt-3 text-muted-foreground">
              Guides, product updates, and patterns for modern knowledge work.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Talk to us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col rounded-2xl border border-border/80 bg-card/60 p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <time className="text-xs text-muted-foreground">
                {post.date} · {post.read}
              </time>
              <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-primary">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Read article
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
