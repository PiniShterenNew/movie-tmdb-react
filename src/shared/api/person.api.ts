import { tmdb } from "@/shared/lib/tmdb";
import type {
  PersonDetails,
  PersonCredits,
  PersonImages,
  ExternalIds,
} from "@/shared/types";

export interface PersonDetailsWithExtras extends PersonDetails {
  combined_credits?: PersonCredits;
  images?: PersonImages;
  external_ids?: ExternalIds;
}

// Person Details with append_to_response
export async function fetchPersonDetails(
  id: number,
  appendToResponse?: string
): Promise<PersonDetailsWithExtras> {
  const response = await tmdb.get<PersonDetailsWithExtras>(`/person/${id}`, {
    params: appendToResponse ? { append_to_response: appendToResponse } : {},
  });
  return response.data;
}

// Full Person Details
export async function fetchFullPersonDetails(
  id: number
): Promise<PersonDetailsWithExtras> {
  return fetchPersonDetails(id, "combined_credits,images,external_ids");
}

// Person Combined Credits
export async function fetchPersonCredits(id: number): Promise<PersonCredits> {
  const response = await tmdb.get<PersonCredits>(
    `/person/${id}/combined_credits`
  );
  return response.data;
}

// Person Movie Credits
export async function fetchPersonMovieCredits(
  id: number
): Promise<PersonCredits> {
  const response = await tmdb.get<PersonCredits>(
    `/person/${id}/movie_credits`
  );
  return response.data;
}

// Person TV Credits
export async function fetchPersonTVCredits(id: number): Promise<PersonCredits> {
  const response = await tmdb.get<PersonCredits>(`/person/${id}/tv_credits`);
  return response.data;
}

// Person Images
export async function fetchPersonImages(id: number): Promise<PersonImages> {
  const response = await tmdb.get<PersonImages>(`/person/${id}/images`);
  return response.data;
}

// Person External IDs
export async function fetchPersonExternalIds(id: number): Promise<ExternalIds> {
  const response = await tmdb.get<ExternalIds>(`/person/${id}/external_ids`);
  return response.data;
}
