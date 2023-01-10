import express from "express";
const router = express.Router();

import {
  addVideo,
  deleteVideo,
  getVideos,
} from "../controllers/UpskillController.js";
import { authorizeUser } from "../middleware/auth.js";

router.route("/video").post(authorizeUser("Admin"), addVideo).get(getVideos);
router.route("/video/:id").delete(authorizeUser("Admin"), deleteVideo);

export default router;
