import express from "express";
const router = express.Router();

import {
  addDocument,
  deleteDocument,
  editDocument,
  getAllDocuments,
  getServiceDocuments,
  sendMail,
} from "../controllers/DocumentController.js";
import { authorizeUser } from "../middleware/auth.js";

router
  .route("/allDocs")
  .post(authorizeUser("Admin"), addDocument)
  .get(getAllDocuments);

router.route("/sendMail").post(sendMail);
router.route("/service/:name").get(getServiceDocuments);
router
  .route("/editDoc/:id")
  .patch(authorizeUser("Admin"), editDocument)
  .delete(authorizeUser("Admin"), deleteDocument);

export default router;
