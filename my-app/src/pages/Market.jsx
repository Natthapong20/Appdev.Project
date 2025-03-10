import { useState } from "react";

const Market = () => {
  const [message, setMessage] = useState("");

  const handleImageClick = () => {
    setMessage("Hello");
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen p-6 text-white">
      <div className="text-center mt-12">
        <h1 className="text-2xl font-bold">🛒 World Market</h1>
        <p>เลือกซื้อนักเตะที่คุณสนใจของคุณที่นี่!</p>
        <p>ถ้าต้องการกรองเชิญทางนี้</p>

        {/* ปุ่มกรองตำแหน่งนักเตะ */}
        <div className="mt-4 flex justify-center gap-4">
          <button className="px-7 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">FW</button>
          <button className="px-7 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded">MF</button>
          <button className="px-7 py-3 bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded">DF</button>
          <button className="px-7 py-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded">GK</button>
        </div>

        {/* รูปภาพนักเตะ */}
        <div className="mt-6 flex justify-center gap-4">
          <img 
            src="/players/Mainoo_MF.png" 
            alt="Mainoo MF" 
            className="w-48 h-auto rounded-lg shadow-lg cursor-pointer"
            onClick={handleImageClick}
          />
          <img 
            src="/players/Maguire_DF.png" 
            alt="Maguire DF" 
            className="w-48 h-auto rounded-lg shadow-lg cursor-pointer"
            onClick={handleImageClick}
          />
        </div>

        {/* แสดงข้อความ Hello */}
        {message && <div className="mt-4 text-xl font-bold text-green-500">{message}</div>}
      </div>
    </div>
  );
};

export default Market;
