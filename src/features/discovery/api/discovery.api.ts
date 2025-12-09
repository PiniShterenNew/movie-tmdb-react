// features/discovery/api/discovery.api.ts
import { tmdb } from "@/shared";
import { type Movie, type PaginatedResponse, type DiscoverParams } from "@/shared/types";
import { validateDiscoveryParams } from "../lib/discovery.validation";

export async function fetchDiscoveryMovies(
    params: DiscoverParams,
    page: number = 1,
): Promise<PaginatedResponse<Movie>> {
    const res = await tmdb.get<PaginatedResponse<Movie>>("/discover/movie", {
        params: {
            page,
            ...validateDiscoveryParams(params),
        },
    });
    return res.data;
}