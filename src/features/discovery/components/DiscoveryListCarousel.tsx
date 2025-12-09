import { MoviesCarousel } from "./MoviesCarousel";
import { useDiscoveryQuery } from "../hooks/useDiscoveryQuery";
import type { DiscoverParams, Movie, PaginatedResponse } from "@/shared/types";
import { motion } from "framer-motion";

interface DiscoveryListCarouselProps {
  discoverParams: DiscoverParams;
}

export const DiscoveryListCarousel: React.FC<DiscoveryListCarouselProps> = ({
  discoverParams,
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
      className="space-y-4 rtl text-right pt-6"
    >
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
