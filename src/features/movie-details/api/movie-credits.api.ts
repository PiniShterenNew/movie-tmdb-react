import { tmdb } from "@/shared/lib";
import { validateMovieId } from "../lib/movieDetails.validation";

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

/**
 * Fetches movie credits (cast and crew) by movie ID
 * @param movieId - The movie ID (will be validated)
 * @returns Movie credits including cast and crew
 * @throws ZodError if movieId validation fails
 */
export async function fetchMovieCredits(movieId: number): Promise<MovieCredits> {
  const validatedId = validateMovieId(movieId);
  const res = await tmdb.get<MovieCredits>(`/movie/${validatedId}/credits`);
  return res.data;
}
