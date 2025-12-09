import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from '@/features/movie-details/api/movie-details.api';
import type { MovieDetails } from '@/shared/types';

export function useMovieDetails(movieId: number | null) {
    return useQuery<MovieDetails>({
        queryKey: ['movieDetails', movieId],
        queryFn: () => fetchMovieDetails(movieId!),
        enabled: !!movieId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}