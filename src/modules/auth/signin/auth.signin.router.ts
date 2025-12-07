import express from "express"
import { signinController } from "./auth.signin.controller";

const router = express.Router();

router.post("/signin", signinController.loginUser)


export const signinRoutes = router;