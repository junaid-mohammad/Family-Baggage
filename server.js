// ------------------------------------------------------
// Server Entry Point
// ------------------------------------------------------
// This file initializes the Express server, loads environment 
// variables, sets up middleware, and mounts application routes. 
// It serves as the main entry point for the Node.js backend.
//
// Technologies Used:
// - Express.js for routing and middleware
// - dotenv for managing environment variables
// - body-parser for handling form submissions
// - EJS for rendering dynamic HTML
// ------------------------------------------------------

// ----------------------
// Imports & Config Setup
// ----------------------
import express from "express";                // Express framework
import bodyParser from "body-parser";         // Parses URL-encoded form data
import dotenv from "dotenv";                  // Loads .env config
import router from "./routes/index.js";       // Main application routes
import "./config/db.js";                      // Initializes database connection

dotenv.config();                              // Load environment variables from .env

// ----------------------
// Express App Setup
// ----------------------
const app = express();                        // Initialize Express app
const port = process.env.PORT || 3000;        // Use port from .env or default to 3000

// ----------------------
// Middleware
// ----------------------
app.use(bodyParser.urlencoded({ extended: true }));   // Parse form data from POST requests
app.use(express.static("public"));                    // Serve static files (CSS, images)
app.set("view engine", "ejs");                        // Set EJS as templating engine

// ----------------------
// Route Handling
// ----------------------
app.use("/", router);                         // Delegate route handling to router

// ----------------------
// Start the Server
// ----------------------
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
