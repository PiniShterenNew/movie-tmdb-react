import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrending } from "@/shared/hooks/useTrending";
import { useLanguageStore } from "@/shared/store/language.store";
import { MediaCarousel } from "./MediaCarousel";
import type { TrendingMovie, TimeWindow } from "@/shared/types";

export const TrendingSection: React.FC = () => {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
  const { data, isLoading } = useTrending("movie", timeWindow);
  const { language } = useLanguageStore();

  const movies = React.useMemo(() => {
    if (!data?.results) return [];
    return data.results
      .filter((item): item is TrendingMovie => item.media_type === "movie")
      .map((item) => ({
        id: item.id,
        title: item.title,
        overview: item.overview,
        poster_path: item.poster_path,
        release_date: item.release_date,
        vote_average: item.vote_average,
      }));
  }, [data]);

  return (
    <section className="py-2">
      {/* Time Window Toggle */}
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {language === "he" ? "טרנדים" : "Trending"}
          </h2>
        </div>

        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={timeWindow === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeWindow("day")}
            className={
              timeWindow === "day"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            {language === "he" ? "היום" : "Today"}
          </Button>
          <Button
            variant={timeWindow === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeWindow("week")}
            className={
              timeWindow === "week"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            {language === "he" ? "השבוע" : "This Week"}
          </Button>
        </div>
      </div>

      <MediaCarousel
        title=""
        items={movies}
        isLoading={isLoading}
      />
    </section>
  );
};

export default TrendingSection;
