import express from "express";
const router = express.Router();

import {
  addDocument,
  getAllDocuments,
  getServiceDocuments,
  sendMail,
} from "../controllers/DocumentController.js";

router.route("/allDocs").post(addDocument).get(getAllDocuments);
router.route("/sendMail").post(sendMail);
router.route("/service/:name").get(getServiceDocuments);

export default router;
