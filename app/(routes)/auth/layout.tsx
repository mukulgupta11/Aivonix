import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/home");
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(14, 165, 164, 0.12), transparent 32%),
            linear-gradient(225deg, rgba(245, 102, 77, 0.12), transparent 36%)
          `,
        }}
      />
      <div className="fixed left-4 top-4 z-10 md:left-6 md:top-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-[rgba(28,28,28,0.4)] bg-[#fcfbf8]/80 px-3 py-2 text-sm text-[#1c1c1c] backdrop-blur-md transition hover:bg-[#1c1c1c]/[0.04]"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
