import { connect } from "mongoose";
import config from "../config/index.js";


export async function mongoConnect() {
  try {
    await connect(config.db.url);
    console.log("MongoDB ulandi ✅");
  } catch (error) {
    console.log("Xatolik:", error);
  }
}


export default mongoConnect;
