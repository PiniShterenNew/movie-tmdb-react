import { tmdb } from "@/shared/lib";
import { validateMovieId } from "../lib/movieDetails.validation";

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideos {
  results: Video[];
}

/**
 * Fetches movie videos (trailers, teasers, etc.) by movie ID
 * @param movieId - The movie ID (will be validated)
 * @returns Movie videos
 * @throws ZodError if movieId validation fails
 */
export async function fetchMovieVideos(movieId: number): Promise<MovieVideos> {
  const validatedId = validateMovieId(movieId);
  const res = await tmdb.get<MovieVideos>(`/movie/${validatedId}/videos`);
  return res.data;
}
