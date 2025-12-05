import express from "express";
import { signupControllers } from "./auth.signup.controller";
const router = express.Router();

router.post("/signup", signupControllers.createUser)

export const signupRoutes = router;