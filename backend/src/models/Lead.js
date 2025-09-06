import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  title: String,
  description: String,
  status: { type: String, enum: ["New", "Contacted", "Converted", "Lost"], default: "New" },
  value: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", leadSchema);
