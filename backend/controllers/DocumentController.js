import Document from "../models/Document.js";
import { v2 as cloudinary } from "cloudinary";
import { URL } from "url";
import fs from "fs";

export const addDocument = async (req, res) => {
  const { typeOfCatalogue, typeOfService, typeOfFile, name } = req.body;
  try {
    if (!typeOfCatalogue || !typeOfService || !typeOfFile || !name) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    const docFile = req.files.doc;
    const docPath = new URL("../files/" + `${docFile.name}`, import.meta.url);
    await docFile.mv(docPath);

    const result = await cloudinary.uploader.upload(`files/${docFile.name}`, {
      resource_type: "raw",
      use_filename: true,
      folder: "cbdp",
    });
    req.body.file = result.secure_url;
    const doc = await Document.create(req.body);
    fs.unlinkSync(`./files/${docFile.name}`);
    return res.status(201).json({ msg: `${doc.name} has been added` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, tray again later" });
  }
};
