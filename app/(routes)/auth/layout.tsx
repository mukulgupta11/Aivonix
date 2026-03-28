import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session) {
    return redirect("/home");
  }
  return (
    <div className="relative min-h-svh">
      <div className="fixed top-4 left-4 z-10 md:top-6 md:left-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground underline-offset-4 hover:underline"
        >
          ← Back
        </Link>
      </div>
      {children}
    </div>
  );
}
