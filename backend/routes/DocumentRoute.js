import express from "express";
const router = express.Router();

import {
  addDocument,
  getAllDocuments,
  getServiceDocuments,
} from "../controllers/DocumentController.js";

router.route("/allDocs").post(addDocument).get(getAllDocuments);
router.route("/service/:name").get(getServiceDocuments);

export default router;
