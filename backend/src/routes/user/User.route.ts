import express from "express";
import { createUser, getUser } from "./User.controller";

const router = express.Router();

router.get("/", getUser);
router.post("/signup", createUser);
export default router;

//each route except signup waits from you jwt token
//in controllers it transforms back in user id
//for firnDprojectsById and deleteProjectById also must send project id
