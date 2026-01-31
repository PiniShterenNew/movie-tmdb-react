import { tmdb } from "@/shared/lib/tmdb";
import type {
  MultiSearchResponse,
  SearchMovieResponse,
  SearchTVResponse,
  SearchPersonResponse,
} from "@/shared/types";

export interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

// Multi Search (movies, TV, people combined)
export async function searchMulti({
  query,
  page = 1,
  include_adult = false,
}: SearchParams): Promise<MultiSearchResponse> {
  const response = await tmdb.get<MultiSearchResponse>("/search/multi", {
    params: { query, page, include_adult },
  });
  return response.data;
}

// Search Movies
export async function searchMovies({
  query,
  page = 1,
  include_adult = false,
}: SearchParams): Promise<SearchMovieResponse> {
  const response = await tmdb.get<SearchMovieResponse>("/search/movie", {
    params: { query, page, include_adult },
  });
  return response.data;
}

// Search TV Shows
export async function searchTV({
  query,
  page = 1,
}: SearchParams): Promise<SearchTVResponse> {
  const response = await tmdb.get<SearchTVResponse>("/search/tv", {
    params: { query, page },
  });
  return response.data;
}

// Search People
export async function searchPerson({
  query,
  page = 1,
}: SearchParams): Promise<SearchPersonResponse> {
  const response = await tmdb.get<SearchPersonResponse>("/search/person", {
    params: { query, page },
  });
  return response.data;
}
