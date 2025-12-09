// shared/constants/filter.constants.ts

import type { TrendOption, QuickSortOption } from '@/shared/types';

/**
 * Recommended genres for quick selection
 * These are the most popular genres that users frequently filter by
 */
export const QUICK_GENRES = [28, 18, 35, 53, 878, 27] as const;
// 28 = Action
// 18 = Drama
// 35 = Comedy
// 53 = Thriller
// 878 = Sci-Fi
// 27 = Horror

/**
 * Trend options with Hebrew labels
 */
export const TREND_OPTIONS: Record<TrendOption, string> = {
    recent: 'לאחרונה',
    month: 'החודש',
    year: 'השנה',
} as const;

/**
 * Quick sort options with Hebrew labels
 */
export const QUICK_SORT_OPTIONS: Record<QuickSortOption, string> = {
    popular: 'הכי פופולרי',
    rated: 'הכי מדורג',
    new: 'הכי חדש',
} as const;