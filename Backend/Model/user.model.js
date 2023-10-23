const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    otp: {
      type: Number,
      default: 0,
    },
    otpExpire: {
      type: Date,
      default: Date.now()+300000,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
