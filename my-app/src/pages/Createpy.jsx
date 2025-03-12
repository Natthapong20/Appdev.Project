import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Create.css";

function Createpy() {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState({
        PlayerName: "", Age: "", Position: "", Height: "", Nationality: "", 
        Price: "", Goals: "", Assists: "", Appearances: "", Cleansheet: "", image_url: ""
    });
    const [editPlayer, setEditPlayer] = useState(null);
    const uri = "http://localhost:3001/create";

    useEffect(() => {
        fetchPlayers();
    }, []);

    // ตรงนี้เช็คว่ามีการ์ดนักเตะเข้าไหม
    const fetchPlayers = async () => {
        try {
            const response = await axios.get(uri);
            setPlayers(response.data.players || []); 
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (editPlayer) {
            setEditPlayer({ ...editPlayer, [name]: value });
        } else {
            setNewPlayer({ ...newPlayer, [name]: value });
        }
    };

    const validateForm = (player) => {
        return Object.values(player).every(value => value.trim() !== '');
    };

    const handleCreatePlayer = async () => {
    if (!validateForm(newPlayer)) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }
    try {
        const response = await axios.post(uri, newPlayer);
        if (response.data) {
            setPlayers([...players, response.data]); // ✅ ตรวจสอบ response.data
        }
        setNewPlayer({
            PlayerName: "", Age: "", Position: "", Height: "", Nationality: "", 
            Price: "", Goals: "", Assists: "", Appearances: "", Cleansheet: "", image_url: ""
        });
    } catch (error) {
        console.error("Error creating player:", error.response?.data || error.message);
    }
};
//ยังไม่ทำ
    const handleEditPlayer = (player) => {
        setEditPlayer(player);
    };

    const handleUpdatePlayer = async () => {
        if (!validateForm(editPlayer)) return;
        try {
            await axios.put(`${uri}/${editPlayer._id}`, editPlayer);
            fetchPlayers();
            setEditPlayer(null);
        } catch (error) {
            console.error("Error updating player:", error);
        }
    };
//ยังไม่ทำ
    const handleDeletePlayer = async (playerId) => {
        try {
            await axios.delete(`${uri}/${playerId}`);
            setPlayers(players.filter((player) => player._id !== playerId));
        } catch (error) {
            console.error("Error deleting player:", error);
        }
    };
//อันนี้GUI หน้าเว็บ
    return (
        <div>
            <h1>Player List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Height</th>
                        <th>Nationality</th>
                        <th>Price</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Appearances</th>
                        <th>Clean Sheets</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player._id}>  
                            <td>{player._id}</td>
                            <td><img src={player.image_url} alt={player.PlayerName} width="50" /></td>
                            <td>{player.PlayerName}</td>
                            <td>{player.Age}</td>
                            <td>{player.Position}</td>
                            <td>{player.Height}</td>
                            <td>{player.Nationality}</td>
                            <td>{player.Price}</td>
                            <td>{player.Goals}</td>
                            <td>{player.Assists}</td>
                            <td>{player.Appearances}</td>
                            <td>{player.Cleansheet}</td>
                            <td>
                                <button onClick={() => handleEditPlayer(player)}>Edit</button>
                                <button onClick={() => handleDeletePlayer(player._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>{editPlayer ? "Edit Player" : "Add New Player"}</h2>
            {Object.keys(newPlayer).map((key) => (
                <div key={key}>
                    <input
                        type="text"
                        name={key}
                        placeholder={key}
                        value={editPlayer ? editPlayer[key] : newPlayer[key]}
                        onChange={handleInputChange}
                    />
                    {key === "image_url" && (editPlayer?.image_url || newPlayer.image_url) && (
                        <img src={editPlayer ? editPlayer.image_url : newPlayer.image_url} alt="Preview" width="100" />
                    )}
                </div>
            ))}
            <button onClick={editPlayer ? handleUpdatePlayer : handleCreatePlayer}>
                {editPlayer ? "Update" : "Create"}
            </button>
        </div>
    );
}

export default Createpy;
