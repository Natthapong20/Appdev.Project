const express = require("express"); // นำเข้า Express เพื่อสร้าง Router
const router = express.Router(); // สร้าง Router สำหรับจัดการเส้นทาง API
const Team = require("../models/Team"); // นำเข้าโมเดล Team สำหรับเชื่อมต่อกับคอลเลกชัน Team ใน MongoDB
const Player = require("../models/Player"); // นำเข้าโมเดล Player สำหรับเชื่อมต่อกับคอลเลกชัน Player ใน MongoDB

// ✅ ซื้อผู้เล่นแล้วเพิ่มเข้า team
router.post("/buy/:userId/:playerId", async (req, res) => {
  const { userId, playerId } = req.params; // ดึง userId และ playerId จาก URL
  console.log("\n📥 [Buy] userId:", userId, "playerId:", playerId); // แสดง userId และ playerId ในคอนโซล

  try {
    const player = await Player.findById(playerId); // ค้นหาผู้เล่นในคอลเลกชัน Player โดยใช้ playerId
    if (!player) return res.status(404).json({ message: "Player not found" }); // หากไม่พบผู้เล่น ส่งสถานะ 404 พร้อมข้อความ "Player not found"

    let team = await Team.findOne({ userId }); // ค้นหาทีมของผู้ใช้ในคอลเลกชัน Team โดยใช้ userId
    if (!team) {
      console.log("🆕 Team not found → creating new team for user"); // หากไม่พบทีม แสดงข้อความในคอนโซล
      team = new Team({ userId, players: [], lineupPlayers: [], formation: "4-3-3" }); // สร้างทีมใหม่พร้อมค่าเริ่มต้น
    }

    const alreadyBought = team.players.some(p => p.playerId === playerId); // ตรวจสอบว่าผู้เล่นถูกซื้อไปแล้วหรือไม่
    if (alreadyBought) return res.status(400).json({ message: "Player already owned" }); // หากผู้เล่นถูกซื้อไปแล้ว ส่งสถานะ 400 พร้อมข้อความ "Player already owned"

    // เพิ่มข้อมูลผู้เล่นเข้าในทีม
    team.players.push({
      playerId: player._id.toString(), // ID ของผู้เล่น
      PlayerName: player.PlayerName, // ชื่อผู้เล่น
      Position: player.Position, // ตำแหน่งผู้เล่น
      Age: player.Age, // อายุผู้เล่น
      Goals: player.Goals, // จำนวนประตูที่ทำได้
      Assists: player.Assists, // จำนวนแอสซิสต์
      Cleansheet: player.Cleansheet, // จำนวนคลีนชีต
      Appearances: player.Appearances, // จำนวนครั้งที่ลงเล่น
      Nationality: player.Nationality, // สัญชาติของผู้เล่น
      image_url: player.image_url // URL รูปภาพของผู้เล่น
    });

    await team.save(); // บันทึกข้อมูลทีมที่อัปเดตแล้วลงในฐานข้อมูล
    res.json({ message: "Player bought and added to team", team }); // ส่งการตอบกลับพร้อมข้อความและข้อมูลทีม
  } catch (error) {
    console.error("❌ Server error in /buy:", error); // แสดงข้อผิดพลาดในคอนโซล
    res.status(500).json({ message: "Server error" }); // ส่งสถานะ 500 พร้อมข้อความ "Server error"
  }
});

// ✅ ดึงทีมของ user → ส่ง ownedPlayers + lineupPlayers + formation
router.get("/:userId", async (req, res) => {
  try {
    const team = await Team.findOne({ userId: req.params.userId }); // ค้นหาทีมของผู้ใช้ในคอลเลกชัน Team โดยใช้ userId
    if (!team) return res.status(404).json({ message: "Team not found" }); // หากไม่พบทีม ส่งสถานะ 404 พร้อมข้อความ "Team not found"

    // ส่งข้อมูลทีมกลับไปยังไคลเอนต์
    res.json({
      ownedPlayers: team.players || [], // รายชื่อผู้เล่นที่ผู้ใช้เป็นเจ้าของ
      lineupPlayers: team.lineupPlayers || [], // รายชื่อผู้เล่นตัวจริง
      formation: team.formation || "4-3-3" // แผนการเล่น (ค่าเริ่มต้นคือ "4-3-3")
    });
  } catch (error) {
    console.error("❌ Error fetching team:", error); // แสดงข้อผิดพลาดในคอนโซล
    res.status(500).json({ message: "Server error" }); // ส่งสถานะ 500 พร้อมข้อความ "Server error"
  }
});

// ✅ บันทึก formation + lineupPlayers
router.put("/:userId", async (req, res) => {
  const { userId } = req.params; // ดึง userId จาก URL
  const { formation, lineupPlayers } = req.body; // ดึง formation และ lineupPlayers จาก body ของคำขอ

  try {
    let team = await Team.findOne({ userId }); // ค้นหาทีมของผู้ใช้ในคอลเลกชัน Team โดยใช้ userId
    if (!team) {
      // หากไม่พบทีม สร้างทีมใหม่พร้อมข้อมูลที่ส่งมา
      team = new Team({ userId, formation, lineupPlayers, players: [] });
    } else {
      // หากพบทีม อัปเดตข้อมูล formation และ lineupPlayers
      team.formation = formation;
      team.lineupPlayers = lineupPlayers;
    }

    await team.save(); // บันทึกข้อมูลทีมที่อัปเดตแล้วลงในฐานข้อมูล
    res.json({ message: "✅ บันทึกทีมสำเร็จ!", team }); // ส่งการตอบกลับพร้อมข้อความและข้อมูลทีม
  } catch (error) {
    console.error("❌ Error saving team:", error); // แสดงข้อผิดพลาดในคอนโซล
    res.status(500).json({ error: "Server error" }); // ส่งสถานะ 500 พร้อมข้อความ "Server error"
  }
});

module.exports = router; // ส่งออก Router เพื่อให้สามารถนำไปใช้ในไฟล์อื่นได้
