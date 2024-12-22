import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { validateRequest } from '../middleware/validateRequest';
import { createCohortSchema, updateCohortSchema } from '../schemas/cohort';

const router = Router();

router.get('/', async (_req, res) => {
  const cohorts = await prisma.cohort.findMany();
  res.json(cohorts);
});

router.post('/', validateRequest(createCohortSchema), async (req, res) => {
  const cohort = await prisma.cohort.create({
    data: req.body,
  });
  res.status(StatusCodes.CREATED).json(cohort);
});

router.patch('/:id', validateRequest(updateCohortSchema), async (req, res) => {
  const { id } = req.params;
  const cohort = await prisma.cohort.update({
    where: { id },
    data: req.body,
  });
  res.json(cohort);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.cohort.delete({ where: { id } });
  res.status(StatusCodes.NO_CONTENT).send();
});

export default router;