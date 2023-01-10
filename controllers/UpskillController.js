import Upskill from "../models/Upskill.js";

export const addVideo = async (req, res) => {
  const { fileName, file } = req.body;
  try {
    if (!fileName || !file)
      return res.status(400).json({ msg: "Please provide all values" });

    const video = await Upskill.create(req.body);
    res.status(201).json({ msg: `${video.fileName} is added` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getVideos = async (req, res) => {
  const { search } = req.query;
  let queryObject = {};
  try {
    if (search) {
      queryObject.fileName = { $regex: search, $options: "i" };
    }
    const videos = await Upskill.find(queryObject);
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
