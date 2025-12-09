import { z } from 'zod';

/**
 * Validate movie ID
 * -Must be a positive integer
 * -Must be in the range of (1 to 10,000,000)
 */
const movieIdSchema = z.number()
    .int('Movie ID must be an integer')
    .positive('Movie ID must be a positive number')
    .min(1, 'Movie ID must be at least 1')
    .max(10000000, 'Movie ID must be less than 10,000,000');

/**
 * Validate movie ID parameter
 * @param id - The movie ID to validate
 * @returns Validated movie ID
 * @throws ZodError if validation fails
*/
export function validateMovieId(id: number): number {
    return movieIdSchema.parse(id);
}