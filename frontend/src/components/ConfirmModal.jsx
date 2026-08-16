import { FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Delete", loading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl">
          <FaExclamationTriangle />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title || "Confirm Action"}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            {message || "Are you sure you want to proceed? This action cannot be undone."}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 text-sm font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white text-sm font-bold shadow-lg shadow-rose-600/30 transition-all"
          >
            <FaTrashAlt className="text-xs" />
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
