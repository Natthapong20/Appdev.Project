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
    </div>
  );
};

export default Sidebar;
