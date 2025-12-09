// features/discovery/components/ui/DiscoveryListView.tsx

import { Flame } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-states/EmptyState";
import { Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import type { Movie } from "@/shared/types";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useMovieModalStore } from "@/shared/store/movieModal.store";

interface DiscoveryListViewProps {
    allMovies: Movie[];
    showLoadingOverlay: boolean;
    refetch: () => void;
    isLoading: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    loadMoreRef: React.RefObject<HTMLDivElement>;
}

export const DiscoveryListView: React.FC<DiscoveryListViewProps> = ({ allMovies, showLoadingOverlay, refetch, isLoading, hasNextPage, isFetchingNextPage, loadMoreRef }) => {

    const { openMovieModal } = useMovieModalStore();

    const handleClick = (movieId: number) => {
        openMovieModal(movieId);
    };

    return (
        <section className="space-y-8 rtl text-right !mt-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <Flame className="w-7 h-7 text-red-500 drop-shadow-[0_0_10px_rgba(255,80,0,0.5)]" />
                    <h2 className="text-3xl font-semibold text-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]">
                        סרטים מומלצים
                    </h2>
                </div>
                <button
                    onClick={() => refetch()}
                    className="px-5 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white
                     font-bold transition focus:ring-2 focus:ring-red-400 focus:outline-none"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            <div className={`relative ${showLoadingOverlay ? 'opacity-40 pointer-events-none' : ''}`}>
                {!isLoading && allMovies.length === 0 ? (
                    <EmptyState
                        title="לא נמצאו סרטים"
                        description="לא נמצאו סרטים לפי הפילטרים שבחרת. נסה לשנות את הפילטרים או את תקופת הזמן."
                        icon={<Film className="w-16 h-16" />}
                        action={{
                            label: "נקה פילטרים",
                            onClick: () => {
                                window.location.reload();
                            }
                        }}
                    />
                ) : (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                        {allMovies.map((movie: Movie, index: number) => (
                            <Card
                                key={`${movie.id}-${index}`}
                                onClick={() => handleClick(movie.id)}
                                className="
        group cursor-pointer overflow-hidden bg-[#14151b]/80 backdrop-blur-xl border border-white/5
        shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-none
        transition-transform duration-300
        hover:scale-[1.04]
        hover:shadow-[0_0_35px_rgba(255,0,0,0.33)]
      "
                            >
                                <ResponsiveImage
                                    src={movie.poster_path || ""}
                                    alt={movie.title}
                                    className="h-[256px] w-full object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                />
                                <CardContent className="p-3 space-y-2">
                                    <h3 className="font-bold text-base text-white line-clamp-2 leading-tight">
                                        {movie.title}
                                    </h3>

                                    <Badge className="bg-yellow-500 text-black font-semibold text-xs px-2 py-0.5">
                                        ⭐ {movie.vote_average?.toFixed(1)}
                                    </Badge>

                                    <p className="text-xs text-gray-400">
                                        תאריך יציאה:{" "}
                                        <span className="text-gray-200 font-semibold">
                                            {movie.release_date || "—"}
                                        </span>
                                    </p>

                                    <p className="text-xs text-gray-400 line-clamp-2">
                                        {movie.overview || "אין תקציר זמין."}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </ul>
                )}
                {!isLoading && allMovies.length > 0 && hasNextPage && (
                    <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                        {isFetchingNextPage && <Loader2 className="w-5 h-5 animate-spin" />}
                    </div>
                )}
            </div>
        </section>
    );
}