"use client";

import React from "react";
import {
  BrainCircuit,
  FileSearch,
  Gauge,
  Handshake,
  LockKeyhole,
  MessageSquareText,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    id: "ai-chat",
    title: "Ask across everything",
    description:
      "Ask questions across your notes and chats; get grounded answers in seconds.",
    icon: MessageSquareText,
    accent: "#0ea5a4",
  },
  {
    id: "notes",
    title: "Notes with context",
    description:
      "Capture ideas, link them to threads, and surface them when you need them.",
    icon: FileSearch,
    accent: "#f5664d",
  },
  {
    id: "memory",
    title: "Second brain memory",
    description:
      "Structure knowledge so your team can reuse it instead of reinventing it.",
    icon: BrainCircuit,
    accent: "#8a6fdf",
  },
  {
    id: "speed",
    title: "Fast handoffs",
    description:
      "Short prompts, smart defaults, and a UI that stays out of your way.",
    icon: Gauge,
    accent: "#d99b2b",
  },
  {
    id: "security",
    title: "Privacy-minded",
    description:
      "Your workspace stays yours, built for teams that care about control.",
    icon: LockKeyhole,
    accent: "#377f61",
  },
  {
    id: "collab",
    title: "Customer-ready polish",
    description:
      "Share context, not chaos: one place for decisions and follow-ups.",
    icon: Handshake,
    accent: "#c75c8a",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function LandingFeatures() {
  return (
    <section
      id="features"
      className="scroll-mt-24 bg-[#f7f4ed] py-20 md:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <p className="text-sm font-medium text-[#0f8f8d]">Features</p>
            <h2
              id="features-heading"
              className="mt-3 text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl lg:text-5xl"
            >
              The customer-facing polish, backed by real AI utility.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#5f5f5d]">
            Aivonix connects your notes, chats, and AI in one calm workspace, so
            every answer has a trail and every project has a memory.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.li
              key={f.id}
              variants={item}
              whileHover={{ y: -6 }}
              className="group rounded-lg border border-[#eceae4] bg-[#fcfbf8] p-6 transition-colors hover:border-[rgba(28,28,28,0.4)]"
            >
              <div
                className="flex size-11 items-center justify-center rounded-md text-[#fcfbf8]"
                style={{ backgroundColor: f.accent }}
              >
                <f.icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-medium text-[#1c1c1c]">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#5f5f5d]">
                {f.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
