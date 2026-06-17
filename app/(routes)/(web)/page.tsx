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
    <main className="relative min-h-dvh w-full overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(14, 165, 164, 0.12), transparent 30%),
            linear-gradient(225deg, rgba(245, 102, 77, 0.12), transparent 34%),
            linear-gradient(180deg, rgba(252, 251, 248, 0.72), rgba(247, 244, 237, 0.94))
          `,
        }}
      />
      <div className="absolute inset-0 z-0 dark:hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(28, 28, 28, 0.045) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(28, 28, 28, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 88%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 88%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 md:py-5">
          <Navbar />
        </div>
        <Hero />
        <AppPreview />
        <LandingFeatures />
        <LandingPricing />
        <LandingBlog />
        <LandingContact />
        <LandingFooter />
      </div>
    </main>
  );
}
