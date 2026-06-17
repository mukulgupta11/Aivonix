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
    <footer className="border-t border-[#eceae4] bg-[#1c1c1c] py-12 text-[#fcfbf8]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo url="/" inverse />
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#fcfbf8]/70">
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
                  className="text-[#fcfbf8]/70 transition hover:text-[#fcfbf8]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/auth/sign-in"
                className="text-[#fcfbf8]/70 transition hover:text-[#fcfbf8]"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#fcfbf8]/10 px-4 pt-8 text-center text-xs text-[#fcfbf8]/55">
        Copyright {new Date().getFullYear()} Aivonix. All rights reserved.
      </div>
    </footer>
  );
}
