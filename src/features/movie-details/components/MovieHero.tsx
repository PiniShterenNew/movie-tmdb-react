import React from "react";
import type { MovieDetails } from "@/shared/types";
import { RatingStars } from "./RatingStars";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { TMDB_IMAGE_URL, TMDB_IMAGE_SIZE_MEDIUM } from "@/shared/constants";
import type { MovieGenre } from "@/shared/types";

interface MovieHeroProps {
    movie: MovieDetails;
}

/**
 * MovieHero Component
 * Single Responsibility: Display movie hero section with backdrop, poster, title, and basic info
 */
export const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
    return (
        <div className="relative rounded-[18px] overflow-hidden">
            {movie.backdrop_path && (
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${TMDB_IMAGE_URL(movie.backdrop_path, TMDB_IMAGE_SIZE_MEDIUM)})`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-[#0e0e0f]/80 to-[#0e0e0f]/50" />
                </div>
            )}
            
            <div className="relative z-10 p-6 md:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Poster */}
                    <div className="w-full lg:w-1/4 flex-shrink-0">
                        <div className="w-full max-w-[280px] mx-auto lg:mx-0 rounded-[14px] overflow-hidden shadow-2xl aspect-[2/3]">
                            <ResponsiveImage
                                src={movie.poster_path || ""}
                                alt={movie.title || ""}
                                className="w-full h-full object-cover"
                                sizes="280px"
                                fallbackSize="w500"
                            />
                        </div>
                    </div>

                    {/* Title and Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f2f2f2] leading-tight mb-2">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-[#f2f2f2]/70 italic text-lg border-r-4 border-[#ff2d55] pr-4">
                                    {movie.tagline}
                                </p>
                            )}
                        </div>

                        {/* Rating and Meta */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 bg-[#1a1a1c]/80 backdrop-blur-md rounded-[14px] px-4 py-2 border border-white/10">
                                <RatingStars rating={movie.vote_average || 0} />
                                <span className="text-[#f2f2f2] font-bold text-lg">
                                    {movie.vote_average?.toFixed(1)}
                                </span>
                                <span className="text-[#f2f2f2]/60 text-sm">/ 10</span>
                            </div>
                            {movie.runtime && (
                                <div className="bg-[#1a1a1c]/80 backdrop-blur-md rounded-[14px] px-4 py-2 border border-white/10">
                                    <span className="text-[#f2f2f2] text-sm">⏱️ {movie.runtime} דקות</span>
                                </div>
                            )}
                            {movie.release_date && (
                                <div className="bg-[#1a1a1c]/80 backdrop-blur-md rounded-[14px] px-4 py-2 border border-white/10">
                                    <span className="text-[#f2f2f2] text-sm">📅 {new Date(movie.release_date).getFullYear()}</span>
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((g: MovieGenre) => (
                                    <span 
                                        key={g.id}
                                        className="bg-gradient-to-r from-[#ff2d55]/20 to-[#ff4d4d]/20 border border-[#ff2d55]/30 text-[#f2f2f2] px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {movie.overview && (
                            <div>
                                <h3 className="text-[#f2f2f2] font-semibold mb-2 text-lg">תקציר</h3>
                                <p className="text-[#f2f2f2]/80 leading-relaxed text-base">
                                    {movie.overview}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
