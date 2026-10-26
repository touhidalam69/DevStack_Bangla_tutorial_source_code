import express from 'express';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from './db/index.ts';
import { jobs } from './db/schema.ts';
import { JobInput, JobPatch, JobQuery, Params } from './validation.ts';

export const app = express();
app.use(express.json());

app.get('/jobs', async (req, res) => {
  const { status } = JobQuery.parse(req.query);
  const rows = await db.select().from(jobs)
    .where(status ? eq(jobs.status, status) : undefined)
    .orderBy(desc(jobs.appliedOn));
  res.json(rows);
});

app.get('/jobs/:id', async (req, res) => {
  const { id } = Params.parse(req.params);
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json(job);
});

app.post('/jobs', async (req, res) => {
  const input = JobInput.parse(req.body);
  const [job] = await db.insert(jobs).values(input).returning();
  res.status(201).json(job);
});

app.patch('/jobs/:id', async (req, res) => {
  const { id } = Params.parse(req.params);
  const changes = JobPatch.parse(req.body);
  const [job] = await db.update(jobs).set(changes)
    .where(eq(jobs.id, id)).returning();
  if (!job) {
    res.status(404).json({ error: 'Job not found' });
    return;
  }
  res.json(job);
});

app.delete('/jobs/:id', async (req, res) => {
  const { id } = Params.parse(req.params);
  const [job] = await db.delete(jobs)
    .where(eq(jobs.id, id)).returning();
  res.status(job ? 204 : 404).end();
});

const onError: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({ errors: z.flattenError(err).fieldErrors });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
};
app.use(onError);
