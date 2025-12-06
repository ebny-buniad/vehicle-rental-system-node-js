import express from "express"
import { bookingsController } from "./bookings.controller";

const router = express.Router();
router.post("/bookings", bookingsController.createBookings);

export const bookingsRoutes = router;