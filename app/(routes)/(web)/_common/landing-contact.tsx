"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LandingContact() {
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      toast.success("Thanks - we'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-[#eceae4] bg-[#fcfbf8] py-20 text-[#1c1c1c] md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-[#0f8f8d]">Contact</p>
            <h2
              id="contact-heading"
              className="mt-3 text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl"
            >
              Let's build your next workflow
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[#5f5f5d]">
              Questions about plans, security, or enterprise rollout? Send a
              note. We read every message.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[#5f5f5d]">
              <li>
                <span className="font-medium text-[#1c1c1c]">Support</span> -
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
            className="rounded-lg border border-[#eceae4] bg-[#f7f4ed] p-6 text-[#1c1c1c]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  className="border-[#eceae4] bg-[#fcfbf8] text-[#1c1c1c] placeholder:text-[#5f5f5d] dark:bg-[#fcfbf8] dark:text-[#1c1c1c]"
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
                  className="border-[#eceae4] bg-[#fcfbf8] text-[#1c1c1c] placeholder:text-[#5f5f5d] dark:bg-[#fcfbf8] dark:text-[#1c1c1c]"
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
                placeholder="Tell us what you're trying to solve..."
                className="resize-none border-[#eceae4] bg-[#fcfbf8] text-[#1c1c1c] placeholder:text-[#5f5f5d] dark:bg-[#fcfbf8] dark:text-[#1c1c1c]"
              />
            </div>
            <Button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#0f8f8d] text-[#fcfbf8] shadow-[rgba(15,143,141,0.24)_0px_10px_28px] hover:bg-[#0b7472]"
              disabled={pending}
            >
              {pending ? "Sending..." : "Send message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
