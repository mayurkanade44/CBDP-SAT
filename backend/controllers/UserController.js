import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !password || !email || !role) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({ msg: "Email id already exists" });
    }

    const user = await User.create(req.body);
    res.status(201).json({ msg: `${user.name} has been registered` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
