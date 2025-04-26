import express from "express";
import { config } from "dotenv";
import { connectionDB } from "./db/index.js";
import {
  AdminRouter,
  genrerouter,
  moviesrouter,
  userrouter,
  reviewrouter,
} from "./router/index.js";

config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await connectionDB();

app.use("/review", reviewrouter);
app.use("/admin", AdminRouter);
app.use("/user", userrouter);
app.use("/genre", genrerouter);
app.use("/movies", moviesrouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
