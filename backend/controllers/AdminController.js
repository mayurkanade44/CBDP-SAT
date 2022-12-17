import Admin from "../models/Admin.js";

export const addService = async (req, res) => {
  const { serviceName, fileType, catalogueType } = req.body;
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

    // if (req.user.role !== "Stakeholder") {
    //   services = services.filter((item) => item.serviceName !== "S-Mark");
    // }
    res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};
