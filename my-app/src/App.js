import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Field from "./components/Field";
import FormationSelector from "./components/FormationSelector";
import Market from "./pages/Market";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import MyClub from "./pages/Myclub";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
          <Routes>
            <Route path="/marketplace" element={<Market />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Welcome />} />
            <Route path='/Myclub' element={< MyClub/>} />
            
          </Routes>
    </Router>
  );
}

export default App;
