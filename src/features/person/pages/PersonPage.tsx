import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Film,
  Tv,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaImdb, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePersonDetails } from "@/shared/hooks/usePerson";
import { useLanguageStore } from "@/shared/store/language.store";
import { useMovieModalStore } from "@/shared/store/movieModal.store";
import { TMDB_IMAGE_BASE_URL } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import type { PersonCastCredit } from "@/shared/types";

type FilterType = "all" | "movie" | "tv";
type SortType = "date" | "popularity" | "name";

export const PersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const personId = id ? parseInt(id) : null;
  const { data: person, isLoading, error } = usePersonDetails(personId);
  const { language } = useLanguageStore();
  const { openMovieModal } = useMovieModalStore();

  const [showFullBio, setShowFullBio] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortType, setSortType] = useState<SortType>("date");

  // Combine and filter credits
  const credits = useMemo(() => {
    if (!person?.combined_credits) return [];

    const allCredits = [...(person.combined_credits.cast || [])];

    // Filter by type
    const filtered =
      filterType === "all"
        ? allCredits
        : allCredits.filter((c) => c.media_type === filterType);

    // Sort
    return filtered.sort((a, b) => {
      switch (sortType) {
        case "date":
          const dateA = a.release_date || a.first_air_date || "";
          const dateB = b.release_date || b.first_air_date || "";
          return dateB.localeCompare(dateA);
        case "popularity":
          return b.popularity - a.popularity;
        case "name":
          const nameA = a.title || a.name || "";
          const nameB = b.title || b.name || "";
          return nameA.localeCompare(nameB);
        default:
          return 0;
      }
    });
  }, [person, filterType, sortType]);

  // Known for (top 6 by popularity)
  const knownFor = useMemo(() => {
    if (!person?.combined_credits?.cast) return [];
    return [...person.combined_credits.cast]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);
  }, [person]);

  if (isLoading) {
    return <PersonPageSkeleton />;
  }

  if (error || !person) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {language === "he" ? "שגיאה בטעינת הדף" : "Error loading page"}
        </h1>
        <Link to="/" className="text-primary hover:underline">
          {language === "he" ? "חזרה לדף הבית" : "Back to home"}
        </Link>
      </div>
    );
  }

  const age = person.birthday
    ? new Date().getFullYear() - new Date(person.birthday).getFullYear()
    : null;

  const biography = person.biography || "";
  const showBioToggle = biography.length > 500;
  const displayBio = showFullBio ? biography : biography.slice(0, 500);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            {person.profile_path ? (
              <img
                src={`${TMDB_IMAGE_BASE_URL}/w342${person.profile_path}`}
                alt={person.name}
                className="w-64 h-auto rounded-2xl shadow-2xl mx-auto md:mx-0"
              />
            ) : (
              <div className="w-64 h-96 rounded-2xl bg-muted flex items-center justify-center mx-auto md:mx-0">
                <span className="text-6xl text-muted-foreground">
                  {person.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Social Links */}
            {person.external_ids && (
              <div className="flex justify-center md:justify-start gap-3 mt-4">
                {person.external_ids.imdb_id && (
                  <a
                    href={`https://www.imdb.com/name/${person.external_ids.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                    aria-label="IMDB"
                  >
                    <FaImdb className="w-5 h-5" />
                  </a>
                )}
                {person.external_ids.instagram_id && (
                  <a
                    href={`https://instagram.com/${person.external_ids.instagram_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
                {person.external_ids.twitter_id && (
                  <a
                    href={`https://twitter.com/${person.external_ids.twitter_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                )}
                {person.external_ids.facebook_id && (
                  <a
                    href={`https://facebook.com/${person.external_ids.facebook_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {person.name}
            </h1>

            <Badge variant="secondary" className="mb-4">
              {person.known_for_department}
            </Badge>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              {person.birthday && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(person.birthday).toLocaleDateString(
                    language === "he" ? "he-IL" : "en-US"
                  )}
                  {age && ` (${age})`}
                </span>
              )}
              {person.place_of_birth && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {person.place_of_birth}
                </span>
              )}
              {person.homepage && (
                <a
                  href={person.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {language === "he" ? "אתר רשמי" : "Official Website"}
                </a>
              )}
            </div>

            {/* Biography */}
            {biography && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {language === "he" ? "ביוגרפיה" : "Biography"}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {displayBio}
                  {!showFullBio && showBioToggle && "..."}
                </p>
                {showBioToggle && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-2 text-primary"
                  >
                    {showFullBio ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        {language === "he" ? "הצג פחות" : "Show Less"}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        {language === "he" ? "הצג עוד" : "Show More"}
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Known For */}
      {knownFor.length > 0 && (
        <section className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === "he" ? "מוכר/ת בזכות" : "Known For"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {knownFor.map((credit) => (
              <CreditCard
                key={credit.credit_id}
                credit={credit}
                onClick={() => openMovieModal(credit.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Filmography */}
      <section className="container mx-auto px-4 mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {language === "he" ? "פילמוגרפיה" : "Filmography"}
          </h2>

          <div className="flex flex-wrap gap-2">
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
              <option value="date">
                {language === "he" ? "תאריך" : "Date"}
              </option>
              <option value="popularity">
                {language === "he" ? "פופולריות" : "Popularity"}
              </option>
              <option value="name">
                {language === "he" ? "שם" : "Name"}
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {credits.map((credit) => (
            <CreditCard
              key={credit.credit_id}
              credit={credit}
              onClick={() => openMovieModal(credit.id)}
              showCharacter
            />
          ))}
        </div>

        {credits.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            {language === "he" ? "לא נמצאו עבודות" : "No credits found"}
          </p>
        )}
      </section>
    </div>
  );
};

interface CreditCardProps {
  credit: PersonCastCredit;
  onClick: () => void;
  showCharacter?: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({
  credit,
  onClick,
  showCharacter = false,
}) => {
  const title = credit.title || credit.name || "";
  const year = (credit.release_date || credit.first_air_date || "").slice(0, 4);

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-right group"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted mb-2">
        {credit.poster_path ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}/w342${credit.poster_path}`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {credit.media_type === "movie" ? (
              <Film className="w-8 h-8" />
            ) : (
              <Tv className="w-8 h-8" />
            )}
          </div>
        )}

        {/* Media type badge */}
        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            className="text-xs bg-black/60 text-white"
          >
            {credit.media_type === "movie" ? "סרט" : "סדרה"}
          </Badge>
        </div>
      </div>

      <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {showCharacter && credit.character && (
        <p className="text-xs text-muted-foreground line-clamp-1">
          {credit.character}
        </p>
      )}

      {year && (
        <p className="text-xs text-muted-foreground">{year}</p>
      )}
    </motion.button>
  );
};

const PersonPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 h-96 rounded-2xl skeleton-shimmer mx-auto md:mx-0" />
          <div className="flex-1 space-y-4">
            <div className="h-10 w-64 rounded skeleton-shimmer" />
            <div className="h-6 w-32 rounded skeleton-shimmer" />
            <div className="h-4 w-48 rounded skeleton-shimmer" />
            <div className="h-32 w-full rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
