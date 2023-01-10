import express from "express";
const router = express.Router();

import { addVideo, getVideos } from "../controllers/UpskillController.js";

router.route("/video").post(addVideo).get(getVideos);

export default router;
