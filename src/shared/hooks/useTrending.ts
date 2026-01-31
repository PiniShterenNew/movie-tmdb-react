import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchTrending, fetchTrendingMovies, fetchTrendingTV } from "@/shared/api";
import type { TimeWindow, MediaType } from "@/shared/types";

export function useTrending(
  mediaType: MediaType = "all",
  timeWindow: TimeWindow = "day"
) {
  return useQuery({
    queryKey: ["trending", mediaType, timeWindow],
    queryFn: () => fetchTrending({ mediaType, timeWindow }),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useTrendingMovies(timeWindow: TimeWindow = "day") {
  return useQuery({
    queryKey: ["trending", "movie", timeWindow],
    queryFn: () => fetchTrendingMovies(timeWindow),
    staleTime: 1000 * 60 * 60,
  });
}

export function useTrendingTV(timeWindow: TimeWindow = "day") {
  return useQuery({
    queryKey: ["trending", "tv", timeWindow],
    queryFn: () => fetchTrendingTV(timeWindow),
    staleTime: 1000 * 60 * 60,
  });
}

export function useInfiniteTrending(
  mediaType: MediaType = "all",
  timeWindow: TimeWindow = "day"
) {
  return useInfiniteQuery({
    queryKey: ["trending", mediaType, timeWindow, "infinite"],
    queryFn: ({ pageParam }) =>
      fetchTrending({ mediaType, timeWindow, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 60,
  });
}
