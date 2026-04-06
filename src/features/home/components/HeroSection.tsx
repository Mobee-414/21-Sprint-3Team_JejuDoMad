"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const JejuCanvas = dynamic(() => import("./JejuCanvas"), { ssr: false });

export default function HeroSection() {
  return (
    <div className="flex w-full justify-center px-6 md:px-10">
      <div className="relative mt-10 flex aspect-[327/181] w-full max-w-[1200px] justify-end overflow-hidden rounded-xl pb-10 md:aspect-[684/375] lg:aspect-[1120/500]">
        <Suspense>
          <JejuCanvas />
        </Suspense>

        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl lg:text-7xl">
            WELCOME
          </h1>
          <p className="mt-2 text-xl font-semibold tracking-widest text-blue-200">
            JEJU ISLAND
          </p>
        </div>
      </div>
    </div>
  );
}
