import { useEffect, useState } from "react";
import { getVehicles } from "../services/api";

export default function Dashboard() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const totalStock = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.quantity,
    0
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-blue-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg">Total Vehicles</h2>
          <p className="text-3xl font-bold">{vehicles.length}</p>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg">Total Stock</h2>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg">Available Vehicles</h2>
          <p className="text-3xl font-bold">
            {vehicles.filter(v => v.quantity > 0).length}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent Vehicles
        </h2>

        {vehicles.length === 0 ? (
          <p className="text-gray-500">
            No vehicles available.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Make</th>
                <th className="text-left p-2">Model</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Stock</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b">
                  <td className="p-2">{vehicle.make}</td>
                  <td className="p-2">{vehicle.model}</td>
                  <td className="p-2">₹ {vehicle.price}</td>
                  <td className="p-2">{vehicle.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}