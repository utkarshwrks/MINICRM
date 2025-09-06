import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your CRM Dashboard! 🚀</p>
        {/* TODO: Add charts/stats here */}
      </div>
    </div>
  );
};

export default Dashboard;
