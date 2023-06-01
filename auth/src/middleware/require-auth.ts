import { Request, Response, NextFunction } from "express";
import { NotAuthroziedError } from "../errors/not-authorized-error";
import { currentUser } from "./current-user";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthroziedError();
  }

  next();
};

export const authorized = [currentUser, requireAuth];
