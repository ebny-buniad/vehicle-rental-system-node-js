import express from "express"
import { vehicleControllers } from "./vehicle.controller";

const router = express.Router();

router.post("/vehicles", vehicleControllers.createVehicle);
router.get("/vehicles", vehicleControllers.getAllVehicle);
router.get("/vehicles/:vehicleId", vehicleControllers.getVehicle);
router.put("/vehicles/:vehicleId", vehicleControllers.updateVehicle);

export const vehicleRoutes = router;