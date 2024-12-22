import { z } from 'zod';

export const createCourseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const updateCourseSchema = createCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;