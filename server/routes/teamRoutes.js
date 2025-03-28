const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const Player = require("../models/Player");

// ✅ ซื้อผู้เล่นแล้วเพิ่มเข้า team
//เป็นการกำหนดเส้นทาง API สำหรับการซื้อผู้เล่น
router.post("/buy/:userId/:playerId", async (req, res) => {
  const { userId, playerId } = req.params;
  console.log("\n📥 [Buy] userId:", userId, "playerId:", playerId);
// 
  try {
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });

    let team = await Team.findOne({ userId });
    if (!team) {
      console.log("🆕 Team not found → creating new team for user");
      team = new Team({ userId, players: [], lineupPlayers: [], formation: "4-3-3" });
    }

    const alreadyBought = team.players.some(p => p.playerId === playerId);
    if (alreadyBought) return res.status(400).json({ message: "Player already owned" });

    team.players.push({
      playerId: player._id.toString(),
      PlayerName: player.PlayerName,
      Position: player.Position,
      Age: player.Age,
      Goals: player.Goals,
      Assists: player.Assists,
      Cleansheet: player.Cleansheet,
      Appearances: player.Appearances,
      Nationality: player.Nationality,
      image_url: player.image_url
    });

    await team.save();
    res.json({ message: "Player bought and added to team", team });
  } catch (error) {
    console.error("❌ Server error in /buy:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ ดึงทีมของ user → ส่ง ownedPlayers + lineupPlayers + formation
router.get("/:userId", async (req, res) => {
  try {
    const team = await Team.findOne({ userId: req.params.userId });
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.json({
      ownedPlayers: team.players || [],
      lineupPlayers: team.lineupPlayers || [],
      formation: team.formation || "4-3-3"
    });
  } catch (error) {
    console.error("❌ Error fetching team:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ บันทึก formation + lineupPlayers
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { formation, lineupPlayers } = req.body;

  try {
    let team = await Team.findOne({ userId });
    if (!team) {
      team = new Team({ userId, formation, lineupPlayers, players: [] });
    } else {
      team.formation = formation;
      team.lineupPlayers = lineupPlayers;
    }

    await team.save();
    res.json({ message: "✅ บันทึกทีมสำเร็จ!", team });
  } catch (error) {
    console.error("❌ Error saving team:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
