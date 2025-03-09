import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-48 h-screen bg-[#140B20] text-white flex flex-col items-start p-4">
      <button className="w-full bg-yellow-500 text-black py-2 mb-2 rounded" onClick={() => navigate("/")}>
        MYCLUB
      </button>
      <button className="w-full flex items-center gap-2 py-2" onClick={() => navigate("/marketplace")}>
        🛒 MARKET
      </button>
      <button className="w-full flex items-center gap-2 py-2">🔗 COMPARE</button>
    </div>
  );
};

export default Sidebar;
