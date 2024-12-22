import { z } from 'zod';

export const createStudentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  cohortId: z.string().uuid('Invalid cohort ID'),
  courseIds: z.array(z.string().uuid('Invalid course ID')).min(1, 'At least one course is required'),
});

export const updateStudentSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  cohortId: z.string().uuid('Invalid cohort ID').optional(),
  status: z.boolean().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;