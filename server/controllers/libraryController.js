const Book = require("../models/Book")
exports.readBooks = async (req, res) => {
    try {
        const data = await Book.find()
        res.send({ status: 1, data })
    } catch (err) {
        res.status(500).send({ status: 0, msg: err.message })
    }
}
exports.insertBook = async (req, res) => {
    try {
        const { title, author } = req.body
        if (!title || !author)
            return res.send({ status: 0, msg: "title and author required" })

        const newBook = await Book.create({ title, author })
        res.send({ status: 1, newBook })
    } catch (err) {
        res.status(500).send({ status: 0, msg: err.message })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const updateRes = await Book.findByIdAndUpdate(id, { status }, { new: true })
        res.send({ status: 1, updateRes })
    } catch {
        res.status(400).send({ status: 0, msg: "update failed" })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const delRes = await Book.findByIdAndDelete(id)
        res.send({ status: 1, delRes })
    } catch {
        res.status(400).send({ status: 0, msg: "invalid id" })
    }
}

exports.clearAll = async (req, res) => {
    try {
        const delRes = await Book.deleteMany({})
        res.send({ status: 1, delRes })
    } catch {
        res.status(500).send({ status: 0, msg: "failed to clear books" })
    }
}