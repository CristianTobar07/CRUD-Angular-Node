import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateEmptyFileds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const customErrors = errors.array().map((error) => ({
    //   msg: error.msg,
    // }));
    return res.status(400).json({
      status: false,
      msg: errors.array()[0].msg,
    });
  }

  next();
};
