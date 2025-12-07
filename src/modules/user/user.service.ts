import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const getAllUsers = async () => {
    const allUsers = await pool.query(`
        SELECT * FROM users
        `)
    return allUsers;
}

export const userServices = {
    getAllUsers
}