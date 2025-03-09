<<<<<<< HEAD
import { FaHome, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-60 bg-purple-900 p-4 flex flex-col gap-4">
      <button className="bg-yellow-500 p-2 rounded flex items-center gap-2">
        <FaHome /> MYCLUB
      </button>
      <button className="text-gray-300 flex items-center gap-2">
        <FaShoppingCart /> MARKET
      </button>
      <button className="text-gray-300 flex items-center gap-2">
        <FaExchangeAlt /> COMPARE
      </button>
=======
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
>>>>>>> 7c2cf562917d9a1256dde32e5341bc84a6f43537
    </div>
  );
};

export default Sidebar;
