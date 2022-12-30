import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
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
import { notFoundError } from "./middleware/notFound.js";
import { authenticateUser } from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

app.use("/api/admin", authenticateUser, adminRouter);
app.use("/api/documents", authenticateUser, documentRouter);
app.use("/api/user", authRouter);

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
