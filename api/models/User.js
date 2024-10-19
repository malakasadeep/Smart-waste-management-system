import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      required: true,
      default: "customer",
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dgckCEFdaR4QrzY1cdQTF_VzmwmPkSV2UA&usqp=CAU",
    },
  },
  { timestamps: true }
);

export const createUserModel = () => mongoose.model("User", userSchema);
