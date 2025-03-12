const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    _id : Number,
    PlayerName: String,
    Age: Number,
    Position: String,
    Height: String,
    Nationality: String,
    Price: String,
    Goals: Number,
    Assists: Number,
    Appearances: Number,
    Cleansheet: Number,
    image_url: String
});

const playerl = mongoose.model("player", EmployeeSchema);

module.exports = playerl;

//อันนี้สร้าง ให้เก็บข้อมูลใน database ได้
