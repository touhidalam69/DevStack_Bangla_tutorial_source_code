import { z } from 'zod';
import { statuses } from './db/schema.ts';

const JobFields = z.object({
  company: z.string().trim().min(1).max(100),
  role: z.string().trim().min(1).max(100),
  status: z.enum(statuses),
  appliedOn: z.iso.date(),
});

export const JobInput = JobFields.extend({
  status: z.enum(statuses).default('Applied'),
});

export const JobPatch = JobFields.partial();

export const JobQuery = z.object({
  status: z.enum(statuses).optional(),
});

export const Params = z.object({
  id: z.coerce.number().int().positive(),
});
