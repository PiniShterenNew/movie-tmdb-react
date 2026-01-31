import { tmdb } from "@/shared/lib/tmdb";
import type { Movie, MovieDetails, PaginatedResponse } from "@/shared/types";

export interface MovieDetailsParams {
  appendToResponse?: string;
}

// Movie Lists
export async function fetchNowPlaying(
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await tmdb.get<PaginatedResponse<Movie>>(
    "/movie/now_playing",
    {
      params: { page },
    }
  );
  return response.data;
}

export async function fetchPopularMovies(
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await tmdb.get<PaginatedResponse<Movie>>("/movie/popular", {
    params: { page },
  });
  return response.data;
}

export async function fetchTopRatedMovies(
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await tmdb.get<PaginatedResponse<Movie>>("/movie/top_rated", {
    params: { page },
  });
  return response.data;
}

export async function fetchUpcomingMovies(
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await tmdb.get<PaginatedResponse<Movie>>("/movie/upcoming", {
    params: { page },
  });
  return response.data;
}

// Full Movie Details with all data
export async function fetchFullMovieDetails(id: number) {
  const response = await tmdb.get<
    MovieDetails & {
      credits: { cast: unknown[]; crew: unknown[] };
      videos: { results: unknown[] };
      images: { backdrops: unknown[]; posters: unknown[]; logos: unknown[] };
      keywords: { keywords: unknown[] };
      reviews: { results: unknown[] };
      "watch/providers": { results: Record<string, unknown> };
      recommendations: { results: unknown[] };
      similar: { results: unknown[] };
    }
  >(`/movie/${id}`, {
    params: {
      append_to_response:
        "credits,videos,images,keywords,reviews,watch/providers,recommendations,similar",
    },
  });
  return response.data;
}

// Similar Movies
export async function fetchSimilarMovies(
  id: number,
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await tmdb.get<PaginatedResponse<Movie>>(
    `/movie/${id}/similar`,
    {
      params: { page },
    }
  );
  return response.data;
}

// Movie Recommendations
export async function fetchMovieRecommendations(
  id: number,
  page = 1
): Promise<PaginatedResponse<Movie>> {
  const response = await tmdb.get<PaginatedResponse<Movie>>(
    `/movie/${id}/recommendations`,
    {
      params: { page },
    }
  );
  return response.data;
}
