// features/discovery/pages/DiscoveryPage.tsx

import { useMemo } from "react";
import { useDiscoveryFilters } from "../hooks/useDiscoveryFilters";
import { hasActiveFilters } from "@/shared/lib";
import { FilterChips } from "@/features/filters";
import { DiscoveryListGrid } from "../components/DiscoveryListGrid";
import { MoviesSection } from "../components/MoviesSection";
import { Flame, Calendar, TrendingUp } from "lucide-react";
import { getComingSoonParams, getTrendingParams } from "@/shared/constants";

export const DiscoveryPage: React.FC = () => {
    // Use the new hook for filter management
    const { filterState, updateFilter, discoverParams } = useDiscoveryFilters();
  
    // Check if filters are active
    const hasFilters = useMemo(() => hasActiveFilters(filterState), [filterState]);
  
    return (
      <>
        {/* Filter Chips Bar */}
        <div className="sticky top-[60px] z-40 bg-[#0e0e0f]/80 backdrop-blur-modern border-b border-[#1a1a1c]">
          <div className="flex items-center gap-2 px-4 py-2">
            <FilterChips 
              filterState={filterState}
              updateFilter={updateFilter}
            />
          </div>
        </div>
  
        {/* Main Content */}
        <main className="pb-10">
          {hasFilters ? (
            /* When filters are active - show single filtered grid */
            <DiscoveryListGrid
              discoverParams={discoverParams}
            />
          ) : (
            /* When no filters - show categories */
            <div className="space-y-8 pt-6">
              <MoviesSection
                title="סרטים מומלצים"
                icon={<Flame className="w-5 h-5" />}
                discoverParams={discoverParams}
              />
  
              <MoviesSection
                title="בקרוב"
                icon={<Calendar className="w-5 h-5" />}
                discoverParams={getComingSoonParams()}
              />
  
              <MoviesSection
                title="טרנדים"
                icon={<TrendingUp className="w-5 h-5" />}
                discoverParams={getTrendingParams()}
              />
            </div>
          )}
        </main>
      </>
    );
  }