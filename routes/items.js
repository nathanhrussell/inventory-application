const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.listItems);

router.get("/new", async (req, res) => {
    const result = await db.query("SELECT * FROM categories ORDER BY name ASC");
    res.render("items/new", { categories: result. rows});
});

router.post("/", itemController.createItem);

router.get("/:id", itemController.getItem);

router.get("/:id/edit", (req, res) => res.send("Form to edit item"));

router.put("/:id", itemController.updateItem);

router.delete("/:id", itemController.deleteItem);

module.exports = router;