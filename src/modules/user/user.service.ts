import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const getAllUsers = async () => {
    const allUsersResult = await pool.query(`
        SELECT id, name, email, phone, role FROM users
        `);
    return allUsersResult;
}

// Update user

const updateUserInfo = async (id: string, payload: Record<string, unknown>) => {
    const { name: userName, email: userEmail, phone: userPhone, role: userRole } = payload;
    const updateInfoResult = await pool.query(`
        UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *
        `, [userName, userEmail, userPhone, userRole, id]);
    const { name, email, phone, role } = updateInfoResult.rows[0];
    const updateInfo = {
        name,
        email,
        phone,
        role
    }
    return updateInfo;
}

// Delete user
const deleteUser = async (id: string) => {
    const result =  await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result;
}



export const userServices = {
    getAllUsers,
    updateUserInfo,
    deleteUser
}