import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createLead,
  getLeadsByCustomer,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

// All routes are relative to /api/customers
router.post("/:customerId/leads", createLead);
router.get("/:customerId/leads", getLeadsByCustomer);
router.put("/:customerId/leads/:leadId", updateLead);
router.delete("/:customerId/leads/:leadId", deleteLead);

export default router;
