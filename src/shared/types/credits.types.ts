export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
  cast_id?: number;
}

export interface CrewMember {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  department: string;
  job: string;
  credit_id: string;
  gender: number;
  known_for_department: string;
  popularity: number;
  adult: boolean;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface TVCredits {
  id: number;
  cast: TVCastMember[];
  crew: CrewMember[];
}

export interface TVCastMember extends CastMember {
  roles?: {
    credit_id: string;
    character: string;
    episode_count: number;
  }[];
  total_episode_count?: number;
}
