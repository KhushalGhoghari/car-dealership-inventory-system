import { Request, Response } from "express";
import * as vehicleService from "../services/vehicle.service";

export const create = async (req: Request, res: Response) => {
  try {
    console.log("BODY RECEIVED:");
    console.log(req.body);

    const vehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json(vehicle);
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const vehicles = await vehicleService.getVehicles();
  res.json(vehicles);
};

export const getOne = async (req: Request, res: Response) => {
  const vehicle = await vehicleService.getVehicleById(req.params.id);

  if (!vehicle)
    return res.status(404).json({
      message: "Vehicle not found",
    });

  res.json(vehicle);
};

export const update = async (req: Request, res: Response) => {
  const vehicle = await vehicleService.updateVehicle(
    req.params.id,
    req.body
  );

  res.json(vehicle);
};

export const remove = async (req: Request, res: Response) => {
  await vehicleService.deleteVehicle(req.params.id);

  res.json({
    message: "Vehicle deleted successfully",
  });
};