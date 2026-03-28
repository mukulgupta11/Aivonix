"use client";

import React from "react";
import {
  RiBrainLine,
  RiChatAiLine,
  RiFileTextLine,
  RiFlashlightLine,
  RiShieldKeyholeLine,
  RiTeamLine,
} from "@remixicon/react";
import { motion } from "motion/react";

const features = [
  {
    id: "ai-chat",
    title: "Conversational AI",
    description:
      "Ask questions across your notes and chats; get grounded answers in seconds.",
    icon: RiChatAiLine,
  },
  {
    id: "notes",
    title: "Notes that sync with context",
    description:
      "Capture ideas, link them to threads, and surface them when you need them.",
    icon: RiFileTextLine,
  },
  {
    id: "memory",
    title: "Second brain memory",
    description:
      "Structure knowledge so your team can reuse it instead of reinventing it.",
    icon: RiBrainLine,
  },
  {
    id: "speed",
    title: "Fast workflows",
    description:
      "Short prompts, smart defaults, and a UI that stays out of your way.",
    icon: RiFlashlightLine,
  },
  {
    id: "security",
    title: "Privacy-minded",
    description:
      "Your workspace stays yours—built for teams that care about control.",
    icon: RiShieldKeyholeLine,
  },
  {
    id: "collab",
    title: "Built for teams",
    description:
      "Share context, not chaos: one place for decisions and follow-ups.",
    icon: RiTeamLine,
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
      className="scroll-mt-24 py-24 md:py-28"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything you need to think clearly and move faster
          </h2>
          <p className="mt-3 text-muted-foreground">
            Aivonix connects your notes, chats, and AI in one calm workspace.
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.li
              key={f.id}
              variants={item}
              className="group rounded-2xl border border-border/80 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition hover:border-primary/25 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
