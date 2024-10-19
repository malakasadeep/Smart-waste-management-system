import express from "express";
import { signup, signin, signOut } from "../controllers/AuthController.js";
import { validateSignup, validateSignin } from "../middlewares/validators.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);
router.get("/signout", signOut);

export default router;
