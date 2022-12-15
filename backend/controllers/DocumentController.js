import Document from "../models/Document.js";
import { v2 as cloudinary } from "cloudinary";
import { URL } from "url";
import fs from "fs";
import sgMail from "@sendgrid/mail";
import axios from "axios";

export const addDocument = async (req, res) => {
  const { typeOfCatalogue, typeOfService, typeOfFile, name } = req.body;
  try {
    if (!typeOfCatalogue || !typeOfService || !typeOfFile || !name) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    req.body.typeOfService = typeOfService.split(",");

    if (req.files) {
      const docFile = req.files.file;
      const docPath = new URL("../files/" + `${docFile.name}`, import.meta.url);
      await docFile.mv(docPath);

      const result = await cloudinary.uploader.upload(`files/${docFile.name}`, {
        resource_type: "raw",
        use_filename: true,
        folder: "cbdp",
      });
      req.body.file = result.secure_url;
      fs.unlinkSync(`./files/${docFile.name}`);
    }

    const doc = await Document.create(req.body);
    return res.status(201).json({ msg: `${doc.name} has been uploaded` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const editDocument = async (req, res) => {
  const { id } = req.params;
  const { typeOfCatalogue, typeOfService, typeOfFile, name } = req.body;
  try {
    const doc = await Document.findOne({ _id: id });
    if (!doc) return res.status(404).json({ msg: "Given document not found" });

    if (!typeOfCatalogue || !typeOfService || !typeOfFile || !name) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    req.body.typeOfService = typeOfService.split(",");

    if (req.files) {
      const docFile = req.files.file;
      const docPath = new URL("../files/" + `${docFile.name}`, import.meta.url);
      await docFile.mv(docPath);

      const result = await cloudinary.uploader.upload(`files/${docFile.name}`, {
        resource_type: "raw",
        use_filename: true,
        folder: "cbdp",
      });
      req.body.file = result.secure_url;
      fs.unlinkSync(`./files/${docFile.name}`);
    }

    await Document.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Document.findOne({ _id: id });
    if (!doc) return res.status(404).json({ msg: "Given document not found" });

    const name = doc.name;
    await doc.remove();

    return res.status(200).json({ msg: `${name} has been deleted` });
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

export const getLatestDocs = async (req, res) => {
  try {
    const docs = await Document.find()
      .select("name")
      .sort("-createdAt");
    const latestDocs = docs.slice(0, 3);
    res.status(200).json({ latestDocs });
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

export const sendMail = async (req, res) => {
  const { emailTo, filesCart } = req.body;
  try {
    if (!emailTo || !filesCart) {
      return res.status(400).json({ msg: "Please provide email to or files" });
    }
    const url = Object.values(filesCart);
    const fileName = Object.keys(filesCart);
    const attach = [];
    for (let i = 0; i < url.length; i++) {
      const fileType = url[i].split(".").pop();
      const result = await axios.get(url[i], { responseType: "arraybuffer" });
      const base64File = Buffer.from(result.data, "binary").toString("base64");
      const attachObj = {
        content: base64File,
        filename: `${fileName[i]}.${fileType}`,
        type: `application/${fileType}`,
        disposition: "attachment",
      };
      attach.push(attachObj);
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: emailTo,
      from: { email: "noreply.epcorn@gmail.com", name: "do_not_reply_epcorn" },
      dynamic_template_data: {
        fileName: fileName,
      },
      template_id: "d-70c32e835f864676a70866c38b467a97",
      attachments: attach,
    };
    await sgMail.send(msg);
    res.status(200).json({ msg: "Email has been sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
