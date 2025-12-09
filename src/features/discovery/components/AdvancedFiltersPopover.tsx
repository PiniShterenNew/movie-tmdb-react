// features/discovery/components/AdvancedFiltersPopover.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { SlidersHorizontal, Tag, ArrowUpDown, Calendar as CalendarIcon } from 'lucide-react';
import { ErrorMessage } from '@/components/ui/error-states/ErrorMessage';
import type { FilterState, SortOptions } from '@/shared/types';
import { QUICK_GENRES } from '@/shared/constants/filter.constants';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useGenresQuery } from '@/shared/hooks/uesGenresQuery';

interface AdvancedFiltersPopoverProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filterState: FilterState;
    updateFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
}

export const AdvancedFiltersPopover: React.FC<AdvancedFiltersPopoverProps> = ({
    open,
    onOpenChange,
    filterState,
    updateFilter,
}) => {
    const { data: allGenres, isLoading, error, refetch } = useGenresQuery();

    // Filter out quick genres (show only advanced genres)
    const advancedGenresList = allGenres?.filter(genre =>
        !QUICK_GENRES.includes(genre.id as typeof QUICK_GENRES[number])
    ) || [];

    const handleGenreToggle = (genreId: number) => {
        const currentGenres = filterState.advancedGenres;
        const updatedGenres = currentGenres.includes(genreId)
            ? currentGenres.filter(id => id !== genreId)
            : [...currentGenres, genreId];
        updateFilter('advancedGenres', updatedGenres);
    };

    const handleDateRangeChange = (range: { from?: Date; to?: Date } | null) => {
        updateFilter('dateRange', range);
    };

    const handleAdvancedSortChange = (value: string) => {
        const sort = value as SortOptions;
        updateFilter('advancedSort', sort || null);
    };

    const sortOptions: SortOptions[] = [
        'popularity.desc',
        'popularity.asc',
        'vote_average.desc',
        'vote_average.asc',
        'release_date.desc',
        'release_date.asc',
    ];

    const sortLabels: Record<SortOptions, string> = {
        'popularity.desc': 'פופולריות (יורד)',
        'popularity.asc': 'פופולריות (עולה)',
        'vote_average.desc': 'דירוג (יורד)',
        'vote_average.asc': 'דירוג (עולה)',
        'release_date.desc': 'תאריך יציאה (חדש)',
        'release_date.asc': 'תאריך יציאה (ישן)',
    };

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <button
                    className="p-2 hover:bg-white/5 rounded-full transition-modern relative"
                    aria-label="פילטרים מתקדמים"
                >
                    <SlidersHorizontal className="w-5 h-5 text-[#f2f2f2]" />
                    {(filterState.advancedGenres.length > 0 ||
                        filterState.dateRange ||
                        filterState.advancedSort) && (
                            <span className="
                            absolute -top-0.5 -right-0.5
                            min-w-[16px] h-4 px-1
                            flex items-center justify-center
                            rounded-full
                            bg-gradient-to-r from-red-600 to-red-500
                            text-white text-[10px] font-bold
                            border border-[#0b0d11]
                            z-10
                        ">
                                !
                            </span>
                        )}
                </button>
            </PopoverTrigger>

            <PopoverContent
                className="
                    w-96 max-h-[600px] overflow-y-auto scrollbar-none
                    bg-gradient-to-b from-[#1b1c23]/95 to-[#0f1117]/95
                    backdrop-blur-2xl border border-white/20
                    shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                    p-6 rounded-xl space-y-6
                    rtl text-right
                    custom-scrollbar
                "
            >
                {/* כל הז'אנרים */}
                <div>
                    <h4 className="text-gray-300 text-sm mb-3 font-medium flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        כל הז'אנרים
                    </h4>
                    {isLoading ? (
                        <div className="text-gray-400 text-sm">טוען ז'אנרים...</div>
                    ) : error ? (
                        <ErrorMessage error={error} onRetry={refetch} />
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {advancedGenresList.map((genre) => {
                                const active = filterState.advancedGenres.includes(genre.id);
                                return (
                                    <Button
                                        key={genre.id}
                                        onClick={() => handleGenreToggle(genre.id)}
                                        className={`
                                            rounded-full px-3 py-1.5 text-sm
                                            transition-all duration-200
                                            ${active
                                                ? 'bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-[0_4px_15px_rgba(239,68,68,0.4)] scale-105'
                                                : 'bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                                            }
                                            active:scale-95
                                        `}
                                    >
                                        {genre.name}
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* טווח תאריכים */}
                <div>
                    <h4 className="text-gray-300 text-sm mb-3 font-medium flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        טווח תאריכים
                    </h4>
                    <DateRangePicker
                        dateRange={filterState.dateRange}
                        onDateRangeChange={handleDateRangeChange}
                        placeholder="בחר טווח תאריכים"
                    />
                </div>

                {/* מיון מתקדם */}
                <div>

                    <Select
                        dir="rtl"
                        value={filterState.advancedSort || 'none'}
                        onValueChange={handleAdvancedSortChange}
                    >
                        <SelectTrigger className=' w-full px-3 py-2 rounded-lg
                                    bg-white/5 border border-white/20
                                    text-white text-sm
                                    focus:outline-none focus:ring-2 focus:ring-red-500/50'>
                            <h4 className="text-gray-300 text-sm font-medium flex items-center gap-2 text-right">
                                <ArrowUpDown className="w-4 h-4" />
                                מיון מתקדם
                            </h4>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">ללא מיון מתקדם</SelectItem>
                            {sortOptions.map((sort) => (
                                <SelectItem key={sort} value={sort}>
                                    {sortLabels[sort]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* כפתור סגירה */}
                <Button
                    variant="default"
                    className="
                        w-full mt-3 rounded-lg
                        bg-gradient-to-r from-gray-700/80 to-gray-600/80
                        hover:from-gray-600 hover:to-gray-500
                        border border-white/10
                        shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                        transition-all duration-200
                        active:scale-95
                    "
                    onClick={() => onOpenChange(false)}
                >
                    סיום
                </Button>
            </PopoverContent>
        </Popover>
    );
};