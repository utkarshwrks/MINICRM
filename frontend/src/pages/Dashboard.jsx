import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaMoneyBillWave, FaTasks } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="p-6">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-blue-700 mb-6"
        >
          Dashboard
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-4"
          >
            <FaUsers className="text-blue-500 text-3xl" />
            <div>
              <p className="text-gray-600">Users</p>
              <h2 className="text-xl font-bold">1,245</h2>
            </div>
          </motion.div>

          {/* Sales */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-4"
          >
            <FaChartLine className="text-green-500 text-3xl" />
            <div>
              <p className="text-gray-600">Sales</p>
              <h2 className="text-xl font-bold">567</h2>
            </div>
          </motion.div>

          {/* Revenue */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-4"
          >
            <FaMoneyBillWave className="text-yellow-500 text-3xl" />
            <div>
              <p className="text-gray-600">Revenue</p>
              <h2 className="text-xl font-bold">$12,340</h2>
            </div>
          </motion.div>

          {/* Tasks */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-lg flex items-center space-x-4"
          >
            <FaTasks className="text-purple-500 text-3xl" />
            <div>
              <p className="text-gray-600">Tasks</p>
              <h2 className="text-xl font-bold">42</h2>
            </div>
          </motion.div>
        </div>

        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Performance Overview
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
            📊 Chart will go here
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
