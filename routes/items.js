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

router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const itemResult = await db.query("SELECT * FROM items WHERE id = $1", [id]);
    const categoryResult = await db.query("SELECT * FROM categories ORDER BY name ASC");

    if (itemResult.rows.length === 0) return res.status(404).send("Item not found");

    res.render("items/edit", {
        item: itemResult.rows[0],
        categories: categoryResult.rows,
    });
});

router.put("/:id", itemController.updateItem);

router.delete("/:id", itemController.deleteItem);

module.exports = router;