import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (exists.rows.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );

    res.status(201).json({ message: "User registered", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userData.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = userData.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login success",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
