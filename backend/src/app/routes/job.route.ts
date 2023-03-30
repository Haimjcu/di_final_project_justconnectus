import express from "express";
import { authorize } from "../authorizer/authorize";
import jobController from "../controllers/job.controller";

const router = express.Router();

router.get("/getAllJobs", authorize([]), jobController.getAllJobs);
  

export default router;