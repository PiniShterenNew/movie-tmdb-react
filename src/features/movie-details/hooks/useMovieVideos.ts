import { useQuery } from '@tanstack/react-query';
import { fetchMovieVideos, type MovieVideos } from '../api/movie-videos.api';

export function useMovieVideos(movieId: number | null) {
  return useQuery<MovieVideos>({
    queryKey: ['movieVideos', movieId],
    queryFn: () => fetchMovieVideos(movieId!),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
