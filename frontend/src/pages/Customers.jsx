import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customers");
      const data = res.data?.customers || res.data || [];
      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers", form);
      setForm({ name: "", email: "", phone: "", company: "" });
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg">
        Loading customers...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Manage Customers
        </h2>

        {/* Add Customer Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              ➕ Add Customer
            </button>
          </div>
        </motion.form>

        {/* Customer List */}
        <div className="space-y-4">
          {customers.length === 0 && (
            <p className="text-gray-500 text-center">No customers yet.</p>
          )}
          {customers.map((c, i) => (
            <motion.div
              key={c._id || i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-blue-50 border rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-blue-700">{c?.name || "Unknown"}</p>
                <p className="text-sm text-gray-600">
                  {c?.email || "N/A"} | {c?.phone || "N/A"}
                </p>
                <p className="text-sm text-gray-500">{c?.company || "N/A"}</p>
              </div>
              {c?._id && (
                <Link
                  to={`/customers/${c._id}/leads`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  View Leads
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
