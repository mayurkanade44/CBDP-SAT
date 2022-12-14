import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    catalogueType: { type: String },
    serviceName: { type: String, default: undefined },
    fileType: { type: String, default: undefined },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
