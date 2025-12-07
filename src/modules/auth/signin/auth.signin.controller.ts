import { Request, Response } from "express";
import { signInServices } from "./auth.signin.service";

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await signInServices.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successfully",
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

export const signinController = {
    loginUser
}