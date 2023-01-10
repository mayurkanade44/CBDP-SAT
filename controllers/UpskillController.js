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

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Upskill.findOne({ _id: id });
    if (!video) return res.status(404).json({ msg: "No video found" });

    await video.remove();
    const videos = await Upskill.find();
    res.status(200).json({ msg: "Selected video has been deleted", videos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
