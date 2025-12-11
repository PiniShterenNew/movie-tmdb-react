// components/layout/Header.tsx
import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ArrowLeft, RotateCcw, Languages } from "lucide-react";
import { cn, hasActiveFilters } from "@/shared/lib";
import { AdvancedFiltersPopover } from "@/features/discovery/components/AdvancedFiltersPopover";
import { useDiscoveryFilters } from "@/features/discovery/hooks/useDiscoveryFilters";
import { useLanguageStore, type Language } from "@/shared";
import { queryClient } from "@/shared/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const isDiscoveryPage = !isSearchPage;
  const [openAdvancedFilters, setOpenAdvancedFilters] = useState(false);
  
  // Language store
  const { language, setLanguage } = useLanguageStore();
  
  // Use the filter hook only when on discovery page (not search/movie page)
  // Note: Hooks must be called unconditionally, but we only use the values when isDiscoveryPage is true
  const { filterState, updateFilter, resetFilters } = useDiscoveryFilters();
  const hasFilters = useMemo(
    () => isDiscoveryPage ? hasActiveFilters(filterState) : false,
    [filterState, isDiscoveryPage]
  );

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
    // Invalidate all queries to refetch with new language
    queryClient.invalidateQueries();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "backdrop-blur-modern bg-[#0e0e0f]/80",
        "border-b border-[#1a1a1c]",
        "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        "px-4 py-3",
        "transition-modern",
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-[#f2f2f2] whitespace-nowrap tracking-tight">
          <span className="bg-gradient-to-r from-[#ff2d55] to-[#ff4d4d] bg-clip-text text-transparent">
            MovieHub
          </span>
        </h1>
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger 
              className="w-[100px] h-9 bg-[#1a1a1c] border-white/10 text-[#f2f2f2] hover:bg-[#1a1a1c]/80"
              aria-label={language === "he" ? "בחר שפה" : "Select language"}
            >
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he">עברית</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>

          {/* Show filter buttons only when on discovery page */}
          {isDiscoveryPage && (
            <>
              {/* Reset Filters Button */}
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="p-2 hover:bg-white/5 rounded-full transition-modern"
                  title="איפוס פילטרים"
                  aria-label="איפוס פילטרים"
                >
                  <RotateCcw className="w-5 h-5 text-[#f2f2f2]" />
                </button>
              )}
              {/* Advanced Filters Popover */}
              <AdvancedFiltersPopover
                open={openAdvancedFilters}
                onOpenChange={setOpenAdvancedFilters}
                filterState={filterState}
                updateFilter={updateFilter}
              />
            </>
          )}
          {/* Show back button on search page, search icon otherwise */}
          {isSearchPage ? (
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-white/5 rounded-full transition-modern"
              aria-label="חזור"
            >
              <ArrowLeft className="w-5 h-5 text-[#f2f2f2]" />
            </button>
          ) : (
            <button
              onClick={handleSearchClick}
              className="p-2 hover:bg-white/5 rounded-full transition-modern"
              aria-label="חיפוש"
            >
              <Search className="w-5 h-5 text-[#f2f2f2]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
