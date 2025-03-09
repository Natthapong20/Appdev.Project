import { FaHome, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-purple-900 p-4 flex flex-col gap-4 text-white">
      <button className="bg-yellow-500 p-2 rounded flex items-center gap-2" onClick={() => navigate("/")}>
        <FaHome /> MYCLUB
      </button>
      <button className="text-gray-300 flex items-center gap-2" onClick={() => navigate("/marketplace")}>
        <FaShoppingCart /> MARKET
      </button>
      <button className="text-gray-300 flex items-center gap-2">
        <FaExchangeAlt /> COMPARE
      </button>
    </div>
  );
};

export default Sidebar;
