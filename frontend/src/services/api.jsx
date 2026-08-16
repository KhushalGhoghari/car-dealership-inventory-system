import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

// Demo fallback vehicles for showcase
export const DEMO_VEHICLES = [
  {
    id: "demo-1",
    make: "Porsche",
    model: "911 GT3 RS",
    category: "Sports",
    price: 241300,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
    description: "4.0-liter naturally aspirated flat-six engine generating 518 hp, aggressive aerodynamics with DRS, and lightweight carbon composite construction.",
  },
  {
    id: "demo-2",
    make: "BMW",
    model: "M5 Competition",
    category: "Sedan",
    price: 111100,
    quantity: 5,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
    description: "Twin-turbo V8 producing 617 hp, xDrive intelligent all-wheel drive system with 2WD mode capability, and executive luxury interior.",
  },
  {
    id: "demo-3",
    make: "Tesla",
    model: "Model S Plaid",
    category: "Electric",
    price: 89990,
    quantity: 8,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop",
    description: "Tri-motor all-wheel drive setup outputting 1,020 hp, 0-60 mph in 1.99 seconds, sub-10s quarter mile capability, and 396 miles estimated range.",
  },
  {
    id: "demo-4",
    make: "Mercedes-AMG",
    model: "G 63 Grand Edition",
    category: "SUV",
    price: 249000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1520050206232-41d3b0c51b92?q=80&w=1200&auto=format&fit=crop",
    description: "Handcrafted AMG 4.0L V8 Biturbo, signature gold graphics accenting obsidian black metallic finish, and ultra-exclusive Nappa leather cockpit.",
  },
  {
    id: "demo-5",
    make: "Audi",
    model: "RS e-tron GT",
    category: "Electric",
    price: 147100,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
    description: "Dual electric motors producing up to 637 hp with boost, 800V architecture for rapid DC fast charging, and futuristic aerodynamic lines.",
  },
  {
    id: "demo-6",
    make: "Lamborghini",
    model: "Urus Performante",
    category: "Luxury",
    price: 269885,
    quantity: 0,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop",
    description: "Super SUV powered by a 657 hp Twin-Turbo V8, titanium Akrapovič exhaust, lightweight carbon fiber hood, and Rally driving mode.",
  }
];

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------------- Authentication ----------------

export const registerUser = async (data) => {
  try {
    return await API.post("/auth/register", data);
  } catch (err) {
    // Fallback simulated success for offline preview if needed
    if (!err.response && data.email) {
      return { data: { message: "Simulated registration successful" } };
    }
    throw err;
  }
};

export const loginUser = async (data) => {
  try {
    return await API.post("/auth/login", data);
  } catch (err) {
    // Fallback simulated login token for offline preview/testing
    if (!err.response && data.email) {
      const mockToken = "mock_jwt_token_" + Date.now();
      return { data: { token: mockToken, user: { name: data.email.split('@')[0], email: data.email } } };
    }
    throw err;
  }
};

// ---------------- Vehicles ----------------

export const getVehicles = async () => {
  try {
    const res = await API.get("/vehicles");
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res;
    }
    // Return demo vehicles if API backend returns empty list
    return { data: DEMO_VEHICLES };
  } catch {
    // Return demo vehicles if API server is offline or unreachable
    return { data: DEMO_VEHICLES };
  }
};

export const getVehicle = async (id) => {
  try {
    return await API.get(`/vehicles/${id}`);
  } catch (err) {
    const demoMatch = DEMO_VEHICLES.find(v => v.id === id);
    if (demoMatch) return { data: demoMatch };
    throw err;
  }
};

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