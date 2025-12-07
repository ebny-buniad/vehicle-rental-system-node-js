import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router();

router.get("/users", userControllers.getAllUsers);
router.put("/users/:userId", userControllers.updateUserInfo);
router.delete("/users/:userId", userControllers.deleteUser);

export const userRoutes = router;