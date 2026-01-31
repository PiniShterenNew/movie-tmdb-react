import { create } from "zustand";

export type MediaType = "movie" | "tv";

export interface CompareItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number | null;
  releaseDate: string;
  genres: { id: number; name: string }[];
  runtime?: number | null;
  overview: string;
}

const MAX_COMPARE = 4;

interface CompareState {
  items: CompareItem[];
  addToCompare: (item: CompareItem) => boolean;
  removeFromCompare: (id: number, type: MediaType) => void;
  isInCompare: (id: number, type: MediaType) => boolean;
  clearCompare: () => void;
  canAdd: () => boolean;
}

export const useCompareStore = create<CompareState>()((set, get) => ({
  items: [],

  addToCompare: (item) => {
    if (get().items.length >= MAX_COMPARE) return false;

    const existing = get().items.find(
      (i) => i.id === item.id && i.type === item.type
    );
    if (existing) return false;

    set((state) => ({
      items: [...state.items, item],
    }));
    return true;
  },

  removeFromCompare: (id, type) => {
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.type === type)),
    }));
  },

  isInCompare: (id, type) => {
    return get().items.some((i) => i.id === id && i.type === type);
  },

  clearCompare: () => {
    set({ items: [] });
  },

  canAdd: () => {
    return get().items.length < MAX_COMPARE;
  },
}));
