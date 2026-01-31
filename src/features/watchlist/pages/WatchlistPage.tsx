import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  List,
  Grid3X3,
  Trash2,
  Download,
  Upload,
  Film,
  Tv,
  Clock,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWatchlistStore, type MediaType } from "@/shared/store/watchlist.store";
import { useMovieModalStore } from "@/shared/store/movieModal.store";
import { useLanguageStore } from "@/shared/store/language.store";
import { TMDB_IMAGE_BASE_URL } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";

type FilterType = "all" | "movie" | "tv";
type SortType = "added" | "title" | "rating" | "release";
type ViewMode = "grid" | "list";

export const WatchlistPage: React.FC = () => {
  const { items, removeItem, clearAll, exportData, importData } = useWatchlistStore();
  const { openMovieModal } = useMovieModalStore();
  const { language } = useLanguageStore();

  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("added");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredItems = useMemo(() => {
    let filtered =
      filterType === "all"
        ? items
        : items.filter((item) => item.type === filterType);

    return filtered.sort((a, b) => {
      switch (sortType) {
        case "added":
          return b.addedAt - a.addedAt;
        case "title":
          return a.title.localeCompare(b.title);
        case "rating":
          return (b.voteAverage || 0) - (a.voteAverage || 0);
        case "release":
          return b.releaseDate.localeCompare(a.releaseDate);
        default:
          return 0;
      }
    });
  }, [items, filterType, sortType]);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "moviehub-watchlist.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = importData(reader.result as string);
          if (!result) {
            alert(language === "he" ? "שגיאה בייבוא הקובץ" : "Error importing file");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === "he" ? "הרשימה שלי" : "My Watchlist"}
          </h1>
          <p className="text-muted-foreground">
            {items.length}{" "}
            {language === "he"
              ? items.length === 1
                ? "פריט"
                : "פריטים"
              : items.length === 1
              ? "item"
              : "items"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 ml-2" />
            {language === "he" ? "ייצוא" : "Export"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="w-4 h-4 ml-2" />
            {language === "he" ? "ייבוא" : "Import"}
          </Button>
          {items.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (
                  confirm(
                    language === "he"
                      ? "האם למחוק את כל הרשימה?"
                      : "Clear entire watchlist?"
                  )
                ) {
                  clearAll();
                }
              }}
            >
              <Trash2 className="w-4 h-4 ml-2" />
              {language === "he" ? "מחק הכל" : "Clear All"}
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      {items.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Type Filter */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            {(["all", "movie", "tv"] as FilterType[]).map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterType(type)}
                className={cn(
                  "gap-1",
                  filterType === type && "bg-primary text-primary-foreground"
                )}
              >
                {type === "movie" && <Film className="w-3 h-3" />}
                {type === "tv" && <Tv className="w-3 h-3" />}
                {type === "all"
                  ? language === "he"
                    ? "הכל"
                    : "All"
                  : type === "movie"
                  ? language === "he"
                    ? "סרטים"
                    : "Movies"
                  : language === "he"
                  ? "סדרות"
                  : "TV"}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-sm"
          >
            <option value="added">
              {language === "he" ? "תאריך הוספה" : "Date Added"}
            </option>
            <option value="title">
              {language === "he" ? "שם" : "Title"}
            </option>
            <option value="rating">
              {language === "he" ? "דירוג" : "Rating"}
            </option>
            <option value="release">
              {language === "he" ? "תאריך יציאה" : "Release Date"}
            </option>
          </select>

          {/* View Mode */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg mr-auto">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={cn(
                "h-8 w-8",
                viewMode === "grid" && "bg-primary text-primary-foreground"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={cn(
                "h-8 w-8",
                viewMode === "list" && "bg-primary text-primary-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {language === "he" ? "הרשימה ריקה" : "Your watchlist is empty"}
          </h2>
          <p className="text-muted-foreground">
            {language === "he"
              ? "הוסף סרטים וסדרות שאתה רוצה לצפות בהם"
              : "Add movies and TV shows you want to watch"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <WatchlistCard
                key={`${item.type}-${item.id}`}
                item={item}
                onRemove={() => removeItem(item.id, item.type)}
                onClick={() => openMovieModal(item.id)}
                language={language}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <WatchlistListItem
                key={`${item.type}-${item.id}`}
                item={item}
                onRemove={() => removeItem(item.id, item.type)}
                onClick={() => openMovieModal(item.id)}
                language={language}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

interface WatchlistItemProps {
  item: {
    id: number;
    type: MediaType;
    title: string;
    posterPath: string | null;
    voteAverage: number | null;
    releaseDate: string;
    addedAt: number;
  };
  onRemove: () => void;
  onClick: () => void;
  language: string;
}

const WatchlistCard: React.FC<WatchlistItemProps> = ({
  item,
  onRemove,
  onClick,
  language,
}) => {
  const year = item.releaseDate?.slice(0, 4);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative group"
    >
      <button onClick={onClick} className="w-full text-right">
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted mb-2">
          {item.posterPath ? (
            <img
              src={`${TMDB_IMAGE_BASE_URL}/w342${item.posterPath}`}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {item.type === "movie" ? (
                <Film className="w-8 h-8" />
              ) : (
                <Tv className="w-8 h-8" />
              )}
            </div>
          )}

          {/* Type badge */}
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-xs bg-black/60 text-white"
          >
            {item.type === "movie"
              ? language === "he"
                ? "סרט"
                : "Movie"
              : language === "he"
              ? "סדרה"
              : "TV"}
          </Badge>

          {/* Rating */}
          {item.voteAverage && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-black/60 text-white text-xs">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              {item.voteAverage.toFixed(1)}
            </div>
          )}
        </div>

        <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        {year && <p className="text-xs text-muted-foreground">{year}</p>}
      </button>

      {/* Remove button */}
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 left-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

const WatchlistListItem: React.FC<WatchlistItemProps> = ({
  item,
  onRemove,
  onClick,
  language,
}) => {
  const year = item.releaseDate?.slice(0, 4);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted/50 transition-colors group"
    >
      <button
        onClick={onClick}
        className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-muted"
      >
        {item.posterPath ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}/w154${item.posterPath}`}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {item.type === "movie" ? (
              <Film className="w-6 h-6" />
            ) : (
              <Tv className="w-6 h-6" />
            )}
          </div>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <button onClick={onClick} className="text-right block">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {item.title}
          </h3>
        </button>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
          <Badge variant="secondary" className="text-xs">
            {item.type === "movie"
              ? language === "he"
                ? "סרט"
                : "Movie"
              : language === "he"
              ? "סדרה"
              : "TV"}
          </Badge>
          {year && <span>{year}</span>}
          {item.voteAverage && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              {item.voteAverage.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </motion.div>
  );
};

export default WatchlistPage;
