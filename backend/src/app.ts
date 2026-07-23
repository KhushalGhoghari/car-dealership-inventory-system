import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import vehicleRoutes from "./routes/vehicle.routes";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    project: "Incubyte Car Dealership",
    status: "WORKING",
    time: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

export default app;