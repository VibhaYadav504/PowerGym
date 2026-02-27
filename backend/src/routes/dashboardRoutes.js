// routes/dashboardRoutes.js

import express from "express";
import { getDashboardStats } from "../Controller/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardStats);

export default router;