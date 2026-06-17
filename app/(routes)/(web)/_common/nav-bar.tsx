"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#pricing", label: "Pricing" },
  { href: "#features", label: "Features" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav
        className={cn(
          "mx-auto flex items-center justify-between gap-3",
          "rounded-lg border border-[#eceae4] bg-[#fcfbf8]/90 px-3 py-2 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset] backdrop-blur-md"
        )}
        aria-label="Primary"
      >
        <Logo url="/" surface="light" />
        <ul className="hidden items-center gap-6 text-sm font-normal text-[#5f5f5d] md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-[#1c1c1c]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/sign-in"
            className="hidden rounded-md px-3 py-2 text-sm text-[#5f5f5d] transition-colors hover:bg-[#1c1c1c]/[0.04] hover:text-[#1c1c1c] md:inline"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="hidden items-center gap-2 rounded-md bg-[#1c1c1c] px-4 py-2 text-sm text-[#fcfbf8] shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px] transition hover:bg-[#2a2a2a] sm:flex"
          >
            Try Aivonix free
            <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-md border border-[#eceae4] bg-[#f7f4ed] text-[#1c1c1c] md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-lg border border-[#eceae4] bg-[#fcfbf8] p-2 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-[#5f5f5d] hover:bg-[#1c1c1c]/[0.04] hover:text-[#1c1c1c]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/sign-up"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-md bg-[#1c1c1c] px-3 py-2 text-sm text-[#fcfbf8]"
          >
            Try Aivonix free
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;
