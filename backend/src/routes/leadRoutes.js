import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/:customerId/leads", authMiddleware, createLead);

export default router;
