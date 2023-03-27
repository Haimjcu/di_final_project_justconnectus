import { Request, Response } from "express";
import { OK } from "http-status-codes";
import { ApiResponse, asyncMiddleware } from "../middlewares";
import { ShoutoutModel } from "../models/shoutout.models";
import shoutoutService from "../services/shoutout.service";
import IController from "../types/IController";

const createNewShoutout: IController = asyncMiddleware(
    async (req: Request, res: Response) => {
      console.log(`haim controller ${req}`);
      const userId = req.header("id");
      const request = req.body as ShoutoutModel;
      const connectDetail = await shoutoutService.createNewShoutout(
        request,
        Number(userId)
      );
      ApiResponse.result(res, connectDetail, OK);
    }
  );

  const getAllShoutouts: IController = asyncMiddleware(
    async (req: Request, res: Response) => {
      const userId = req.header("id");
      const shoutouts = await shoutoutService.getAllShoutouts(Number(userId));
      ApiResponse.result(res, shoutouts, OK);
    }
  );

  export default {
    createNewShoutout,
    getAllShoutouts,
  };