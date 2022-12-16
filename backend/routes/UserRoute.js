import express from "express";
import {
  allUsers,
  deleteUser,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/all").get(allUsers);
router.route("/delete/:id").delete(deleteUser);

export default router;
