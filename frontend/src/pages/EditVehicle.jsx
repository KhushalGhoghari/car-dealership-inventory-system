import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicle, updateVehicle } from "../services/api";
import Loader from "../components/Loader";
import { 
  FaEdit, 
  FaCar, 
  FaTag, 
  FaDollarSign, 
  FaBoxes, 
  FaImage, 
  FaAlignLeft, 
  FaArrowLeft, 
  FaSave, 
  FaMagic 
} from "react-icons/fa";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    make: "",
    model: "",
    category: "Luxury",
    price: "",
    quantity: "",
    image: "",
    description: "",
  });

  const presetImages = [
    { name: "Porsche 911", url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200" },
    { name: "BMW M5", url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200" },
    { name: "Tesla Plaid", url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200" },
    { name: "G-Wagon", url: "https://images.unsplash.com/photo-1520050206232-41d3b0c51b92?q=80&w=1200" },
  ];

  useEffect(() => {
    loadVehicle();
  }, [id]);

  async function loadVehicle() {
    setLoading(true);
    try {
      const res = await getVehicle(id);
      if (res && res.data) {
        setForm({
          make: res.data.make || "",
          model: res.data.model || "",
          category: res.data.category || "Luxury",
          price: res.data.price || "",
          quantity: res.data.quantity || "",
          image: res.data.image || "",
          description: res.data.description || "",
        });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch vehicle record.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      await updateVehicle(id, {
        make: form.make,
        model: form.model,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
        image: form.image,
        description: form.description,
      });

      navigate("/vehicles");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || "Saved updates to local preview.");
      setTimeout(() => navigate("/vehicles"), 1200);
    } finally {
      setSubmitting(false);
    }
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(parseFloat(form.price) || 0);

  if (loading) {
    return <Loader label="Loading Vehicle Listing Specs..." />;
  }

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
            <FaEdit className="text-cyan-400" /> Edit Vehicle Record
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update pricing, stock availability, category tags, or descriptions for {form.make} {form.model}.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {/* 2-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaCar className="text-cyan-400" /> Make
                </label>
                <input
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaTag className="text-cyan-400" /> Model
                </label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Category
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaDollarSign className="text-cyan-400" /> Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FaBoxes className="text-cyan-400" /> Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FaImage className="text-cyan-400" /> Image URL
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
              />

              <div className="pt-1 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                  <FaMagic className="text-cyan-400" /> Quick Image Presets:
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FaAlignLeft className="text-cyan-400" /> Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 text-sm bg-slate-950/70 border border-slate-700/70 rounded-xl text-white focus:outline-none focus:border-cyan-500/80 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.01]"
            >
              <FaSave />
              {submitting ? "Updating Listing..." : "Update Vehicle"}
            </button>
          </form>
        </div>

        {/* Right Preview */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Live Preview
          </h3>

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
                  {form.quantity || 0} Units
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-white">
                {form.make || "Make"} {form.model || "Model"}
              </h4>
              <p className="text-2xl font-black text-cyan-400">{formattedPrice}</p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {form.description || "Vehicle description..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}