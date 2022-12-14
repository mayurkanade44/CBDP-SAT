import express from "express";
import {
  allUsers,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/all").get(allUsers);

export default router;
