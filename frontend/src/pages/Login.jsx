import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
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
      const res = await loginUser(form);

      login(res.data.token);

      alert("Login Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          Login
        </button>

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}