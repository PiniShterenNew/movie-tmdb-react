/**
 * Normalizes search query for frontend use (UX + queryKey consistency)
 * Only does basic normalization - does NOT remove characters (for better UX)
 * 
 * @param input - The search query to normalize
 * @returns Normalized query string
 */
export function normalizeSearchQuery(input: string): string {
    if (typeof input !== "string") return "";
    return input.trim().replace(/\s+/g, " ").slice(0, 80);
}
