import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gray-900 text-white w-60 min-h-screen p-5">

      <h2 className="text-xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="flex flex-col gap-5">

        <Link to="/">🏠 Home</Link>

        <Link to="/vehicles">
          🚗 Vehicles
        </Link>

        <Link to="/vehicles/add">
          ➕ Add Vehicle
        </Link>

      </div>

    </div>
  );
}