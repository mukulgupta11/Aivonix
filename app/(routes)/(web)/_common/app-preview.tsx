"use client";

import React from "react";
import Image from "next/image";
import {
  BrainCircuit,
  MessageSquareText,
  NotebookPen,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

const stats = [
  { label: "notes organized", value: "18k+", accent: "#0ea5a4", bg: "#e4faf4" },
  { label: "answers grounded", value: "92%", accent: "#4f6df5", bg: "#eef1ff" },
  { label: "teams aligned", value: "4.8/5", accent: "#f5664d", bg: "#fff0eb" },
];

const rails = [
  {
    icon: NotebookPen,
    title: "Capture",
    text: "Save raw ideas and decisions.",
    accent: "#0ea5a4",
    bg: "#e4faf4",
  },
  {
    icon: BrainCircuit,
    title: "Connect",
    text: "Link context across threads.",
    accent: "#4f6df5",
    bg: "#eef1ff",
  },
  {
    icon: MessageSquareText,
    title: "Answer",
    text: "Ask AI with memory intact.",
    accent: "#f5664d",
    bg: "#fff0eb",
  },
];

const AppPreview = () => {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "center center"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 12% 0% 12%)", "inset(0% 0% 0% 0%)"]
  );
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <section className="relative bg-[#fcfbf8] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 border-b border-[#eceae4] pb-10 md:grid-cols-[1fr_1.1fr] md:items-end">
          <div>
            <p className="text-sm font-medium text-[#0f8f8d]">Product Proof</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl">
              A visual workspace that makes your thinking easy to trust.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border p-4"
                style={{
                  borderColor: `${stat.accent}44`,
                  backgroundColor: stat.bg,
                }}
              >
                <p
                  className="text-2xl font-semibold"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#5f5f5d]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={previewRef} className="relative mt-10">
          <motion.div
            style={{ clipPath, y }}
            className="relative overflow-hidden rounded-lg border border-[#eceae4] bg-[#f7f4ed]"
          >
            <Image
              src="/images/aivonix-app-preview.jpg"
              alt="Aivonix app preview showing notes, chat, and workspace navigation"
              width={1400}
              height={804}
              priority
              className="h-auto w-full"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-[linear-gradient(90deg,#0ea5a4,#4f6df5,#f5664d)] opacity-90" />
          </motion.div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {rails.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-lg border p-5"
                style={{
                  borderColor: `${item.accent}44`,
                  background: `linear-gradient(180deg, ${item.bg}, #f7f4ed)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-9 items-center justify-center rounded-md text-[#fcfbf8]"
                    style={{ backgroundColor: item.accent }}
                  >
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="font-medium text-[#1c1c1c]">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5f5f5d]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
