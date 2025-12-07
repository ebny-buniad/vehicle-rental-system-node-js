import bcrypt from "bcryptjs";
import { pool } from "../../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
    const { name: userName, email: userEmail, password, phone: userPhone, role: userRole } = payload;
    const lowerCaseEmail = (userEmail as string).toLowerCase();
    if ((password as string).length !== 6) {
        throw new Error("Password must be at least 6 characters");
    }
    const hasedPass = await bcrypt.hash(password as string, 10);
    const createUserResult = await pool.query(
        `INSERT INTO users(name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userName, lowerCaseEmail, hasedPass, userPhone, userRole]
    );
    const { id, name, email, phone, role } = createUserResult.rows[0];
    const userInfo = {
        id,
        name,
        email,
        phone,
        role
    }

    return userInfo;       
}

export const singupServices = {
    createUser
}