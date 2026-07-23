import { useEffect, useState } from "react";
import { getVehicles, deleteVehicle } from "../services/api";
import VehicleCard from "../components/VehicleCard";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await deleteVehicle(id);
      loadVehicles();
    } catch {
      alert("Delete failed");
    }
  }

  const filtered = vehicles.filter((v) =>
    `${v.make} ${v.model}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Vehicles
        </h1>

        <input
          placeholder="Search..."
          className="border p-2 rounded w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onDelete={handleDelete}
          />
        ))}

      </div>

    </div>
  );
}