"use client";
import React from "react";
import Image from "next/image";

const AppPreview = () => {
  return (
    <section className="-mt-10">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-white dark:bg-background shadow-md">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="w-full">
            <div className="bg-background rounded-(--radius) relative mx-auto overflow-hidden border border-transparent shadow-xl shadow-black/10 ring-1 ring-black/10">
              <Image
                src="/images/aivonix-app-preview.jpg"
                alt="Aivonix app preview"
                width={1024}
                height={588}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
