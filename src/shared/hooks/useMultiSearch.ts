import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { searchMulti, searchMovies, searchTV, searchPerson } from "@/shared/api";

export function useMultiSearch(query: string) {
  return useQuery({
    queryKey: ["search", "multi", query],
    queryFn: () => searchMulti({ query }),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useInfiniteMultiSearch(query: string) {
  return useInfiniteQuery({
    queryKey: ["search", "multi", query, "infinite"],
    queryFn: ({ pageParam }) => searchMulti({ query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchMovies(query: string) {
  return useInfiniteQuery({
    queryKey: ["search", "movie", query],
    queryFn: ({ pageParam }) => searchMovies({ query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchTV(query: string) {
  return useInfiniteQuery({
    queryKey: ["search", "tv", query],
    queryFn: ({ pageParam }) => searchTV({ query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchPerson(query: string) {
  return useInfiniteQuery({
    queryKey: ["search", "person", query],
    queryFn: ({ pageParam }) => searchPerson({ query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
