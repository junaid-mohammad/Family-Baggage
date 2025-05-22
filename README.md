# Family Baggage 🧳

[![Deployed via GitHub Actions](https://img.shields.io/badge/Deployed%20via-GitHub%20Actions-blue?logo=github)](https://github.com/junaid-mohammad/Family-Baggage)
[![Azure App Service](https://img.shields.io/badge/Hosted%20on-Azure%20App%20Service-brightgreen)](https://family-baggage-bxc9g6hhe2gxfgbu.canadacentral-01.azurewebsites.net/)
[![Azure DevOps](https://img.shields.io/badge/Tracked%20in-Azure%20DevOps-blue)](https://dev.azure.com/Junaid-Arif/Family%20Baggage)

This repository contains the source code for **Family Baggage**, a full-stack web app designed to help families track and visualize the countries they've visited together. Built with travel lovers in mind, the app lets you add each family member, assign them a unique color, and highlight their journeys on an interactive world map.

Powered by **Node.js**, **Express**, and a live **PostgreSQL** database hosted on **Azure**, Family Baggage provides a clean and responsive experience with persistent cloud storage. Each update — from adding new members to coloring in countries — is instantly reflected on the map through dynamic EJS rendering and real-time data handling.

---

## 🗺️ Live Application

👉 **[Family Baggage App](https://family-baggage-bxc9g6hhe2gxfgbu.canadacentral-01.azurewebsites.net/)**  
👉 **[GitHub Repo](https://github.com/junaid-mohammad/Family-Baggage)**  
👉 **[Azure DevOps](https://dev.azure.com/Junaid-Arif/Family%20Baggage)**

---

## 🎯 Purpose

**Family Baggage** was built to:

- Strengthen my skills in developing **full-stack apps** using **PostgreSQL**, **Node.js**, **Express**, and **EJS**.
- Implement a live **PostgreSQL cloud database** through **Azure Flexible Server**.
- Explore **interactive visualizations** by dynamically coloring an SVG world map.
- Handle **user input**, form validation, and stateful updates for multiple users.
- Design a clean, mobile-first **UI/UX** that scales from desktops to phones.
- Structure a modular and maintainable codebase with **organized routes**, **views**, and **controllers**.
- Set up full **CI/CD pipelines** using **GitHub Actions** and host production builds via **Azure App Service**.
- Work seamlessly across **local and cloud environments** using `.env` and production-level config separation.

---

## 🛠️ Features

- **Family Member Profiles**: Add family members with unique colors to track individual travel histories.
- **SVG World Map Integration**: Each country visited is highlighted dynamically using user-specific colors.
- **Color Picker UI**: Choose from 12 custom colors using an accessible and intuitive selection interface.
- **Cloud-Backed Data**: All users and country data are stored persistently in an **Azure PostgreSQL** database.
- **Form Validation**: Duplicate or invalid countries are caught and flagged with real-time feedback.
- **Responsive Design**: Optimized layouts for mobile devices using **Flexbox** and **media queries**.
- **Clean Modal Navigation**: Quickly switch between users and view their personalized world map.
- **Modular Code Structure**: Organized by **controllers**, **routes**, **views**, and **public styles** for scalability.
- **Persistent State**: User country data is preserved across sessions and deployments.
- **Deployed to the Cloud**: Entire project is hosted on **Azure App Service**, with full deployment tracked in **Azure DevOps**.

---

## 💻 Technologies Used

- **Node.js** — JavaScript runtime
- **Express** — Web server framework
- **EJS** — Server-side templating engine
- **PostgreSQL** — Relational database for user + country tracking
- **pg** — PostgreSQL client for Node.js
- **Body-Parser** — Middleware for handling form submissions
- **HTML5 / CSS3** — Markup and responsive styling
- **Flexbox + Media Queries** — Responsive layout techniques
- **Azure App Service** — Cloud hosting platform
- **Azure PostgreSQL Flexible Server** — Managed database service
- **GitHub + GitHub Actions** — Source control and CI/CD
- **Azure DevOps** — Project tracking and deployment logs

---

## 🧠 What I Learned

- Structuring a **modular Express app** with views, routes, and controllers for maintainability.
- Building dynamic **server-rendered SVG maps** using color-coded input from users.
- Managing a **multi-user system** with individualized state stored in PostgreSQL.
- Writing intuitive, responsive **CSS** and handling layout changes across screen sizes.
- Debugging cross-environment **PostgreSQL connection issues** in cloud deployments.
- Using **Azure App Service** and **Flexible Server** to host and scale real-time Node.js applications.
- Leveraging **GitHub Actions** for smooth CI/CD and consistent cloud deployment.
- Implementing **.env-based environment config** to ensure local + cloud compatibility.

---

## 🚀 Deployment & Workflow

**Family Baggage** is deployed to the cloud using **Azure App Service**, with a fully managed **Azure PostgreSQL Flexible Server** backing the live data. The project follows a full-stack architecture using **Node.js**, **Express**, **EJS**, and **PostgreSQL**, and supports both local development and production environments.

Deployment is automated via **GitHub Actions**, while **Azure DevOps** is used as a secondary remote for backup and future pipeline integration. Environment configuration, secrets management, and database credentials are handled using `.env` files locally and **Azure App Settings** in production.

---

### ☁️ Hosting & Infrastructure

- **Azure App Service** hosts the Node.js + EJS application, serving static assets and dynamic routes.
- **Azure PostgreSQL Flexible Server** stores all visited country and user data across three tables.
- Public access is enabled with IP whitelisting during development, and SSL is enforced for production access.

---

### ⚙️ Local & Cloud Environments

Both environments use the same codebase and adapt via environment variables:

```js
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
```

The local `.env` file and cloud App Settings contain corresponding values for DB credentials and environment flags.

---

### 🔁 GitHub Actions & Continuous Deployment

Every push to the `main` branch triggers a **GitHub Actions** workflow that builds and deploys the app to Azure automatically. You can find an identical example in the [Capitalism](https://github.com/junaid-mohammad/Capitalism) repo’s GitHub Actions setup.

---

### 🧠 Database Migration & Seeding

Tables for `users`, `countries`, and `visited_countries` were exported using `pg_dump` from a local PostgreSQL instance and imported to Azure via `psql`. For a step-by-step breakdown (including SQL commands, common errors, and firewall tips), refer to the [deployment section in Capitalism](https://github.com/junaid-mohammad/Capitalism#-deployment--workflow).

---

### 📦 Azure DevOps Integration

This repository is also linked to **Azure DevOps** for source control and optional CI/CD:

```bash
git remote add azure https://Junaid-Arif@dev.azure.com/Junaid-Arif/Family%20Baggage/_git/Family%20Baggage
git push azure main
```

Currently used for redundancy, it can easily be extended for **Azure Pipelines** in the future.

---

## 🤝 Contribution

**Family Baggage** began as a creative full-stack project to visualize travel history and shared memories, but it’s absolutely open to collaboration. Whether you want to extend the features, enhance the UI, or add support for authentication and user sessions — feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open-source and available for anyone to learn from, build on, or improve. Use it for your own family, travel logs, or even a class project — just don't forget to give credit where it's due.

---

## 🔗 Credits

- Inspired by a love for geography, travel, and memory-keeping.
- Powered by **Node.js**, **Express**, **PostgreSQL**, and clean, responsive **EJS** templating.
- Designed and developed by [Junaid Arif](https://github.com/junaid-mohammad), with deployment powered by **Azure**.
