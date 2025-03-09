require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// สร้าง Schema สำหรับเก็บข้อมูลนักเตะ
const PlayerSchema = new mongoose.Schema({
  name: String,
  position: String,
  rating: Number,
});

const Player = mongoose.model("Player", PlayerSchema);

// ✅ API ดึงข้อมูลนักเตะทั้งหมด
app.get("/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// ✅ API เพิ่มนักเตะใหม่
app.post("/players", async (req, res) => {
  const newPlayer = new Player(req.body);
  await newPlayer.save();
  res.json({ message: "✅ Player added!" });
});

// ✅ API ลบนักเตะ
app.delete("/players/:id", async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: "✅ Player deleted!" });
});

// ✅ API แก้ไขข้อมูลนักเตะ
app.put("/players/:id", async (req, res) => {
  await Player.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "✅ Player updated!" });
});

// เปิดเซิร์ฟเวอร์
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
