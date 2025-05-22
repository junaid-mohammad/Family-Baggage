// ------------------------------------------------------
// Controller: User & Country Utility Functions
// ------------------------------------------------------
// This file contains helper functions that interact with the database
// to retrieve user data and visited countries, and to render views 
// with error messages. These functions are used by the route handlers.
//
// Functions:
// - getUsers()          → Get all users from the database
// - checkVisited()      → Get all countries visited by a specific user
// - renderWithError()   → Re-render the homepage with an error message
// ------------------------------------------------------

import db from "../config/db.js"; // PostgreSQL client

// ----------------------
// Get all users
// ----------------------
// Returns an array of all user records from the 'users' table.
export async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

// ----------------------
// Get visited countries for a user
// ----------------------
// @param {Number} userId - The ID of the user
// @returns {Array} List of 2-letter country codes the user has visited
export async function checkVisited(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1;",
    [userId]
  );
  return result.rows.map(row => row.country_code);
}

// ----------------------
// Render home page with error message
// ----------------------
// Used when an error occurs (e.g., duplicate country, invalid name)
// and the app needs to re-render the home page with a message.
//
// @param {Object} res - Express response object
// @param {Number} currentUserId - Current user ID
// @param {String} errorMsg - Error message to display
export async function renderWithError(res, currentUserId, errorMsg) {
  const countries = await checkVisited(currentUserId);
  const users = await getUsers();
  const color = users.find(u => u.id == currentUserId)?.color || "white";

  res.render("index.ejs", {
    countries,
    total: countries.length,
    users,
    color,
    error: errorMsg,
  });
}
