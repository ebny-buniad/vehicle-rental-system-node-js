import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleServices } from "./vehicle.service";

// Create vechile
const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Get all vehicles
const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicle();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        })
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Get single vehicles
const getVehicle = async (req: Request, res: Response) => {
    try {
        const vehicleId = req.params.vehicleId;
        const result = await vehicleServices.getVehicle(vehicleId as string);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows
            })
        }
    }
    catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


export const vehicleControllers = {
    createVehicle,
    getAllVehicle,
    getVehicle
}