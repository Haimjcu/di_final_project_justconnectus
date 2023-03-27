import express from "express";
import { authorize } from "../authorizer/authorize";
import shoutoutController from "../controllers/shoutout.controller";

const router = express.Router();

router.post(
    "/createShoutout",
    authorize([]),
    shoutoutController.createNewShoutout
  );
  router.get("/getAllShoutouts", authorize([]), shoutoutController.getAllShoutouts);

export default router;