import { useQuery } from "@tanstack/react-query";
import {
  fetchFullPersonDetails,
  fetchPersonCredits,
  fetchPersonImages,
  fetchPersonExternalIds,
} from "@/shared/api";

export function usePersonDetails(id: number | null) {
  return useQuery({
    queryKey: ["person", id, "full"],
    queryFn: () => fetchFullPersonDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });
}

export function usePersonCredits(id: number | null) {
  return useQuery({
    queryKey: ["person", id, "credits"],
    queryFn: () => fetchPersonCredits(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 6,
  });
}

export function usePersonImages(id: number | null) {
  return useQuery({
    queryKey: ["person", id, "images"],
    queryFn: () => fetchPersonImages(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 6,
  });
}

export function usePersonExternalIds(id: number | null) {
  return useQuery({
    queryKey: ["person", id, "external_ids"],
    queryFn: () => fetchPersonExternalIds(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
