import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // load .env variables
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,       // from .env
  host: process.env.PG_HOST,       // from .env
  database: process.env.PG_DATABASE, // from .env
  password: process.env.PG_PASSWORD, // from .env
  port: process.env.PG_PORT,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected Successfully"))
  .catch(err => console.error("PostgreSQL Connection Error:", err));

export default pool;

