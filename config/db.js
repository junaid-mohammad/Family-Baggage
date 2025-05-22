// ------------------------------------------------------
// Database Configuration: PostgreSQL Client Setup
// ------------------------------------------------------
// This file initializes and exports a PostgreSQL client instance
// using environment variables stored in a .env file.
//
// - Uses the `pg` package for PostgreSQL interaction
// - Supports secure SSL connections in production environments
// - Shared across the app via a single exported client
// ------------------------------------------------------

// ----------------------
// Imports & Environment Setup
// ----------------------
import pg from "pg";               // PostgreSQL client
import dotenv from "dotenv";       // Load environment variables from .env
dotenv.config();                   // Initialize dotenv

// ----------------------
// PostgreSQL Client Configuration
// ----------------------
const db = new pg.Client({
  user: process.env.DB_USER,       // e.g., 'postgres'
  host: process.env.DB_HOST,       // e.g., 'localhost' or Azure host
  database: process.env.DB_NAME,   // e.g., 'world'
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,       // e.g., 5432
  // Enable SSL in production for secure connections, disable in local dev
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,                         // Disable SSL for local dev
});

// ----------------------
// Connect to the Database
// ----------------------
db.connect();                      // Opens connection to PostgreSQL

// ----------------------
// Export the Database Client
// ----------------------
export default db;                 // Can now be used in controllers/routes
