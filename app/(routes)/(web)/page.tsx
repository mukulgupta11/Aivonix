import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AppPreview from "./_common/app-preview";
import Hero from "./_common/hero";
import LandingBlog from "./_common/landing-blog";
import LandingContact from "./_common/landing-contact";
import LandingFeatures from "./_common/landing-features";
import LandingFooter from "./_common/landing-footer";
import LandingPricing from "./_common/landing-pricing";
import Navbar from "./_common/nav-bar";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/home");
  }

  return (
    <main className="relative min-h-dvh w-full">
      <div
        className="absolute inset-0 z-0 dark:hidden animate-gradient-shift bg-[length:200%_200%]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 120% 100% at 50% 100%, oklch(0.92 0.06 303) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 20% 20%, oklch(0.88 0.08 290 / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 10%, oklch(0.9 0.05 320 / 0.45) 0%, transparent 45%)
          `,
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block animate-gradient-shift bg-[length:200%_200%]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 120% 100% at 50% 100%, oklch(0.35 0.12 303) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 15% 15%, oklch(0.4 0.14 290 / 0.35) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 85% 5%, oklch(0.38 0.1 320 / 0.3) 0%, transparent 45%)
          `,
        }}
      />

      <div className="absolute inset-0 z-0 dark:hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(139, 92, 246, 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(139, 92, 246, 0.06) 1px, transparent 1px)
      `,
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.85) 65%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.85) 65%, transparent 100%)",
          }}
        />
      </div>
      <div className="absolute inset-0 z-0 hidden dark:block">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(167, 139, 250, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(167, 139, 250, 0.08) 1px, transparent 1px)
      `,
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.75) 60%, transparent 100%)",
            maskImage:
              "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.75) 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
          <Navbar />
          <Hero />
          <AppPreview />
        </div>
        <LandingFeatures />
        <LandingPricing />
        <LandingBlog />
        <LandingContact />
        <LandingFooter />
      </div>
    </main>
  );
}
