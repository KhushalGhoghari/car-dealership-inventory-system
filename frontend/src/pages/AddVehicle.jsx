import { useState } from "react";
import { addVehicle } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddVehicle() {
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

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      make: form.make.trim(),
      model: form.model.trim(),
      category: form.category.trim(),
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      image: form.image.trim(),
      description: form.description.trim(),
    };

    console.log(vehicleData);

    try {
      await addVehicle(vehicleData);

      alert("Vehicle Added Successfully");

      navigate("/vehicles");
    } catch (err) {
      console.error(err.response?.data);
      alert(
        err.response?.data?.message ||
          "Failed to add vehicle."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">

      <h1 className="text-3xl font-bold mb-6">
        Add Vehicle
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="make"
          value={form.make}
          onChange={handleChange}
          placeholder="Make"
          className="border rounded p-3 w-full"
          required
        />

        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="border rounded p-3 w-full"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border rounded p-3 w-full"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border rounded p-3 w-full"
          required
        />

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border rounded p-3 w-full"
          required
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border rounded p-3 w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded p-3 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded w-full"
        >
          Save Vehicle
        </button>

      </form>
    </div>
  );
}