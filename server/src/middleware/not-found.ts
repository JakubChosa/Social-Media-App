import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (_req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: "page not found" });
};

export default notFoundMiddleware;
