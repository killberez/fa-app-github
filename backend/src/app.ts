import express from "express";
import mongoose from "mongoose";
import projectRouter from "./routes/project/Project.route";
import userRouter from "./routes/user/User.route";
import authRouter from "./routes/Auth";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import * as connection from "./utils/connect";

process.env.NODE_ENV !== "TEST";

const app = express();

export const DB_URI_TEST =
  "mongodb+srv://Taras:Zaebars13@cluster0.lmv7h.mongodb.net/notes?retryWrites=true&w=majority";
const DB_URI_MAIN =
  "mongodb+srv://Taras:Zaebars1488@cluster0.rcrmu.mongodb.net/projects?retryWrites=true&w=majority";
if (process.env.NODE_ENV !== "TEST") connection.connect(DB_URI_MAIN);

app.set("port", 8000)
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
// if (process.env.NODE_ENV !== "TEST") app.use(authMiddleware);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRouter);

export default app;
