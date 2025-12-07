import cron from "node-cron";
import { pool } from "../config/db";

cron.schedule("5 0 * * *", async () => {
  console.log("Running Auto Return Cron Job...");

  try {
    const overdueBookings = await pool.query(`
      SELECT * FROM bookings
      WHERE status='active'
      AND rent_end_date < CURRENT_DATE
    `);

    if (overdueBookings.rows.length === 0) {
      console.log("No overdue bookings found.");
      return;
    }

    for (const booking of overdueBookings.rows) {
      const bookingId = booking.id;
      const vehicleId = booking.vehicle_id;

      await pool.query(
        `UPDATE bookings SET status='returned' WHERE id=$1`,
        [bookingId]
      );

      await pool.query(
        `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
        [vehicleId]
      );

      console.log(`Auto returned booking ${bookingId}`);
    }

  } catch (error) {
    console.error("Auto Return Cron Error:", error);
  }
});
