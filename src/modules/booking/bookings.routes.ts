import express from "express"
import { bookingsController } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = express.Router();
router.post("/bookings", auth("admin", "customer"), bookingsController.createBookings);
router.get("/bookings", auth("admin"), bookingsController.getAllBookings);
router.get("/bookings/:cid", auth("customer"), bookingsController.getCustomerBookings);
router.put("/bookings/:bookingId", auth("customer"), bookingsController.cancelledBookings);
router.put("/bookings/:bookingId", auth("admin"), bookingsController.returnedBookings);

export const bookingsRoutes = router;