const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password, college } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        college
    });

    await user.save();

    res.json({ message: "User Registered" });

});

module.exports = router;

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token });

});

module.exports = router;