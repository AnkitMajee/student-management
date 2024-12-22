import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../lib/prisma';
import { validateRequest } from '../middleware/validateRequest';
import { createStudentSchema, updateStudentSchema } from '../schemas/student';

const router = Router();

router.get('/', async (req, res) => {
  const students = await prisma.student.findMany({
    include: {
      cohort: true,
      studentCourses: {
        include: {
          course: true,
        },
      },
    },
  });
  res.json(students);
});

router.post('/', validateRequest(createStudentSchema), async (req, res) => {
  const { name, cohortId, courseIds } = req.body;

  const student = await prisma.student.create({
    data: {
      name,
      cohortId,
      studentCourses: {
        create: courseIds.map((courseId: string) => ({
          courseId,
        })),
      },
    },
    include: {
      cohort: true,
      studentCourses: {
        include: {
          course: true,
        },
      },
    },
  });

  res.status(StatusCodes.CREATED).json(student);
});

router.patch('/:id', validateRequest(updateStudentSchema), async (req, res) => {
  const { id } = req.params;
  const { name, cohortId, status } = req.body;

  const student = await prisma.student.update({
    where: { id },
    data: {
      name,
      cohortId,
      status,
      lastLogin: new Date(),
    },
    include: {
      cohort: true,
      studentCourses: {
        include: {
          course: true,
        },
      },
    },
  });

  res.json(student);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.student.delete({ where: { id } });
  res.status(StatusCodes.NO_CONTENT).send();
});

export default router;