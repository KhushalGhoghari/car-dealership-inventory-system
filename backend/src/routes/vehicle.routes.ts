import { Router } from "express";
import * as vehicle from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", vehicle.getAll);
router.get("/:id", vehicle.getOne);

router.post("/", authenticate, vehicle.create);
router.put("/:id", authenticate, vehicle.update);
router.delete("/:id", authenticate, vehicle.remove);

export default router;