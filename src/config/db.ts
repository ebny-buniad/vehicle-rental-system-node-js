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
}

export default initDB;