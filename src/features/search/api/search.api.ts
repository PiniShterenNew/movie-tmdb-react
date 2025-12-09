import type { Movie, PaginatedResponse } from "@/shared/types";
import { tmdb } from "@/shared/lib";
import { validateSearchQuery } from "../lib/search.validation";

/**
 * Searches for movies by query string
 * @param query - The search query (will be validated)
 * @param page - The page number (default: 1)
 * @returns Array of movies matching the query
 * @throws ZodError if query validation fails
 */
export async function searchMovies(query: string, page: number = 1): Promise<PaginatedResponse<Movie>> {
    const validatedQuery = validateSearchQuery(query);
    
    const res = await tmdb.get<PaginatedResponse<Movie>>("/search/movie", {
        params: {
            query: validatedQuery,
            include_adult: false,
            page,
        },
    });
    return res.data;
}