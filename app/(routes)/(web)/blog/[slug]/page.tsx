import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<
  string,
  { title: string; date: string; body: string[] }
> = {
  "building-a-second-brain-with-ai": {
    title: "Building a second brain with AI (without the noise)",
    date: "March 12, 2026",
    body: [
      "A second brain only works when you can trust what goes in—and what comes back out. Start with a few durable categories: decisions, references, and open questions.",
      "Pair short notes with clear titles. When you chat with Aivonix, those titles become anchors the model can use to stay grounded.",
      "Review weekly: archive what aged out, tighten titles, and link related threads. Small maintenance beats a big cleanup.",
    ],
  },
  "from-chaos-to-clarity": {
    title: "From chaos to clarity: workflows that stick",
    date: "March 5, 2026",
    body: [
      "Teams fail when everything is urgent. Pick one weekly rhythm: Monday priorities, Wednesday unblock, Friday recap.",
      "Keep decisions in one place—your Aivonix workspace—so async teammates can catch up without another meeting.",
      "End each recap with three lines: shipped, blocked, next. Momentum is visible, and scope stays honest.",
    ],
  },
  "security-privacy": {
    title: "Security & privacy for AI workspaces",
    date: "February 28, 2026",
    body: [
      "AI products should default to least privilege: access only what the user already trusts in the product.",
      "Retention policies belong in plain language. Teams should know what is stored, for how long, and how to export or delete.",
      "When in doubt, separate production data from training—your workspace is yours, not a dataset.",
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
    <article className="mx-auto max-w-2xl px-4 py-16">
      <Link
        href="/#blog"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back
      </Link>
      <p className="mt-8 text-sm text-muted-foreground">{post.date}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-10 max-w-none space-y-6 text-base text-muted-foreground">
        {post.body.map((p, i) => (
          <p key={i} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
