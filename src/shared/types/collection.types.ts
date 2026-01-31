import type { Movie } from "./movie.types";

export interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface CollectionDetails extends Collection {
  parts: CollectionMovie[];
}

export interface CollectionMovie extends Movie {
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}
