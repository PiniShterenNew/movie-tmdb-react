import { z } from 'zod';
import { sanitizeInput } from '@/shared/lib/sanitize';

/**
 * Zod schema for validating search query
 * Ensures query is a valid string with appropriate length constraints
 * Note: Sanitization is done before validation, so schema only checks length
 */
const searchQuerySchema = z.string()
    .min(1, 'Search query must be at least 1 character')
    .max(100, 'Search query must not exceed 100 characters');

/**
 * Validates and sanitizes search query
 * 
 * Performs sanitization first (XSS protection, dangerous chars removal),
 * then validates the sanitized input with Zod schema.
 * 
 * This ensures API layer is protected even if called directly (not through hook).
 * 
 * @param query - The search query to validate and sanitize
 * @returns Validated and sanitized search query
 * @throws ZodError if validation fails
 */
export function validateSearchQuery(query: string): string {
    // First sanitize (removes dangerous chars, trims, limits length)
    const sanitized = sanitizeInput(query);
    
    // Then validate (ensures it meets schema requirements)
    return searchQuerySchema.parse(sanitized);
}
