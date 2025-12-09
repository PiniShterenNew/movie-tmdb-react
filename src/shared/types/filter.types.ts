import type { SortOptions } from './discovery.types';

// ============================================
// Quick Filter Options
// ============================================

/**
 * Trend options for quick filtering
 * - 'recent': Last 7 days
 * - 'month': Last 30 days  
 * - 'year': Last 365 days
 */
export type TrendOption = 'recent' | 'month' | 'year';

/**
 * Quick sort options for fast sorting
 * Maps to SortOptions:
 * - 'popular' → 'popularity.desc'
 * - 'rated' → 'vote_average.desc'
 * - 'new' → 'release_date.desc'
 */
export type QuickSortOption = 'popular' | 'rated' | 'new';

// ============================================
// Filter State (UI Layer)
// ============================================

/**
 * Complete filter state managed in React
 * This is the UI layer state before transformation to DiscoverParams
 */
export interface FilterState {
    // Quick Filters
    trend: TrendOption | null;
    quickSort: QuickSortOption | null;
    quickGenres: number[];  // Genre IDs for quick selection
    
    // Advanced Filters
    advancedGenres: number[];  // Genre IDs for advanced selection
    dateRange: { from?: Date; to?: Date } | null;
    advancedSort: SortOptions | null;
}

// ============================================
// URL Parameters
// ============================================

/**
 * URL query parameters structure
 * Used for URL state synchronization
 */
export interface URLFilterParams {
    trend?: TrendOption;
    sort?: QuickSortOption;
    qgenres?: string;      // Comma-separated genre IDs: "28,12,16"
    genres?: string;       // Comma-separated genre IDs: "35,18"
    dateFrom?: string;     // ISO date string: "2024-01-01"
    dateTo?: string;       // ISO date string: "2024-12-31"
    advSort?: SortOptions;
}