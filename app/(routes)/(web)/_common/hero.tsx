"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trustSignals = [
  { value: "60 sec", label: "from idea to saved context" },
  { value: "3x", label: "faster knowledge retrieval" },
  { value: "24/7", label: "AI workspace memory" },
];

const workflowSteps = [
  { label: "Capture", detail: "Notes, links, decisions" },
  { label: "Reason", detail: "Chat with grounded context" },
  { label: "Share", detail: "Turn answers into action" },
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden border-y border-[#eceae4]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <Image
          src="/images/aivonix-app-preview.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-35 saturate-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7f4ed_0%,rgba(247,244,237,0.96)_38%,rgba(247,244,237,0.62)_74%,rgba(247,244,237,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,237,0.74)_0%,rgba(247,244,237,0.3)_48%,#f7f4ed_100%)]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(28,28,28,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,28,28,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute right-[max(1rem,calc((100vw-80rem)/2))] top-16 hidden h-[34rem] w-[38rem] lg:block">
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="absolute left-8 top-20 h-px w-[30rem] bg-[#1c1c1c]/20" />
          <div className="absolute left-20 top-48 h-px w-[25rem] bg-[#0ea5a4]/35" />
          <div className="absolute left-28 top-72 h-px w-[22rem] bg-[#f5664d]/35" />
          {!prefersReducedMotion && (
            <>
              <motion.div
                className="absolute left-8 top-20 h-px w-28 bg-[#1c1c1c]"
                animate={{ x: [0, 360, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-20 top-48 h-px w-24 bg-[#0ea5a4]"
                animate={{ x: [260, 0, 260], opacity: [0, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-28 top-72 h-px w-20 bg-[#f5664d]"
                animate={{ x: [0, 240, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.label}
              className={cn(
                "absolute w-64 rounded-lg border border-[#eceae4] bg-[#fcfbf8]/90 p-4 text-[#1c1c1c] shadow-[0_18px_50px_rgba(28,28,28,0.08)] backdrop-blur-md",
                index === 0 && "left-0 top-0",
                index === 1 && "right-6 top-32",
                index === 2 && "left-24 bottom-12"
              )}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -8, 0], rotate: [0, index === 1 ? 1 : -1, 0] }
              }
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="flex size-7 items-center justify-center rounded-md bg-[#1c1c1c] text-[#fcfbf8]">
                  {index + 1}
                </span>
                {step.label}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5f5f5d]">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-7xl items-center px-4 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#eceae4] bg-[#fcfbf8]/80 px-3 py-2 text-sm text-[#5f5f5d] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]"
          >
            <Sparkles className="size-4 text-[#0ea5a4]" />
            New AI-powered workspace for sharper launches
          </motion.div>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="max-w-4xl text-balance text-5xl font-semibold leading-none text-[#1c1c1c] sm:text-6xl lg:text-7xl"
          >
            <span className="block">Aivonix</span>
            <span className="mt-3 block text-[#1c1c1c]/80">
              AI memory that makes your work impossible to miss.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#5f5f5d] sm:text-xl"
          >
            Capture decisions, chat with your knowledge, and present a polished
            AI workspace that feels credible to customers, teams, and recruiters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              className={cn(
                "h-11 rounded-md bg-[#1c1c1c] px-5 text-[#fcfbf8] hover:bg-[#2a2a2a]",
                "shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.08)_0px_8px_24px]"
              )}
            >
              <Link href="/auth/sign-up">
                Get started free
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-11 rounded-md border-[rgba(28,28,28,0.4)] bg-transparent px-5 text-[#1c1c1c] hover:bg-[#1c1c1c]/[0.04]"
              asChild
            >
              <Link href="#features">Explore workflow</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {trustSignals.map((signal) => (
              <li
                key={signal.label}
                className="rounded-lg border border-[#eceae4] bg-[#fcfbf8]/80 p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-2xl font-semibold text-[#1c1c1c]">
                  <CheckCircle2 className="size-5 text-[#0ea5a4]" />
                  {signal.value}
                </div>
                <p className="mt-1 text-sm leading-5 text-[#5f5f5d]">
                  {signal.label}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
