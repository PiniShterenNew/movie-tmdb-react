import React from "react";
import { MoviesCarousel } from "./MoviesCarousel";
import { useDiscoveryQuery } from "../hooks/useDiscoveryQuery";
import type { DiscoverParams, Movie, PaginatedResponse } from "@/shared/types";
import { motion } from "motion/react"; 
import { cn } from "@/shared/lib";

interface MoviesSectionProps {
  title: string;
  icon?: React.ReactNode;
  discoverParams: DiscoverParams;
  className?: string;
}

export const MoviesSection: React.FC<MoviesSectionProps> = ({
  title,
  icon,
  discoverParams,
  className,
}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDiscoveryQuery(discoverParams);

  const allMovies = data?.pages.flatMap((page: PaginatedResponse<Movie>) => page.results) || [];

  if (isError) {
    return null; // Error handling can be added if needed
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-4 rtl text-right", className)}
    >
      {/* Section Title */}
      <div className="flex items-center gap-2 px-4">
        {icon && <span className="text-[#ff2d55]">{icon}</span>}
        <h2 className="text-xl font-semibold text-[#f2f2f2]">{title}</h2>
      </div>

      {/* Movies Carousel */}
      <MoviesCarousel
        movies={allMovies}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onLoadMore={fetchNextPage}
      />
    </motion.section>
  );
};
