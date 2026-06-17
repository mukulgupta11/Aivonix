"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatMonthlyPriceInr, PLAN_ENUM, PLANS } from "@/lib/constant";

const planAccents = {
  [PLAN_ENUM.FREE]: { accent: "#0ea5a4", bg: "#e4faf4" },
  [PLAN_ENUM.PLUS]: { accent: "#4f6df5", bg: "#eef1ff" },
  [PLAN_ENUM.PREMIUM]: { accent: "#f5664d", bg: "#fff0eb" },
};

export default function LandingPricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-[#eceae4] bg-[#fcfbf8] py-20 text-[#1c1c1c] md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium text-[#0f8f8d]">Pricing</p>
          <h2
            id="pricing-heading"
            className="mt-3 text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl"
          >
            Simple plans that scale with you
          </h2>
          <p className="mt-3 leading-7 text-[#5f5f5d]">
            Start free, upgrade when you need more AI generations and team
            tools.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const popular = plan.name === PLAN_ENUM.PREMIUM;
            const palette = planAccents[plan.name];
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={cn(
                  "relative flex flex-col rounded-lg border bg-[#f7f4ed] p-6 text-[#1c1c1c]",
                  popular &&
                    "text-[#fcfbf8] shadow-[0_22px_70px_rgba(79,109,245,0.18)] lg:-translate-y-3"
                )}
                style={{
                  borderColor: popular ? palette.accent : `${palette.accent}44`,
                  borderTopColor: palette.accent,
                  borderTopWidth: 4,
                  background: popular
                    ? "linear-gradient(135deg, #123431 0%, #17305f 54%, #7d291d 100%)"
                    : `linear-gradient(180deg, ${palette.bg}, #f7f4ed 58%)`,
                }}
              >
                {popular && (
                  <span className="mb-4 w-fit rounded-md bg-[#ffd8cb] px-3 py-1 text-sm font-medium text-[#7d291d]">
                    Best signal
                  </span>
                )}
                <h3
                  className="text-xl font-medium"
                  style={{ color: popular ? "#fcfbf8" : palette.accent }}
                >
                  {plan.displayName}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    popular ? "text-[#fcfbf8]/70" : "text-[#5f5f5d]"
                  )}
                >
                  {plan.name === PLAN_ENUM.FREE
                    ? "Try the core experience"
                    : plan.name === PLAN_ENUM.PLUS
                      ? "For power users"
                      : "For teams and operators"}
                </p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-1 gap-y-0">
                  <span
                    className={cn(
                      "text-4xl font-semibold",
                      popular ? "text-[#fcfbf8]" : ""
                    )}
                    style={{ color: popular ? undefined : palette.accent }}
                  >
                    {formatMonthlyPriceInr(plan.price)}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      popular ? "text-[#fcfbf8]/70" : "text-[#5f5f5d]"
                    )}
                  >
                    INR
                  </span>
                  <span
                    className={popular ? "text-[#fcfbf8]/70" : "text-[#5f5f5d]"}
                  >
                    /month
                  </span>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.slice(0, 6).map((line) => (
                    <li key={line} className="flex gap-2 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          popular ? "text-[#ffd8cb]" : ""
                        )}
                        style={{ color: popular ? undefined : palette.accent }}
                      />
                      <span
                        className={popular ? "text-[#fcfbf8]" : "text-[#1c1c1c]"}
                      >
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    "mt-8 w-full rounded-md",
                    popular
                      ? "bg-[#ffd8cb] text-[#7d291d] hover:bg-[#ffc7b5]"
                      : "border-[rgba(28,28,28,0.4)] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c]/[0.04] dark:bg-transparent dark:text-[#1c1c1c]"
                  )}
                  variant={popular ? "default" : "outline"}
                >
                  <Link href="/auth/sign-up">
                    {plan.price === 0 ? "Start free" : "Get started"}
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
