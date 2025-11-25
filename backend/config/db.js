import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",            // your DB username
  host: "localhost",
  database: "realtime",        // the database you created
  password: "<your_password>", // replace with your postgres password
  port: 5432,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch(err => console.error("PostgreSQL Connection Error:", err));
