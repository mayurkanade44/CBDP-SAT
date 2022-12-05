import mongoose from "mongoose";

const CatalougeSchema = new mongoose.Schema({
  serviceName: { type: String, default: null },
  fileType: { type: String, default: null },
});

export default mongoose.model("Catalogue", CatalougeSchema);
