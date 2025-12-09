import { useQuery } from '@tanstack/react-query';
import { fetchMovieCredits, type MovieCredits } from '../api/movie-credits.api';

export function useMovieCredits(movieId: number | null) {
  return useQuery<MovieCredits>({
    queryKey: ['movieCredits', movieId],
    queryFn: () => fetchMovieCredits(movieId!),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
