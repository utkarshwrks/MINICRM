import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ currentCustomerId }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname.startsWith(path) ? "text-yellow-300 font-semibold" : "";

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/dashboard">MiniCRM</Link>
      </div>

      <div className="flex gap-6">
        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>
        <Link to="/customers" className={isActive("/customers")}>
          Customers
        </Link>

        {/* Leads link only if currentCustomerId exists */}
        {currentCustomerId ? (
          <Link
            to={`/customers/${currentCustomerId}/leads`}
            className={isActive(`/customers/${currentCustomerId}/leads`)}
          >
            Leads
          </Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">Leads</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user && <span className="text-sm">Hi, {user.name}</span>}
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
