import { Response, Request } from "express";
import { api, sendRes } from "../utils/api";
import { IJob } from "../interfaces/job";

export const getJobs = async (req: Request, res: Response) => {
  const { description, location, full_time, page } = req.query;
  let url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json?";

  if (description) {
    url += `description=${description}&`;
  }
  if (location) {
    url += `location=${location}&`;
  }
  if (full_time) {
    url += `full_time=${full_time}&`;
  }
  if (page) {
    url += `page=${page}&`;
  }

  try {
    let jobs = await api<IJob[]>(url);
    jobs = jobs.filter((el) => el !== null);
    sendRes(res, 200, "Success", jobs);
  } catch (error: any) {
    sendRes(res, 500, error.message);
  }
};

export const getJobDetail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;

  try {
    const jobs = await api<IJob[]>(url);
    if (!jobs) {
      sendRes(res, 400, "Job not found!");
      return;
    }
    sendRes(res, 200, "Success", jobs);
  } catch (error: any) {
    sendRes(res, 500, error.message);
  }
};
