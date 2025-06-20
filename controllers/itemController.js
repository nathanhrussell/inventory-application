const db = require("../db");

const listItems = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM items ORDER BY id ASC");
        res.render("items/index", { items: result.rows });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Server error");
    }
};

const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("SELECT * FROM items WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).send("Item not found");
        res.render("items/show", { item: result.rows[0] });
    } catch (err) {
        console.error("Error fetching item:", err);
        res.status(500).send("Server error");
    }
};

const createItem = async (req, res) => {
    const { name, category_id, price, on_sale, quantity_in_stock, description } = req.body;
    try {
        await db.query(
            `INSERT INTO items (name, category_id, price, on_sale, quantity_in_stock, description)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [name, category_id, price, on_sale === "on", quantity_in_stock, description]
        );
        res.redirect("/items");
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).send("Server error");
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, category_id, price, on_sale, quantity_in_stock, description } = req.body;
    try {
        await db.query(
            `UPDATE items SET name=$1, category_id=$2, price=$3, on_sale=$4, quantity_in_stock=$5, description=$6 WHERE id=$7`,
            [name, category_id, price, on_sale === "on", quantity_in_stock, description, id]
        );
        res.redirect(`/items/${id}`);
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).send("Server error");
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM items WHERE id = $1", [id]);
        res.redirect("/items");
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).send("Server error");
    }
};

module.exports = {
    listItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};