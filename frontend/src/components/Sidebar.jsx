import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaCar, 
  FaChartPie, 
  FaPlusCircle, 
  FaSignOutAlt, 
  FaShieldAlt, 
  FaLayerGroup,
  FaSlidersH
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: FaChartPie },
    { label: "Fleet Inventory", path: "/vehicles", icon: FaCar },
    { label: "Add New Vehicle", path: "/vehicles/add", icon: FaPlusCircle },
  ];

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800/80 backdrop-blur-xl flex flex-col justify-between hidden md:flex shrink-0 min-h-screen sticky top-0 z-40">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <FaCar className="text-xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
              ApexMotors
            </h1>
            <p className="text-xs text-cyan-400 font-medium tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              DEALERSHIP SYSTEM
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-4 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Management
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent text-cyan-400 border-l-2 border-cyan-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`text-base ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Quick System Badge */}
        <div className="px-4 py-3 mx-4 my-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <FaShieldAlt className="text-emerald-400 text-xs" /> System Status
            </span>
            <span className="text-emerald-400 font-bold">Online</span>
          </div>
          <p className="text-[11px] text-slate-500">Live Inventory Sync Active</p>
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">Administrator</p>
              <p className="text-[11px] text-slate-400 truncate">admin@apexmotors.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
          >
            <FaSignOutAlt className="text-sm" />
          </button>
        </div>
      </div>
    </aside>
  );
}