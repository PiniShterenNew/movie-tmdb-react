import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchPopularTV,
  fetchTopRatedTV,
  fetchOnTheAirTV,
  fetchAiringTodayTV,
  fetchFullTVDetails,
  fetchSeasonDetails,
  fetchSimilarTV,
  fetchTVRecommendations,
} from "@/shared/api";

export function usePopularTV() {
  return useQuery({
    queryKey: ["tv", "popular"],
    queryFn: () => fetchPopularTV(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useTopRatedTV() {
  return useQuery({
    queryKey: ["tv", "top_rated"],
    queryFn: () => fetchTopRatedTV(),
    staleTime: 1000 * 60 * 60 * 6,
  });
}

export function useOnTheAirTV() {
  return useQuery({
    queryKey: ["tv", "on_the_air"],
    queryFn: () => fetchOnTheAirTV(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useAiringTodayTV() {
  return useQuery({
    queryKey: ["tv", "airing_today"],
    queryFn: () => fetchAiringTodayTV(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useFullTVDetails(id: number | null) {
  return useQuery({
    queryKey: ["tv", id, "full"],
    queryFn: () => fetchFullTVDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useSeasonDetails(tvId: number | null, seasonNumber: number) {
  return useQuery({
    queryKey: ["tv", tvId, "season", seasonNumber],
    queryFn: () => fetchSeasonDetails(tvId!, seasonNumber),
    enabled: !!tvId,
    staleTime: 1000 * 60 * 60,
  });
}

export function useSimilarTV(id: number | null) {
  return useQuery({
    queryKey: ["tv", id, "similar"],
    queryFn: () => fetchSimilarTV(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useTVRecommendations(id: number | null) {
  return useQuery({
    queryKey: ["tv", id, "recommendations"],
    queryFn: () => fetchTVRecommendations(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useInfinitePopularTV() {
  return useInfiniteQuery({
    queryKey: ["tv", "popular", "infinite"],
    queryFn: ({ pageParam }) => fetchPopularTV(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 60,
  });
}
