// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/graceshopper";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

//Products related functions

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
async function createProduct({
  name,
  price,
  description,
  catId,
  inventory,
  photo,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO products(name, price, description, "catId", inventory, "photo")
      VALUES($1, $2, $3, $4, $5, $6)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `,
      [name, price, description, catId, inventory, photo]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

//NEED HELP!!!!!!!!
// async function getProductsByCategory(category) {
//   try {
//     const { rows: productIds } = await client.query(
//       `
//       SELECT products.id
//       FROM products
//       JOIN cat_product ON products.id=cat_product."productId"
//       JOIN categories ON categories.id=cat_product."catId"
//       WHERE categories.name=$1;
//     `,
//       [category]
//     );

//     return await Promise.all(
//       productIds.map((product) => getProductById(products.id))
//     );
//   } catch (error) {
//     throw error;
//   }
// }

//Categories related functions

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

//User related functions

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

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username, name, active
      FROM users
      WHERE id=${userId}
    `);
    if (!user) {
      return null;
    }
    // user.posts = await getPostsByUser(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserbyName(name) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username, name, active
      FROM users
      WHERE name=$1
      `,
      [name]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
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
  getUserById,
  getUserByUsername,
  getUserbyName,
  updateUser,
  getProductsByCategory,
};
