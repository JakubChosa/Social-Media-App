import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../types/custom-errors.js";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (
    err instanceof BadRequestError ||
    err instanceof UnauthenticatedError ||
    err instanceof NotFoundError
  ) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
};

export default errorHandlerMiddleware;
