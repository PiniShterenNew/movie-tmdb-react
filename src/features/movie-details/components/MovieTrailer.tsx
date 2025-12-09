import React from "react";
import { Youtube } from "lucide-react";
import type { Video } from "../api/movie-videos.api";

interface MovieTrailerProps {
    trailer?: Video;
    videos?: Video[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * MovieTrailer Component
 * Single Responsibility: Display movie trailer/videos section
 */
export const MovieTrailer: React.FC<MovieTrailerProps> = ({
    trailer,
    videos,
    isLoading,
    error,
}) => {
    if (error) {
        return (
            <div className="bg-[#1a1a1c] rounded-[14px] p-4 border border-red-500/20">
                <p className="text-red-400 text-sm">שגיאה בטעינת וידאו: {error.message}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Youtube className="w-6 h-6 text-[#ff2d55]" />
                    <h3 className="text-xl font-bold text-[#f2f2f2]">טריילר</h3>
                </div>
                <div className="relative w-full rounded-[14px] overflow-hidden bg-[#1a1a1c] aspect-video flex items-center justify-center">
                    <div className="text-[#f2f2f2]/60">טוען טריילר...</div>
                </div>
            </div>
        );
    }

    if (trailer) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Youtube className="w-6 h-6 text-[#ff2d55]" />
                    <h3 className="text-xl font-bold text-[#f2f2f2]">טריילר</h3>
                </div>
                <div className="relative w-full rounded-[14px] overflow-hidden bg-[#1a1a1c] aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                        title={trailer.name}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>
        );
    }

    if (videos && videos.length > 0) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Youtube className="w-6 h-6 text-[#ff2d55]" />
                    <h3 className="text-xl font-bold text-[#f2f2f2]">וידאו</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.slice(0, 4).map((video) => (
                        <div key={video.id} className="space-y-2">
                            <div className="relative w-full rounded-[14px] overflow-hidden bg-[#1a1a1c] aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}?rel=0&modestbranding=1`}
                                    title={video.name}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-[#f2f2f2]/80 text-sm">{video.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};
