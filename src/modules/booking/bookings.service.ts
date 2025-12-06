import { Request, Response } from "express";
import { pool } from "../../config/db";
import dateCount from "../../helper/DateCount";
const createBookings = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleInfo = await pool.query(`SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`, [vehicle_id]);
    const { vehicle_name, daily_rent_price, availability_status } = vehicleInfo.rows[0];

    // Check vehicle available or not
    if (availability_status !== "available") {
        throw new Error("This vehicle is not available!");
    }

    // Check end date grater than start date 
    if ((rent_start_date as string) > (rent_end_date as string)) {
        throw new Error("The rent end date must come after the start date");
    }

    // Calculet date func
    const number_of_days = dateCount(rent_end_date as string, rent_start_date as string);

    // Booking Price Calculation 
    const total_price = daily_rent_price * number_of_days;


    const result = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"]
    );

    const bookings = result.rows[0];

    // Update vehicle availability status
    const updateVehicleStatus = await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING *`, 
        ["booked", vehicle_id]
    )

    return {
        ...bookings,
        vehicle: {
            vehicle_name : vehicle_name,
            daily_rent_price : daily_rent_price
        }
    }
}

export const bookingsServices = {
    createBookings,
}