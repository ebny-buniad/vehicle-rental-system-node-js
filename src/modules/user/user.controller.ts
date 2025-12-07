import { Request, Response } from "express";
import { userServices } from "./user.service";

// Gat all user
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers()
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: result.rows
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Update user info
const updateUserInfo = async (req: Request, res: Response) => {
    const id = req.params.userId;
    try {
        const result = await userServices.updateUserInfo(id as string, req.body)
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}





export const userControllers = {
    getAllUsers,
    updateUserInfo
}