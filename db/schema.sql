DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL;
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL,
    on_sale BOOLEAN DEFAULT false,
    quantity_in_stock INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created at TIMESTAMP DEFAULT NOW()
);