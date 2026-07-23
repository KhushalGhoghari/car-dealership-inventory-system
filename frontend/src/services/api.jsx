import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------------- Authentication ----------------

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ---------------- Vehicles ----------------

export const getVehicles = () =>
  API.get("/vehicles");

export const getVehicle = (id) =>
  API.get(`/vehicles/${id}`);

export const addVehicle = (data) =>
  API.post("/vehicles", data);

export const updateVehicle = (id, data) =>
  API.put(`/vehicles/${id}`, data);

export const deleteVehicle = (id) =>
  API.delete(`/vehicles/${id}`);

// ---------------- Purchase ----------------

export const purchaseVehicle = (data) =>
  API.post("/purchases", data);

export default API;