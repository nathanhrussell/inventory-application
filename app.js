const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const methodOverride = require("method-override");
const itemRoutes = require("./routes/items");
require("dotenv").config();

app.use(express.urlencoded ({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/items", itemRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.redirect("/items");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Inventory app running on http://localhost:${PORT}`);
});
