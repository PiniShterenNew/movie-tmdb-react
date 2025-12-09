import { useQuery } from "@tanstack/react-query";
import { fetchGenreList } from "@/shared/api";
import { type MovieGenre } from "@/shared/types";

export function useGenresQuery() {
    return useQuery<MovieGenre[]>({
        queryKey: ['genres'],
        queryFn: fetchGenreList,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}