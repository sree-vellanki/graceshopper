// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/graceshopper";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

async function getAllProducts() {
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM products; 
       `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function createProduct({ name, price, description, catName, quant }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO products(name, price, description, "catName", quant)
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `,
      [name, price, description, catName, 0]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllCategories() {
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM categories; 
       `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createCategories({ name }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `INSERT INTO categories(name)
    VALUES($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    `,
      [name]
    );
    return category;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `SELECT username, name
       FROM users;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password, name }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(username, password, name)
      VALUES($1, $2, $3)
      RETURNING (username, name);
      `,
      [username, password, name]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  getAllProducts,
  createProduct,
  createCategories,
  getAllCategories,
  getAllUsers,
  createUser,

  // db methods
};
