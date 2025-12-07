import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokenBearer = req.headers.authorization;
            const token = tokenBearer?.split(" ")[1];
            if (!token) {
                return res.status(500).json({
                    message: "You are not allowed!!"
                })
            }
            const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;

            req.user = decoded ;

            if(roles.length && !roles.includes(decoded.role as string)){
                return res.status(500).json({
                    error: "unauthorized!!"
                })
            }

            next();
        }
        catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }


}

export default auth