import { useCallback } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import type { RefObject } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

/**
 * Custom hook for infinite scroll functionality
 * Combines useInfiniteQuery with IntersectionObserver
 * 
 * @param fetchNextPage - Function to fetch next page from useInfiniteQuery
 * @param hasNextPage - Boolean indicating if more pages are available
 * @param isFetchingNextPage - Boolean indicating if currently fetching next page
 * @param options - IntersectionObserver options
 * @returns Ref object to attach to the target element
 */
export function useInfiniteScroll(
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  options: UseInfiniteScrollOptions = {}
): RefObject<HTMLDivElement | null> {
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loadMoreRef = useIntersectionObserver(handleLoadMore, {
    threshold: options.threshold ?? 0.1,
    root: options.root ?? null,
    rootMargin: options.rootMargin,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  return loadMoreRef;
}

