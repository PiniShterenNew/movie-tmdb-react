// features/discovery/lib/filterState.utils.ts

import type {
    FilterState,
    URLFilterParams,
    TrendOption,
    QuickSortOption
} from '@/shared/types';
import type { DiscoverParams, SortOptions } from '@/shared/types';
import { format } from 'date-fns';

// ============================================
// Helper Functions
// ============================================

/**
 * Parses comma-separated string to array of numbers
 * "28,12,16" → [28, 12, 16]
 */
function parseCommaSeparated(str: string): number[] {
    if (!str || str.trim() === '') return [];

    return str
        .split(',')
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));
}

/**
 * Formats Date to ISO string (YYYY-MM-DD)
 * Date → "2024-01-01"
 */
function formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}

/**
 * Parses ISO date string to Date object
 * "2024-01-01" → Date
 */
function parseDate(str: string): Date | undefined {
    if (!str) return undefined;

    const date = new Date(str);
    return isNaN(date.getTime()) ? undefined : date;
}

/**
 * Transforms QuickSortOption to SortOptions
 * 'popular' → 'popularity.desc'
 * 'rated' → 'vote_average.desc'
 * 'new' → 'release_date.desc'
 */
export function quickSortToSortOptions(
    quickSort: QuickSortOption
): SortOptions {
    switch (quickSort) {
        case 'popular':
            return 'popularity.desc';
        case 'rated':
            return 'vote_average.desc';
        case 'new':
            return 'release_date.desc';
    }
}

/**
 * Transforms TrendOption to date range DiscoverParams
 * 'recent' → last 7 days
 * 'month' → last 30 days
 * 'year' → last 365 days
 */
export function getTrendDateRange(
    trend: TrendOption
): DiscoverParams {
    const today = new Date();
    let startDate: Date;
    
    switch (trend) {
        case 'recent':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 7);
            break;
        case 'month':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 30);
            break;
        case 'year':
            startDate = new Date(today);
            startDate.setFullYear(today.getFullYear() - 1);
            break;
    }
    
    return {
        primary_release_date_gte: formatDate(startDate),
        primary_release_date_lte: formatDate(today),
    };
}

/**
 * Merges FilterState to DiscoverParams
 * Handles priority: dateRange overrides trend, advancedSort overrides quickSort
 */
export function mergeFiltersToDiscoverParams(
    state: FilterState
): DiscoverParams {
    const params: DiscoverParams = {};
    
    // 1. Merge genres (quick + advanced)
    const allGenres = [...state.quickGenres, ...state.advancedGenres];
    if (allGenres.length > 0) {
        params.with_genres = allGenres.join(',');
    }
    
    // 2. Date Range (Priority: custom dateRange overrides trend)
    if (state.dateRange?.from && state.dateRange?.to) {
        // Custom date range takes priority
        params.primary_release_date_gte = formatDate(state.dateRange.from);
        params.primary_release_date_lte = formatDate(state.dateRange.to);
    } else if (state.trend) {
        // Use trend if no custom date range
        const trendDates = getTrendDateRange(state.trend);
        Object.assign(params, trendDates);
    }
    
    // 3. Sort (Priority: advancedSort overrides quickSort)
    if (state.advancedSort) {
        params.sort_by = state.advancedSort;
    } else if (state.quickSort) {
        params.sort_by = quickSortToSortOptions(state.quickSort);
    }
    
    return params;
}

/**
 * Parses URLFilterParams to FilterState
 * Converts URL strings to proper types
 */
export function parseFromURL(
    params: URLFilterParams
): FilterState {
    return {
        trend: params.trend || null,
        quickSort: params.sort || null,
        quickGenres: params.qgenres ? parseCommaSeparated(params.qgenres) : [],
        advancedGenres: params.genres ? parseCommaSeparated(params.genres) : [],
        dateRange: (params.dateFrom || params.dateTo)
            ? {
                from: params.dateFrom ? parseDate(params.dateFrom) : undefined,
                to: params.dateTo ? parseDate(params.dateTo) : undefined,
            }
            : null,
        advancedSort: params.advSort || null,
    };
}

/**
 * Serializes FilterState to URLFilterParams
 * Converts types to URL-safe strings
 */
export function serializeToURL(
    state: FilterState
): URLFilterParams {
    const params: URLFilterParams = {};
    
    if (state.trend) {
        params.trend = state.trend;
    }
    
    if (state.quickSort) {
        params.sort = state.quickSort;
    }
    
    if (state.quickGenres.length > 0) {
        params.qgenres = state.quickGenres.join(',');
    }
    
    if (state.advancedGenres.length > 0) {
        params.genres = state.advancedGenres.join(',');
    }
    
    if (state.dateRange?.from) {
        params.dateFrom = formatDate(state.dateRange.from);
    }
    
    if (state.dateRange?.to) {
        params.dateTo = formatDate(state.dateRange.to);
    }
    
    if (state.advancedSort) {
        params.advSort = state.advancedSort;
    }
    
    return params;
}