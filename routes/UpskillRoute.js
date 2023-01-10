import express from "express";
const router = express.Router();

import { addVideo } from "../controllers/UpskillController.js";

router.route("/video").post(addVideo);

export default router;
