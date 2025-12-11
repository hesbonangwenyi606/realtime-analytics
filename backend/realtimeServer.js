import { WebSocketServer } from "ws";
import { pool } from "./config/db.js"; 

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

// Send latest users count every 2 seconds
setInterval(async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM users");
    const data = { usersCount: parseInt(result.rows[0].count) };

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } catch (err) {
    console.error("Error sending data via WebSocket:", err);
  }
}, 2000);

