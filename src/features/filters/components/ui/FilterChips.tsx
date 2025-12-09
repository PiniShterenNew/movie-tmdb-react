import React from "react";
import type { FilterState, TrendOption, QuickSortOption } from "@/shared/types";
import { TREND_OPTIONS, QUICK_SORT_OPTIONS } from "@/shared/constants/filter.constants";
import { cn } from "@/shared/lib";

interface FilterChipsProps {
  filterState: FilterState;
  updateFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
  className?: string;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  filterState,
  updateFilter,
  className,
}) => {
  const handleTrendChange = (trend: TrendOption) => {
    updateFilter("trend", filterState.trend === trend ? null : trend);
  };

  const handleSortChange = (sort: QuickSortOption) => {
    updateFilter("quickSort", filterState.quickSort === sort ? null : sort);
  };

  const allTrends: TrendOption[] = ["recent", "month", "year"];
  const allSorts: QuickSortOption[] = ["popular", "rated", "new"];

  // Combine all filters: אחרונה | חדש | השנה | הכי פופולרי
  const filters = [
    ...allTrends.map((trend) => ({
      id: `trend-${trend}`,
      label: TREND_OPTIONS[trend],
      active: filterState.trend === trend,
      onClick: () => handleTrendChange(trend),
    })),
    ...allSorts.map((sort) => ({
      id: `sort-${sort}`,
      label: QUICK_SORT_OPTIONS[sort],
      active: filterState.quickSort === sort,
      onClick: () => handleSortChange(sort),
    })),
  ];

  return (
    <div
      className={cn(
        "w-full overflow-x-auto scrollbar-none",
        "flex items-center gap-2 px-4 py-3",
        "snap-x snap-start",
        className
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={filter.onClick}
          className={cn(
            "flex-shrink-0",
            "px-4 py-1.5 rounded-full",
            "text-sm font-medium",
            "transition-modern",
            "snap-start",
            filter.active
              ? "bg-gradient-to-r from-[#ff4d4d] to-[#ff1a1a] text-white font-bold shadow-[0_2px_8px_rgba(255,45,85,0.4)]"
              : "bg-transparent border border-[#1a1a1c] text-[#f2f2f2]/70 hover:border-[#b31835] hover:text-[#f2f2f2]"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
