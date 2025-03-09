import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Sidebar from "./components/Sidebar";
import Field from "./components/Field";
import Market from "./pages/Market";
import FormationSelector from "./components/FormationSelector";
import MyClub from "./pages/Myclub";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-900 text-white">
          {/* Sidebar ซ้าย */}
          <Sidebar />

          {/* ✅ ส่วนแสดงเนื้อหาตาม Route */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* ✅ ป้องกันไม่ให้เข้า MyClub ถ้าไม่ได้ Login */}
              <Route path="/myclub" element={<ProtectedRoute><MyClub /></ProtectedRoute>} />
              <Route path="/marketplace" element={<ProtectedRoute><Market /></ProtectedRoute>} />
            </Routes>
          </div>

          {/* Sidebar ขวา */}
          <div className="w-60 bg-[#140B20] p-4 flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
              <p className="mt-2">Username</p>
            </div>
            <FormationSelector />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
