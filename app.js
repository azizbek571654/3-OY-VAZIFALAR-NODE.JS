import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import { mongoConnect } from "./src/db/index.js"
import { routes } from "./src/index.js";


dotenv.config();

mongoConnect()
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/players", routes.playerRoutes);
app.use("/api/clubs", routes.clubRoutes);
app.use("/api/teams", routes.teamRoutes);
app.use("/api/tournaments", routes.tournamentRoutes);
app.use("/api/matches", routes.matchRoutes);
app.use("/api/groups", routes.tournamentGroupRoutes);



app.listen(port, () => {
  console.log(`Server http://localhost:${port} -portda ishga tushdi`);
});