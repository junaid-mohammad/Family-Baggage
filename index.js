import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
db.connect();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as templating engine
app.set("view engine", "ejs");

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  let users = [];
  result.rows.forEach((user) => {
    users.push(user);
  });
  console.log("users", users);
  return users;
}

// function to get the current user
let currentUserId = 1;

async function checkVisisted() {
  // currentUserId = await getCurrentUser();
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1;", [
    currentUserId,
  ]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getUsers();
  const color = users.find((user) => user.id == currentUserId).color;
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log("input", input);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      throw new Error("No matching country found");
    }

    const data = result.rows[0];
    console.log("data", data);
    const countryCode = data.country_code;
    console.log("countryCode", countryCode);
    console.log("currentUserId", currentUserId);
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      const users = await getUsers();
      const color = users.find((user) => user.id == currentUserId).color;
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: color,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    const users = await getUsers();
    const color = users.find((user) => user.id == currentUserId).color;
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: color,
      error: "Country name does not exist, try again.",
    });
  }
});
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    console.log("currentUserId", currentUserId);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  currentUserId = result.rows[0].id;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
