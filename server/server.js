require("dotenv").config();
const express = require("express");
const path = require("path");
const libraryRoutes = require("./routes/libraryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", authRoutes);
app.use("/", libraryRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server running");
});
