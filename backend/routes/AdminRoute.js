import express from "express";
import {
  addService,
  editService,
  getSendMailData,
  getService,
} from "../controllers/AdminController.js";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/service")
  .post(authorizeUser("Admin"), addService)
  .get(getService);
router.route("/sendMailData").get(authorizeUser("Admin"), getSendMailData);
router.route("/service/:id").patch(authorizeUser("Admin"), editService);

export default router;
