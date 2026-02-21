require("dotenv").config()

const express = require("express")
const cors = require("cors")
const path = require("path")
const dbConnect = require("./config/db")

const libraryRoutes = require("./routes/libraryRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))

app.get("/health", (req, res) => {
    res.status(200).send("OK")
})

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.use("/", authRoutes)
app.use("/", libraryRoutes)

const startServer = async () => {
    try {
        await dbConnect()

        const PORT = process.env.PORT

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`)
        })

    } catch (err) {
        console.log("Failed to connect DB", err)
    }
}

startServer()