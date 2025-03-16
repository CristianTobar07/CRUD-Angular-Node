// middlewares/validateObjectId.ts
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateObjectIds = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const field of fields) {
      const id = req.params[field] || req.query[field] || req.body[field];

      if (id && !mongoose.isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `Formato inválido del Id en campo: ${field}` });
      }
    }
    next();
  };
};
