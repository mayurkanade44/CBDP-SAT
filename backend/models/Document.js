import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide document name"] },
  typeOfService: [String],
  image: { type: String, required: [true, "Please upload a file"] },
});

export default mongoose.model("Document", DocumentSchema);
