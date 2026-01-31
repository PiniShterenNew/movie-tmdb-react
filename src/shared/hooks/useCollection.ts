import { useQuery } from "@tanstack/react-query";
import { fetchCollection } from "@/shared/api";

export function useCollection(id: number | null) {
  return useQuery({
    queryKey: ["collection", id],
    queryFn: () => fetchCollection(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  });
}
