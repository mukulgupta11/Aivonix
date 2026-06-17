import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../_common/nav-bar";

const articles: Record<
  string,
  { title: string; date: string; body: string[] }
> = {
  "building-a-second-brain-with-ai": {
    title: "Building a second brain with AI without the noise",
    date: "March 12, 2026",
    body: [
      "A second brain only works when you can trust what goes in and what comes back out. Start with a few durable categories: decisions, references, and open questions.",
      "Pair short notes with clear titles. When you chat with Aivonix, those titles become anchors the model can use to stay grounded.",
      "Review weekly: archive what aged out, tighten titles, and link related threads. Small maintenance beats a big cleanup.",
    ],
  },
  "from-chaos-to-clarity": {
    title: "From chaos to clarity: workflows that stick",
    date: "March 5, 2026",
    body: [
      "Teams fail when everything is urgent. Pick one weekly rhythm: Monday priorities, Wednesday unblock, Friday recap.",
      "Keep decisions in one place, your Aivonix workspace, so async teammates can catch up without another meeting.",
      "End each recap with three lines: shipped, blocked, next. Momentum is visible, and scope stays honest.",
    ],
  },
  "security-privacy": {
    title: "Security and privacy for AI workspaces",
    date: "February 28, 2026",
    body: [
      "AI products should default to least privilege: access only what the user already trusts in the product.",
      "Retention policies belong in plain language. Teams should know what is stored, for how long, and how to export or delete.",
      "When in doubt, separate production data from training. Your workspace is yours, not a dataset.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = articles[slug];
  if (!post) return { title: "Article | Aivonix" };
  return {
    title: `${post.title} | Aivonix`,
    description: post.body[0],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = articles[slug];
  if (!post) notFound();

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-5">
        <Navbar />
      </div>
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 rounded-md border border-[rgba(28,28,28,0.4)] px-4 py-2 text-sm font-medium text-[#1c1c1c] hover:bg-[#1c1c1c]/[0.04]"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
        <p className="mt-10 text-sm text-[#5f5f5d]">{post.date}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#1c1c1c] sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-10 space-y-6 rounded-lg border border-[#eceae4] bg-[#fcfbf8] p-6 text-base text-[#5f5f5d] md:p-8">
          {post.body.map((p, i) => (
            <p key={i} className="leading-8">
              {p}
            </p>
          ))}
        </div>
      </article>
    </main>
  );
}
