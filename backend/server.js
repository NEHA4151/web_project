require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");

const app = express();

/* ===========================
   CORS CONFIGURATION
   =========================== */

app.use(
  cors({
    origin: [
      "https://web-project-one-rosy.vercel.app", // your Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Important for preflight requests
app.options("*", cors());

/* ===========================
   MIDDLEWARE
   =========================== */

app.use(express.json());

/* ===========================
   ROUTES
   =========================== */

app.use("/api/auth", authRoutes);

// Optional health check route (very useful)
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

/* ===========================
   DATABASE CONNECTION
   =========================== */

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to PostgreSQL successfully!");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Database models synchronized successfully!");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  });

/* ===========================
   START SERVER
   =========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
