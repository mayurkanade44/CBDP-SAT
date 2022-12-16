import express from "express";
import { getLatestDocs } from "../controllers/DocumentController.js";
import {
  allUsers,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import { authenticateUser, authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/register")
  .post(authenticateUser, authorizeUser("Admin"), registerUser);
router.route("/login").post(loginUser);
router.route("/latestDocs").get(getLatestDocs);
router.route("/all").get(authenticateUser, authorizeUser("Admin"), allUsers);
router
  .route("/delete/:id")
  .delete(authenticateUser, authorizeUser("Admin"), deleteUser);

export default router;
