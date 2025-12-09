import { MovieDetails } from "@/shared";
import { tmdb } from "@/shared/lib";
import { validateMovieId } from "../lib/movieDetails.validation";

/**
 * Fetches movie details by ID
 * @param id - The movie ID (will be validated)
 * @returns Movie details
 * @throws ZodError if ID validation fails
 */
export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
    const validatedId = validateMovieId(id);
    const res = await tmdb.get<MovieDetails>(`/movie/${validatedId}`);
    return res.data;
}