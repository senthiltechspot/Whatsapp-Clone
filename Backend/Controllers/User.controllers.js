const User = require("../Model/user.model");

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-otp -otpExpire");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user details" });
  }
};

const UpdateUserDetails = async (req, res) => {
  try {
    const { name, profilePic, about } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) {
      user.name = name;
    }
    if (profilePic) {
      user.profilePic = profilePic;
    }
    if (about) {
      user.about = about;
    }
    await user.save();
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user details" });
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    const user = await User.find().select("-otp -otpExpire");
    if (!user) {
      return res.status(404).json({ message: "No Users not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user details" });
  }
};
module.exports = {
  getUserDetails,
  UpdateUserDetails,
  getAllUserDetails,
};
