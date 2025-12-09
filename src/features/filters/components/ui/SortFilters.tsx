// features/discovery/components/SortFilters.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import type { QuickSortOption } from '@/shared/types';
import { QUICK_SORT_OPTIONS } from '@/shared/constants/filter.constants';

interface SortFiltersProps {
    currentSort: QuickSortOption | null;
    onSortChange: (sort: QuickSortOption) => void;
}

export const SortFilters: React.FC<SortFiltersProps> = ({
    currentSort,
    onSortChange,
}) => {
    // Sort: selected first, then others
    const allSorts = Object.keys(QUICK_SORT_OPTIONS) as QuickSortOption[];
    const sortedSorts = currentSort
        ? [currentSort, ...allSorts.filter(s => s !== currentSort)]
        : allSorts;

    return (
        <div className="flex items-center gap-1 flex-nowrap">
            {sortedSorts.map((sort) => {
                const active = currentSort === sort;
                
                return (
                    <Button
                        key={sort}
                        onClick={() => onSortChange(sort)}
                        className={`
                            rounded-full px-3 py-1 text-xs font-medium
                            transition-all duration-200
                            ${active
                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:from-red-700 hover:to-red-600'
                                : 'bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 text-gray-200 hover:from-white/15 hover:to-white/10 hover:text-white'
                            }
                            hover:scale-[1.02]
                            active:scale-[0.98]
                        `}
                    >
                        {QUICK_SORT_OPTIONS[sort]}
                    </Button>
                );
            })}
        </div>
    );
};