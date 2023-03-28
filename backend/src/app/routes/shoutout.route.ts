import express from "express";
import { authorize } from "../authorizer/authorize";
import shoutoutController from "../controllers/shoutout.controller";

const router = express.Router();

router.post(
    "/createShoutout",
    authorize([]),
    shoutoutController.createNewShoutout
  );

  router.post(
    "/updateShoutout",
    authorize([]),
    shoutoutController.updateShoutout
  );

  router.get("/getAllShoutouts", authorize([]), shoutoutController.getAllShoutouts);
  router.put("/deleteShoutout", authorize([]), shoutoutController.deleteShoutout);
  

export default router;