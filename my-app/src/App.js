import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Field from "./components/Field";
import FormationSelector from "./components/FormationSelector";
import Market from "./pages/Market";

function App() {
  const [formation, setFormation] = useState("4-3-3"); // 🔹 ใช้ state เก็บแผนที่เลือก

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar ซ้าย */}
        <Sidebar />

        {/* สนามฟุตบอล หรือ Marketplace ตาม Route */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<Field formation={formation} />} /> {/* ✅ ส่ง formation ไป */}
            <Route path="/marketplace" element={<Market />} />
          </Routes>
        </div>

        {/* Sidebar ขวา */}
        <div className="w-60 bg-[#140B20] p-4 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
            <p className="mt-2">Username</p>
          </div>
          {/* ✅ ส่ง setFormation ไปให้เลือกแผน */}
          <FormationSelector formation={formation} setFormation={setFormation} />
        </div>
      </div>
    </Router>
  );
}

export default App;
