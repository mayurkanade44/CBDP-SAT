import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

import documentRouter from "./routes/DocumentRoute.js";
import adminRouter from "./routes/AdminRoute.js";
import authRouter from "./routes/UserRoute.js";
import upskillRouter from "./routes/UpskillRoute.js";
import { notFoundError } from "./middleware/notFound.js";
import { authenticateUser } from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/api/user", authRouter);
app.use("/api/admin", authenticateUser, adminRouter);
app.use("/api/documents", authenticateUser, documentRouter);
app.use("/api/upskill", authenticateUser, upskillRouter);

app.use(notFoundError);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
