import express from "express";
import { authorize } from "../authorizer/authorize";
import shoutoutController from "../controllers/shoutout.controller";

const router = express.Router();

router.post(
    "/createShoutout",
    authorize([]),
    shoutoutController.createOrUpdateShoutout
  );

export default router;