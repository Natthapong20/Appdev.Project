import { useState } from "react";
import "./UIMar.css";


const logo =[
  { logo: 1, img:"/clublogo/MANULOGO.png"}
];
const players = [
  { id: 1, img: "/players/Mainoo_MF.png", name: "Kobbie Mainoo", age: 18, club: "Manchester United", position: "MF", goals: 3, appearances: 25, logo: "/clublogo/MANULOGO.png" },
  { id: 2, img: "/players/Maguire_DF.png", name: "Harry Maguire", age: 30, club: "Manchester United", position: "DF", goals: 8, appearances: 250 },
  { id: 3, img: "/players/Garnacho_FW.png", name: "Alejandro Garnacho", age: 19, club: "Manchester United", position: "FW", goals: 15, appearances: 60 },
  { id: 4, img: "/players/Raya_GK.png", name: "David Raya", age: 28, club: "Arsenal", position: "GK", goals: 0, appearances: 150 },
  { id: 5, img: "/players/Bruno_MF.png", name: "Bruno Fernandes", age: 29, club: "Manchester United", position: "MF", goals: 75, appearances: 350 },
  { id: 6, img: "/players/Casemiro_MF.png", name: "Casemiro", age: 32, club: "Manchester United", position: "MF", goals: 40, appearances: 400 },
  { id: 7, img: "/players/James_DF.png", name: "Reece James", age: 24, club: "Chelsea", position: "DF", goals: 12, appearances: 180 },
  { id: 8, img: "/players/Macarron_MF.png", name: "Macarron", age: 26, club: "Palace", position: "MF", goals: 10, appearances: 120 },
  { id: 9, img: "/players/Marco_DF.png", name: "Marco", age: 28, club: "Chelsea", position: "DF", goals: 5, appearances: 160 },
  { id: 10, img: "/players/Martinez_DF.png", name: "Lisandro Martinez", age: 26, club: "Manchester United", position: "DF", goals: 7, appearances: 200 },
  { id: 11, img: "/players/Pogba_MF.png", name: "Paul Pogba", age: 30, club: "Manchester United", position: "MF", goals: 60, appearances: 320 }
];

const Market = () => {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleFilterClick = (position) => {
    setSelectedPosition(position);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-500 pt-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">🛒 World Market</h1>
        <p>เลือกซื้อนักเตะที่คุณสนใจที่นี่!</p>
      </div>

      {/* ปุ่มกรองตำแหน่ง */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          className={`px-7 py-3 font-bold rounded ${selectedPosition === "" ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-300"}`}
          onClick={() => handleFilterClick("")}
        >
          All
        </button>
        {["FW", "MF", "DF", "GK"].map((pos) => (
          <button
            key={pos}
            className={`px-7 py-3 font-bold rounded ${
              selectedPosition === pos
                ? "bg-gray-700 text-white"
                : {
                    FW: "bg-red-500 hover:bg-red-700 text-white",
                    MF: "bg-green-500 hover:bg-green-700 text-white",
                    DF: "bg-blue-500 hover:bg-blue-700 text-white",
                    GK: "bg-yellow-500 hover:bg-yellow-700 text-white",
                  }[pos]
            }`}
            onClick={() => handleFilterClick(pos)}
          >
            {pos}
          </button>
        ))}
      </div>

      {/* แสดงนักเตะที่เลือกตามการกรอง */}
      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {players
          .filter((player) => !selectedPosition || player.position === selectedPosition)
          .map((player) => (
            <img
              key={player.id}
              src={player.img}
              alt={player.name}
              className="w-48 h-auto rounded-lg cursor-pointer border-2 border-gray-400 hover:border-white transition-all"
              onClick={() => handlePlayerClick(player)}
            />
          ))}
      </div>

      {/* ป๊อปอัพแสดงข้อมูลนักเตะตรงนี้นะจ๊ะ*/}
      {selectedPlayer && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-" style={{ width: "1200px" }}>
            <div className="flex titems-center">
              <div className="w-full text-center mb-4">   <p><b>สโมสร:</b> {selectedPlayer.club}</p></div>
            </div>
            <h2 className="text-xl font-bold mb-4">{selectedPlayer.name}</h2>
            <img src={selectedPlayer.img} alt={selectedPlayer.name} className="w-40 mx-left rounded-lg mb-4" />
            <p><b>ตำแหน่ง:</b> {selectedPlayer.position}</p>
            <p><b>อายุ:</b> {selectedPlayer.age} ปี</p>
            <p>⚽ <b>ยิงประตู:</b> {selectedPlayer.goals} | 🎯 <b>ลงเล่น:</b> {selectedPlayer.appearances} นัด</p>
            <button 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg" 
              onClick={() => setSelectedPlayer(null)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
