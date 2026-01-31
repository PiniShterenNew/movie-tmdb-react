import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_HISTORY = 10;

interface SearchHistoryState {
  searches: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      searches: [],

      addSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;

        set((state) => {
          // Remove existing if present
          const filtered = state.searches.filter(
            (s) => s.toLowerCase() !== trimmed.toLowerCase()
          );

          // Add to front
          const updated = [trimmed, ...filtered];

          // Keep only MAX_HISTORY
          return { searches: updated.slice(0, MAX_HISTORY) };
        });
      },

      removeSearch: (query) => {
        set((state) => ({
          searches: state.searches.filter(
            (s) => s.toLowerCase() !== query.toLowerCase()
          ),
        }));
      },

      clearHistory: () => {
        set({ searches: [] });
      },
    }),
    {
      name: "moviehub-search-history",
    }
  )
);
