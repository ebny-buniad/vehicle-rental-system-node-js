import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const createBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingsServices.createBookings(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const bookingsController = {
    createBookings,
}