import mongoose from "mongoose";

const UpskillSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Upskill", UpskillSchema);
