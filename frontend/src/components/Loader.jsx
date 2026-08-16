import { FaCar } from "react-icons/fa";

export default function Loader({ label = "Loading Inventory..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-64 p-6 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-blue-500 animate-spin"></div>
        <FaCar className="absolute text-cyan-400 text-lg animate-pulse" />
      </div>
      <p className="text-sm font-medium text-slate-400 tracking-wide animate-pulse">
        {label}
      </p>
    </div>
  );
}