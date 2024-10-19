import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserModel } from "../models/User.js";
import { errorHandler } from "../utils/error.js";

const User = createUserModel(); // Using Factory Pattern

// Hashing Password
const hashPassword = (password) => bcryptjs.hashSync(password, 10);

// Signup Controller
export const signup = async (req, res, next) => {
  const { username, email, password, userType, isAdmin } = req.body;
  const hashedPassword = hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    userType,
    isAdmin,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error during user creation:", error); // Add this line to log the error
    next(errorHandler(500, "User creation failed"));
  }
};

// Signin Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email: email.toLowerCase() });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Incorrect email or password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiry
    });

    const { password: _, ...userData } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userData);
  } catch (error) {
    next(errorHandler(500, "Signin failed"));
  }
};

// Signout Controller
export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been signed out!" });
  } catch (error) {
    next(errorHandler(500, "Signout failed"));
  }
};
