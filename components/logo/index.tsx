import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  url?: string;
  inverse?: boolean;
  surface?: "auto" | "light" | "dark";
};

const Logo = (props: LogoProps) => {
  const { url = "/", inverse = false, surface = "auto" } = props;
  const isDarkSurface = inverse || surface === "dark";

  return (
    <Link href={url} className="flex w-fit items-center gap-2">
      <div
        className={cn(
          "flex aspect-square size-9 items-center justify-center overflow-hidden rounded-md shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset]",
          isDarkSurface
            ? "bg-[#fcfbf8] text-[#1c1c1c]"
            : "bg-[linear-gradient(135deg,#0ea5a4,#4f6df5_55%,#f5664d)] text-[#fcfbf8]"
        )}
        aria-hidden
      >
        <span className="text-sm font-semibold">A</span>
      </div>

      <div className="flex-1 text-left text-base leading-tight">
        <span
          className={cn(
            "font-semibold",
            isDarkSurface && "text-[#fcfbf8]",
            surface === "light" && !inverse && "text-[#1c1c1c]",
            surface === "auto" &&
              !inverse &&
              "text-[#1c1c1c] dark:text-[#fcfbf8]"
          )}
        >
          Aivonix
        </span>
      </div>
    </Link>
  );
};

export default Logo;
