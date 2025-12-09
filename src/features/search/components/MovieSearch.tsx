import React, { useState, useEffect } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useDebounce } from "@/shared/hooks";
import { ErrorMessage } from "@/components/ui/error-states/ErrorMessage";
import { EmptyState } from "@/components/ui/empty-states/EmptyState";
import { Search } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export const MovieSearch: React.FC<{onSelect: (movieId: number) => void}> = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce<string>(query, 300);
    const { data, isLoading, error, refetch } = useSearchMovies(debouncedQuery);
    const [open, setOpen] = useState(false);

    // פתיחה לפי טקסט
    useEffect(() => {
        if (query.trim().length > 1 && !open) {
            setTimeout(() => {
                setOpen(true);
            }, 0);
        }
    }, [query, open]);

    const handleSelect = (movieId: number) => {
        setOpen(false);
        setQuery("");
        onSelect(movieId);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="
                        rounded-full w-10 h-10
                        bg-gradient-to-r from-white/10 to-white/5
                        backdrop-blur-md border border-white/20
                        shadow-[0_2px_8px_rgba(0,0,0,0.2)]
                        hover:from-white/15 hover:to-white/10
                        hover:shadow-[0_3px_10px_rgba(0,0,0,0.3)]
                        hover:scale-[1.02]
                        active:scale-[0.98]
                        transition-all duration-200
                        text-white
                    "
                >
                    <Search className="w-5 h-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="
                    w-[90vw] max-w-md
                    bg-[#111216]/95 backdrop-blur-2xl border border-white/10 
                    shadow-[0_0_25px_rgba(0,0,0,0.55)] 
                    p-4 rounded-xl
                    rtl text-right
                "
                align="end"
            >
                {/* שדה החיפוש */}
                <Input
                    type="text"
                    placeholder="חפש סרט..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="
                        w-full text-right text-base px-4 py-2.5 rounded-full
                        bg-white/5 border border-white/10
                        backdrop-blur-md
                        text-white placeholder:text-white/40
                        focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400
                        shadow-[0_4px_15px_rgba(0,0,0,0.4)]
                        hover:bg-white/10
                        transition-all duration-200
                        mb-3
                    "
                    autoFocus
                />

                {/* חלון התוצאות */}
                <div className="max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* שגיאה */}
                    {error && (
                        <div className="p-4">
                            <ErrorMessage error={error} onRetry={refetch} />
                        </div>
                    )}

                    {/* טעינה */}
                    {isLoading && !error && (
                        <div className="p-4 space-y-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-[56px] w-full bg-white/10 rounded-lg" />
                            ))}
                        </div>
                    )}

                    {/* ללא תוצאות */}
                    {!isLoading && !error && data?.pages?.length === 0 && query.length > 1 && (
                        <div className="p-4">
                            <EmptyState
                                title="לא נמצאו תוצאות"
                                description={`לא נמצאו סרטים עבור "${query}". נסה לחפש עם מילות מפתח אחרות.`}
                                icon={<Search className="w-12 h-12" />}
                            />
                        </div>
                    )}

                    {/* תוצאות */}
                    {!isLoading && !error &&
                        data
                            ?.pages
                            .flatMap((page) => page.results)
                            .map((movie) => (
                                <button
                                    key={movie.id}
                                    className="
                                        w-full flex items-center gap-4 p-3 
                                        hover:bg-white/10 transition text-right
                                        border-b border-white/5 last:border-none
                                        rounded-lg
                                    "
                                    onClick={() => handleSelect(movie.id)}
                                >
                                    {/* פוסטר קטן */}
                                    <ResponsiveImage
                                        src={movie.poster_path || ""}
                                        alt={movie.title}
                                        className="w-[48px] h-[72px] object-cover rounded-md"
                                        sizes="48px"
                                        fallbackSize="w200"
                                    />

                                    {/* פרטים */}
                                    <div className="flex flex-col justify-between flex-1">
                                        <span className="text-white font-semibold text-[16px] line-clamp-1">
                                            {movie.title}
                                        </span>

                                        <Badge className="w-fit bg-blue-400 text-black font-bold text-sm">
                                            ⭐ {movie.vote_average?.toFixed(1)}
                                        </Badge>

                                        <span className="text-xs text-gray-400 line-clamp-1">
                                            {movie.overview || "אין תקציר זמין."}
                                        </span>
                                    </div>
                                </button>
                            ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
