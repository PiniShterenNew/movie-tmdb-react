import React from "react";
import { Users } from "lucide-react";
import type { CastMember } from "../api/movie-credits.api";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

interface MovieCastProps {
    cast: CastMember[];
}

/**
 * MovieCast Component
 * Single Responsibility: Display movie cast section
 */
export const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
    if (cast.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-[#ff2d55]" />
                <h3 className="text-xl font-bold text-[#f2f2f2]">שחקנים</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cast.map((actor) => (
                    <div 
                        key={actor.id}
                        className="bg-[#1a1a1c] rounded-[14px] p-4 border border-white/10 hover:border-[#ff2d55]/30 transition-modern text-center cursor-pointer"
                    >
                        {actor.profile_path ? (
                            <ResponsiveImage
                                src={actor.profile_path}
                                alt={actor.name}
                                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                                sizes="80px"
                                fallbackSize="w200"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full mx-auto mb-2 bg-[#1a1a1c] border border-white/10 flex items-center justify-center">
                                <Users className="w-8 h-8 text-[#f2f2f2]/40" />
                            </div>
                        )}
                        <p className="text-[#f2f2f2] font-semibold text-sm line-clamp-1">{actor.name}</p>
                        <p className="text-[#f2f2f2]/60 text-xs mt-1 line-clamp-2">{actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
