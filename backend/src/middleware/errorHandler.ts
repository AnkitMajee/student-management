import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Validation error',
      errors: error.errors,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(StatusCodes.CONFLICT).json({
        message: 'Resource already exists',
      });
    }
    if (error.code === 'P2025') {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Resource not found',
      });
    }
  }

  console.error(error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
  });
};