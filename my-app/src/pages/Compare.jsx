import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PlayerCard({ player, onSelect }) {
  return (
    <img
      src={player.image_url}
      alt={player.PlayerName}
      className="w-48 h-auto rounded-lg cursor-pointer hover:border-white transition-all"
      onClick={() => onSelect(player._id)}
    />
  );
}

function CompareCard({ player }) {
  return (
    <div className="bg-[#3b1d78] p-4 rounded-2xl shadow-lg text-white w-80 text-center">
      <img
        src={player.image_url}
        alt={player.PlayerName}
        className="w-full h-auto object-cover rounded-lg mb-2"
      />
      <h2 className="text-xl font-bold truncate">{player.PlayerName}</h2>
      <p className="text-sm mb-1">{player.Position}</p>
      <div className="text-xs mb-2 text-left pl-4">
        <p><span className="font-semibold">อายุ:</span> {player.Age} ปี</p>
        <p><span className="font-semibold">ส่วนสูง:</span> {player.Height} ซม.</p>
        <p><span className="font-semibold">สัญชาติ:</span> {player.Nationality}</p>
        <p><span className="font-semibold">💰ค่าตัว:</span> {player.Price}</p>
        <p><span className="font-semibold">🎮ลงเล่น:</span> {player.Appearances} นัด</p>
        <p><span className="font-semibold">⚽ยิงประตู</span> {player.Goals}</p>
        <p><span className="font-semibold">🎯แอสซิสต์:</span> {player.Assists}</p>
        <p><span className="font-semibold">🧤คลีนชีท:</span> {player.Cleansheet}</p>
      </div>
    </div>
  );
}

export default function Compare() {
  const [players, setPlayers] = useState([]);
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/create");
        setPlayers(res.data.players || []);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };
    fetchPlayers();
  }, []);

  const handleSelect = (id) => {
    const player = players.find((p) => p._id === id);
    if (!selected1) setSelected1(player);
    else if (!selected2 && player._id !== selected1._id) setSelected2(player);
  };

  const resetSelection = () => {
    setSelected1(null);
    setSelected2(null);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#1a1452] text-white overflow-x-hidden">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-48 bg-[#140B20] flex flex-col items-center p-4 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">COMPARE</h2>
        <button className="w-36 py-2 mt-2 bg-gray-800 hover:bg-gray-700 text-white rounded" onClick={() => navigate("/myclub")}>📋 MYCLUB</button>
        <button className="w-36 py-2 mt-2 bg-gray-800 hover:bg-gray-700 text-white rounded" onClick={() => navigate("/marketplace")}>🛒 MARKET</button>
        <button className="w-36 py-2 mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded" onClick={() => navigate("/compare")}>🔗 COMPARE</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-6 ml-48 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Compare Players</h1>

        <input
          type="text"
          placeholder="ค้นหาชื่อนักเตะ..."
          className="mb-6 p-2 border rounded w-1/2 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {selected1 && selected2 ? (
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <CompareCard player={selected1} />
              <div className="text-2xl font-bold">VS</div>
              <CompareCard player={selected2} />
            </div>
            <button
              onClick={resetSelection}
              className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        ) : (
          <p className="mb-4">เลือกนักเตะ 2 คนเพื่อเปรียบเทียบ</p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {players
            .filter(player => player.PlayerName.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((p) => (
              <PlayerCard key={p._id} player={p} onSelect={handleSelect} />
            ))}
        </div>
      </div>
    </div>
  );
}
