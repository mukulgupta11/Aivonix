"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const posts = [
  {
    slug: "building-a-second-brain-with-ai",
    title: "Building a second brain with AI without the noise",
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
    title: "Security and privacy for AI workspaces",
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
      className="scroll-mt-24 bg-[#f7f4ed] py-20 md:py-28"
      aria-labelledby="blog-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[#0f8f8d]">Blog</p>
            <h2
              id="blog-heading"
              className="mt-3 text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl"
            >
              Ideas for sharper thinking
            </h2>
            <p className="mt-3 leading-7 text-[#5f5f5d]">
              Guides, product updates, and patterns for modern knowledge work.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-[rgba(28,28,28,0.4)] px-4 py-2 text-sm font-medium text-[#1c1c1c] hover:bg-[#1c1c1c]/[0.04]"
          >
            Talk to us
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group flex flex-col rounded-lg border border-[#eceae4] bg-[#fcfbf8] p-6 transition-colors hover:border-[rgba(28,28,28,0.4)]"
            >
              <time className="text-xs text-[#5f5f5d]">
                {post.date} / {post.read}
              </time>
              <h3 className="mt-3 text-xl font-medium leading-snug text-[#1c1c1c] group-hover:text-[#0f8f8d]">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#5f5f5d]">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#1c1c1c]"
              >
                Read article
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
