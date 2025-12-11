import React, { useEffect, useRef } from "react";
import { MovieCard } from "@/features/discovery/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useSearchMovies } from "@/features/search/hooks/useSearchMovies";
import type { Movie, PaginatedResponse } from "@/shared/types";
import { motion } from "motion/react"; 

interface SearchListGridProps {
  query: string;
}

export const SearchListGrid: React.FC<SearchListGridProps> = ({
  query,
}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchMovies(query);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const allMovies = data?.pages.flatMap((page: PaginatedResponse<Movie>) => page.results) || [];

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && allMovies.length === 0) {
    return (
      <div className="space-y-8 rtl text-right pt-6 px-4">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {[...Array(12)].map((_, i) => (
            <li key={i} className="flex justify-center">
              <div className="w-[200px] h-[285px] md:w-[240px] md:h-[342px] lg:w-[260px] lg:h-[371px] xl:w-[280px] xl:h-[400px]">
                <Skeleton className="w-full h-full rounded-[14px] bg-[#1a1a1c]" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-6 px-4 text-center text-[#f2f2f2]/60">
        אירעה שגיאה בטעינת תוצאות החיפוש. נסה שוב מאוחר יותר.
      </div>
    );
  }

  if (!isLoading && allMovies.length === 0 && query.length > 1) {
    return (
      <div className="pt-6 px-4 text-center text-[#f2f2f2]/60">
        לא נמצאו סרטים עבור החיפוש "{query}".
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 rtl text-right pt-6 px-4"
    >
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
        {allMovies.map((movie: Movie, index: number) => (
          <li key={`${movie.id}-${index}`} className="flex justify-center">
            <div className="w-[200px] h-[285px] md:w-[240px] md:h-[342px] lg:w-[260px] lg:h-[371px] xl:w-[280px] xl:h-[400px]">
              <MovieCard movie={movie} isPriority={index === 0} />
            </div>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetchingNextPage && <Loader2 className="w-6 h-6 animate-spin text-[#ff2d55]" />}
        </div>
      )}
    </motion.section>
  );
};
