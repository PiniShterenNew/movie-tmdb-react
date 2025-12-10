import React, { useEffect, useMemo } from "react";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { X, Users, Film, Youtube } from "lucide-react";
import { InfoItem } from "./InfoItem";
import { RatingStars } from "./RatingStars";
import { MovieGenre, ProductionCompany } from "@/shared";
import { ErrorMessage } from "@/components/ui";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { TMDB_IMAGE_URL, TMDB_IMAGE_SIZE_MEDIUM } from "@/shared/constants";
import { motion, AnimatePresence } from "motion/react"; 
import { cn } from "@/shared/lib";

interface Props {
    movieId: number | null;
    onClose: () => void;
}

export const MovieModal: React.FC<Props> = ({ movieId, onClose }) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    const { data, isLoading, error, refetch } = useMovieDetails(movieId);
    const { data: credits } = useMovieCredits(movieId);
    const { data: videos, isLoading: videosLoading, error: videosError } = useMovieVideos(movieId);

    // Get directors from crew
    const directors = useMemo(() => {
        return credits?.crew.filter(person => person.job === "Director") || [];
    }, [credits]);

    // Get main cast (first 12)
    const mainCast = useMemo(() => {
        return credits?.cast.slice(0, 12) || [];
    }, [credits]);

    // Get official trailer - try multiple strategies
    const trailer = useMemo(() => {
        if (!videos?.results || videos.results.length === 0) {
            console.log('No videos found for movie:', movieId);
            return undefined;
        }
        
        console.log('Available videos:', videos.results);
        
        // Strategy 1: Official YouTube Trailer
        let found = videos.results.find(v => 
            v.type === "Trailer" && 
            v.official === true && 
            v.site === "YouTube"
        );
        
        // Strategy 2: Any YouTube Trailer
        if (!found) {
            found = videos.results.find(v => 
                v.type === "Trailer" && 
                v.site === "YouTube"
            );
        }
        
        // Strategy 3: Any YouTube video (Teaser, Clip, etc.)
        if (!found) {
            found = videos.results.find(v => 
                (v.type === "Trailer" || v.type === "Teaser" || v.type === "Clip") && 
                v.site === "YouTube"
            );
        }
        
        console.log('Selected trailer:', found);
        return found;
    }, [videos, movieId]);

    if (!movieId) return null;
    
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        "bg-[#0e0e0f] text-[#f2f2f2]",
                        "w-full max-w-7xl",
                        "rounded-[18px]",
                        "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
                        "border border-[#1a1a1c]",
                        "relative",
                        "max-h-[90vh]",
                        "flex flex-col",
                        "rtl text-right"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={cn(
                            "absolute top-4 left-4 z-20",
                            "rounded-full w-10 h-10",
                            "bg-[#1a1a1c] border border-white/20",
                            "hover:bg-[#ff2d55] hover:border-[#ff2d55]",
                            "text-white shadow-lg",
                            "flex items-center justify-center",
                            "transition-modern"
                        )}
                        aria-label="סגור"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Scrollable Content */}
                    <div 
                        className="overflow-y-auto flex-1 custom-scrollbar"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                        }}
                    >
                        {isLoading ? (
                            <div className="p-6 space-y-4">
                                <div className="w-full h-64 bg-[#1a1a1c] animate-pulse rounded-[14px]" />
                                <div className="h-8 w-1/2 bg-[#1a1a1c] animate-pulse rounded" />
                                <div className="h-4 w-full bg-[#1a1a1c] animate-pulse rounded" />
                            </div>
                        ) : error ? (
                            <div className="p-6">
                                <ErrorMessage error={error} onRetry={refetch} />
                            </div>
                        ) : (
                            <div className="p-6 space-y-8">
                                {/* Hero Section with Backdrop */}
                                <div className="relative -m-6 mb-0 rounded-t-[18px] overflow-hidden">
                                    {data?.backdrop_path && (
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${TMDB_IMAGE_URL(data.backdrop_path, TMDB_IMAGE_SIZE_MEDIUM)})`,
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
                                                        src={data?.poster_path || ""}
                                                        alt={data?.title || ""}
                                                        className="w-full h-full object-cover"
                                                        sizes="280px"
                                                        fallbackSize="w500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Title and Info */}
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f2f2f2] leading-tight mb-2">
                                                        {data?.title}
                                                    </h2>
                                                    {data?.tagline && (
                                                        <p className="text-[#f2f2f2]/70 italic text-lg border-r-4 border-[#ff2d55] pr-4">
                                                            {data.tagline}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Rating and Meta */}
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <div className="flex items-center gap-2 bg-[#1a1a1c]/80 backdrop-blur-md rounded-[14px] px-4 py-2 border border-white/10">
                                                        <RatingStars rating={data?.vote_average || 0} />
                                                        <span className="text-[#f2f2f2] font-bold text-lg">
                                                            {data?.vote_average?.toFixed(1)}
                                                        </span>
                                                        <span className="text-[#f2f2f2]/60 text-sm">/ 10</span>
                                                    </div>
                                                    {data?.runtime && (
                                                        <div className="bg-[#1a1a1c]/80 backdrop-blur-md rounded-[14px] px-4 py-2 border border-white/10">
                                                            <span className="text-[#f2f2f2] text-sm">⏱️ {data.runtime} דקות</span>
                                                        </div>
                                                    )}
                                                    {data?.release_date && (
                                                        <div className="bg-[#1a1a1c]/80 backdrop-blur-md rounded-[14px] px-4 py-2 border border-white/10">
                                                            <span className="text-[#f2f2f2] text-sm">📅 {new Date(data.release_date).getFullYear()}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Genres */}
                                                {data?.genres && data.genres.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {data.genres.map((g: MovieGenre) => (
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
                                                {data?.overview && (
                                                    <div>
                                                        <h3 className="text-[#f2f2f2] font-semibold mb-2 text-lg">תקציר</h3>
                                                        <p className="text-[#f2f2f2]/80 leading-relaxed text-base">
                                                            {data.overview}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trailer Section */}
                                {videosError && (
                                    <div className="bg-[#1a1a1c] rounded-[14px] p-4 border border-red-500/20">
                                        <p className="text-red-400 text-sm">שגיאה בטעינת וידאו: {videosError.message}</p>
                                    </div>
                                )}
                                {videosLoading ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Youtube className="w-6 h-6 text-[#ff2d55]" />
                                            <h3 className="text-xl font-bold text-[#f2f2f2]">טריילר</h3>
                                        </div>
                                        <div className="relative w-full rounded-[14px] overflow-hidden bg-[#1a1a1c] aspect-video flex items-center justify-center">
                                            <div className="text-[#f2f2f2]/60">טוען טריילר...</div>
                                        </div>
                                    </div>
                                ) : trailer ? (
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
                                ) : videos?.results && videos.results.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Youtube className="w-6 h-6 text-[#ff2d55]" />
                                            <h3 className="text-xl font-bold text-[#f2f2f2]">וידאו</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {videos.results.slice(0, 4).map((video) => (
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
                                ) : null}

                                {/* Directors Section */}
                                {directors.length > 0 && (
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
                                )}

                                {/* Cast Section */}
                                {mainCast.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-6 h-6 text-[#ff2d55]" />
                                            <h3 className="text-xl font-bold text-[#f2f2f2]">שחקנים</h3>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                            {mainCast.map((actor) => (
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
                                )}

                                {/* Additional Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Basic Info */}
                                    <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                                        <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">מידע בסיסי</h3>
                                        <div className="space-y-2">
                                            <InfoItem label="שפה מקורית" value={data?.original_language?.toUpperCase()} />
                                            {data?.origin_country && data.origin_country.length > 0 && (
                                                <InfoItem label="מדינות מקור" value={data.origin_country.join(", ")} />
                                            )}
                                            <InfoItem label="סטטוס" value={data?.status} />
                                        </div>
                                    </div>

                                    {/* Statistics */}
                                    <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                                        <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">סטטיסטיקות</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#f2f2f2]/60 text-sm">הצבעות</span>
                                                <span className="text-[#f2f2f2] font-semibold">{data?.vote_count?.toLocaleString() || 0}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#f2f2f2]/60 text-sm">פופולריות</span>
                                                <span className="text-[#f2f2f2] font-semibold">{Math.round(data?.popularity || 0)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financial */}
                                    <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                                        <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">פיננסי</h3>
                                        <div className="space-y-2">
                                            <InfoItem label="תקציב" value={data?.budget ? `$${data.budget.toLocaleString()}` : "לא זמין"} />
                                            <InfoItem label="הכנסות" value={data?.revenue ? `$${data.revenue.toLocaleString()}` : "לא זמין"} />
                                            {data?.imdb_id && (
                                                <a 
                                                    href={`https://www.imdb.com/title/${data.imdb_id}`}
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

                                {/* Production Companies */}
                                {data?.production_companies && data.production_companies.length > 0 && (
                                    <div className="bg-[#1a1a1c] rounded-[14px] p-5 border border-white/10">
                                        <h3 className="text-[#f2f2f2] font-bold text-lg mb-4 pb-2 border-b border-white/10">חברות הפקה</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                            {data.production_companies.map((c: ProductionCompany) => (
                                                <div 
                                                    key={c.id} 
                                                    className="flex items-center gap-3 bg-[#0e0e0f] rounded-lg p-3 border border-white/10 hover:border-[#ff2d55]/30 transition-modern"
                                                >
                                                    {c.logo_path ? (
                                                        <ResponsiveImage
                                                            src={c.logo_path}
                                                            alt={c.name}
                                                            className="w-12 h-12 object-contain"
                                                            sizes="48px"
                                                            fallbackSize="w200"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-[#1a1a1c] rounded flex items-center justify-center">
                                                            <Film className="w-6 h-6 text-[#f2f2f2]/40" />
                                                        </div>
                                                    )}
                                                    <span className="text-[#f2f2f2] text-sm font-medium flex-1 line-clamp-2">{c.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
