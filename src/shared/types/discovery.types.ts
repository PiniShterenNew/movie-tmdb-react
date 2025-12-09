// shared/types/discovery.types.ts
export type SortOptions =
    'popularity.desc'
    | 'popularity.asc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'release_date.desc'
    | 'release_date.asc';

export interface DiscoverParams {
    with_genres?: string;
    primary_release_year?: number;
    sort_by?: SortOptions;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
}

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}