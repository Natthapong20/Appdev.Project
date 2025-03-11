// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     return (
//         <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{backgroundColor:'#060143'}}>
            
//             <Link to="/marketplace" className="btn btn-primary w-100 rounded-0 mb-3">
//                 Market
//             </Link>

//             <Link to="/compare" className="btn btn-secondary w-100 rounded-0 mb-3">
//                 Compare
//             </Link>

//             <Link to="/compare" className="btn btn-secondary w-100 rounded-0">
//                 Field
//             </Link>
            
//         </div>
//     );
// }

// export default Login;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyClub.css"; // นำเข้าไฟล์ CSS สำหรับสไตล์

const formations = {
    "4-3-3": [
        [9, 10, 11],
        [6, 7, 8], 
        [2, 3, 4, 5],
        [1], 
    ],
    "4-4-2": [
        [10, 11],
        [6, 7, 8, 9],
        [2, 3, 4, 5],
        [1],
    ],
    "4-3-2-1": [
        [11],
        [9, 10],
        [6, 7, 8],
        [2, 3, 4, 5],
        [1],
        
        
        
    ],
};

function MyClub() {
    const [selectedFormation, setSelectedFormation] = useState("4-3-3");

    return (
        <div className="myclub-container">
            {/* Sidebar */}
            <div className="sidebar">
                <Link to="/myclub" className="menu-item active">📋 MYCLUB</Link>
                <Link to="/marketplace" className="menu-item">🛒 MARKET</Link>
                <Link to="/compare" className="menu-item">🔗 COMPARE</Link>
            </div>

            {/* Main Field Section */}
            <div className="main-content">
                <div className="football-field">
                    {formations[selectedFormation].map((row, rowIndex) => (
                        <div key={rowIndex} className="player-row">
                            {row.map((pos) => (
                                <div key={pos} className="player-card">+</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar Right */}
            <div className="right-sidebar">
                <div className="user-info">
                    <div className="avatar">👤</div>
                    <p>Username</p>
                </div>
                <div className="formation-selector">
                    <h3>PLAN</h3>
                    {Object.keys(formations).map((formation) => (
                        <button
                            key={formation}
                            className={`formation-btn ${selectedFormation === formation ? "active" : ""}`}
                            onClick={() => setSelectedFormation(formation)}
                        >
                            {formation}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyClub;
