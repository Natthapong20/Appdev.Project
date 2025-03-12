const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const EmployeeModel = require("./models/Employee");
const playerl = require("./models/Player");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success");
            } else {
                res.json("the password is incorrect");
            }
        } else {
            res.json("No record existed");
        }
    });
});

app.post('/register', async (req, res) => {

    try {
        const newEmployee = await EmployeeModel.create(req.body);
        res.json({ message: "User registered successfully!", user: newEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//ทำถึงแค่นี้ แค่ create ได้ 
app.post("/create", async (req, res) => {
    try {
        const newPlayer = new playerl(req.body); 
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ message: error.message });
    }
});

//ยังไม่ได้ทำ
app.get("/create", async (req, res) => {
    try {
        const players = await playerl.find(); // ✅ ใช้ playerl
        res.json({ players }); // ✅ ส่งออกเป็น object { players: [...] }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//ยังไม่ได้ทำ
app.put("/create/:id", async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ error: "Error updating player" });
    }
});

//ยังไม่ได้ทำ
app.delete("/create/:id", async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.json({ message: "Player deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting player" });
    }
});

// เปิดเซิร์ฟเวอร์
app.listen(3001, () => {
    console.log("🚀 Server is running on port 3001");
});
