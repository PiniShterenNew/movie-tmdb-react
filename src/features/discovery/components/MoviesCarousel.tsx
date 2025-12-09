import React, { useEffect, useRef } from "react";
import { MovieCard } from "./MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import type { Movie } from "@/shared/types";
import { cn } from "@/shared/lib";

interface MoviesCarouselProps {
  movies: Movie[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  className?: string;
}

export const MoviesCarousel: React.FC<MoviesCarouselProps> = ({
  movies,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  onLoadMore,
  className,
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  if (isLoading && movies.length === 0) {
    return (
      <div
        className={cn(
          "flex gap-3 overflow-x-auto scrollbar-none snap-x snap-start",
          className
        )}
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex-shrink-0" style={{ width: "280px", height: "400px" }}>
            <Skeleton className="w-full h-full rounded-[14px] bg-[#1a1a1c]" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className={cn(
          "flex gap-3 overflow-x-auto scrollbar-none",
          "snap-x snap-start",
          "pb-2"
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {movies.map((movie, index) => (
          <div key={`${movie.id}-${index}`} className="flex-shrink-0" style={{ width: "280px", height: "400px" }}>
            <MovieCard movie={movie} />
          </div>
        ))}
        
        {/* Load More Trigger */}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: "100px", height: "220px" }}
          >
            {isFetchingNextPage && (
              <Loader2 className="w-6 h-6 animate-spin text-[#ff2d55]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
