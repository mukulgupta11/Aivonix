import React from "react";
import Link from "next/link";

const Logo = (props: { url?: string }) => {
  const { url = "/" } = props;
  return (
    <Link href={url} className="w-fit flex items-center gap-2">
      <div
        className="flex aspect-square size-9 items-center justify-center rounded-lg overflow-hidden bg-gradient-to-br from-primary to-violet-600 text-primary-foreground shadow-sm ring-1 ring-primary/20"
        aria-hidden
      >
        <span className="font-bold text-sm tracking-tight">A</span>
      </div>

      <div className="flex-1 text-left text-base leading-tight">
        <span className="font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          Aivonix
        </span>
      </div>
    </Link>
  );
};

export default Logo;
