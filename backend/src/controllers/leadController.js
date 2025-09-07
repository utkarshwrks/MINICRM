import Lead from "../models/Lead.js";

// Create Lead
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, customerId: req.params.customerId });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Leads by Customer
export const getLeadsByCustomer = async (req, res) => {
  try {
    const leads = await Lead.find({ customerId: req.params.customerId });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.leadId, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.leadId);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
