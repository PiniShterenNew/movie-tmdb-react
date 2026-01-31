import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Info, Plus, Check, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrending } from "@/shared/hooks/useTrending";
import { useMovieModalStore } from "@/shared/store/movieModal.store";
import { useWatchlistStore } from "@/shared/store/watchlist.store";
import { useLanguageStore } from "@/shared/store/language.store";
import { TMDB_IMAGE_BASE_URL } from "@/shared/constants";
import type { TrendingMovie, TrendingTV } from "@/shared/types";

const BACKDROP_SIZES = {
  small: "w780",
  medium: "w1280",
  large: "original",
};

const AUTO_SLIDE_INTERVAL = 6000;

export const HeroBanner: React.FC = () => {
  const { data, isLoading } = useTrending("all", "day");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openMovieModal } = useMovieModalStore();
  const { addItem, isInWatchlist, removeItem } = useWatchlistStore();
  const { language } = useLanguageStore();

  // Filter to only movies and TV shows with backdrop
  const items = React.useMemo(() => {
    if (!data?.results) return [];
    return data.results
      .filter(
        (item): item is TrendingMovie | TrendingTV =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          !!item.backdrop_path
      )
      .slice(0, 10);
  }, [data]);

  const currentItem = items[currentIndex];

  // Auto-slide
  useEffect(() => {
    if (isPaused || items.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handleMoreInfo = useCallback(() => {
    if (currentItem) {
      openMovieModal(currentItem.id);
    }
  }, [currentItem, openMovieModal]);

  const handleWatchlistToggle = useCallback(() => {
    if (!currentItem) return;

    const type = currentItem.media_type;
    const title =
      type === "movie"
        ? (currentItem as TrendingMovie).title
        : (currentItem as TrendingTV).name;
    const releaseDate =
      type === "movie"
        ? (currentItem as TrendingMovie).release_date
        : (currentItem as TrendingTV).first_air_date;

    if (isInWatchlist(currentItem.id, type)) {
      removeItem(currentItem.id, type);
    } else {
      addItem({
        id: currentItem.id,
        type,
        title,
        posterPath: currentItem.poster_path,
        voteAverage: currentItem.vote_average,
        releaseDate,
      });
    }
  }, [currentItem, isInWatchlist, addItem, removeItem]);

  if (isLoading || items.length === 0) {
    return <HeroBannerSkeleton />;
  }

  const title =
    currentItem.media_type === "movie"
      ? (currentItem as TrendingMovie).title
      : (currentItem as TrendingTV).name;

  const releaseDate =
    currentItem.media_type === "movie"
      ? (currentItem as TrendingMovie).release_date
      : (currentItem as TrendingTV).first_air_date;

  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const inWatchlist = isInWatchlist(currentItem.id, currentItem.media_type);

  return (
    <section
      className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label={language === "he" ? "באנר ראשי" : "Hero Banner"}
    >
      {/* Backdrop Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <picture>
            <source
              media="(min-width: 1280px)"
              srcSet={`${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZES.large}${currentItem.backdrop_path}`}
            />
            <source
              media="(min-width: 768px)"
              srcSet={`${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZES.medium}${currentItem.backdrop_path}`}
            />
            <img
              src={`${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZES.small}${currentItem.backdrop_path}`}
              alt={title}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-gradient-side" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-16 md:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl space-y-4"
            >
              {/* Media Type Badge */}
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded">
                  {currentItem.media_type === "movie"
                    ? language === "he"
                      ? "סרט"
                      : "Movie"
                    : language === "he"
                    ? "סדרה"
                    : "TV Show"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {language === "he" ? "טרנדי היום" : "Trending Today"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {currentItem.vote_average && (
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    {currentItem.vote_average.toFixed(1)}
                  </span>
                )}
                {year && <span>{year}</span>}
              </div>

              {/* Overview */}
              <p className="text-sm md:text-base text-muted-foreground line-clamp-3 max-w-xl">
                {currentItem.overview}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                  onClick={handleMoreInfo}
                >
                  <Play className="w-5 h-5 fill-current" />
                  {language === "he" ? "צפייה" : "Watch Now"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={handleMoreInfo}
                >
                  <Info className="w-5 h-5" />
                  {language === "he" ? "פרטים נוספים" : "More Info"}
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/10 border-white/20 hover:bg-white/20"
                  onClick={handleWatchlistToggle}
                  aria-label={
                    inWatchlist
                      ? language === "he"
                        ? "הסר מהרשימה"
                        : "Remove from list"
                      : language === "he"
                      ? "הוסף לרשימה"
                      : "Add to list"
                  }
                >
                  {inWatchlist ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
          onClick={goToNext}
          aria-label={language === "he" ? "הבא" : "Next"}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className="h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
          onClick={goToPrev}
          aria-label={language === "he" ? "הקודם" : "Previous"}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
};

const HeroBannerSkeleton: React.FC = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden bg-muted">
      <div className="absolute inset-0 skeleton-shimmer" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-16 md:pb-20">
          <div className="max-w-2xl space-y-4">
            <div className="h-6 w-24 bg-muted-foreground/20 rounded" />
            <div className="h-12 w-96 bg-muted-foreground/20 rounded" />
            <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
            <div className="h-20 w-full max-w-xl bg-muted-foreground/20 rounded" />
            <div className="flex gap-3 pt-2">
              <div className="h-12 w-32 bg-muted-foreground/20 rounded-lg" />
              <div className="h-12 w-40 bg-muted-foreground/20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
