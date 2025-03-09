import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Field from "./components/Field";
import FormationSelector from "./components/FormationSelector";
import Market from "./pages/Market"; // ✅ นำเข้าหน้า Market

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content (แสดงหน้า Field หรือ Market ตาม Route) */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<Field />} /> {/* ✅ หน้าแรก */}
            <Route path="/marketplace" element={<Market />} /> {/* ✅ หน้า Market */}
          </Routes>
        </div>

        {/* Right Panel */}
        <div className="w-60 bg-[#140B20] p-4 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
            <p className="mt-2">Username</p>
          </div>
          <FormationSelector />
        </div>
      </div>
    </Router>
  );
}

export default App;

