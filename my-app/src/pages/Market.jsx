// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./MyClub.css"; // นำเข้าไฟล์ CSS สำหรับสไตล์

// const players = [
//   { id: 1, img: "/players/Mainoo_MF.png" },
//   { id: 2, img: "/players/Maguire_DF.png" },
//   { id: 3, img: "/players/Garnacho_FW.png" },
//   { id: 4, img: "/players/Raya_GK.png" }
// ];

// const Market = () => {
//   const [selectedPosition, setSelectedPosition] = useState("");

//   const handleFilterClick = (position) => {
//     setSelectedPosition(position);
//   };

//   return (
    
//     <div className="flex flex-col items-center min-h-screen bg-purple-500 pt-12">
//       {/* ข้อมูลตลาดนักเตะ */}
//       <div className="text-center">
//         <h1 className="text-2xl font-bold">🛒 World Market</h1>
//         <p>เลือกซื้อนักเตะที่คุณสนใจที่นี่!</p>
//         <p>ถ้าต้องการกรองเชิญทางนี้</p>
//       </div>

//       {/* ปุ่มกรองตำแหน่งนักเตะ */}
//       <div className="mt-4 flex justify-center gap-4">
//         <button
//           className={`px-7 py-3 font-bold rounded ${
//             selectedPosition === "" ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-300"
//           }`}
//           onClick={() => handleFilterClick("")}
//         >
//           All
//         </button>
//         {["FW", "MF", "DF", "GK"].map((pos) => (
//           <button
//             key={pos}
//             className={`px-7 py-3 font-bold rounded ${
//               selectedPosition === pos ? "bg-gray-700 text-white" : {
//                 FW: "bg-blue-500 hover:bg-red-700",
//                 MF: "bg-green-500 hover:bg-green-700",
//                 DF: "bg-yellow-500 hover:bg-blue-700",
//                 GK: "bg-red-500 hover:bg-yellow-700",
//               }[pos]
//             }`}
//             onClick={() => handleFilterClick(pos)}
//           >
//             {pos}
//           </button>
//         ))}
//       </div>

//       {/* รูปภาพนักเตะที่ถูกกรอง */}
//       <div className="mt-6 flex justify-center gap-4">
//         {players
//           .filter((player) =>
//             !selectedPosition || player.img.includes(`_${selectedPosition}.png`)
//           )
//           .map((player) => (
//             <img
//               key={player.id}
//               src={player.img}
//               alt={player.img.split("/").pop().replace(".png", "")}
//               className="w-48 h-auto rounded-lg cursor-pointer"
//             />
//           ))}
          
//       </div>
//       <div className="myclub-container">
//       <div className="sidebar">
//                 <Link to="/myclub" className="menu-item active">📋 MYCLUB</Link>
//                 <Link to="/marketplace" className="menu-item">🛒 MARKET</Link>
//                 <Link to="/compare" className="menu-item">🔗 COMPARE</Link>
//                 </div>
//             </div>
//     </div>
    
//   );
// };

// export default Market;
import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyClub.css"; // นำเข้าไฟล์ CSS

const players = [
<<<<<<< HEAD
  { id: 1, img: "/players/Mainoo_MF.png" },
  { id: 2, img: "/players/Maguire_DF.png" },
  { id: 3, img: "/players/Garnacho_FW.png" },
  { id: 4, img: "/players/Raya_GK.png" }
 
=======
  { id: 1, img: "/players/Mainoo_MF.png", name: "Kobbie Mainoo", age: 18, club: "Manchester United", position: "MF" },
  { id: 2, img: "/players/Maguire_DF.png", name: "Harry Maguire", age: 30, club: "Manchester United", position: "DF" },
  { id: 3, img: "/players/Garnacho_FW.png", name: "Alejandro Garnacho", age: 19, club: "Manchester United", position: "FW" },
  { id: 4, img: "/players/Raya_GK.png", name: "David Raya", age: 28, club: "Arsenal", position: "GK" }
>>>>>>> 93e2d674b47232cbe31b2da2436d54b882530172
];

const Market = () => {
  const [selectedPosition, setSelectedPosition] = useState("");

<<<<<<< HEAD
=======
  const handleFilterClick = (position) => {
    setSelectedPosition(position);
  };

  const handlePlayerClick = (player) => {
    alert(`คุณเลือก ${player.name}\nอายุ: ${player.age}\nสโมสร: ${player.club}\nตำแหน่ง: ${player.position}`);
  };

>>>>>>> 93e2d674b47232cbe31b2da2436d54b882530172
  return (
    <div className="flex min-h-screen">
      {/* ✅ Sidebar อยู่ฝั่งซ้ายและคงที่ */}
      <div className="w-48 bg-gray-900 text-white fixed left-0 top-0 h-full flex flex-col p-4">
        <Link to="/myclub" className="menu-item active">📋 MYCLUB</Link>
        <Link to="/market" className="menu-item">🛒 MARKET</Link>
        <Link to="/compare" className="menu-item">🔗 COMPARE</Link>
      </div>

      {/* ✅ Market Content อยู่ตรงกลาง (เว้นที่ให้ Sidebar) */}
      <div className="flex-1 ml-52 p-6 bg-purple-500">
        <h1 className="text-2xl font-bold text-center">🛒 World Market</h1>
        <p className="text-center">เลือกซื้อนักเตะที่คุณสนใจที่นี่!</p>

<<<<<<< HEAD
        {/* ปุ่มกรองตำแหน่งนักเตะ */}
        <div className="mt-4 flex justify-center gap-4">
          {["All", "FW", "MF", "DF", "GK"].map((pos) => (
            <button
              key={pos}
              className={`px-7 py-3 font-bold rounded ${
                selectedPosition === pos || (pos === "All" && selectedPosition === "")
                  ? "bg-gray-700 text-white"
                  : pos === "FW"
                  ? "bg-blue-500 hover:bg-blue-700"
                  : pos === "MF"
                  ? "bg-green-500 hover:bg-green-700"
                  : pos === "DF"
                  ? "bg-yellow-500 hover:bg-yellow-700"
                  : "bg-red-500 hover:bg-red-700"
              }`}
              onClick={() => setSelectedPosition(pos === "All" ? "" : pos)}
            >
              {pos}
            </button>
=======
      {/* รูปภาพนักเตะที่ถูกกรอง */}
      <div className="mt-6 flex justify-center gap-4">
        {players
          .filter((player) =>
            !selectedPosition || player.position === selectedPosition
          )
          .map((player) => (
            <img
              key={player.id}
              src={player.img}
              alt={player.name}
              className="w-48 h-auto rounded-lg cursor-pointer"
              onClick={() => handlePlayerClick(player)}
            />
>>>>>>> 93e2d674b47232cbe31b2da2436d54b882530172
          ))}
        </div>

        {/* แสดงนักเตะที่ถูกกรอง */}
        <div className="mt-6 flex justify-center gap-4">
          {players
            .filter((player) => !selectedPosition || player.position === selectedPosition)
            .map((player) => (
              <img
                key={player.id}
                src={player.img}
                alt={player.position}
                className="w-48 h-auto rounded-lg cursor-pointer"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
