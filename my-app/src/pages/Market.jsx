import { useState } from "react";

const players = [
  { id: 1, img: "/players/Mainoo_MF.png" },
  { id: 2, img: "/players/Maguire_DF.png" },
  { id: 3, img: "/players/Garnacho_FW.png" },
  { id: 4, img: "/players/Raya_GK.png" }
];

const Market = () => {
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleFilterClick = (position) => {
    setSelectedPosition(position);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-500 pt-12">
      {/* ข้อมูลตลาดนักเตะ */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">🛒 World Market</h1>
        <p>เลือกซื้อนักเตะที่คุณสนใจที่นี่!</p>
        <p>ถ้าต้องการกรองเชิญทางนี้</p>
      </div>

      {/* ปุ่มกรองตำแหน่งนักเตะ */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          className={`px-7 py-3 font-bold rounded ${
            selectedPosition === "" ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-300"
          }`}
          onClick={() => handleFilterClick("")}
        >
          All
        </button>
        {["FW", "MF", "DF", "GK"].map((pos) => (
          <button
            key={pos}
            className={`px-7 py-3 font-bold rounded ${
              selectedPosition === pos ? "bg-gray-700 text-white" : {
                FW: "bg-blue-500 hover:bg-red-700",
                MF: "bg-green-500 hover:bg-green-700",
                DF: "bg-yellow-500 hover:bg-blue-700",
                GK: "bg-red-500 hover:bg-yellow-700",
              }[pos]
            }`}
            onClick={() => handleFilterClick(pos)}
          >
            {pos}
          </button>
        ))}
      </div>

      {/* รูปภาพนักเตะที่ถูกกรอง */}
      <div className="mt-6 flex justify-center gap-4">
        {players
          .filter((player) =>
            !selectedPosition || player.img.includes(`_${selectedPosition}.png`)
          )
          .map((player) => (
            <img
              key={player.id}
              src={player.img}
              alt={player.img.split("/").pop().replace(".png", "")}
              className="w-48 h-auto rounded-lg cursor-pointer"
            />
          ))}
      </div>
    </div>
    
  );
};

export default Market;
