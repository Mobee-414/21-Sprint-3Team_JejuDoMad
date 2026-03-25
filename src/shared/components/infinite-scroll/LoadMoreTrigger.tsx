"use client";

import ImpressionArea from "./ImpressionArea";

interface Props {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  className?: string;
}

export default function LoadMoreTrigger({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  rootMargin,
  className,
}: Props) {
  if (!hasNextPage) return null;

  const handleImpression = () => {
    if (isFetchingNextPage) return;

    onLoadMore();
  };

  return (
    <ImpressionArea
      onImpressionStart={handleImpression}
      rootMargin={rootMargin}
      className={className}
    />
  );
}
