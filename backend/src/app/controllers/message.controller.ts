import { Request, Response } from "express";
import { OK } from "http-status-codes";
import { asyncMiddleware, ApiResponse } from "../middlewares/index";
import { ConnectModel } from "../models/message.models";
import messageService from "../services/message.service";
import IController from "../types/IController";

const createNewConnect: IController = asyncMiddleware(
  async (req: Request, res: Response) => {
    const userId = req.header("id");
    const request = req.body as ConnectModel;
    const connectDetail = await messageService.createNewConnect(
      request,
      Number(userId)
    );
    ApiResponse.result(res, connectDetail, OK);
  }
);

const getConnectDetail: IController = asyncMiddleware(
  async (req: Request, res: Response) => {
    const userId = req.header("id");
    const connectId = req.params.connectId;
    const connectDetail = await messageService.getConnectDetails(
      Number(connectId),
      Number(userId)
    );
    ApiResponse.result(res, connectDetail, OK);
  }
);

const getChatUsersList: IController = asyncMiddleware(async (req, res) => {
  const userId = req.header("id");
  const list = await messageService.getChatUsersList(Number(userId));
  ApiResponse.result(res, list, OK);
});

const updateConnectStatus: IController = asyncMiddleware(async (req, res) => {
  const userId = req.header("id");
  const connectId = req.params.connectId;
  const connectDetail = await messageService.setConnectToConnected(Number(connectId), Number(userId));
  ApiResponse.result(res, connectDetail, OK);
});

export default {
  createNewConnect,
  getConnectDetail,
  getChatUsersList,
  updateConnectStatus,
};
