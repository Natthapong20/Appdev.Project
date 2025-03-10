import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";

const formations = {
  "4-3-3": [
    ["ST"],
    ["LW", "RW"],
    ["CM", "CM", "CM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
  "4-4-2": [
    ["ST", "ST"],
    ["LM", "CM", "CM", "RM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
  "4-3-2-1": [
    ["ST"],
    ["CF", "CF"],
    ["CM", "CM", "CM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
};

const Field = ({ formation }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/players")
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error("Error fetching players:", err));
  }, []);

  return (
    <div className="flex justify-center items-center flex-grow">
      {/* สนามฟุตบอล */}
      <div className="relative bg-green-600 w-[600px] h-[800px] p-6 rounded-lg flex flex-col items-center justify-evenly">
        {formations[formation].map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {row.map((position, index) => {
              const player = players.find((p) => p.position === position);
              return <PlayerCard key={index} position={position} player={player} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Field;

