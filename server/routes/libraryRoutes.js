const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const controller = require("../controllers/libraryController");

router.get("/library-read", controller.readBooks);

router.post(
    "/library-insert",
    authMiddleware,
    roleMiddleware("admin"),
    controller.insertBook
);

router.put(
    "/library-update/:id",
    authMiddleware,
    roleMiddleware("admin"),
    controller.updateBook
);

router.delete(
    "/library-delete/:id",
    authMiddleware,
    roleMiddleware("admin"),
    controller.deleteBook
);

router.delete(
    "/library-clearall",
    authMiddleware,
    roleMiddleware("admin"),
    controller.clearAll
);

module.exports = router;
