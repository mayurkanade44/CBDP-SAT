import express from "express";
import {
  addService,
  getSendMailData,
  getService,
} from "../controllers/AdminController.js";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/service")
  .post(authorizeUser("Admin"), addService)
  .get(getService);
router.route("/sendMailData").post( getSendMailData);

export default router;
