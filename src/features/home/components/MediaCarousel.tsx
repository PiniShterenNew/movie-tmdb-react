import React, { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/features/discovery/components/MovieCard";
import { cn } from "@/shared/lib/utils";
import type { Movie } from "@/shared/types";

interface MediaCarouselProps {
  title: string;
  icon?: React.ReactNode;
  items: Movie[];
  isLoading?: boolean;
  onSeeAll?: () => void;
  seeAllLabel?: string;
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  title,
  icon,
  items,
  isLoading = false,
  onSeeAll,
  seeAllLabel = "הכל",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // RTL: scrollLeft is negative
    const scrollPos = Math.abs(scrollLeft);
    setCanScrollLeft(scrollPos > 10);
    setCanScrollRight(scrollPos < scrollWidth - clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    // RTL: directions are reversed
    const rtlDirection = direction === "left" ? 1 : -1;

    scrollRef.current.scrollBy({
      left: scrollAmount * rtlDirection,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  }, [checkScroll]);

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => container.removeEventListener("scroll", checkScroll);
  }, [checkScroll, items]);

  if (isLoading) {
    return <CarouselSkeleton title={title} icon={icon} />;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative py-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-primary">{icon}</span>
          )}
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {title}
          </h2>
        </div>

        {onSeeAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSeeAll}
            className="text-primary hover:text-primary/80"
          >
            {seeAllLabel}
          </Button>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Scroll Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "h-10 w-10 rounded-full bg-black/60 hover:bg-black/80",
            "text-white opacity-0 group-hover:opacity-100 transition-opacity",
            "disabled:opacity-0",
            !canScrollRight && "hidden"
          )}
          onClick={() => scroll("left")}
          disabled={!canScrollRight}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "h-10 w-10 rounded-full bg-black/60 hover:bg-black/80",
            "text-white opacity-0 group-hover:opacity-100 transition-opacity",
            "disabled:opacity-0",
            !canScrollLeft && "hidden"
          )}
          onClick={() => scroll("right")}
          disabled={!canScrollLeft}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 carousel-snap"
        >
          {items.map((movie, index) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px]"
            >
              <MovieCard movie={movie} isPriority={index < 5} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CarouselSkeletonProps {
  title: string;
  icon?: React.ReactNode;
}

const CarouselSkeleton: React.FC<CarouselSkeletonProps> = ({ title, icon }) => {
  return (
    <section className="py-4">
      <div className="flex items-center gap-2 px-4 mb-4">
        {icon && <span className="text-primary">{icon}</span>}
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      <div className="flex gap-4 overflow-hidden px-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px]"
          >
            <div className="aspect-[2/3] rounded-xl skeleton-shimmer" />
            <div className="mt-2 h-4 w-3/4 rounded skeleton-shimmer" />
            <div className="mt-1 h-3 w-1/2 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaCarousel;
