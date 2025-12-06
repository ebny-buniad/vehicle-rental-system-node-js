import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

// Create bookings
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

// Get all bookings
const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingsServices.getAllBookings();
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Get customers all bookings
const getCustomerBookings = async (req: Request, res: Response) => {
    const cid = req.params.cid;
    console.log(cid)
    try {
        const result = await bookingsServices.getCustomerBookings(cid as string);
        res.status(200).json({
            success: true,
            message: "Your bookings retrieved successfully",
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Update bookings 
const updateBookings = async (req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.body;
    try {
        const result = await bookingsServices.updateBookings(id as string, status);
        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}




export const bookingsController = {
    createBookings,
    getAllBookings,
    getCustomerBookings,
    updateBookings
}