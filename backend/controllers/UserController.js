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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email id" });
    }

    const comparePassword = await user.comparePassword(password);
    if (!comparePassword)
      return res.status(400).json({ msg: "Invalid password" });

    const token = await user.createJWT();

    res.status(200).json({
      user: {
        name: user.name,
        role: user.role,
        userId: user._id,
        token: token,
      },
      msg: `Welcome ${user.name}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};