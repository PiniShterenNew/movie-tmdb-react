import { useMemo } from "react";
import type { Video } from "../api/movie-videos.api";

/**
 * Custom hook to find the best trailer from videos
 * Single Responsibility: Extract trailer selection logic from component
 * 
 * Strategy:
 * 1. Official YouTube Trailer (preferred)
 * 2. Any YouTube Trailer
 * 3. Any YouTube video (Trailer, Teaser, or Clip)
 * 
 * @param videos - Array of video objects from TMDB API
 * @returns The best matching trailer video, or undefined if none found
 */
export function useMovieTrailer(videos: Video[] | undefined): Video | undefined {
  return useMemo(() => {
    if (!videos || videos.length === 0) {
      return undefined;
    }
    
    // Strategy 1: Official YouTube Trailer
    let found = videos.find(v => 
      v.type === "Trailer" && 
      v.official === true && 
      v.site === "YouTube"
    );
    
    // Strategy 2: Any YouTube Trailer
    if (!found) {
      found = videos.find(v => 
        v.type === "Trailer" && 
        v.site === "YouTube"
      );
    }
    
    // Strategy 3: Any YouTube video (Teaser, Clip, etc.)
    if (!found) {
      found = videos.find(v => 
        (v.type === "Trailer" || v.type === "Teaser" || v.type === "Clip") && 
        v.site === "YouTube"
      );
    }
    
    return found;
  }, [videos]);
}
