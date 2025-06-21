const db = require("./db");

const seed = async () => {
  try {
    // Clear existing data
    await db.query("DELETE FROM items");
    await db.query("DELETE FROM categories");

    // Insert categories
    const categories = ["Laptops", "Monitors", "Keyboards", "Headphones", "Smartphones"];
    const categoryIds = [];

    for (let name of categories) {
      const res = await db.query("INSERT INTO categories (name) VALUES ($1) RETURNING id", [name]);
      categoryIds.push(res.rows[0].id);
    }

    // Dummy items
    const items = [
      { name: "MacBook Pro", cat: 0, price: 1999.99, sale: true, stock: 5, desc: "M3 chip, 16GB RAM" },
      { name: "Dell XPS 13", cat: 0, price: 1499.99, sale: false, stock: 3, desc: "Compact ultrabook" },
      { name: "Samsung 27\" Monitor", cat: 1, price: 329.99, sale: true, stock: 7, desc: "4K UHD" },
      { name: "LG UltraFine", cat: 1, price: 499.99, sale: false, stock: 2, desc: "Colour-accurate display" },
      { name: "Logitech MX Keys", cat: 2, price: 99.99, sale: false, stock: 12, desc: "Wireless keyboard" },
      { name: "Razer BlackWidow", cat: 2, price: 129.99, sale: true, stock: 0, desc: "Mechanical RGB keyboard" },
      { name: "Sony WH-1000XM5", cat: 3, price: 349.99, sale: false, stock: 4, desc: "Noise-cancelling headphones" },
      { name: "Bose QC45", cat: 3, price: 299.99, sale: true, stock: 1, desc: "Comfortable and clean sound" },
      { name: "iPhone 15", cat: 4, price: 999.99, sale: false, stock: 6, desc: "Latest Apple phone" },
      { name: "Google Pixel 8", cat: 4, price: 849.99, sale: true, stock: 0, desc: "Pure Android experience" }
    ];

    for (let item of items) {
      await db.query(
        `INSERT INTO items (name, category_id, price, on_sale, quantity_in_stock, description)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          item.name,
          categoryIds[item.cat],
          item.price,
          item.sale,
          item.stock,
          item.desc
        ]
      );
    }

    console.log("✅ Dummy data seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();
