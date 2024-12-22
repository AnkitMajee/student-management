import { z } from 'zod';

export const createCohortSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const updateCohortSchema = createCohortSchema.partial();

export type CreateCohortInput = z.infer<typeof createCohortSchema>;
export type UpdateCohortInput = z.infer<typeof updateCohortSchema>;