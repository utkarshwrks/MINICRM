import Customer from "../models/Customer.js";
import Lead from "../models/Lead.js";

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body, ownerId: req.user.id });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Customers (with search + pagination)
export const getCustomers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const query = {
      ownerId: req.user.id,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ]
    };
    const customers = await Customer.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Customer.countDocuments(query);
    res.json({ customers, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const leads = await Lead.find({ customerId: customer._id });
    res.json({ ...customer.toObject(), leads });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    // Optional: delete all leads for this customer
    await Lead.deleteMany({ customerId: req.params.id });
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
