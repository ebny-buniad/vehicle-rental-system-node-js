import { Request, Response } from "express";
import { pool } from "../../config/db";
import dateCount from "../../helper/DateCount";

// Create bookings api
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
            vehicle_name: vehicle_name,
            daily_rent_price: daily_rent_price
        }
    }
}

// Get all bookings
const getAllBookings = async () => {
    const bookingsResult = await pool.query(`SELECT * FROM bookings`);
    const bookings = bookingsResult.rows;
    if (bookings.length === 0) return [];
    // lookup customer info 
    const customerIds = [...new Set(bookings.map((b) => b.customer_id))];
    const customersResult = await pool.query(
        `SELECT id, name, email FROM users WHERE id = ANY($1)`,
        [customerIds]
    );
    const customersMap: Record<number, { name: string; email: string }> = {};
    customersResult.rows.forEach((c) => {
        customersMap[c.id] = { name: c.name, email: c.email };
    });

    // lookup vehicle info
    const vehicleIds = [...new Set(bookings.map((b) => b.vehicle_id))];
    const vehicleResult = await pool.query(
        `SELECT id, vehicle_name, registration_number FROM vehicles WHERE id = ANY($1)`, [vehicleIds]
    );
    const vehiclesMap: Record<number, { vehicle_name: string, registration_number: string }> = {};

    vehicleResult.rows.forEach((v) => {
        vehiclesMap[v.id] = { vehicle_name: v.vehicle_name, registration_number: v.registration_number }
    });

    const finalData = bookings.map((b) => ({
        ...b,
        customer: customersMap[b.customer_id] || null,
        vehicle: vehiclesMap[b.vehicle_id] || null
    }));
    return finalData;
}

// Get customer all bookings
const getCustomerBookings = async (cid: string) => {
    const bookingsResult = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [cid]);
    const bookings = bookingsResult.rows;
    if (bookings.length === 0) return [];
    // lookup vehicle info
    const vehicleIds = [...new Set(bookings.map((b) => b.vehicle_id))];
    const vehicleResult = await pool.query(
        `SELECT id, vehicle_name, registration_number FROM vehicles WHERE id = ANY($1)`, [vehicleIds]
    );
    const vehiclesMap: Record<number, { vehicle_name: string, registration_number: string }> = {};

    vehicleResult.rows.forEach((v) => {
        vehiclesMap[v.id] = { vehicle_name: v.vehicle_name, registration_number: v.registration_number }
    });

    const finalData = bookings.map((b) => ({
        ...b,
        vehicle: vehiclesMap[b.vehicle_id] || null
    }));
    return finalData;
}

// Update bookings 
const updateBookings = async (id: string, payload: Record<string, unknown>) => {
    const { status } = payload;
    const bookingStatus = {
        status,
        statusUpdateDate: new Date()
    }
    const bookingInfo = await pool.query(`
        SELECT * FROM bookings WHERE id=$1
        `, [id]);
    const { rent_start_date } = bookingInfo.rows[0];
    if (bookingStatus.statusUpdateDate > new Date(rent_start_date)) {
        throw new Error("Cancel booking before start date only");
    }
    const updateStatus = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [bookingStatus.status, id]);
    return updateStatus;
}





export const bookingsServices = {
    createBookings,
    getAllBookings,
    getCustomerBookings,
    updateBookings
}

