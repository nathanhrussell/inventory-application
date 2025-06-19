const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("All items");
});

router.get("/new", (req, res) => {
    res.send("Form to create item");
});

router.post("/", (req, res) => {
    res.send("Create item");
});

router.get("/:id", (req, res) => {
    res.send(`View item with ID ${req.params.id}`);
});

router.get("/:id/edit", (req, res) => {
    res.send(`Form to edit item with ID ${req.params.id}`);
});

router.put("/:id", (req, res) => {
    res.send(`Update item with ID ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
    res.send(`Delete item with ID ${req.params.id}`);
});

module.exports = router;