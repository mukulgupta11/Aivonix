"use client";

import React from "react";
import Link from "next/link";
import { formatMonthlyPriceInr, PLANS, PLAN_ENUM } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function LandingPricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-border/60 bg-muted/30 py-24 md:py-28"
      aria-labelledby="pricing-heading"
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
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Simple plans that scale with you
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start free, upgrade when you need more AI generations and team
            tools.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
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
                  "relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm",
                  popular &&
                    "border-primary/40 ring-2 ring-primary/20 lg:scale-[1.02]"
                )}
              >
                {popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
                <h3 className="text-lg font-semibold">{plan.displayName}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.name === PLAN_ENUM.FREE
                    ? "Try the core experience"
                    : plan.name === PLAN_ENUM.PLUS
                      ? "For power users"
                      : "For teams & operators"}
                </p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-1 gap-y-0">
                  <span className="text-4xl font-bold">
                    {formatMonthlyPriceInr(plan.price)}
                  </span>
                  <span className="text-muted-foreground text-sm">INR</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.slice(0, 6).map((line) => (
                    <li key={line} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    "mt-8 w-full rounded-full",
                    popular ? "bg-primary hover:bg-primary/90" : ""
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
