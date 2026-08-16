import { Link } from "react-router-dom";
import { 
  FaEdit, 
  FaTrashAlt, 
  FaEye, 
  FaLayerGroup, 
  FaBoxes, 
  FaExclamationTriangle, 
  FaCheckCircle 
} from "react-icons/fa";

export default function VehicleCard({ vehicle, onDelete, onViewDetails }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(vehicle.price || 0);

  const isLowStock = vehicle.quantity > 0 && vehicle.quantity <= 3;
  const isOutOfStock = vehicle.quantity === 0;

  return (
    <div className="group bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between">
      <div>
        {/* Vehicle Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
          <img
            src={vehicle.image || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200"}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30"></div>

          {/* Category Tag */}
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/70 backdrop-blur-md text-cyan-400 border border-slate-700/80 shadow-md">
              {vehicle.category || "Luxury"}
            </span>
          </div>

          {/* Stock Tag */}
          <div className="absolute top-3.5 right-3.5">
            {isOutOfStock ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 backdrop-blur-md text-rose-400 border border-rose-500/30">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <FaExclamationTriangle /> {vehicle.quantity} Left
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <FaCheckCircle /> {vehicle.quantity} Units
              </span>
            )}
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-3.5">
            <span className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* Info Body */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {vehicle.description || "High performance vehicle available in prime inventory stock."}
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2 border-t border-slate-800/60 mt-auto">
        <button
          onClick={() => onViewDetails && onViewDetails(vehicle)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors border border-slate-700/50"
        >
          <FaEye className="text-cyan-400" /> Specs
        </button>

        <Link
          to={`/vehicles/edit/${vehicle.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-blue-600/20 hover:text-blue-400 text-slate-300 text-xs font-semibold transition-colors border border-slate-700/50"
        >
          <FaEdit /> Edit
        </Link>

        <button
          onClick={() => onDelete && onDelete(vehicle.id)}
          title="Delete Vehicle"
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors border border-slate-700/50"
        >
          <FaTrashAlt className="text-xs" />
        </button>
      </div>
    </div>
  );
}