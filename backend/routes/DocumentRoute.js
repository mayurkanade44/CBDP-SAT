import express from "express";
const router = express.Router();

import {
  addDocument,
  deleteDocument,
  editDocument,
  getAllDocuments,
  getLatestDocs,
  getServiceDocuments,
  sendMail,
} from "../controllers/DocumentController.js";

router.route("/allDocs").post(addDocument).get(getAllDocuments);
router.route("/latestDocs").get(getLatestDocs);
router.route("/sendMail").post(sendMail);
router.route("/service/:name").get(getServiceDocuments);
router.route("/editDoc/:id").patch(editDocument).delete(deleteDocument);

export default router;
