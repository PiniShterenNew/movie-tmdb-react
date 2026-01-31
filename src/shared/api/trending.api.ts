import { tmdb } from "@/shared/lib/tmdb";
import type { TrendingResponse, TimeWindow, MediaType } from "@/shared/types";

export interface TrendingParams {
  mediaType?: MediaType;
  timeWindow?: TimeWindow;
  page?: number;
}

export async function fetchTrending({
  mediaType = "all",
  timeWindow = "day",
  page = 1,
}: TrendingParams = {}): Promise<TrendingResponse> {
  const response = await tmdb.get<TrendingResponse>(
    `/trending/${mediaType}/${timeWindow}`,
    {
      params: { page },
    }
  );
  return response.data;
}

export async function fetchTrendingMovies(
  timeWindow: TimeWindow = "day",
  page = 1
): Promise<TrendingResponse> {
  return fetchTrending({ mediaType: "movie", timeWindow, page });
}

export async function fetchTrendingTV(
  timeWindow: TimeWindow = "day",
  page = 1
): Promise<TrendingResponse> {
  return fetchTrending({ mediaType: "tv", timeWindow, page });
}

export async function fetchTrendingPeople(
  timeWindow: TimeWindow = "day",
  page = 1
): Promise<TrendingResponse> {
  return fetchTrending({ mediaType: "person", timeWindow, page });
}
