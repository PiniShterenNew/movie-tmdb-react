// features/discovery/components/TrendFilters.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import type { TrendOption } from '@/shared/types';
import { TREND_OPTIONS } from '@/shared/constants/filter.constants';

interface TrendFiltersProps {
    currentTrend: TrendOption | null;
    onTrendChange: (trend: TrendOption) => void;
}

export const TrendFilters: React.FC<TrendFiltersProps> = ({
    currentTrend,
    onTrendChange,
}) => {
    // Sort: selected first, then others
    const allTrends = Object.keys(TREND_OPTIONS) as TrendOption[];
    const sortedTrends = currentTrend
        ? [currentTrend, ...allTrends.filter(t => t !== currentTrend)]
        : allTrends;

    return (
        <div className="flex items-center gap-1 flex-nowrap">
            {sortedTrends.map((trend) => {
                const active = currentTrend === trend;
                
                return (
                    <Button
                        key={trend}
                        onClick={() => onTrendChange(trend)}
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
                        {TREND_OPTIONS[trend]}
                    </Button>
                );
            })}
        </div>
    );
};