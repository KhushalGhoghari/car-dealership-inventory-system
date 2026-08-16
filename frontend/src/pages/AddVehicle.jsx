import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addVehicle } from "../services/api";
import { 
  FaPlusCircle, 
  FaCar, 
  FaTag, 
  FaDollarSign, 
  FaBoxes, 
  FaImage, 
  FaAlignLeft, 
  FaArrowLeft, 
  FaCheck, 
  FaMagic 
} from "react-icons/fa";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    make: "",
    model: "",
    category: "Luxury",
    price: "",
    quantity: "1",
    image: "",
    description: "",
  });

  const presetImages = [
    { name: "Porsche 911", url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200" },
    { name: "BMW M5", url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200" },
    { name: "Tesla Plaid", url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200" },
    { name: "G-Wagon", url: "https://images.unsplash.com/photo-1520050206232-41d3b0c51b92?q=80&w=1200" },
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const vehicleData = {
      make: form.make.trim(),
      model: form.model.trim(),
      category: form.category.trim(),
      price: parseFloat(form.price) || 0,
      quantity: parseInt(form.quantity) || 1,
      image: form.image.trim(),
      description: form.description.trim(),
    };

    try {
      await addVehicle(vehicleData);
      navigate("/vehicles");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Failed to add vehicle. Navigating to catalog...");
      setTimeout(() => navigate("/vehicles"), 1500);
    } finally {
      setSubmitting(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(parseFloat(form.price) || 0);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <button
            onClick={() => navigate("/vehicles")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
          >
            <FaArrowLeft /> Back to Inventory
          </button>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <FaPlusCircle className="text-cyan-400" /> Add New Vehicle
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Register a new automobile unit into the dealership inventory database.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Make */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaCar className="text-cyan-400" /> Vehicle Make *
                </label>
                <input
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  placeholder="e.g. Porsche"
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              {/* Model */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaTag className="text-cyan-400" /> Vehicle Model *
                </label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="e.g. 911 GT3"
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
                >
                  <option value="Sports" className="bg-slate-900">Sports</option>
                  <option value="Sedan" className="bg-slate-900">Sedan</option>
                  <option value="SUV" className="bg-slate-900">SUV</option>
                  <option value="Electric" className="bg-slate-900">Electric</option>
                  <option value="Luxury" className="bg-slate-900">Luxury</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaDollarSign className="text-cyan-400" /> MSRP Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 185000"
                  required
                  min="0"
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-all"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaBoxes className="text-cyan-400" /> Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="1"
                  required
                  min="0"
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-all"
                />
              </div>
            </div>

            {/* Image URL & Preset shortcuts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaImage className="text-cyan-400" /> Vehicle Image URL
                </label>
                <span className="text-[11px] text-slate-400">Direct image web link</span>
              </div>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-all"
              />

              {/* Presets */}
              <div className="pt-1 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <FaMagic className="text-cyan-400" /> Quick Image Preset Shortcuts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presetImages.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, image: preset.url }))}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700/60 transition-colors"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FaAlignLeft className="text-cyan-400" /> Description & Key Features
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe powertrain, trim package, horsepower, interior specifications..."
                className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <FaCheck />
              {submitting ? "Saving to Database..." : "Save Vehicle Listing"}
            </button>
          </form>
        </div>

        {/* Right Column: Realtime Card Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaCar className="text-cyan-400" /> Live Listing Preview
            </h3>
            <span className="text-xs font-semibold text-cyan-400">Realtime Card View</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={form.image || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200"}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200";
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-cyan-400 border border-slate-700/80">
                  {form.category || "Category"}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {form.quantity || 1} Units
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h4 className="text-xl font-extrabold text-white">
                  {form.make || "Vehicle Make"} {form.model || "Model"}
                </h4>
              </div>
              <p className="text-2xl font-black text-cyan-400">{formattedPrice}</p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {form.description || "Enter vehicle description above to preview live card listing."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}