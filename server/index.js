const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ แก้ไข cros → cors
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
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


// API ลงทะเบียนผู้ใช้
app.post('/register', async (req, res) => {
    
    // const { email} = req.body;
    // if(user.email === email){
    //     res.json("U have accouct")
    // }

    try {
        const newEmployee = await EmployeeModel.create(req.body);
        res.json({ message: "User registered successfully!", user: newEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เปิดเซิร์ฟเวอร์
app.listen(3001, () => {
    console.log("🚀 Server is running on port 3001");
});
