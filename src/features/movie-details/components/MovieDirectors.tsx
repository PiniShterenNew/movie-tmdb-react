import React from "react";
import { Film } from "lucide-react";
import type { CrewMember } from "../api/movie-credits.api";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

interface MovieDirectorsProps {
    directors: CrewMember[];
}

/**
 * MovieDirectors Component
 * Single Responsibility: Display movie directors section
 */
export const MovieDirectors: React.FC<MovieDirectorsProps> = ({ directors }) => {
    if (directors.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Film className="w-6 h-6 text-[#ff2d55]" />
                <h3 className="text-xl font-bold text-[#f2f2f2]">במאים</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {directors.map((director) => (
                    <div 
                        key={director.id}
                        className="bg-[#1a1a1c] rounded-[14px] p-4 border border-white/10 hover:border-[#ff2d55]/30 transition-modern text-center"
                    >
                        {director.profile_path ? (
                            <ResponsiveImage
                                src={director.profile_path}
                                alt={director.name}
                                className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                                sizes="80px"
                                fallbackSize="w200"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full mx-auto mb-2 bg-[#1a1a1c] border border-white/10 flex items-center justify-center">
                                <Film className="w-8 h-8 text-[#f2f2f2]/40" />
                            </div>
                        )}
                        <p className="text-[#f2f2f2] font-semibold text-sm">{director.name}</p>
                        <p className="text-[#f2f2f2]/60 text-xs mt-1">במאי</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
