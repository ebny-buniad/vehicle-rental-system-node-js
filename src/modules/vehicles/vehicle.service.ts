import { pool } from "../../config/db"

// Create vechile
const createVehicle = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const [vehicle_name_uppercase, vehicle_regNum_uppercase] = [vehicle_name, registration_number]
        .map((vehicle) => (vehicle as string).toUpperCase());

    if (daily_rent_price as number < 0) {
        throw new Error("Price should grater than 0");
    }
    const result = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, 
                daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [vehicle_name_uppercase, type, vehicle_regNum_uppercase, daily_rent_price, availability_status]);
    return result;
}

// Get all vehicles
const getAllVehicle = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

// Get single vehicle
const getVehicle = async (vehicleId: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);
    return result;
}

export const vehicleServices = {
    createVehicle,
    getAllVehicle,
    getVehicle
}