import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  typeOfCatalogue: { type: String, required: true },
  typeOfService: [String],
  typeOfFile: { type: String, required: true },
  name: { type: String, required: [true, "Please provide document name"] },
  file: { type: String, required: [true, "Please upload a file"] },
});

export default mongoose.model("Document", DocumentSchema);
