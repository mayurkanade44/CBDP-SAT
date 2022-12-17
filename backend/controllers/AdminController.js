import Admin from "../models/Admin.js";

export const addService = async (req, res) => {
  try {
    const serv = await Admin.create(req.body);

    let name;
    if (serv.serviceName) name = serv.serviceName;
    else if (serv.catalogueType) name = serv.catalogueType;
    else name = serv.fileType;

    return res.status(201).json({ msg: `${name} added successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};

export const getService = async (req, res) => {
  try {
    let services = await Admin.find();
    res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};
