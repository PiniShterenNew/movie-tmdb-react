import { create } from "zustand";

interface MovieModalState {
  selectedMovieId: number | null;
  openMovieModal: (id: number) => void;
  closeMovieModal: () => void;
}

export const useMovieModalStore = create<MovieModalState>((set) => ({
  selectedMovieId: null,
  openMovieModal: (id: number) => set({ selectedMovieId: id }),
  closeMovieModal: () => set({ selectedMovieId: null }),
}));
