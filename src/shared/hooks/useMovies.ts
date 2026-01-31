import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchNowPlaying,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchFullMovieDetails,
  fetchSimilarMovies,
  fetchMovieRecommendations,
} from "@/shared/api";

export function useNowPlaying() {
  return useQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: () => fetchNowPlaying(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function usePopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: () => fetchPopularMovies(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: () => fetchTopRatedMovies(),
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });
}

export function useUpcomingMovies() {
  return useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: () => fetchUpcomingMovies(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useFullMovieDetails(id: number | null) {
  return useQuery({
    queryKey: ["movie", id, "full"],
    queryFn: () => fetchFullMovieDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useSimilarMovies(id: number | null) {
  return useQuery({
    queryKey: ["movie", id, "similar"],
    queryFn: () => fetchSimilarMovies(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useMovieRecommendations(id: number | null) {
  return useQuery({
    queryKey: ["movie", id, "recommendations"],
    queryFn: () => fetchMovieRecommendations(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}

export function useInfiniteNowPlaying() {
  return useInfiniteQuery({
    queryKey: ["movies", "now_playing", "infinite"],
    queryFn: ({ pageParam }) => fetchNowPlaying(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 60,
  });
}

export function useInfiniteUpcoming() {
  return useInfiniteQuery({
    queryKey: ["movies", "upcoming", "infinite"],
    queryFn: ({ pageParam }) => fetchUpcomingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 60,
  });
}
