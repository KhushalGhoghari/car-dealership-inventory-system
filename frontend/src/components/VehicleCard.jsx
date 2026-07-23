import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">

      <img
        src={
          vehicle.image && vehicle.image !== ""
            ? vehicle.image
            : "https://via.placeholder.com/400x220?text=Car"
        }
        alt={vehicle.make}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold mb-3">
          {vehicle.make} {vehicle.model}
        </h2>

        <p>
          <b>Category:</b> {vehicle.category}
        </p>

        <p>
          <b>Price:</b> ₹{vehicle.price}
        </p>

        <p>
          <b>Stock:</b> {vehicle.quantity}
        </p>

        <p className="mt-2 text-gray-600">
          {vehicle.description}
        </p>

        <div className="flex gap-3 mt-5">

          <Link
            to={`/vehicles/edit/${vehicle.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(vehicle.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}