import express from "express";
import { addService, getService } from "../controllers/CatalogueController.js";

const router = express.Router();

router.route("/service").post(addService).get(getService);

export default router;