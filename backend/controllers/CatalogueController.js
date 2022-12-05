import Catalogue from "../models/Catalogue.js";

export const addService = async (req, res) => {
  try {
    await Catalogue.create(req.body);
    res.status(201).json({ msg: "Service added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};

export const getService = async (req, res) => {
  try {
    const services = await Catalogue.find({});
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There was some error" });
  }
};
