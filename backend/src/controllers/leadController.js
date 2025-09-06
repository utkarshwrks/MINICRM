import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, customerId: req.params.customerId });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
