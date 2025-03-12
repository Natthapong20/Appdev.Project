import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyClub.css";

const formations = {
    "4-3-3": [
        ["LW", "ST", "RW"],  
        ["LCM", "CM", "RCM"], 
        ["LB", "CB", "CB", "RB"], 
        ["GK"], 
    ],
    "4-4-2": [
        ["ST", "ST"],
        ["LM", "LCM", "RCM", "RM"],
        ["LB", "CB", "CB", "RB"],
        ["GK"],
    ],
    "4-3-2-1": [
        ["ST"],
        ["CAM", "CAM"],
        ["LCM", "CM", "RCM"],
        ["LB", "CB", "CB", "RB"],
        ["GK"],
    ],
};

// กำหนดพิกัดตำแหน่งของผู้เล่นในแต่ละแผน
const playerPositions = {
    "4-3-3": [
        { top: "15%", left: "50%" }, // ST
        { top: "25%", left: "30%" }, // LW
        { top: "25%", left: "70%" }, // RW
        { top: "45%", left: "30%" }, // LCM
        { top: "45%", left: "50%" }, // CM
        { top: "45%", left: "70%" }, // RCM
        { top: "65%", left: "20%" }, // LB
        { top: "65%", left: "40%" }, // CB
        { top: "65%", left: "60%" }, // CB
        { top: "65%", left: "80%" }, // RB
        { top: "85%", left: "50%" }, // GK
    ],
    "4-4-2": [
        { top: "20%", left: "40%" }, // ST
        { top: "20%", left: "60%" }, // ST
        { top: "40%", left: "20%" }, // LM
        { top: "40%", left: "40%" }, // LCM
        { top: "40%", left: "60%" }, // RCM
        { top: "40%", left: "80%" }, // RM
        { top: "60%", left: "20%" }, // LB
        { top: "60%", left: "40%" }, // CB
        { top: "60%", left: "60%" }, // CB
        { top: "60%", left: "80%" }, // RB
        { top: "85%", left: "50%" }, // GK
    ],
    "4-3-2-1": [
        { top: "15%", left: "50%" }, // ST
        { top: "30%", left: "40%" }, // CAM
        { top: "30%", left: "60%" }, // CAM
        { top: "50%", left: "30%" }, // LCM
        { top: "50%", left: "50%" }, // CM
        { top: "50%", left: "70%" }, // RCM
        { top: "70%", left: "20%" }, // LB
        { top: "70%", left: "40%" }, // CB
        { top: "70%", left: "60%" }, // CB
        { top: "70%", left: "80%" }, // RB
        { top: "90%", left: "50%" }, // GK
    ],
};

function MyClub() {
    const [selectedFormation, setSelectedFormation] = useState("4-3-3");
    const navigate = useNavigate();

    return (
        <div className="myclub-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="title">MYCLUB_MAIN</h2>
                <button className="menu-button active" onClick={() => navigate("/myclub")}>📋 MYCLUB</button>
                <button className="menu-button" onClick={() => navigate("/marketplace")}>🛒 MARKET</button>
                <button className="menu-button" onClick={() => navigate("/compare")}>🔗 COMPARE</button>
            </div>

            {/* Main Field Section */}
            <div className="main-content">
                <div className="football-field">
                    {formations[selectedFormation].flat().map((position, index) => (
                        <div 
                            key={`${position}-${index}`} 
                            className="player-card" 
                            style={{
                                top: playerPositions[selectedFormation][index].top,
                                left: playerPositions[selectedFormation][index].left
                            }}
                            
                        >
                            <span className="player-position">{position}</span>
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
