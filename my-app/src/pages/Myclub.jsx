import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import footballField from "../assets/players/football-field.png";
import playerCard from "../assets/players/card.png";

// 👉 Component สำหรับ modal เลือกนักเตะ
const PlayerSelectModal = ({ players, onSelect, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg text-black max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-4">เลือกนักเตะเข้าทีม</h2>
        <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
          {players.map((player, idx) => (
            <div key={idx} className="cursor-pointer text-center" onClick={() => onSelect(player)}>
              <img src={player.image_url} alt={player.PlayerName} className="w-32 h-auto mx-auto" />
              <p className="mt-1">{player.PlayerName}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onClose}>ปิด</button>
      </div>
    </div>
  );
};


const MyClub = () => {
  const navigate = useNavigate();
  const [selectedFormation, setSelectedFormation] = useState("4-3-3");
  const [players, setPlayers] = useState(Array(11).fill(null));
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [username, setUsername] = useState(""); // สถานะสำหรับเก็บชื่อผู้ใช้
  
  // ดึง userId จาก Local Storage
  const userId = localStorage.getItem("userId");
  const formations = {
    "4-3-3": [["LW", "ST", "RW"], ["LCM", "CM", "RCM"], ["LB", "CB", "CB", "RB"], ["GK"]],
    "4-4-2": [["ST", "ST"], ["LM", "CM", "CM", "RM"], ["LB", "CB", "CB", "RB"], ["GK"]],
    "4-3-2-1": [["ST"], ["CAM", "CAM"], ["LCM", "CM", "RCM"], ["LB", "CB", "CB", "RB"], ["GK"]],
  };

  const playerPositions = {
    "4-3-3": [
      { top: "22%", left: "20%" }, { top: "12%", left: "50.5%" }, { top: "22%", left: "80.5%" },
      { top: "43%", left: "30%" }, { top: "45%", left: "50.5%" }, { top: "43%", left: "70.5%" },
      { top: "66%", left: "20%" }, { top: "68%", left: "40%" }, { top: "68%", left: "60.5%" },
      { top: "66%", left: "80.5%" }, { top: "89%", left: "50.5%" }
    ],
    "4-4-2": [
      { top: "15%", left: "40.5%" }, { top: "15%", left: "60.5%" },
      { top: "36%", left: "20%" }, { top: "42%", left: "40.5%" }, { top: "42%", left: "60.5%" }, { top: "36%", left: "80%" },
      { top: "65%", left: "20%" }, { top: "68%", left: "40.5%" }, { top: "68%", left: "60.5%" }, { top: "65%", left: "80.5%" },
      { top: "89%", left: "50.5%" }
    ],
    "4-3-2-1": [
      { top: "11%", left: "50.5%" }, { top: "29%", left: "38.5%" }, { top: "29%", left: "62%" },
      { top: "48%", left: "28%" }, { top: "50%", left: "50.5%" }, { top: "48%", left: "73%" },
      { top: "67%", left: "18%" }, { top: "70%", left: "40%" }, { top: "70%", left: "60.5%" },
      { top: "67%", left: "83.5%" }, { top: "89%", left: "50.5%" }
    ]
  };

  useEffect(() => {
    fetchTeamData();
  }, [userId, navigate]);

  //ดึงข้อมูลนักเตะจาก API
  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/team/${userId}`);
      setTeamPlayers(response.data.ownedPlayers || []);
      setPlayers(response.data.lineupPlayers || Array(11).fill(null));
      setSelectedFormation(response.data.formation || "4-3-3");
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const saveLineup = async () => {
    try {
      await axios.put(`http://localhost:3001/team/${userId}`, {
        formation: selectedFormation,
        lineupPlayers: players
      });
      alert("✅ บันทึกทีมสำเร็จ!");
    } catch (error) {
      console.error("❌ Error saving lineup:", error);
      alert("❌ บันทึกไม่สำเร็จ");
    }
  };

  const handlePlayerChange = (index) => {
    setSelectedCardIndex(index);
  };

  const selectPlayerFromTeam = (player) => {
    const updatedPlayers = [...players];
    updatedPlayers[selectedCardIndex] = player;
    setPlayers(updatedPlayers);
    setSelectedCardIndex(null);
  };

  const removePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = null;
    setPlayers(updatedPlayers);
  };

  return (
    <div className="flex w-screen h-screen bg-[#1a1452] text-white">
      {/* Sidebar ซ้าย */}
      <div className="fixed left-0 top-0 h-full w-48 bg-[#140B20] flex flex-col items-center p-4 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">MYCLUB</h2>
        <button className="w-36 py-2 mt-2 bg-yellow-400 text-black font-bold rounded" onClick={() => navigate("/myclub")}>📋 MYCLUB</button>
        <button className="w-36 py-2 mt-2 bg-gray-800 hover:bg-gray-700 text-white rounded" onClick={() => navigate("/marketplace")}>🛒 MARKET</button>
        <button className="w-36 py-2 mt-2 bg-gray-800 hover:bg-gray-700 text-white rounded" onClick={() => navigate("/compare")}>🔗 COMPARE</button>
      </div>

      {/* สนามฟุตบอล */}
      <div className="flex flex-1 justify-center items-center">
        <div className="relative w-[700px] h-[925px] bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: `url(${footballField})` }}>
          {playerPositions[selectedFormation]?.map((pos, index) => {
            const player = players[index];
            return (
              <div 
                key={index} 
                className="absolute w-32 h-48 bg-cover bg-center cursor-pointer rounded-lg shadow-lg"
                style={{ 
                  top: pos.top, 
                  left: pos.left, 
                  transform: "translate(-50%, -50%)",
                  backgroundImage: `url(${player ? player.image_url : playerCard})`
                }}
                onClick={() => handlePlayerChange(index)}
              >
                {player && (
                  <button 
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-0 text-xs hover:bg-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlayer(index);
                    }}
                  >
                    ❌
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar ขวา */}
      <div className="fixed right-0 top-0 h-full w-48 bg-[#140B20] flex flex-col items-center p-4 shadow-lg">
        <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-2xl">👤</div>

        <div className="mt-4 p-4 bg-gray-800 rounded-lg text-center">
          <h3 className="text-lg font-bold text-white">PLAN</h3>
          {Object.keys(formations).map((formation) => (
            <button
              key={formation}
              className={`w-28 py-2 mt-2 rounded text-black font-bold ${selectedFormation === formation ? "bg-yellow-400" : "bg-gray-400 hover:bg-yellow-400"}`}
              onClick={() => setSelectedFormation(formation)}
            >
              {formation}
            </button>
          ))}
        </div>

        <button className="w-28 mt-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded" onClick={saveLineup}>💾 SAVE</button>
      </div>

      {/* Modal เลือกนักเตะ */}
      {selectedCardIndex !== null && (
        <PlayerSelectModal
          players={teamPlayers}
          onSelect={selectPlayerFromTeam}
          onClose={() => setSelectedCardIndex(null)}
        />
      )}
    </div>
  );
};

export default MyClub;
