import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MediaType = "movie" | "tv";

export interface FavoriteItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
  voteAverage: number | null;
  releaseDate: string;
  addedAt: number;
}

interface FavoritesState {
  items: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, "addedAt">) => void;
  removeFavorite: (id: number, type: MediaType) => void;
  isFavorite: (id: number, type: MediaType) => boolean;
  clearAll: () => void;
  getItemsByType: (type: MediaType) => FavoriteItem[];
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (item) => {
        const existing = get().items.find(
          (i) => i.id === item.id && i.type === item.type
        );
        if (existing) return;

        set((state) => ({
          items: [{ ...item, addedAt: Date.now() }, ...state.items],
        }));
      },

      removeFavorite: (id, type) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.type === type)),
        }));
      },

      isFavorite: (id, type) => {
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
      name: "moviehub-favorites",
    }
  )
);
