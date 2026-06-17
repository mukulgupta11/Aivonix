"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatMonthlyPriceInr, PLAN_ENUM, PLANS } from "@/lib/constant";

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
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={cn(
                  "relative flex flex-col rounded-lg border border-[#eceae4] bg-[#f7f4ed] p-6 text-[#1c1c1c]",
                  popular &&
                    "border-[rgba(28,28,28,0.4)] bg-[#1c1c1c] text-[#fcfbf8] lg:-translate-y-3"
                )}
              >
                {popular && (
                  <span className="mb-4 w-fit rounded-md bg-[#8ee7d6] px-3 py-1 text-sm font-medium text-[#123431]">
                    Best signal
                  </span>
                )}
                <h3 className="text-xl font-medium">{plan.displayName}</h3>
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
                      popular ? "text-[#fcfbf8]" : "text-[#1c1c1c]"
                    )}
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
                          popular ? "text-[#8ee7d6]" : "text-[#0f8f8d]"
                        )}
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
                      ? "bg-[#fcfbf8] text-[#1c1c1c] hover:bg-[#eceae4]"
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
