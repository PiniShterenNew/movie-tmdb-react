// features/discovery/hooks/useDiscoveryQuery.ts
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchDiscoveryMovies } from "../api/discovery.api";
import { type Movie, type PaginatedResponse, type DiscoverParams } from "@/shared/types";

type DiscoveryQueryKey = ['discovery', DiscoverParams];

// Helper to create stable query key from params
function createQueryKey(params: DiscoverParams): DiscoveryQueryKey {
    // Clean and sort params to ensure consistent query key
    const cleaned: DiscoverParams = {};
    
    if (params.with_genres) cleaned.with_genres = params.with_genres;
    if (params.primary_release_year) cleaned.primary_release_year = params.primary_release_year;
    if (params.sort_by) cleaned.sort_by = params.sort_by;
    if (params.primary_release_date_gte) cleaned.primary_release_date_gte = params.primary_release_date_gte;
    if (params.primary_release_date_lte) cleaned.primary_release_date_lte = params.primary_release_date_lte;
    
    return ['discovery', cleaned] as const;
}

export function useDiscoveryQuery(params: DiscoverParams) {
    const queryKey = createQueryKey(params);
    
    return useInfiniteQuery<
        PaginatedResponse<Movie>,
        Error,
        InfiniteData<PaginatedResponse<Movie>>,
        DiscoveryQueryKey,
        number
    >({
        queryKey,
        queryFn: ({ pageParam = 1, queryKey }) => {
            const filters = queryKey[1];
            return fetchDiscoveryMovies(filters, pageParam as number);
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
};