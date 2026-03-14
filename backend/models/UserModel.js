const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    college: String,
    role: {
        type: String,
        default: "teacher"
    }
});

module.exports = mongoose.model("User", userSchema);