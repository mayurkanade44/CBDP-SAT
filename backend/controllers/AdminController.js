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
  const { mailSearch } = req.query;
  try {
    let sendMails = await Admin.findById("63a05aeb5ea15caab88592c5");
    if (mailSearch) {
      // sendMails = await Admin.findOne({
      //   sendData: { $elemMatch: { to: mailSearch } },
      // });
      const temp = [];
      for (let mail of sendMails.sendData) {
        if (
          mail.to === mailSearch ||
          mail.files === mailSearch ||
          mail.from === mailSearch
        )
          temp.push(mail);
      }
      sendMails = temp;
    } else {
      const tempSort = sendMails.sendData
        .sort((a, b) => b.date - a.date)
        .slice(0, 10);
      sendMails = tempSort;
    }
    res.status(200).json({ sendMails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};
