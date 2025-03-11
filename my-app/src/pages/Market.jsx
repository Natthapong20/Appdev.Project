import { useState } from "react";

const players = [
  { id: 1, img: "/players/Mainoo_MF.png", name: "Kobbie Mainoo", age: 18, club: "Manchester United", position: "MF", goals: 3, appearances: 25 },
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
  const [purchasedPlayers, setPurchasedPlayers] = useState([]);

  const handleFilterClick = (position) => {
    setSelectedPosition(position);
  };

  const handlePlayerClick = (player) => {
    if (purchasedPlayers.some((p) => p.id === player.id)) {
      alert(`⚠️ คุณมี ${player.name} อยู่แล้ว!`);
      return;
    }

    const confirmPurchase = window.confirm(
      `คุณต้องการซื้อนักเตะ ${player.name} ใช่หรือไม่?\n⚽ ยิงประตู: ${player.goals} | 🎯 ลงเล่น: ${player.appearances} นัด`
    );

    if (confirmPurchase) {
      setPurchasedPlayers([...purchasedPlayers, player]);
      alert(`✅ คุณซื้อ ${player.name} เรียบร้อยแล้ว!`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-500 pt-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">🛒 World Market</h1>
        <p>เลือกซื้อนักเตะที่คุณสนใจที่นี่!</p>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button className={`px-7 py-3 font-bold rounded ${selectedPosition === "" ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-300"}`} onClick={() => handleFilterClick("")}>
          All
        </button>
        {["FW", "MF", "DF", "GK"].map((pos) => (
          <button
            key={pos}
            className={`px-7 py-3 font-bold rounded ${selectedPosition === pos ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-300"}`}
            onClick={() => handleFilterClick(pos)}
          >
            {pos}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {players.filter((player) => !selectedPosition || player.position === selectedPosition).map((player) => (
          <img
            key={player.id}
            src={player.img}
            alt={player.name}
            className="w-48 h-auto rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => handlePlayerClick(player)}
          />
        ))}
      </div>

      <div className="mt-8 w-3/4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">🛍️ นักเตะที่คุณซื้อแล้ว</h2>
        {purchasedPlayers.length === 0 ? (
          <p className="text-gray-500">คุณยังไม่ได้ซื้อนักเตะ</p>
        ) : (
          <ul className="list-disc pl-5">
            {purchasedPlayers.map((player) => (
              <li key={player.id}>
                {player.name} ({player.position}) - {player.club}
                <br />
                ⚽ ยิงประตู: {player.goals} | 🎯 ลงเล่น: {player.appearances} นัด
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Market;
