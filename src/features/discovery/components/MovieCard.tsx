import React from "react";
import { Badge } from "@/components/ui";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { Movie } from "@/shared/types";
import { cn } from "@/shared/lib";
import { motion } from "motion/react"; 
import { useMovieModalStore } from "@/shared/store/movieModal.store";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void; // Optional for backward compatibility
  className?: string;
  isPriority?: boolean; // For LCP optimization - mark first image as priority
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, className, isPriority = false }) => {
  const { openMovieModal } = useMovieModalStore();
  const imagePath = movie.poster_path || "";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      openMovieModal(movie.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn("w-full h-full cursor-pointer group", className)}
    >
      <div
        className="
          relative overflow-hidden rounded-[14px]
          bg-[#111] border border-white/5 
          shadow-[0_4px_14px_rgba(0,0,0,0.45)]
          transition-all duration-300 
          group-hover:shadow-[0_6px_22px_rgba(0,0,0,0.65)]
          h-full flex flex-col
        "
      >

        {/* Background Image - Using <img> for LCP optimization */}
        <div className="absolute inset-0 overflow-hidden">
          <ResponsiveImage
            src={imagePath}
            alt={movie.title}
            className="
              w-full h-full
              transition-all duration-500
              group-hover:scale-105 group-hover:brightness-90
            "
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
          />
        </div>

        {/* Rating Badge */}
        {movie.vote_average !== null && movie.vote_average !== undefined && (
          <div className="absolute top-3 right-3 z-20">
            <Badge className="bg-[#ff2d55]/90 backdrop-blur-sm text-white font-bold text-xs px-2 py-0.5 rounded-full shadow-lg border border-white/10">
              ⭐ {movie.vote_average.toFixed(1)}
            </Badge>
          </div>
        )}

        {/* TEXT OVERLAY */}
        <div className="relative z-10 mt-auto flex flex-col justify-end p-4 pt-5 min-h-[88px]">

          {/* BASE Layer */}
          <div className="absolute inset-0 bg-[#0e0e0f]/92"></div>

          {/* Gradient */}
          <div
            className="
              absolute inset-0 
              bg-gradient-to-t 
              from-[#0e0e0f]/95 
              via-[#0e0e0f]/65 
              to-transparent
            "
          ></div>

          {/* Actual Text */}
          <div className="relative space-y-0.5">
            <h2
              className="
                font-bold text-base text-[#f2f2f2]
                line-clamp-2 leading-tight
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
              "
            >
              {movie.title}
            </h2>

            {movie.release_date && (
              <div
                className="
                  text-sm text-white/85 font-medium
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]
                "
              >
                {new Date(movie.release_date).getFullYear()}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
