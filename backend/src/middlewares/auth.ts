// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import User from "../routes/user/User.model";

// export default async (req: Request, res: Response, next: NextFunction) => {
//   if (!req.headers.authorization) {
//     res.json("No access!");
//   }
//   const token = req.headers.authorization;

//   const data: any = jwt.verify(token!, "privatekey");
//   const user = await User.findById(data.id).exec();
//   if (!user) {
//     throw new Error(`User ${data.id} not found`);
//   }
//   //@ts-ignore
//   req.userId = data.id;
//   //@ts-ignore
//   req.user = user;
//   next();
// };

//1: decalre req userId
//2: handle wrong token
//4: privatekey to env
