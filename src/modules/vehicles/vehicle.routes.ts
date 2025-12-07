import express from "express"
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/vehicles", auth("admin"), vehicleControllers.createVehicle);
router.get("/vehicles", vehicleControllers.getAllVehicle);
router.get("/vehicles/:vehicleId", vehicleControllers.getVehicle);
router.put("/vehicles/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);
router.delete("/vehicles/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;