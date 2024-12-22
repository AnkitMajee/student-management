import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { validateRequest } from '../middleware/validateRequest';
import { createCourseSchema, updateCourseSchema } from '../schemas/course';

const router = Router();

router.get('/', async (_req, res) => {
  const courses = await prisma.course.findMany();
  res.json(courses);
});

router.post('/', validateRequest(createCourseSchema), async (req, res) => {
  const course = await prisma.course.create({
    data: req.body,
  });
  res.status(StatusCodes.CREATED).json(course);
});

router.patch('/:id', validateRequest(updateCourseSchema), async (req, res) => {
  const { id } = req.params;
  const course = await prisma.course.update({
    where: { id },
    data: req.body,
  });
  res.json(course);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.course.delete({ where: { id } });
  res.status(StatusCodes.NO_CONTENT).send();
});

export default router;