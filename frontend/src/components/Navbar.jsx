import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold">
          🚗 Car Dealership
        </h1>

        <div className="flex gap-6 items-center">

          <Link to="/">Dashboard</Link>

          <Link to="/vehicles">Vehicles</Link>

          <Link to="/vehicles/add">Add Vehicle</Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}