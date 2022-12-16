import express from "express";
import { addService, getService } from "../controllers/AdminController.js";
import { authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/service")
  .post(authorizeUser("Admin"), addService)
  .get(getService);

export default router;
