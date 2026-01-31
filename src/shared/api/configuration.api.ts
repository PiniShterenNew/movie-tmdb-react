import { tmdb } from "@/shared/lib/tmdb";

export interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface WatchProviderListResponse {
  results: {
    display_priorities: Record<string, number>;
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }[];
}

export interface CertificationsResponse {
  certifications: Record<
    string,
    {
      certification: string;
      meaning: string;
      order: number;
    }[]
  >;
}

// Get TMDB Configuration
export async function fetchConfiguration(): Promise<TMDBConfiguration> {
  const response = await tmdb.get<TMDBConfiguration>("/configuration");
  return response.data;
}

// Get Countries
export async function fetchCountries(): Promise<Country[]> {
  const response = await tmdb.get<Country[]>("/configuration/countries");
  return response.data;
}

// Get Languages
export async function fetchLanguages(): Promise<Language[]> {
  const response = await tmdb.get<Language[]>("/configuration/languages");
  return response.data;
}

// Get Watch Providers for Movies
export async function fetchMovieWatchProviders(): Promise<WatchProviderListResponse> {
  const response = await tmdb.get<WatchProviderListResponse>(
    "/watch/providers/movie"
  );
  return response.data;
}

// Get Watch Providers for TV
export async function fetchTVWatchProviders(): Promise<WatchProviderListResponse> {
  const response = await tmdb.get<WatchProviderListResponse>(
    "/watch/providers/tv"
  );
  return response.data;
}

// Get Movie Certifications
export async function fetchMovieCertifications(): Promise<CertificationsResponse> {
  const response = await tmdb.get<CertificationsResponse>(
    "/certification/movie/list"
  );
  return response.data;
}

// Get TV Certifications
export async function fetchTVCertifications(): Promise<CertificationsResponse> {
  const response = await tmdb.get<CertificationsResponse>(
    "/certification/tv/list"
  );
  return response.data;
}
