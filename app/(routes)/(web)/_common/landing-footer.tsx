import React from "react";
import Link from "next/link";
import Logo from "@/components/logo";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-background py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo url="/" />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Aivonix helps you capture ideas, chat with your knowledge, and ship
            with clarity.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/auth/sign-in"
                className="text-muted-foreground transition hover:text-foreground"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border/40 px-4 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aivonix. All rights reserved.
      </div>
    </footer>
  );
}
