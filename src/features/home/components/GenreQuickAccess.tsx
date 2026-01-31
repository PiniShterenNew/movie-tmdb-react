import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Grid3X3 } from "lucide-react";
import { useGenresQuery } from "@/shared/hooks";
import { useLanguageStore } from "@/shared/store/language.store";
import { cn } from "@/shared/lib/utils";

const GENRE_COLORS: Record<number, string> = {
  28: "from-red-600 to-orange-600",      // Action
  12: "from-green-600 to-emerald-600",   // Adventure
  16: "from-purple-600 to-pink-600",     // Animation
  35: "from-yellow-500 to-amber-500",    // Comedy
  80: "from-gray-700 to-slate-700",      // Crime
  99: "from-blue-600 to-cyan-600",       // Documentary
  18: "from-indigo-600 to-violet-600",   // Drama
  10751: "from-pink-500 to-rose-500",    // Family
  14: "from-purple-700 to-fuchsia-700",  // Fantasy
  36: "from-amber-700 to-yellow-700",    // History
  27: "from-gray-900 to-red-900",        // Horror
  10402: "from-pink-600 to-purple-600",  // Music
  9648: "from-slate-700 to-gray-700",    // Mystery
  10749: "from-red-500 to-pink-500",     // Romance
  878: "from-blue-700 to-indigo-700",    // Science Fiction
  10770: "from-teal-600 to-cyan-600",    // TV Movie
  53: "from-red-800 to-gray-800",        // Thriller
  10752: "from-green-800 to-gray-800",   // War
  37: "from-amber-800 to-yellow-800",    // Western
};

export const GenreQuickAccess: React.FC = () => {
  const navigate = useNavigate();
  const { data: genres, isLoading } = useGenresQuery();
  const { language } = useLanguageStore();

  const handleGenreClick = (genreId: number) => {
    navigate(`/?genres=${genreId}`);
  };

  if (isLoading) {
    return <GenreQuickAccessSkeleton />;
  }

  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="flex items-center gap-2 px-4 mb-4">
        <Grid3X3 className="w-5 h-5 text-primary" />
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          {language === "he" ? "גלה לפי ז'אנר" : "Browse by Genre"}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 px-4">
        {genres.slice(0, 12).map((genre, index) => (
          <motion.button
            key={genre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleGenreClick(genre.id)}
            className={cn(
              "relative overflow-hidden rounded-xl p-4 text-center",
              "bg-gradient-to-br",
              GENRE_COLORS[genre.id] || "from-gray-600 to-gray-700",
              "hover:scale-105 transition-transform duration-200",
              "focus-ring"
            )}
          >
            <span className="relative z-10 font-semibold text-white text-sm md:text-base">
              {genre.name}
            </span>
            <div className="absolute inset-0 bg-black/20" />
          </motion.button>
        ))}
      </div>
    </section>
  );
};

const GenreQuickAccessSkeleton: React.FC = () => {
  return (
    <section className="py-6">
      <div className="flex items-center gap-2 px-4 mb-4">
        <Grid3X3 className="w-5 h-5 text-primary" />
        <div className="h-7 w-40 rounded skeleton-shimmer" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-xl skeleton-shimmer"
          />
        ))}
      </div>
    </section>
  );
};

export default GenreQuickAccess;
