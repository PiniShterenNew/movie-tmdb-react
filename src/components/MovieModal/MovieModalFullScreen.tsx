import React, { useMemo, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useMovieModalStore } from "@/shared/store/movieModal.store";
import { useMovieDetails } from "@/features/movie-details/hooks/useMovieDetails";
import { useMovieCredits } from "@/features/movie-details/hooks/useMovieCredits";
import { useMovieVideos } from "@/features/movie-details/hooks/useMovieVideos";
import { useMovieTrailer } from "@/features/movie-details/hooks/useMovieTrailer";
import { MovieHero } from "@/features/movie-details/components/MovieHero";
import { MovieTrailer } from "@/features/movie-details/components/MovieTrailer";
import { MovieCast } from "@/features/movie-details/components/MovieCast";
import { MovieDirectors } from "@/features/movie-details/components/MovieDirectors";
import { MovieInfo } from "@/features/movie-details/components/MovieInfo";
import { MovieProductionCompanies } from "@/features/movie-details/components/MovieProductionCompanies";
import { ErrorMessage } from "@/components/ui";

/**
 * MovieModalFullScreen Component
 * Single Responsibility: Display full-screen modal with movie details
 */
export const MovieModalFullScreen: React.FC = () => {
  const { selectedMovieId, closeMovieModal } = useMovieModalStore();

  const { data, isLoading, error, refetch } = useMovieDetails(selectedMovieId);
  const { data: credits } = useMovieCredits(selectedMovieId);
  const { data: videos, isLoading: videosLoading, error: videosError } = useMovieVideos(selectedMovieId);

  // Handle browser back button
  useEffect(() => {
    if (!selectedMovieId) return;

    const handlePopState = () => {
      closeMovieModal();
    };

    // Push state to history when modal opens
    window.history.pushState({ modalOpen: true }, "");

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [selectedMovieId, closeMovieModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedMovieId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovieId]);

  // Get directors from crew
  const directors = useMemo(() => {
    return credits?.crew.filter(person => person.job === "Director") || [];
  }, [credits]);

  // Get main cast (first 12)
  const mainCast = useMemo(() => {
    return credits?.cast.slice(0, 12) || [];
  }, [credits]);

  // Get official trailer using custom hook
  const trailer = useMovieTrailer(videos?.results);

  if (!selectedMovieId) {
    return null;
  }

  return (
    <AnimatePresence>
      {selectedMovieId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={closeMovieModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeMovieModal}
              className="fixed top-4 left-4 z-[101] p-2 bg-[#1a1a1c]/90 backdrop-blur-md rounded-full hover:bg-[#1a1a1c] transition-modern border border-white/10"
              aria-label="סגור"
            >
              <X className="w-6 h-6 text-[#f2f2f2]" />
            </button>

            {/* Content */}
            <div className="min-h-screen bg-[#0e0e0f] text-[#f2f2f2] pb-10">
              {isLoading ? (
                <div className="space-y-8 pt-6 px-4 md:px-6 lg:px-8">
                  <div className="w-full h-64 bg-[#1a1a1c] animate-pulse rounded-[14px]" />
                  <div className="h-8 w-1/2 bg-[#1a1a1c] animate-pulse rounded" />
                  <div className="h-4 w-full bg-[#1a1a1c] animate-pulse rounded" />
                </div>
              ) : error ? (
                <div className="pt-6 px-4 md:px-6 lg:px-8">
                  <ErrorMessage error={error} onRetry={refetch} />
                </div>
              ) : data ? (
                <div className="space-y-8 pt-6 px-4 md:px-6 lg:px-8">
                  {/* Hero Section */}
                  <MovieHero movie={data} />

                  {/* Trailer Section */}
                  <MovieTrailer
                    trailer={trailer}
                    videos={videos?.results}
                    isLoading={videosLoading}
                    error={videosError}
                  />

                  {/* Directors Section */}
                  {directors.length > 0 && (
                    <MovieDirectors directors={directors} />
                  )}

                  {/* Cast Section */}
                  {mainCast.length > 0 && (
                    <MovieCast cast={mainCast} />
                  )}

                  {/* Additional Info Grid */}
                  <MovieInfo movie={data} />

                  {/* Production Companies */}
                  {data.production_companies && data.production_companies.length > 0 && (
                    <MovieProductionCompanies companies={data.production_companies} />
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
