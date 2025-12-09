import { z } from 'zod';
import type { DiscoverParams } from '@/shared/types';

/**
 * Zod schema for validating discovery parameters
 * Ensures all parameters are within valid ranges and formats
 */
const discoverParamsSchema = z.object({
  with_genres: z.string().optional().refine(
    (val) => !val || val.split(',').every(id => !isNaN(Number(id))),
    'with_genres must be comma-separated numbers'
  ),
  primary_release_year: z.number().int().min(1900).max(2100).optional(),
  sort_by: z.enum([
    'popularity.desc', 'popularity.asc',
    'vote_average.desc', 'vote_average.asc',
    'release_date.desc', 'release_date.asc'
  ]).optional(),
  primary_release_date_gte: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  primary_release_date_lte: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
}).refine(
  (data) => {
    if (data.primary_release_year) {
      return !data.primary_release_date_gte && !data.primary_release_date_lte;
    }
    return true;
  },
  'Cannot use both primary_release_year and date range'
);

/**
 * Validates and sanitizes discovery parameters
 * @param params - The discovery parameters to validate
 * @returns Validated and cleaned discovery parameters
 * @throws ZodError if validation fails
 */
export function validateDiscoveryParams(params: DiscoverParams): DiscoverParams {
  // Remove undefined/empty fields
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([key, v]) => v !== undefined && v !== '' && key !== '_')
  ) as DiscoverParams;
  
  return discoverParamsSchema.parse(cleaned);
}