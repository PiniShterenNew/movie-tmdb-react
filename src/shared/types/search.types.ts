import type { Movie } from "./movie.types";
import type { TVShow } from "./tv.types";
import type { Person } from "./person.types";

export type SearchMediaType = "movie" | "tv" | "person";

export interface MultiSearchMovie extends Movie {
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

export interface MultiSearchTV extends TVShow {
  media_type: "tv";
}

export interface MultiSearchPerson extends Person {
  media_type: "person";
  known_for: (MultiSearchMovie | MultiSearchTV)[];
}

export type MultiSearchResult = MultiSearchMovie | MultiSearchTV | MultiSearchPerson;

export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchTVResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface SearchPersonResponse {
  page: number;
  results: Person[];
  total_pages: number;
  total_results: number;
}
