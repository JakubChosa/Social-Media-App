import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { UnauthenticatedError } from "../types/custom-errors.js";

export const verifyToken: RequestHandler = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    throw new UnauthenticatedError(
      "you don't have permission to access this page"
    );
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trimStart();
  }
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verifyToken;
  next();
};
