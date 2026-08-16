import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVehicles, deleteVehicle } from "../services/api";
import VehicleCard from "../components/VehicleCard";
import VehicleDetailModal from "../components/VehicleDetailModal";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import { 
  FaCar, 
  FaPlus, 
  FaSearch, 
  FaThLarge, 
  FaList, 
  FaSortAmountDown, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaTrashAlt 
} from "react-icons/fa";

export default function Vehicles({ search = "", setSearch }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    setLoading(true);
    try {
      const res = await getVehicles();
      setVehicles(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await deleteVehicle(deleteTargetId);
      setVehicles((prev) => prev.filter((v) => v.id !== deleteTargetId));
    } catch (err) {
      console.error(err);
      setVehicles((prev) => prev.filter((v) => v.id !== deleteTargetId));
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  };

  // Categories list
  const categories = ["All", "Sports", "Sedan", "SUV", "Electric", "Luxury"];

  // Filter logic
  let filtered = vehicles.filter((v) => {
    const matchesSearch = `${v.make} ${v.model} ${v.category} ${v.description || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      (v.category && v.category.toLowerCase() === categoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Sort logic
  if (sortBy === "price-asc") {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === "stock") {
    filtered.sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
  } else if (sortBy === "make") {
    filtered.sort((a, b) => (a.make || "").localeCompare(b.make || ""));
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FaCar className="text-cyan-400" /> Fleet Inventory Showcase
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore and manage dealership vehicle stock, luxury specs, and pricing details.
          </p>
        </div>

        <Link
          to="/vehicles/add"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] self-start md:self-auto"
        >
          <FaPlus /> Add New Vehicle
        </Link>
      </div>

      {/* Filter & Sorting Control Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1 shrink-0">
              <FaFilter className="text-cyan-400" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls: Search, Sort & View Mode */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-2 bg-slate-950/60 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <FaSortAmountDown className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs font-medium"
              >
                <option value="default" className="bg-slate-900 text-slate-200">Default Order</option>
                <option value="price-asc" className="bg-slate-900 text-slate-200">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-slate-200">Price: High to Low</option>
                <option value="stock" className="bg-slate-900 text-slate-200">Highest Stock</option>
                <option value="make" className="bg-slate-900 text-slate-200">Alphabetical (Make)</option>
              </select>
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center bg-slate-950/60 border border-slate-700/60 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "grid" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === "list" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <Loader label="Fetching Vehicle Catalog..." />
      ) : filtered.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12 border border-slate-800">
          <FaCar className="mx-auto text-5xl text-slate-600" />
          <h3 className="text-lg font-bold text-white">No Vehicles Found</h3>
          <p className="text-sm text-slate-400">
            No vehicle match category <span className="text-cyan-400 font-semibold">"{categoryFilter}"</span> and search query.
          </p>
          <button
            onClick={() => {
              setCategoryFilter("All");
              if (setSearch) setSearch("");
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={(id) => setDeleteTargetId(id)}
              onViewDetails={(v) => setSelectedVehicle(v)}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-800">
            {filtered.map((vehicle) => {
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(vehicle.price || 0);

              return (
                <div key={vehicle.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={vehicle.image || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=200"}
                      alt={vehicle.make}
                      className="w-20 h-14 rounded-2xl object-cover border border-slate-700/60 shrink-0"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=200";
                      }}
                    />
                    <div>
                      <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        {vehicle.category || "Luxury"}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{vehicle.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-white">{formattedPrice}</p>
                      <p className="text-xs text-slate-400">{vehicle.quantity} Units Available</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <FaEye /> Specs
                      </button>
                      <Link
                        to={`/vehicles/edit/${vehicle.id}`}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => setDeleteTargetId(vehicle.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <FaTrashAlt className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onRefresh={loadVehicles}
      />

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Vehicle Listing"
        message="Are you sure you want to permanently delete this vehicle from dealership stock?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />
    </div>
  );
}