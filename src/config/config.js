import dotenv from "dotenv";
dotenv.config();

const config = {
  api: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.MONGO_CONNECTION,
  },
};

export default config;
