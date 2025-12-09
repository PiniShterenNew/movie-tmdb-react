import type { DiscoverParams } from "@/shared/types";

/**
 * Discovery page constants
 * Single Responsibility: Define default discover parameters for different movie sections
 */

/**
 * Get discover params for "Coming Soon" section
 * Shows movies with release date >= today, sorted by release date descending
 */
export function getComingSoonParams(): DiscoverParams {
  return {
    sort_by: "release_date.desc",
    primary_release_date_gte: new Date().toISOString().split("T")[0],
  };
}

/**
 * Get discover params for "Trending" section
 * Shows movies sorted by popularity descending
 */
export function getTrendingParams(): DiscoverParams {
  return {
    sort_by: "popularity.desc",
  };
}
