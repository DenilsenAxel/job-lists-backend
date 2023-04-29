import express from "express";
import { getJobDetail, getJobs } from "../controllers/job";
import { authenticateJWT } from "../middlewares/auth";

export default () => {
  const jobRouter = express.Router();

  jobRouter.get("/job", authenticateJWT, getJobs);
  jobRouter.get("/job/detail/:id", authenticateJWT, getJobDetail);

  return jobRouter;
};
