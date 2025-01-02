import type { Request, Response, NextFunction } from "express";
import { validationResult, type ValidationError } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors: { [key: string]: string }[] = [];

    errors.array().forEach((err: ValidationError) => {
      const { type, msg } = err;

      if (type && msg) {
        extractedErrors.push({ [type]: msg });
      }
    });

    return res.status(422).json({
      errors: extractedErrors,
    });
  }

  next();
};
