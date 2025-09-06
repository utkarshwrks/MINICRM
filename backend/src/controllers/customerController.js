import Customer from "../models/Customer.js";
import Lead from "../models/Lead.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body, ownerId: req.user.id });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ ownerId: req.user.id });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).lean();
    if (!customer) return res.status(404).json({ message: "Not found" });

    const leads = await Lead.find({ customerId: customer._id });
    res.json({ ...customer, leads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
