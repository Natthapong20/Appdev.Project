const Sidebar = () => {
    return (
      <div className="w-48 h-screen bg-[#140B20] text-white flex flex-col items-start p-4">
        <button className="w-full bg-yellow-500 text-black py-2 mb-2 rounded">MYCLUB</button>
        <button className="w-full flex items-center gap-2 py-2">🛒 MARKET</button>
        <button className="w-full flex items-center gap-2 py-2">🔗 COMPARE</button>
      </div>
    );
  };
  
  export default Sidebar;
  