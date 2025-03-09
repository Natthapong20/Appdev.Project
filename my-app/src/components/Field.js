import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";

const Field = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/players")
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error("Error fetching players:", err));
  }, []);

  return (
    <div className="bg-green-600 p-6 rounded-lg w-[500px] h-[700px] flex flex-col items-center relative">
      <h2 className="text-white text-xl font-bold mb-2">MYCLUB_MAIN</h2>
      <div className="grid grid-rows-5 grid-cols-3 gap-4 w-full h-full place-items-center">
        {players.map((player) => (
          <PlayerCard key={player._id} position={player.position} name={player.name} rating={player.rating} />
        ))}
      </div>
    </div>
  );
};

export default Field;
