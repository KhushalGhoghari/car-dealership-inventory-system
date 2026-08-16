import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaSearch, 
  FaPlus, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaCar, 
  FaChartPie, 
  FaBell 
} from "react-icons/fa";

export default function Navbar({ search, setSearch }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Search Bar / Page Title */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
        >
          {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

        <div className="relative w-full">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search make, model, or category..."
            value={search || ""}
            onChange={(e) => setSearch && setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950/60 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, Date & User Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Date Display */}
        <div className="hidden lg:flex flex-col text-right">
          <span className="text-xs font-semibold text-slate-300">{formattedDate}</span>
          <span className="text-[11px] text-cyan-400 font-medium">Headquarters Hub</span>
        </div>

        {/* Quick Add Vehicle Button */}
        <Link
          to="/vehicles/add"
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs md:text-sm font-semibold px-3.5 md:px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <FaPlus className="text-xs" />
          <span className="hidden sm:inline">Add Vehicle</span>
        </Link>

        {/* Notifications Icon */}
        <button className="relative p-2.5 rounded-xl bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <FaBell className="text-sm" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bg-slate-900 border-b border-slate-800 p-4 space-y-3 z-50 shadow-2xl">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm ${
              location.pathname === "/" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300"
            }`}
          >
            <FaChartPie /> Dashboard
          </Link>
          <Link
            to="/vehicles"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm ${
              location.pathname === "/vehicles" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300"
            }`}
          >
            <FaCar /> Fleet Inventory
          </Link>
          <Link
            to="/vehicles/add"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm ${
              location.pathname === "/vehicles/add" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300"
            }`}
          >
            <FaPlus /> Add New Vehicle
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-500/20 text-rose-400 font-medium text-sm"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      )}
    </header>
  );
}