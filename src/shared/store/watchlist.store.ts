import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MediaType = "movie" | "tv";

export interface WatchlistItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
  voteAverage: number | null;
  releaseDate: string;
  addedAt: number;
}

interface WatchlistState {
  items: WatchlistItem[];
  addItem: (item: Omit<WatchlistItem, "addedAt">) => void;
  removeItem: (id: number, type: MediaType) => void;
  isInWatchlist: (id: number, type: MediaType) => boolean;
  clearAll: () => void;
  getItemsByType: (type: MediaType) => WatchlistItem[];
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.id === item.id && i.type === item.type
        );
        if (existing) return;

        set((state) => ({
          items: [{ ...item, addedAt: Date.now() }, ...state.items],
        }));
      },

      removeItem: (id, type) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.type === type)),
        }));
      },

      isInWatchlist: (id, type) => {
        return get().items.some((i) => i.id === id && i.type === type);
      },

      clearAll: () => {
        set({ items: [] });
      },

      getItemsByType: (type) => {
        return get().items.filter((i) => i.type === type);
      },

      exportData: () => {
        return JSON.stringify(get().items, null, 2);
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json);
          if (Array.isArray(data)) {
            set({ items: data });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "moviehub-watchlist",
    }
  )
);
