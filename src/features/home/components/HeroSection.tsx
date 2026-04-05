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
      </div>
    </div>
  );
}
