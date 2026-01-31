export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  gender: number;
  adult: boolean;
}

export interface PersonDetails extends Person {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string | null;
  place_of_birth: string | null;
}

export interface PersonCredits {
  id: number;
  cast: PersonCastCredit[];
  crew: PersonCrewCredit[];
}

export interface PersonCastCredit {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  character: string;
  credit_id: string;
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
  episode_count?: number;
}

export interface PersonCrewCredit {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  department: string;
  job: string;
  credit_id: string;
  media_type: "movie" | "tv";
  genre_ids: number[];
  popularity: number;
}

export interface PersonImages {
  id: number;
  profiles: PersonImage[];
}

export interface PersonImage {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ExternalIds {
  id: number;
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  tiktok_id: string | null;
  youtube_id: string | null;
}
