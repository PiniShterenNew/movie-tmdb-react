import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MediaType = "movie" | "tv";

export interface RecentlyViewedItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
  voteAverage: number | null;
  releaseDate: string;
  viewedAt: number;
}

const MAX_ITEMS = 20;

interface RecentlyViewedState {
  items: RecentlyViewedItem[];
  addViewed: (item: Omit<RecentlyViewedItem, "viewedAt">) => void;
  clearRecent: () => void;
  getRecentByType: (type: MediaType) => RecentlyViewedItem[];
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: [],

      addViewed: (item) => {
        set((state) => {
          // Remove existing entry if present
          const filtered = state.items.filter(
            (i) => !(i.id === item.id && i.type === item.type)
          );

          // Add to front with timestamp
          const updated = [{ ...item, viewedAt: Date.now() }, ...filtered];

          // Keep only MAX_ITEMS
          return { items: updated.slice(0, MAX_ITEMS) };
        });
      },

      clearRecent: () => {
        set({ items: [] });
      },

      getRecentByType: (type) => {
        return get().items.filter((i) => i.type === type);
      },
    }),
    {
      name: "moviehub-recently-viewed",
    }
  )
);
