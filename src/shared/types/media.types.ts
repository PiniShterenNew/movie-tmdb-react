export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: string;
}

export type VideoType =
  | "Trailer"
  | "Teaser"
  | "Clip"
  | "Behind the Scenes"
  | "Blooper"
  | "Featurette"
  | "Opening Credits";

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
  iso_639_1: string | null;
}

export interface ImageResponse {
  id: number;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
}

export interface Keyword {
  id: number;
  name: string;
}

export interface KeywordResponse {
  id: number;
  keywords: Keyword[];
}

export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface ReviewResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProviderCountry {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProviderResponse {
  id: number;
  results: Record<string, WatchProviderCountry>;
}
