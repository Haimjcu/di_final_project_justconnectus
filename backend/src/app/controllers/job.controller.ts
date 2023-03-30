import { Request, Response } from "express";
import { OK } from "http-status-codes";
import { ApiResponse, asyncMiddleware } from "../middlewares";
import jobService from "../services/job.service";
import IController from "../types/IController";


  const getAllJobs: IController = asyncMiddleware(
    async (req: Request, res: Response) => {
      const userId = req.header("id");
      const jobs = await jobService.getAllJobs(Number(userId));
      ApiResponse.result(res, jobs, OK);
    }
  );

  export default {
    getAllJobs,
  };