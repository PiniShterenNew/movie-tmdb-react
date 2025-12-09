import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { searchMovies } from "@/features/search/api/search.api";
import type { Movie, PaginatedResponse } from "@/shared/types";
import { normalizeSearchQuery } from "../lib/normalizeSearchQuery";

/**
 * Hook for searching movies
 * 
 * Frontend layer: Only normalizes (trim, normalize spaces, limit length)
 * API layer: Handles sanitization + validation (security)
 */
export function useSearchMovies(query: string) {
    const normalizedQuery = normalizeSearchQuery(query);
    const queryKey = ['search', 'movies', normalizedQuery];
    
    return useInfiniteQuery<
    PaginatedResponse<Movie>,
    Error,
    InfiniteData<PaginatedResponse<Movie>>
    >({
        queryKey: queryKey,
        // Pass original query - API layer will sanitize & validate
        queryFn: ({ pageParam = 1, queryKey }) => {
            const query = queryKey[2] as string;
            return searchMovies(query, pageParam as number);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        enabled: normalizedQuery.length > 1,
        staleTime: 0,
    });
}