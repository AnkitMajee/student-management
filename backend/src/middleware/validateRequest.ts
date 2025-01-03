import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
};