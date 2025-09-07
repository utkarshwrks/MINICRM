import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

export default function Leads() {
  const { id } = useParams(); // customerId from URL
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "New",
    value: "",
  });
  const [editingLead, setEditingLead] = useState(null);

  // Fetch all leads for the customer
  const fetchLeads = async () => {
    try {
      const res = await api.get(`/customers/${id}/leads`);
      const data = res.data?.leads || res.data || [];
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchLeads();
  }, [id]);

  // Add or Update Lead
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLead) {
        await api.put(`/customers/${id}/leads/${editingLead._id}`, {
          ...form,
          value: Number(form.value),
        });
        fetchLeads();
      } else {
        const res = await api.post(`/customers/${id}/leads`, {
          ...form,
          value: Number(form.value),
        });
        const newLead = res.data.lead || res.data;
        setLeads((prev) => [...prev, newLead]);
      }

      // reset form
      setForm({ title: "", description: "", status: "New", value: "" });
      setEditingLead(null);
    } catch (err) {
      console.error("Form submit error:", err.response?.data || err.message);
    }
  };

  // Delete Lead
  const handleDelete = async (leadId) => {
    try {
      await api.delete(`/customers/${id}/leads/${leadId}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== leadId));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  // Start editing
  const handleEdit = (lead) => {
    setEditingLead(lead);
    setForm({
      title: lead.title,
      description: lead.description,
      status: lead.status,
      value: lead.value,
    });
  };

  if (!id) return <p className="p-6 text-center">Select a customer first.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-6 text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {editingLead ? "Edit Lead" : "Add New Lead"}
      </motion.h2>

      {/* Add/Edit Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          required
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`w-full ${
            editingLead
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white font-semibold py-2 rounded transition`}
        >
          {editingLead ? "Update Lead" : "Add Lead"}
        </motion.button>
      </motion.form>

      {/* Leads List */}
      <h3 className="text-2xl font-semibold mb-4">Leads List</h3>
      <AnimatePresence>
        {leads.length === 0 && (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No leads found.
          </motion.p>
        )}
        {leads.map((lead) => (
          <motion.div
            key={lead._id}
            className="border bg-white p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p className="font-semibold text-lg">{lead.title}</p>
              <p className="text-sm text-gray-600">{lead.description}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    lead.status === "Converted"
                      ? "bg-green-100 text-green-700"
                      : lead.status === "Lost"
                      ? "bg-red-100 text-red-700"
                      : lead.status === "Contacted"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {lead.status}
                </span>
              </p>
              <p className="text-sm font-medium mt-1">Value: ₹{lead.value}</p>
            </div>
            <div className="space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(lead)}
                className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(lead._id)}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
