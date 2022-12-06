import Catalogue from "../models/Catalogue.js";

export const addService = async (req, res) => {
  const { serviceName, fileType } = req.body;
  try {
    let alreadyExists;
    if (serviceName) alreadyExists = await Catalogue.findOne({ serviceName });
    else alreadyExists = await Catalogue.findOne({ fileType });

    if (alreadyExists) return res.status(400).json({ msg: "already exists" });

    const serv = await Catalogue.create(req.body);

    let name;
    if (serv.serviceName) name = serv.serviceName;
    else name = serv.fileType;

    return res.status(201).json({ msg: `${name} added successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};

export const getService = async (req, res) => {
  try {
    const services = await Catalogue.find({});
    res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};
