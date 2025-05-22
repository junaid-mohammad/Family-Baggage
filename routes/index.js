// ------------------------------------------------------
// Routes: Main Application Endpoints
// ------------------------------------------------------
// This file defines the core HTTP routes for the app.
// It handles user selection, country additions, and user creation.
// Each route communicates with the database through controller functions.
//
// Routes:
// - GET "/"         → Render home page with visited countries for the current user
// - POST "/add"     → Add a new country to the visited list for the current user
// - POST "/user"    → Switch users or go to new user form
// - POST "/new"     → Create a new user and redirect to homepage
// ------------------------------------------------------

// ----------------------
// Imports
// ----------------------
import express from "express";
import db from "../config/db.js";
import {
  getUsers,
  checkVisited,
  renderWithError,
} from "../controllers/userController.js";

// ----------------------
// Router Initialization
// ----------------------
const router = express.Router();
let currentUserId = 1; // For simplicity, using global state (should use sessions in production)

// ----------------------
// GET "/"
// Home page - show visited countries and user list
// ----------------------
router.get("/", async (req, res) => {
  const countries = await checkVisited(currentUserId);
  const users = await getUsers();
  const color = users.find(user => user.id == currentUserId)?.color || "white";

  res.render("index.ejs", {
    countries,
    total: countries.length,
    users,
    color,
  });
});

// ----------------------
// POST "/add"
// Add a country to the current user's visited list
// ----------------------
router.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    // Find matching country code from input
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) throw new Error("No matching country");

    const countryCode = result.rows[0].country_code;

    try {
      // Attempt to insert new visited country
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch {
      // Likely a duplicate entry due to unique constraint
      await renderWithError(res, currentUserId, "Country has already been added, try again.");
    }

  } catch {
    // No valid country name found
    await renderWithError(res, currentUserId, "Country name does not exist, try again.");
  }
});

// ----------------------
// POST "/user"
// Switch to existing user or show new user form
// ----------------------
router.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new-user.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

// ----------------------
// POST "/new"
// Create a new user and switch context to that user
// ----------------------
router.post("/new", async (req, res) => {
  const { name, color } = req.body;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  currentUserId = result.rows[0].id;
  res.redirect("/");
});

// ----------------------
// Export Router
// ----------------------
export default router;
