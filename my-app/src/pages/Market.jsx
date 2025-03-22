import { useState, useEffect } from "react";
import "./UIMar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Market = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const userId = "67dd47961931771b6d6b1345"; //  userId mock สำหรับทดสอบ

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/create");
      setPlayers(response.data.players || []);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleFilterClick = (position) => {
    setSelectedPosition(position);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  //  ฟังก์ชันซื้อผู้เล่น พร้อม log error
  const handleBuy = async () => {
    console.log("📦 กำลังซื้อ:", selectedPlayer);
    console.log("🧑‍💻 User ID:", userId);

    try {
      await axios.post(`http://localhost:3001/team/buy/${userId}/${selectedPlayer._id}`);
      alert("✅ ซื้อสำเร็จ!");

      setPlayers(prev => prev.filter(p => p._id !== selectedPlayer._id));
      setSelectedPlayer(null);
    } catch (error) {
      console.error("❌ Error buying player:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "ซื้อไม่สำเร็จ!";
      alert(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-500 pt-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold">🛒 World Market</h1>
        <p>เลือกซื้อนักเตะที่คุณสนใจที่นี่!</p>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        onClick={() => navigate(-1)}
      >
        🔙 Back
      </button>

      <input
        type="text"
        placeholder="ค้นหาชื่อนักเตะ..."
        className="mt-4 p-2 border rounded w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
              {
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

      <div className="mt-6 flex justify-center gap-4 flex-wrap">
        {players
          .filter((player) =>
            (!selectedPosition || player.Position === selectedPosition) &&
            (player.PlayerName.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map((player) => (
            <img
              key={player._id}
              src={player.image_url}
              alt={player.PlayerName}
              className="w-48 h-auto rounded-lg cursor-pointer hover:border-white transition-all"
              onClick={() => handlePlayerClick(player)}
            />
          ))}
      </div>

      {selectedPlayer && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg" style={{ width: "1200px" }}>
            <div className="w-full text-center mb-4">
              <p><b>สโมสร:</b> {selectedPlayer.Nationality}</p>
            </div>
            <h2 className="text-xl font-bold mb-4">{selectedPlayer.PlayerName}</h2>
            <img src={selectedPlayer.image_url} alt={selectedPlayer.PlayerName} className="w-40 mx-left rounded-lg mb-4" />
            <p><b>ตำแหน่ง:</b> {selectedPlayer.Position}</p>
            <p><b>อายุ:</b> {selectedPlayer.Age} ปี</p>
            <p>⚽ <b>ยิงประตู:</b> {selectedPlayer.Goals} | 🎯 <b>แอสซิสต์:</b> {selectedPlayer.Assists}</p>
            <p>🧤 <b>คลีนชีท:</b> {selectedPlayer.Cleansheet} | 🎮 <b>ลงเล่น:</b> {selectedPlayer.Appearances} นัด</p>

            <button 
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg mr-2" 
              onClick={handleBuy}
            >
              ✅ ซื้อ
            </button>
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
