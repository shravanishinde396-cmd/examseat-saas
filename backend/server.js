const express = require("express");
const cors = require("cors");

const connectDB = require("./database/db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("ExamSeat SaaS API Running");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});