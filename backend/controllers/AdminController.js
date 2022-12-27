import Admin from "../models/Admin.js";

export const addService = async (req, res) => {
  try {
    const serv = await Admin.create(req.body);

    let name;
    if (serv.serviceName) name = serv.serviceName;
    else if (serv.catalogueType) name = serv.catalogueType;
    else name = serv.fileType;

    const services = await Admin.find({
      _id: { $ne: "63a05aeb5ea15caab88592c5" },
    });
    return res.status(201).json({ msg: `${name} added successfully`, services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};

export const editService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Admin.findOne({ _id: id });
    if (!service) return res.status(404).json({ msg: "No service found" });

    await Admin.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ msg: "Service has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};

export const getService = async (req, res) => {
  try {
    const services = await Admin.find({
      _id: { $ne: "63a05aeb5ea15caab88592c5" },
    });
    res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};

export const getSendMailData = async (req, res) => {
  try {
    let sendMails = await Admin.findById("63a05aeb5ea15caab88592c5");
    sendMails = sendMails.sendData.sort((a, b) => b.date - a.date);
    res.status(200).json({ sendMails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};
