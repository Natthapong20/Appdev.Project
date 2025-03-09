import React, { useState } from "react";
import axios from "axios";

const PlayerCard = ({ position, player }) => {
  const [playerName, setPlayerName] = useState(player ? player.name : "");

  const handleClick = async () => {
    const newPlayer = prompt(`Enter player name for ${position}:`);
    if (newPlayer) {
      setPlayerName(newPlayer);
      try {
        // บันทึกนักเตะลง Database
        await axios.post("http://localhost:5000/players", {
          name: newPlayer,
          position: position,
          rating: Math.floor(Math.random() * 100), // สุ่มค่า rating
        });
      } catch (error) {
        console.error("Error adding player:", error);
      }
    }
  };

  return (
    <div
      className="w-20 h-28 bg-purple-700 flex flex-col items-center justify-center rounded-lg shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-sm font-bold">{position}</span>
      <span className="text-xl">{playerName || "+"}</span>
    </div>
  );
};

export default PlayerCard;
