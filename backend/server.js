import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js"; // PostgreSQL connection
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running with PostgreSQL...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

