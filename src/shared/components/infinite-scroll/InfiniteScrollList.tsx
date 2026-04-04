"use client";

import { ReactNode } from "react";
import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import LoadMoreTrigger from "./LoadMoreTrigger";

interface Props<Page, Item, Cursor> {
  queryKey: QueryKey;
  queryFn: (cursor: Cursor) => Promise<Page>;
  initialPageParam: Cursor;
  getNextCursor: (lastPage: Page) => Cursor | null | undefined;
  getItems: (page: Page) => Item[];
  renderItem: (item: Item, index: number) => ReactNode;
  empty?: ReactNode;
  loading?: ReactNode;
  error?: ReactNode;
  loadingMore?: ReactNode;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  rootMargin?: string;
}

export default function InfiniteScrollList<Page, Item, Cursor>({
  queryKey,
  queryFn,
  initialPageParam,
  getNextCursor,
  getItems,
  renderItem,
  empty = <div>데이터가 없습니다.</div>,
  loading = null,
  error = <div>에러가 발생했습니다.</div>,
  loadingMore,
  className,
  listClassName,
  triggerClassName,
  rootMargin,
}: Props<Page, Item, Cursor>) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam as Cursor),
    initialPageParam,
    getNextPageParam: (lastPage) => getNextCursor(lastPage),
  });

  const items = data?.pages.flatMap((page) => getItems(page)) ?? [];

  if (isLoading) return <>{loading}</>;
  if (isError) return <>{error}</>;
  if (items.length === 0) return <>{empty}</>;

  return (
    <div className={className}>
      <div className={listClassName}>
        {items.map((item, index) => renderItem(item, index))}
      </div>

      {isFetchingNextPage && loadingMore}

      <LoadMoreTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        rootMargin={rootMargin}
        className={triggerClassName}
      />
    </div>
  );
}
