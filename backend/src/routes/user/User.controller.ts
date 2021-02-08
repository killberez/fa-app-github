import { Request, Response, NextFunction } from "express";
import User from "./User.model";
import userService from "./User.service";
import jwt from "jsonwebtoken";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const userToken = jwt.verify(token!, "privatekey");
    //@ts-ignore
    const user = await userService.find(userToken.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User(req.body);
    await userService.create(user);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
