import { Pool } from "pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || "5432"),
  database: process.env.PGDATABASE || "postgres",
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
});

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
  } else {
    console.log("PostgreSQL connected successfully at:", res.rows[0].now);
  }
});

export default pool;
