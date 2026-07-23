import { useEffect, useState } from "react";
import { getVehicle, updateVehicle } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    loadVehicle();
  }, []);

  async function loadVehicle() {
    try {
      const res = await getVehicle(id);

      setForm({
        make: res.data.make || "",
        model: res.data.model || "",
        category: res.data.category || "",
        price: res.data.price || "",
        quantity: res.data.quantity || "",
        image: res.data.image || "",
        description: res.data.description || "",
      });
    } catch (err) {
      alert("Failed to load vehicle.");
      console.log(err);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

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

      alert("Vehicle Updated Successfully");

      navigate("/vehicles");
    } catch (err) {
      console.log(err.response?.data);
      alert(
        err.response?.data?.message ||
        "Failed to update vehicle."
      );
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Vehicle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="make"
          value={form.make}
          onChange={handleChange}
          placeholder="Make"
          className="border p-3 rounded w-full"
        />

        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="border p-3 rounded w-full"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-3 rounded w-full"
        />

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-3 rounded w-full"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-3 rounded w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded w-full"
          rows="4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700"
        >
          Update Vehicle
        </button>

      </form>

    </div>
  );
}