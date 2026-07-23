import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(form);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed");

    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
          onChange={handleChange}
        />

        <button
          className="bg-green-600 text-white w-full p-3 rounded"
        >
          Register
        </button>

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}
