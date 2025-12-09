import React from "react";
import type { MovieDetails } from "@/shared/types";
import { InfoItem } from "./InfoItem";

interface MovieInfoProps {
    movie: MovieDetails;
}

/**
 * MovieInfo Component
 * Single Responsibility: Display additional movie information (basic info, statistics, financial)
 */
export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Basic Info */}
            <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">מידע בסיסי</h3>
                <div className="space-y-2">
                    <InfoItem label="שפה מקורית" value={movie.original_language?.toUpperCase()} />
                    {movie.origin_country && movie.origin_country.length > 0 && (
                        <InfoItem label="מדינות מקור" value={movie.origin_country.join(", ")} />
                    )}
                    <InfoItem label="סטטוס" value={movie.status} />
                </div>
            </div>

            {/* Statistics */}
            <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">סטטיסטיקות</h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[#f2f2f2]/60 text-sm">הצבעות</span>
                        <span className="text-[#f2f2f2] font-semibold">{movie.vote_count?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#f2f2f2]/60 text-sm">פופולריות</span>
                        <span className="text-[#f2f2f2] font-semibold">{Math.round(movie.popularity || 0)}</span>
                    </div>
                </div>
            </div>

            {/* Financial */}
            <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">פיננסי</h3>
                <div className="space-y-2">
                    <InfoItem label="תקציב" value={movie.budget ? `$${movie.budget.toLocaleString()}` : "לא זמין"} />
                    <InfoItem label="הכנסות" value={movie.revenue ? `$${movie.revenue.toLocaleString()}` : "לא זמין"} />
                    {movie.imdb_id && (
                        <a 
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ff2d55] hover:text-[#ff4d4d] text-sm font-medium transition-colors inline-block mt-2"
                        >
                            צפה ב-IMDB →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
