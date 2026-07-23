import prisma from "../config/db";

export const createVehicle = async (data: any) => {
  return prisma.vehicle.create({
    data,
  });
};

export const getVehicles = async () => {
  return prisma.vehicle.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getVehicleById = async (id: string) => {
  return prisma.vehicle.findUnique({
    where: { id },
  });
};

export const updateVehicle = async (id: string, data: any) => {
  return prisma.vehicle.update({
    where: { id },
    data,
  });
};

export const deleteVehicle = async (id: string) => {
  return prisma.vehicle.delete({
    where: { id },
  });
};