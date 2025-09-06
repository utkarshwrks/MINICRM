import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get("http://localhost:5000/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data);
    };
    fetchCustomers();
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Customers</h1>
        <ul>
          {customers.map((cust) => (
            <li key={cust._id} className="border p-3 mb-2 rounded">
              <Link to={`/customers/${cust._id}`}>
                {cust.name} - {cust.email}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Customers;
