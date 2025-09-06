import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Customer", customerSchema);
