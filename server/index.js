const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const playerl = require("./models/Player");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อม mongo ค้าบ
mongoose.connect("mongodb+srv://test:1234@appdev.atzq8.mongodb.net/?retryWrites=true&w=majority&appName=Appdev", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// สร้างการล็อคอิน
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success");
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No record existed");
        }
    });
});

// ตรงนนี้ล็อคอินค้าบ
app.post('/register', async (req, res) => {
    try {
        const newEmployee = await EmployeeModel.create(req.body);
        res.json({ message: "User  registered successfully!", user: newEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// สร้างนักเดะ 
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

// REad 
app.get("/create", async (req, res) => {
    try {
        const players = await playerl.find();
        res.json({ players });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// เรียกการ update
app.put("/create/:id", async (req, res) => {
    try {
        const updatedPlayer = await playerl.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ error: "Error updating player" });
    }
});

// เรียกให้มีการ delete 
app.delete("/create/:id", async (req, res) => {
    try {
        const deletedPlayer = await playerl.findByIdAndDelete(req.params.id);
        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.json({ message: "Player deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting player" });
    }
});


app.listen(3001, () => {
    console.log("🚀 Server is running on port 3001");
});
