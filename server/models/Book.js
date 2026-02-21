const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    status: {
        type: String,
        default: "Available"
    }
})

module.exports = mongoose.model("Book", bookSchema)