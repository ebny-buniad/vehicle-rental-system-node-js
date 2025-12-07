import cron from "node-cron";
import { pool } from "../config/db";

cron.schedule("5 0 * * *", async () => {
  try {

    const updateBookings = await pool.query(`
      UPDATE bookings
      SET status = 'returned'
      WHERE status = 'active'
        AND rent_end_date < CURRENT_DATE
      RETURNING id, vehicle_id;
    `);

    // If nothing to update
    if (updateBookings.rowCount === 0) {
      console.log("✔ No expired bookings. Job finished.");
      return;
    }

    const returnedBookings = updateBookings.rows;

    // 2) Make those vehicles available
    const vehicleIds = returnedBookings.map(b => b.vehicle_id);

    await pool.query(`
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id = ANY($1)
    `, [vehicleIds]);

    console.log(`✔ Auto-return completed for ${returnedBookings.length} bookings`);

  } catch (error) {
    console.error("❌ Auto-return job failed:", error);
  }
});
