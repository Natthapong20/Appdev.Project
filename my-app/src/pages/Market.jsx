const Market = () => {
  return (
    <div className="flex justify-center items-start h-screen p-6 text-white">
      <div className="text-center">
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
      </div>
    </div>
  );
};

export default Market;
