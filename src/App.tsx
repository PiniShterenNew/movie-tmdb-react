import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { FilterChips } from "@/features/filters/components/ui/FilterChips";
import { MoviesSection } from "@/features/discovery/components/MoviesSection";
import { DiscoveryListGrid } from "@/features/discovery/components/DiscoveryListGrid";
import { useDiscoveryFilters } from "@/features/discovery/hooks/useDiscoveryFilters";
import { SearchPage } from "@/features/search/pages/SearchPage";
import { MovieModalFullScreen } from "@/components/MovieModal/MovieModalFullScreen";
import { Flame, Calendar, TrendingUp } from "lucide-react";
import { hasActiveFilters } from "@/shared/lib";
import { getComingSoonParams, getTrendingParams } from "@/shared/constants";

function DiscoveryPage() {
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#0e0e0f] text-[#f2f2f2] font-sans antialiased rtl text-right">
      {/* Modern Header */}
      <Header />

      <Routes>
        <Route path="/" element={<DiscoveryPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>

      {/* Full Screen Movie Modal */}
      <MovieModalFullScreen />
    </div>
  );
}
