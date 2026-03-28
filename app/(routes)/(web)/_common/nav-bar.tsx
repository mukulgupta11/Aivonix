"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

function Navbar() {
  return (
    <header>
      <nav
        className={cn(
          "mx-auto mt-px flex items-center justify-between gap-3",
          "rounded-full border border-primary/10 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md",
          "dark:bg-black/40 dark:border-primary/15"
        )}
        aria-label="Primary"
      >
        <Logo url="/" />
        <ul className="hidden items-center gap-6 text-sm xl:text-base font-normal md:flex">
          <li>
            <Link
              href="#pricing"
              className="transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#features"
              className="transition-colors hover:text-primary"
            >
              Features
            </Link>
          </li>
          <li>
            <Link href="#blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="transition-colors hover:text-primary"
            >
              Contact us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/sign-in"
            className="hidden text-sm transition-colors hover:text-primary md:inline"
          >
            Sign In
          </Link>
          <Link href="/auth/sign-up" aria-label="Try Aivonix for free">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer"
            >
              <span>Try Aivonix free</span>
              <ArrowRight className="h-4 w-4" />
            </HoverBorderGradient>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
