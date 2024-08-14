import express from "express";

import { getStores, addStores } from "../controllers/apiController.js";

const router = express.Router();

router.route("/stores").get(getStores).post(addStores);

export default router;
