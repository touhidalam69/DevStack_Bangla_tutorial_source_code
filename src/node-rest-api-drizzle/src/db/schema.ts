import {
  pgEnum, pgTable, integer, varchar, date,
} from 'drizzle-orm/pg-core';

export const statuses = [
  'Applied', 'Interview', 'Offer', 'Rejected',
] as const;
export const statusEnum = pgEnum('status', statuses);

export const jobs = pgTable('jobs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  company: varchar({ length: 100 }).notNull(),
  role: varchar({ length: 100 }).notNull(),
  status: statusEnum().notNull().default('Applied'),
  appliedOn: date().notNull(),
});
