import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(res.data);
      } catch (err) {
        console.error("Error fetching customer:", err);
      }
    };
    fetchCustomer();
  }, [id, token]);

  if (!customer)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading customer details...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        {/* Customer Info Card */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            {customer.name}
          </h1>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {customer.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> {customer.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Company:</span> {customer.company}
          </p>
        </div>

        {/* Leads Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leads</h2>
        {customer.leads && customer.leads.length > 0 ? (
          <div className="space-y-3">
            {customer.leads.map((lead) => (
              <div
                key={lead._id}
                className="bg-white border shadow-sm p-4 rounded-lg flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {lead.title}
                  </p>
                  <p className="text-sm text-gray-600">{lead.description}</p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        lead.status === "Converted"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "Lost"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    Value: ₹{lead.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No leads available.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;
