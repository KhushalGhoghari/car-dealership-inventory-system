import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  getVehicles, 
  deleteVehicle 
} from "../services/api";
import Loader from "../components/Loader";
import VehicleDetailModal from "../components/VehicleDetailModal";
import ConfirmModal from "../components/ConfirmModal";
import { 
  FaCar, 
  FaBoxes, 
  FaDollarSign, 
  FaExclamationTriangle, 
  FaPlus, 
  FaArrowRight, 
  FaEye, 
  FaEdit, 
  FaTrashAlt, 
  FaChartLine, 
  FaCheckCircle, 
  FaLayerGroup 
} from "react-icons/fa";

export default function Dashboard({ search = "" }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.error("Failed loading vehicles:", err);
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
      // Remove locally if offline preview
      setVehicles((prev) => prev.filter((v) => v.id !== deleteTargetId));
    } finally {
      setDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const filteredVehicles = vehicles.filter((v) =>
    `${v.make} ${v.model} ${v.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalStock = vehicles.reduce((sum, v) => sum + Number(v.quantity || 0), 0);
  const totalValuation = vehicles.reduce((sum, v) => sum + (Number(v.price || 0) * Number(v.quantity || 0)), 0);
  const lowStockCount = vehicles.filter((v) => Number(v.quantity) > 0 && Number(v.quantity) <= 3).length;
  const outOfStockCount = vehicles.filter((v) => Number(v.quantity) === 0).length;

  const formattedValuation = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(totalValuation);

  // Group by category
  const categoriesMap = vehicles.reduce((acc, v) => {
    const cat = v.category || "Luxury";
    acc[cat] = (acc[cat] || 0) + Number(v.quantity || 0);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-blue-950/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Apex Dealership Operations
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Inventory Overview
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Track live inventory metrics, vehicle asset valuations, stock levels, and perform fleet operations from one centralized portal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/vehicles"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700/60 shadow-lg"
            >
              <FaCar className="text-cyan-400" /> View Fleet
            </Link>
            <Link
              to="/vehicles/add"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
            >
              <FaPlus /> Add Vehicle
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Analytical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Models */}
        <div className="glass-panel glass-panel-hover p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Models</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/20 flex items-center justify-center text-lg">
              <FaCar />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-white">{vehicles.length}</h3>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <FaChartLine /> Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Distinct vehicle listings</p>
        </div>

        {/* Total Fleet Units */}
        <div className="glass-panel glass-panel-hover p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stock Quantity</span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-lg">
              <FaBoxes />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-white">{totalStock}</h3>
            <span className="text-xs font-semibold text-cyan-400">Units in Lot</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Available for client sale</p>
        </div>

        {/* Inventory Asset Valuation */}
        <div className="glass-panel glass-panel-hover p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Asset Value</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-lg">
              <FaDollarSign />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{formattedValuation}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-2">Combined MSRP inventory worth</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="glass-panel glass-panel-hover p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stock Alerts</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/20 flex items-center justify-center text-lg">
              <FaExclamationTriangle />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-3xl font-extrabold text-white">{lowStockCount + outOfStockCount}</h3>
            <span className="text-xs font-semibold text-amber-400">
              {outOfStockCount > 0 ? `${outOfStockCount} Sold Out` : "Attention Req."}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">{lowStockCount} units at low stock threshold</p>
        </div>
      </div>

      {/* Category Breakdown & Fleet Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaLayerGroup className="text-cyan-400" /> Category Breakdown
            </h2>
            <span className="text-xs text-slate-400 font-medium">By Fleet Stock</span>
          </div>

          <div className="space-y-3 pt-2">
            {Object.keys(categoriesMap).length === 0 ? (
              <p className="text-xs text-slate-500">No categories found.</p>
            ) : (
              Object.entries(categoriesMap).map(([cat, count]) => {
                const percentage = totalStock > 0 ? Math.round((count / totalStock) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">{cat}</span>
                      <span className="text-cyan-400 font-bold">{count} units ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live Operations & Quick Tips */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400" /> Dealership Operations Digest
            </h2>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Live Status
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Automated Sync</span>
              <p className="text-sm font-semibold text-slate-200">Real-time JWT Authenticated REST API</p>
              <p className="text-xs text-slate-500">Connected to PostgreSQL database backend with Prisma ORM layer.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Fleet Filtering</span>
              <p className="text-sm font-semibold text-slate-200">Instant Live Search & Category Sorting</p>
              <p className="text-xs text-slate-500">Search makes, models, or categories dynamically from top header.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Inventory Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Recent Fleet Vehicles</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage individual vehicle listings, prices, stock levels, and specs.</p>
          </div>

          <Link
            to="/vehicles"
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto"
          >
            View Full Inventory <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {loading ? (
          <Loader label="Loading Fleet Inventory..." />
        ) : filteredVehicles.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <FaCar className="mx-auto text-4xl text-slate-600" />
            <p className="text-sm font-semibold text-slate-400">No vehicles match your search query.</p>
            <Link
              to="/vehicles/add"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline"
            >
              <FaPlus /> Add a new vehicle to inventory
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 px-3">Vehicle Details</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">MSRP Price</th>
                  <th className="pb-3 px-3">Quantity</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredVehicles.map((vehicle) => {
                  const unitPriceFormatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(vehicle.price || 0);

                  const isLow = vehicle.quantity > 0 && vehicle.quantity <= 3;
                  const isOut = vehicle.quantity === 0;

                  return (
                    <tr key={vehicle.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={vehicle.image || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=200"}
                            alt={vehicle.make}
                            className="w-12 h-9 rounded-xl object-cover border border-slate-700/60"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=200";
                            }}
                          />
                          <div>
                            <p className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                              {vehicle.make} {vehicle.model}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-1">{vehicle.description || "Luxury asset"}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-cyan-400 border border-slate-700/60">
                          {vehicle.category || "Luxury"}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-bold text-slate-200">
                        {unitPriceFormatted}
                      </td>

                      <td className="py-3.5 px-3">
                        {isOut ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {vehicle.quantity} Low Stock
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {vehicle.quantity} Available
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedVehicle(vehicle)}
                            title="Quick Specs View"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                          >
                            <FaEye className="text-xs" />
                          </button>

                          <Link
                            to={`/vehicles/edit/${vehicle.id}`}
                            title="Edit Vehicle"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors"
                          >
                            <FaEdit className="text-xs" />
                          </Link>

                          <button
                            onClick={() => setDeleteTargetId(vehicle.id)}
                            title="Delete Listing"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                          >
                            <FaTrashAlt className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onRefresh={loadVehicles}
      />

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Vehicle Listing"
        message="Are you sure you want to remove this vehicle from the dealership inventory? This action is permanent."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        loading={deleting}
      />
    </div>
  );
}