import type { Movie } from "./movie.types";
import type { TVShow } from "./tv.types";
import type { Person } from "./person.types";

export type TimeWindow = "day" | "week";
export type MediaType = "movie" | "tv" | "person" | "all";

export interface TrendingMovie extends Movie {
  media_type: "movie";
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}

export interface TrendingTV extends TVShow {
  media_type: "tv";
}

export interface TrendingPerson extends Person {
  media_type: "person";
  known_for: (TrendingMovie | TrendingTV)[];
}

export type TrendingItem = TrendingMovie | TrendingTV | TrendingPerson;

export interface TrendingResponse {
  page: number;
  results: TrendingItem[];
  total_pages: number;
  total_results: number;
}
