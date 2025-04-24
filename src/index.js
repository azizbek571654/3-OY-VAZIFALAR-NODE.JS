import express from "express";
import { config } from "dotenv";
import { connectionDB } from "./db/index.js";
import  userrouter  from "./router/user.routes.js";
import genrerouter from "./router/genre.routes.js";
import moviesrouter from "./router/movies.routes.js";
import Adminrouter from "./router/admin.routes.js";

config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await connectionDB();

app.use("/admin", Adminrouter);
app.use("/user", userrouter);
app.use("/genre", genrerouter);
app.use("/movies", moviesrouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
