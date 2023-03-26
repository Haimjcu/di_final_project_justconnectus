import * as express from "express";
import userRoute from "./user.route";
import masterRoute from "./master.route";
import contactRoute from "./contact.route";
import graphqlRoute from "./graphql.route";
import searchRoute from "./search.route";
import messageRoute from "./message.route";
import shoutoutRoute from "./shoutout.route";

const router = express.Router();
router.use("/v1/users", userRoute);
router.use("/v1/contacts", contactRoute);
router.use("/v1/search", searchRoute);
router.use("/v1/message", messageRoute);
router.use("/v1/shoutouts", shoutoutRoute);
router.use("/v1", masterRoute);
router.use("/v1", graphqlRoute);
export default router;