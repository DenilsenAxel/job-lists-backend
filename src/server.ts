import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { connectDB } from "./config/db";
import { API_PREFIX } from "./utils/constants";
import authRouter from "./routes/auth";
import jobRouter from "./routes/job";
import * as dotenv from "dotenv";
import { sendRes } from "./utils/api";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: process.env.MAX_REQUEST_SIZE }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(API_PREFIX, authRouter());
app.use(API_PREFIX, jobRouter());

app.get("/status", (_: Request, res: Response) => {
  return sendRes(res, 200, "Healthy Upstream");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
