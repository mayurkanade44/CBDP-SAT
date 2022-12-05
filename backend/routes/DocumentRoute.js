import express from "express";
const router = express.Router();

import { addDocument } from "../controllers/DocumentController.js";

router.route("/add").post(addDocument);

export default router;
