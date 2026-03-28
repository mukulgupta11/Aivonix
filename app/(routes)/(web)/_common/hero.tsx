"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiExternalLinkLine } from "@remixicon/react";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative mt-6 overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-b from-primary/5 via-background/80 to-background shadow-sm",
        "px-6 py-14 sm:py-16 md:py-20"
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
        aria-hidden
      >
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-float-soft" />
        <div
          className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl animate-float-soft"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center justify-center gap-2"
        >
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-md dark:bg-primary/15">
            New · AI-powered workspace
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative text-balance font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl"
        >
          <span className="block bg-gradient-to-r from-foreground via-violet-700 to-primary bg-clip-text text-transparent dark:from-white dark:via-violet-200 dark:to-primary">
            Aivonix
          </span>
          <span className="mt-2 block text-foreground text-3xl sm:text-4xl md:text-5xl">
            Your second brain, powered by AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Capture ideas, organize notes, and chat with your knowledge—so you
          turn scattered thoughts into clear next steps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            asChild
            className={cn(
              "rounded-full px-6 py-5 sm:py-6 text-sm sm:!text-base shadow-lg !pl-8",
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Link href="/auth/sign-in">
              Get started free
              <RiExternalLinkLine className="ml-1 h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="rounded-full px-6 py-5 sm:py-6 text-sm sm:text-base hover:bg-primary/10"
            asChild
          >
            <Link href="#features">Explore features</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
