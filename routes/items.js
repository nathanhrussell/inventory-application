const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.listItems);
router.get("/new", (req, res) => res.send("Form to create item"));
router.post("/", itemController.createItem);
router.get("/:id", itemController.getItem);
router.get("/:id/edit", (req, res) => res.send("Form to edit item"));
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;