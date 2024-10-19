import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import binRoutes from "./routes/BinRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/bin", binRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000!!!");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Mongo DB successfully!!!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo");
  });
