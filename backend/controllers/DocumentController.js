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

    if (!req.files) {
      return res.status(400).json({ msg: "Please select a file" });
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
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllDocuments = async (req, res) => {
  const { search } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  try {
    const documents = await Document.find(queryObject);
    return res.status(200).json({ documents });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getServiceDocuments = async (req, res) => {
  const { name } = req.params;
  try {
    const serviceDoc = await Document.find({ typeOfService: { $in: name } });
    return res.status(200).json({ serviceDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
