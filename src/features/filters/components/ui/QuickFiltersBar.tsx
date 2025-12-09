// features/discovery/components/QuickFiltersBar.tsx

import React from 'react';
import { TrendFilters } from './TrendFilters';
import { SortFilters } from './SortFilters';
import { QuickGenres } from '../../../discovery/components/QuickGenres';
import type { FilterState } from '@/shared/types';

interface QuickFiltersBarProps {
    filterState: FilterState;
    updateFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
}

export const QuickFiltersBar: React.FC<QuickFiltersBarProps> = ({
    filterState,
    updateFilter,
}) => {

    const handleTrendChange = (trend: typeof filterState.trend) => {
        updateFilter('trend', trend);
    };

    const handleSortChange = (sort: typeof filterState.quickSort) => {
        updateFilter('quickSort', sort);
    };

    const handleGenreToggle = (genreId: number) => {
        const currentGenres = filterState.quickGenres;
        const updatedGenres = currentGenres.includes(genreId)
            ? currentGenres.filter(id => id !== genreId)
            : [...currentGenres, genreId];
        updateFilter('quickGenres', updatedGenres);
    };

    return (
        <div className="rtl text-right w-full flex flex-row items-center gap-1 lg:gap-1.5 flex-nowrap overflow-x-auto scrollbar-none px-2 py-1">
            {/* טרנדים */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <TrendFilters
                    currentTrend={filterState.trend}
                    onTrendChange={handleTrendChange}
                />
            </div>

            {/* מיון */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <SortFilters
                    currentSort={filterState.quickSort}
                    onSortChange={handleSortChange}
                />
            </div>

            {/* Quick Genres */}
            <div className="flex items-center gap-1 flex-shrink-0">
                <QuickGenres
                    selectedGenres={filterState.quickGenres}
                    onGenreToggle={handleGenreToggle}
                />
            </div>
        </div>
    );
};