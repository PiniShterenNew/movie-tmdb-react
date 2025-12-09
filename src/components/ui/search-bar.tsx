import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/shared/hooks";
import { cn } from "@/shared/lib";

interface SearchBarProps {
  onSelect?: (movieId: number) => void;
  className?: string;
  initialValue?: string;
  onSearchUpdate?: (query: string) => void;
  showClearButton?: boolean;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  className, 
  initialValue = "", 
  onSearchUpdate,
  showClearButton = false,
  onClear
}) => {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce<string>(query, 300);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastUpdatedRef = useRef<string>(initialValue);
  const prevInitialValueRef = useRef<string>(initialValue);

  // Update query when initialValue changes from outside (not from our debounce)
  // But only if input is not focused (user is not typing)
  useEffect(() => {
    if (initialValue !== undefined && initialValue !== prevInitialValueRef.current) {
      // Don't update if user is currently typing
      const isInputFocused = document.activeElement === inputRef.current;
      if (!isInputFocused) {
        // Use setTimeout to avoid synchronous state updates within effects
        setTimeout(() => {
          setQuery(initialValue);
        }, 0);
        lastUpdatedRef.current = initialValue;
        prevInitialValueRef.current = initialValue;
      } else {
        // Update the ref even if we don't update the state
        prevInitialValueRef.current = initialValue;
      }
    }
  }, [initialValue]);

  // Auto-update search when debounced query changes (for SearchPage with debounce)
  useEffect(() => {
    if (onSearchUpdate && debouncedQuery !== lastUpdatedRef.current) {
      const trimmedQuery = debouncedQuery.trim();
      if (trimmedQuery.length > 1) {
        onSearchUpdate(trimmedQuery);
        lastUpdatedRef.current = debouncedQuery;
      } else if (trimmedQuery.length === 0 && lastUpdatedRef.current) {
        // Clear search if query is empty
        onSearchUpdate("");
        lastUpdatedRef.current = "";
      }
    }
  }, [debouncedQuery, onSearchUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 1) {
      if (onSearchUpdate) {
        // If onSearchUpdate is provided, use it immediately (for SearchPage)
        onSearchUpdate(trimmedQuery);
        lastUpdatedRef.current = trimmedQuery; // Prevent debounce from updating again
      } else {
        // Otherwise, navigate to search page (for Header)
        navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
        setQuery("");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleClear = () => {
    setQuery("");
    lastUpdatedRef.current = ""; // Prevent debounce from updating
    if (onClear) {
      onClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f2f2f2]/60" />
        <input
          ref={inputRef}
          type="text"
          placeholder="חפש סרט..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full pr-10 pl-4 py-2.5",
            showClearButton && query ? "pr-20" : "",
            "text-right text-sm",
            "bg-[#1a1a1c]",
            "border border-[#1a1a1c]",
            "rounded-full",
            "text-[#f2f2f2] placeholder:text-[#f2f2f2]/40",
            "focus:outline-none focus:ring-2 focus:ring-[#ff2d55]/50 focus:border-[#ff2d55]/30",
            "hover:bg-[#1f1f21] hover:border-[#2a2a2c]",
            "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
            "transition-all duration-200"
          )}
        />
        {showClearButton && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-modern"
            aria-label="נקה חיפוש"
          >
            <X className="w-4 h-4 text-[#f2f2f2]/60" />
          </button>
        )}
      </div>
    </form>
  );
};
