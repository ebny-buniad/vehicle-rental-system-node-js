import { Request, Response } from "express";
import { singupServices } from "./auth.signup.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await singupServices.createUser(req.body)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const signupControllers = {
    createUser
}