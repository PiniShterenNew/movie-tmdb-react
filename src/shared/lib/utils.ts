import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { FilterState } from "@/shared/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks if any filters are active in the filter state
 * Single Responsibility: Determine if filter state has any active filters
 * 
 * @param filterState - The filter state to check
 * @returns true if any filter is active, false otherwise
 */
export function hasActiveFilters(filterState: FilterState): boolean {
  return !!(
    filterState.trend ||
    filterState.quickSort ||
    filterState.quickGenres.length > 0 ||
    filterState.advancedGenres.length > 0 ||
    filterState.dateRange ||
    filterState.advancedSort
  );
}
