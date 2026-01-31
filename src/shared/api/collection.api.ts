import { tmdb } from "@/shared/lib/tmdb";
import type { CollectionDetails } from "@/shared/types";

export async function fetchCollection(id: number): Promise<CollectionDetails> {
  const response = await tmdb.get<CollectionDetails>(`/collection/${id}`);
  return response.data;
}
