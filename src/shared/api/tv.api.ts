import { tmdb } from "@/shared/lib/tmdb";
import type { TVShow, TVShowDetails, SeasonDetails } from "@/shared/types";
import type { PaginatedResponse } from "@/shared/types";

export interface TVListParams {
  page?: number;
}

export interface TVDetailsParams {
  appendToResponse?: string;
}

// TV Lists
export async function fetchPopularTV(
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  const response = await tmdb.get<PaginatedResponse<TVShow>>("/tv/popular", {
    params: { page },
  });
  return response.data;
}

export async function fetchTopRatedTV(
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  const response = await tmdb.get<PaginatedResponse<TVShow>>("/tv/top_rated", {
    params: { page },
  });
  return response.data;
}

export async function fetchOnTheAirTV(
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  const response = await tmdb.get<PaginatedResponse<TVShow>>("/tv/on_the_air", {
    params: { page },
  });
  return response.data;
}

export async function fetchAiringTodayTV(
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  const response = await tmdb.get<PaginatedResponse<TVShow>>(
    "/tv/airing_today",
    {
      params: { page },
    }
  );
  return response.data;
}

// TV Details with append_to_response
export async function fetchTVDetails(
  id: number,
  { appendToResponse }: TVDetailsParams = {}
): Promise<TVShowDetails> {
  const response = await tmdb.get<TVShowDetails>(`/tv/${id}`, {
    params: appendToResponse ? { append_to_response: appendToResponse } : {},
  });
  return response.data;
}

// Full TV details with all data
export async function fetchFullTVDetails(id: number) {
  const response = await tmdb.get<
    TVShowDetails & {
      credits: { cast: unknown[]; crew: unknown[] };
      videos: { results: unknown[] };
      images: { backdrops: unknown[]; posters: unknown[] };
      keywords: { results: unknown[] };
      reviews: { results: unknown[] };
      "watch/providers": { results: Record<string, unknown> };
      recommendations: { results: unknown[] };
      similar: { results: unknown[] };
    }
  >(`/tv/${id}`, {
    params: {
      append_to_response:
        "credits,videos,images,keywords,reviews,watch/providers,recommendations,similar,aggregate_credits",
    },
  });
  return response.data;
}

// Season Details
export async function fetchSeasonDetails(
  tvId: number,
  seasonNumber: number
): Promise<SeasonDetails> {
  const response = await tmdb.get<SeasonDetails>(
    `/tv/${tvId}/season/${seasonNumber}`
  );
  return response.data;
}

// Similar TV
export async function fetchSimilarTV(
  id: number,
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  const response = await tmdb.get<PaginatedResponse<TVShow>>(
    `/tv/${id}/similar`,
    {
      params: { page },
    }
  );
  return response.data;
}

// TV Recommendations
export async function fetchTVRecommendations(
  id: number,
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  const response = await tmdb.get<PaginatedResponse<TVShow>>(
    `/tv/${id}/recommendations`,
    {
      params: { page },
    }
  );
  return response.data;
}
