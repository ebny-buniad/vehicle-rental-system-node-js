import { Pool } from "pg"
import config from ".";

export const pool = new Pool({
    connectionString: `${config.CONNECTION_STR}`
})

const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(50)
        )`);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(20) NOT NULL,
        registration_number VARCHAR(150) UNIQUE NOT NULL,
        daily_rent_price VARCHAR(100) NOT NULL,
        availability_status VARCHAR(100)
    )
    `)
}

export default initDB;