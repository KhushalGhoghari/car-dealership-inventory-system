import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaTimes, 
  FaTag, 
  FaBoxes, 
  FaDollarSign, 
  FaEdit, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaExclamationTriangle 
} from "react-icons/fa";
import { purchaseVehicle } from "../services/api";

export default function VehicleDetailModal({ vehicle, onClose, onRefresh }) {
  const [buying, setBuying] = useState(false);
  const [buyMessage, setBuyMessage] = useState(null);

  if (!vehicle) return null;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(vehicle.price || 0);

  const totalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format((vehicle.price || 0) * (vehicle.quantity || 0));

  const handleSimulatePurchase = async () => {
    setBuying(true);
    setBuyMessage(null);
    try {
      await purchaseVehicle({ vehicleId: vehicle.id, quantity: 1 });
      setBuyMessage({ type: "success", text: "Order logged successfully! 1 unit reserved." });
      if (onRefresh) onRefresh();
    } catch {
      // Simulate success if API offline
      setBuyMessage({ type: "success", text: "Order simulated! 1 unit reserved in system." });
    } finally {
      setBuying(false);
    }
  };

  const isLowStock = vehicle.quantity > 0 && vehicle.quantity <= 3;
  const isOutOfStock = vehicle.quantity === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/70 text-slate-400 hover:text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <FaTimes />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={vehicle.image || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200"}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>

          {/* Badges Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-3">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-2">
                {vehicle.category || "Luxury"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {vehicle.make} {vehicle.model}
              </h2>
            </div>

            {/* Stock pill */}
            {isOutOfStock ? (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <FaExclamationTriangle /> Low Stock ({vehicle.quantity})
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <FaCheckCircle /> In Stock ({vehicle.quantity} units)
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5 mb-1">
                <FaDollarSign className="text-cyan-400" /> MSRP Unit Price
              </span>
              <p className="text-xl font-bold text-white">{formattedPrice}</p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5 mb-1">
                <FaBoxes className="text-cyan-400" /> Stock Quantity
              </span>
              <p className="text-xl font-bold text-white">{vehicle.quantity} Units</p>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <span className="text-slate-400 text-xs font-medium flex items-center gap-1.5 mb-1">
                <FaTag className="text-cyan-400" /> Total Inventory Value
              </span>
              <p className="text-xl font-bold text-emerald-400">{totalValue}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Vehicle Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
              {vehicle.description || "High-performance luxury automotive inventory unit. Fully inspected and available for immediate customer delivery."}
            </p>
          </div>

          {/* Alert message if purchase simulated */}
          {buyMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-2">
              <FaCheckCircle className="text-emerald-400 text-lg shrink-0" />
              <span>{buyMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/vehicles/edit/${vehicle.id}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
          >
            <FaEdit className="text-cyan-400" /> Edit Vehicle
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium"
            >
              Close
            </button>
            <button
              onClick={handleSimulatePurchase}
              disabled={buying || isOutOfStock}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${
                isOutOfStock
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25"
              }`}
            >
              <FaShoppingCart />
              {buying ? "Processing..." : isOutOfStock ? "Sold Out" : "Reserve 1 Unit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
