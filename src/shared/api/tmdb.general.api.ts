import { tmdb } from "@/shared/lib";
import { type GenreListResponse, type MovieGenre } from "@/shared/types";

export async function fetchGenreList(): Promise<MovieGenre[]> {
    const res = await tmdb.get<GenreListResponse>("/genre/movie/list");

    return res.data.genres;
}