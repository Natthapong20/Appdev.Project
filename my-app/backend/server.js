require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// สร้าง Schema ผู้เล่น
const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  rating: { type: Number, required: true }
});

const Player = mongoose.model("Player", PlayerSchema);

// API ดึงข้อมูลผู้เล่น
app.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch players" });
  }
});

// API เพิ่มผู้เล่น
app.post("/players", async (req, res) => {
  try {
    const { name, position, rating } = req.body;
    
    if (!name || !position || !rating) {
      return res.status(400).json({ error: "❌ Missing required fields" });
    }

    const newPlayer = new Player({ name, position, rating });
    await newPlayer.save();
    res.json({ message: "✅ Player added!", player: newPlayer });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to add player" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
