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
       FROM product; 
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
  categories = [],
  inventory,
  photo,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO product(name, price, description, inventory, "photo")
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `,
      [name, price, description, inventory, photo]
    );
    if (categories.length === 0) {
      return product;
    }

    const categoryList = await createCategories(categories);

    return await addProductToCategory(product.id, categoryList);
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategory(categoryName) {
  try {
    const { rows: productIds } = await client.query(
      `
      SELECT cat_product."productId"
      FROM cat_product
      JOIN categories ON cat_product."categoryId"=categories.id
      WHERE categories.name=$1;
    `,
      [categoryName]
    );

    console.log(categoryName);

    return await Promise.all(
      productIds.map((product) => getProductById(product.id))
    );
  } catch (error) {
    throw error;
  }
}

async function createProductCat(productId, catId) {
  try {
    await client.query(
      `
      INSERT INTO cat_product("productId", "categoryId")
      VALUES ($1, $2)
      ON CONFLICT ("productId", "categoryId") DO NOTHING;
    `,
      [productId, catId]
    );
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT *
      FROM product
      WHERE id=$1;
      `,
      [productId]
    );

    if (!product) {
      throw {
        name: "ProductNotFoundError",
        message: "Could not find a product with that Id",
      };
    }
    const { rows: categories } = await client.query(
      `
      SELECT categories.*
      FROM categories
      JOIN cat_product ON categories.id=cat_product."categoryId"
      WHERE cat_product."productId"=$1
      `,
      [productId]
    );


    return product;
  } catch (error) {
    throw error;
  }
}



async function getProductsByCategory(categoryName) {
  try {
    const { rows: productIds } = await client.query(
      `
      SELECT cat_product."productId"
      FROM cat_product
      JOIN categories ON cat_product."categoryId"=categories.id
      WHERE categories.name=$1;
    `,
      [categoryName]
    );
    console.log(categoryName);
    return await Promise.all(
      productIds.map((product) => getProductById(products.id))
    ); 
  } catch (error) {
    throw error;
  }
}


async function updateProduct(id, fields = {}) {
  const { categories } = fields;
  delete fields.categories;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `UPDATE product
        SET ${setString}
        WHERE id=${id}
        RETURNING *;`,
      Object.values(fields)
    );

    if (categories === undefined) {
      return getProductById(product.id);
    }

    const categoryList = await createCategories(categories);
    const categoryListIdString = categoryList
      .map((category) => `${tag.id}`)
      .join(",");

    await client.query(
      `DELETE FROM cat_product
         WHERE "categoryId"
         NOT IN (${categoryListIdString})
         AND "productId"=$1;`,
      [id]
    );

    await addProductToCategory(product.id, categoryList);

    return await getProductById(product.id);
  } catch (error) {
    throw error;
  }
}


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

async function createCategories(categoryList) {
  if (categoryList.length === 0) {
    return;
  }

  const insertValues = categoryList
    .map((_, index) => `$${index + 1}`)
    .join("), (");
  const selectValues = categoryList
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  try {
    await client.query(
      `INSERT INTO categories(name)
       VALUES(${insertValues})
       ON CONFLICT (name) DO NOTHING;
    `,
      categoryList
    );

    const { rows: categories } = await client.query(
      `SELECT *
      FROM categories
      WHERE name IN (${selectValues});
      `,
      categoryList
    );
    return categories;
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
    delete user.password;
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

//Cart related functions

async function getUsersCart(userId) {
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM cart
       WHERE "userId"=${userId}
       RETURNING *
       `
    );
    if (rows.length === 0) {
      console.log("Nothing in cart for this user");
      return;
    }

    rows.forEach(async (row) => {
      row.product = await getProductById(row.productId);
      delete row.productId;
    });

    return rows;
  } catch (error) {
    throw error;
  }
}

async function addProductToCart(userId, productId, quantity) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO cart("userId", "productId", quantity)
      VALUES($1, $2, $3)
      RETURNING *;
      `,
      [userId, productId, quantity]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function removeProductFromCart(cartId, productId) {
  try {
    const {
      rows: [cartEntry],
    } = await client.query(
      `DELETE from cart
      WHERE id=${cartId}
      RETURNING *;
      `
    );
    return cartEntry;
  } catch (error) {
    throw error;
  }
}

async function updateProductInCart(cartId, quantity) {
  if (quantity === 0) {
    return await removeProductFromCart(cartId);
  }

  try {
    const {
      rows: [cartEntry],
    } = await client.query(
      `UPDATE cart
       SET quantity=${quantity}
       WHERE "cartId"=${cartId}
       `
    );
    return cartEntry;
  } catch (error) {
    throw error;
  }
}

//Reviews related functions

async function getAllReviews() {
  try {
    const { rows } = await client.query(
      `SELECT *
         FROM reviews;
            `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getReviewsByProduct(productId) {
  try {
    const { rows: products } = await client.query(
      `
            SELECT *
            FROM products
            JOIN reviews
            ON products.id=reviews."productId"
            WHERE "productId" = $1
            `,
      [productId]
    );
    return products;
  } catch (error) {
    throw error;
  }
}
async function createReview({ productId, usersId, report }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `INSERT INTO reviews("productId", "usersId", report)
       VALUES($1, $2, $3)
       RETURNING *;
      `,
      [productId, usersId, report]
    );
    console.log("hi, im working");
    return review;
  } catch (error) {
    throw error;
  }
}

//Linking Functions

async function addProductToCategory(productId, categoryList) {
  try {
    const createProductCatPromises = categoryList.map((category) =>
      createProductCat(productId, category.id)
    );

    await Promise.all(createProductCatPromises);

    //return await getProductById(productId);
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
  getProductsByCategory, 
  updateUser,
  getProductById,
  updateProduct,
  addProductToCategory,
  getUsersCart,
  removeProductFromCart,
  addProductToCart,
  updateProductInCart,
  getAllReviews,
  getReviewsByProduct,
  createReview,
};
