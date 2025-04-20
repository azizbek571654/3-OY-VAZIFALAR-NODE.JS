import dotenv from "dotenv";
import { config } from "./config/config.js";
import app from "./app.js";
import { connectionDB } from "./db/db.js";
dotenv.config();

const PORT = config.port || 7070;

const start = () => {
    try {
        connectionDB()
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}...`);
        })
    } catch (error) {
        console.log("Something went wrong", error);
        process.exit(1);
    }
}

start();


