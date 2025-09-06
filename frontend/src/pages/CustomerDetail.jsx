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
      const res = await axios.get(`http://localhost:5000/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomer(res.data);
    };
    fetchCustomer();
  }, [id, token]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">{customer.name}</h1>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Company: {customer.company}</p>

        <h2 className="text-xl mt-6 mb-2 font-semibold">Leads</h2>
        <ul>
          {customer.leads?.map((lead) => (
            <li key={lead._id} className="border p-2 mb-2 rounded">
              {lead.title} - {lead.status} (${lead.value})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDetail;
