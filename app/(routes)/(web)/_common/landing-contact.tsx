"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function LandingContact() {
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      toast.success("Thanks — we’ll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/60 bg-muted/25 py-24 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Contact
            </p>
            <h2
              id="contact-heading"
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Let’s build your next workflow
            </h2>
            <p className="mt-4 text-muted-foreground">
              Questions about plans, security, or enterprise rollout? Send a
              note—we read every message.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Support</span> —
                mukulgupta3264@gmail.com
              </li>
            </ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us what you’re trying to solve…"
                className="resize-none"
              />
            </div>
            <Button
              type="submit"
              className="mt-6 w-full rounded-full bg-primary hover:bg-primary/90"
              disabled={pending}
            >
              {pending ? "Sending…" : "Send message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
