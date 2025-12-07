import express from "express"
import { bookingsController } from "./bookings.controller";

const router = express.Router();
router.post("/bookings", bookingsController.createBookings);
router.get("/bookings", bookingsController.getAllBookings);
router.get("/bookings/:cid", bookingsController.getCustomerBookings);
router.put("/bookings/:bookingId", bookingsController.cancelledBookings);
router.put("/bookings/:bookingId", bookingsController.returnedBookings);

export const bookingsRoutes = router;