import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createCustomer, getCustomers, getCustomerById } from "../controllers/customerController.js";

const router = express.Router();

router.post("/", authMiddleware, createCustomer);
router.get("/", authMiddleware, getCustomers);
router.get("/:id", authMiddleware, getCustomerById);

export default router;


