import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const getAllUsers = async () => {
    const allUsersResult = await pool.query(`
        SELECT id, name, email, phone, role FROM users
        `)

    
    return allUsersResult;
}

export const userServices = {
    getAllUsers
}