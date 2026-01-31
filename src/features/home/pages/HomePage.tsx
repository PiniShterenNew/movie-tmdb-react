import React from "react";
import { Flame, Calendar, Star, Tv, Play } from "lucide-react";
import { HeroBanner, MediaCarousel, TrendingSection, GenreQuickAccess } from "../components";
import { useNowPlaying, usePopularMovies, useTopRatedMovies, useUpcomingMovies } from "@/shared/hooks/useMovies";
import { usePopularTV, useTopRatedTV } from "@/shared/hooks/useTVShows";
import { useLanguageStore } from "@/shared/store/language.store";

export const HomePage: React.FC = () => {
  const { language } = useLanguageStore();

  // Movie queries
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useNowPlaying();
  const { data: popularData, isLoading: popularLoading } = usePopularMovies();
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies();
  const { data: upcomingData, isLoading: upcomingLoading } = useUpcomingMovies();

  // TV queries
  const { data: popularTVData, isLoading: popularTVLoading } = usePopularTV();
  const { data: topRatedTVData, isLoading: topRatedTVLoading } = useTopRatedTV();

  // Convert TV shows to movie-like format for carousel
  const tvToMovieFormat = (tv: {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    first_air_date: string;
    vote_average: number | null;
  }) => ({
    id: tv.id,
    title: tv.name,
    overview: tv.overview,
    poster_path: tv.poster_path,
    release_date: tv.first_air_date,
    vote_average: tv.vote_average,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Content */}
      <div className="relative z-10 -mt-20 space-y-6 pb-12">
        {/* Trending Section with Day/Week toggle */}
        <TrendingSection />

        {/* Now Playing */}
        <MediaCarousel
          title={language === "he" ? "מוקרנים עכשיו" : "Now Playing"}
          icon={<Play className="w-5 h-5" />}
          items={nowPlayingData?.results || []}
          isLoading={nowPlayingLoading}
        />

        {/* Genre Quick Access */}
        <GenreQuickAccess />

        {/* Popular Movies */}
        <MediaCarousel
          title={language === "he" ? "סרטים פופולריים" : "Popular Movies"}
          icon={<Flame className="w-5 h-5" />}
          items={popularData?.results || []}
          isLoading={popularLoading}
        />

        {/* Popular TV */}
        <MediaCarousel
          title={language === "he" ? "סדרות פופולריות" : "Popular TV Shows"}
          icon={<Tv className="w-5 h-5" />}
          items={popularTVData?.results.map(tvToMovieFormat) || []}
          isLoading={popularTVLoading}
        />

        {/* Top Rated Movies */}
        <MediaCarousel
          title={language === "he" ? "מדורגים גבוה" : "Top Rated"}
          icon={<Star className="w-5 h-5" />}
          items={topRatedData?.results || []}
          isLoading={topRatedLoading}
        />

        {/* Upcoming */}
        <MediaCarousel
          title={language === "he" ? "בקרוב" : "Coming Soon"}
          icon={<Calendar className="w-5 h-5" />}
          items={upcomingData?.results || []}
          isLoading={upcomingLoading}
        />

        {/* Top Rated TV */}
        <MediaCarousel
          title={language === "he" ? "סדרות מדורגות גבוה" : "Top Rated TV Shows"}
          icon={<Star className="w-5 h-5" />}
          items={topRatedTVData?.results.map(tvToMovieFormat) || []}
          isLoading={topRatedTVLoading}
        />
      </div>
    </div>
  );
};

export default HomePage;
