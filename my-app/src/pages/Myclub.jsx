import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ นำเข้ารูปจาก `src/assets/players/`
import footballField from "../assets/players/football-field.png";
import playerCard from "../assets/players/card.png";

const MyClub = () => {
  const navigate = useNavigate();
  
  // 🔹 จัดการแผนการเล่นและนักเตะ
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [players, setPlayers] = useState(Array(11).fill(null));

  // 🔹 ข้อมูลแผนการเล่น
  const formations = {
    "4-3-3": [["LW", "ST", "RW"], ["LCM", "CM", "RCM"], ["LB", "CB", "CB", "RB"], ["GK"]],
    "4-4-2": [["ST", "ST"], ["LM", "CM", "CM", "RM"], ["LB", "CB", "CB", "RB"], ["GK"]],
    "4-3-2-1": [["ST"], ["CAM", "CAM"], ["LCM", "CM", "RCM"], ["LB", "CB", "CB", "RB"], ["GK"]],
  };

  // 🔹 พิกัดตำแหน่งของผู้เล่นในสนาม
  const playerPositions = {
    "4-3-3": [{ top: "15%", left: "50%" }, { top: "25%", left: "30%" }, { top: "25%", left: "70%" },
               { top: "45%", left: "30%" }, { top: "45%", left: "50%" }, { top: "45%", left: "70%" },
               { top: "65%", left: "20%" }, { top: "65%", left: "40%" }, { top: "65%", left: "60%" },
               { top: "65%", left: "80%" }, { top: "85%", left: "50%" }],

    "4-4-2": [{ top: "20%", left: "40%" }, { top: "20%", left: "60%" },
               { top: "40%", left: "20%" }, { top: "40%", left: "40%" }, { top: "40%", left: "60%" }, { top: "40%", left: "80%" },
               { top: "60%", left: "20%" }, { top: "60%", left: "40%" }, { top: "60%", left: "60%" }, { top: "60%", left: "80%" },
               { top: "85%", left: "50%" }],

    "4-3-2-1": [{ top: "15%", left: "50%" },
               { top: "30%", left: "40%" }, { top: "30%", left: "60%" },
               { top: "50%", left: "30%" }, { top: "50%", left: "50%" }, { top: "50%", left: "70%" },
               { top: "70%", left: "20%" }, { top: "70%", left: "40%" }, { top: "70%", left: "60%" }, { top: "70%", left: "80%" },
               { top: "90%", left: "50%" }],
  };

  // 🔹 ฟังก์ชันเปลี่ยนชื่อนักเตะ
  const handlePlayerChange = async (index, position) => {
    const newPlayer = prompt(`Enter player name for ${position}:`);
    if (newPlayer) {
      const updatedPlayers = [...players];
      updatedPlayers[index] = { name: newPlayer, position };
      setPlayers(updatedPlayers);

      try {
        await axios.post("http://localhost:5000/players", {
          name: newPlayer,
          position,
          rating: Math.floor(Math.random() * 100),
        });
      } catch (error) {
        console.error("Error adding player:", error);
      }
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gray-900 text-white">
      
      {/* Sidebar ซ้าย */}
      <div className="fixed left-0 top-0 h-full w-48 bg-purple-900 flex flex-col items-center p-4 shadow-lg">
        <h2 className="text-xl font-bold">MYCLUB_MAIN</h2>
        <button className="w-36 py-2 mt-4 bg-yellow-500 text-black font-bold rounded" onClick={() => navigate("/myclub")}>
          📋 MYCLUB
        </button>
        <button className="w-36 py-2 mt-2 bg-gray-700 hover:bg-gray-600 rounded" onClick={() => navigate("/marketplace")}>
          🛒 MARKET
        </button>
        <button className="w-36 py-2 mt-2 bg-gray-700 hover:bg-gray-600 rounded" onClick={() => navigate("/compare")}>
          🔗 COMPARE
        </button>
      </div>

      {/* สนามฟุตบอล */}
      <div className="flex flex-1 justify-center items-center">
        <div className="relative w-[800px] h-[900px] bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: `url(${footballField})` }}>
          {playerPositions[selectedFormation]?.map((pos, index) => {
            const positionLabel = formations[selectedFormation].flat()[index] || "??";
            const player = players[index];

            return (
              <div 
                key={index} 
                className="absolute w-20 h-28 bg-cover bg-center flex items-center justify-center font-bold cursor-pointer rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${playerCard})`, top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
                onClick={() => handlePlayerChange(index, positionLabel)}
              >
                <span className="text-white">{player ? player.name : positionLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar ขวา */}
      <div className="fixed right-0 top-0 h-full w-48 bg-purple-900 flex flex-col items-center p-4 shadow-lg">
        <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-2xl">👤</div>
        <p className="mt-2">Username</p>

        {/* ตัวเลือกแผนการเล่น */}
        <div className="mt-4 p-4 bg-gray-800 rounded-lg text-center">
          <h3 className="text-lg font-bold">PLAN</h3>
          {Object.keys(formations).map((formation) => (
            <button
              key={formation}
              className={`w-28 py-2 mt-2 rounded text-black font-bold ${
                selectedFormation === formation ? "bg-yellow-500" : "bg-gray-400 hover:bg-yellow-400"
              }`}
              onClick={() => setSelectedFormation(formation)}
            >
              {formation}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MyClub;
