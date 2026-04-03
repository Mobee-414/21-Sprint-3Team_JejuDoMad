"use client";

import { useState, useLayoutEffect } from "react";

export function usePageSize() {
  const [pageSize, setPageSize] = useState(4);

  useLayoutEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)",
    );

    const update = () => {
      if (mobileQuery.matches) {
        setPageSize(6);
      } else if (tabletQuery.matches) {
        setPageSize(4);
      } else {
        setPageSize(8);
      }
    };

    update();
    mobileQuery.addEventListener("change", update);
    tabletQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      tabletQuery.removeEventListener("change", update);
    };
  }, []);

  return pageSize;
}
