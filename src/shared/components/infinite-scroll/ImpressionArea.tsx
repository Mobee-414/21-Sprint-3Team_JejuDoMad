"use client";

import { useEffect, useRef } from "react";

interface Props {
  onImpressionStart: () => void;
  rootMargin?: string;
  className?: string;
}

export default function ImpressionArea({
  onImpressionStart,
  rootMargin = "20px 0px",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = ref.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        onImpressionStart();
      },
      {
        root: null,
        rootMargin,
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [onImpressionStart, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: "1px" }}
      aria-hidden="true"
    />
  );
}
