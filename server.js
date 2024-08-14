import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import apiRoute from "./routes/apiRoute.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", apiRoute);

app.listen(PORT, () =>
  console.log(
    "Server running in " + process.env.NODE_ENV + " mode on port  " + PORT
  )
);
