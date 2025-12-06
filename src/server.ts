import express, { Request, Response } from "express"
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { signupRoutes } from "./modules/auth/signup/auth.signup.router";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { bookingsRoutes } from "./modules/booking/bookings.routes";
const app = express();
const port = 5000;

//body parser
app.use(express.json());

// Datebase
initDB();

app.use("/api/v1/auth", signupRoutes)
app.use('/api/v1', vehicleRoutes);
app.use('/api/v1', bookingsRoutes);

// app.use("/api/v1", userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
