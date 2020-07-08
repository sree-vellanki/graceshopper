// code to build and initialize DB goes here
const {
  client,
  getAllProducts,
  createProduct,
  createCategories,
  getAllCategories,
  getAllUsers,
  createUser,
  // other db methods
} = require("./index");

async function createTables() {
  try {
    console.log("Creating Tables");

    await client.query(`
    
    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      active BOOLEAN DEFAULT false,
      admin BOOLEAN DEFAULT false
    ); 

     CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price DECIMAL NOT NULL,
      description VARCHAR(255) NOT NULL,
      "catId" INTEGER REFERENCES categories(id) NOT NULL,
      inventory INTEGER NOT NULL,
      photo VARCHAR(255) NOT NULL
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id) NOT NULL,
      "usersId" INTEGER REFERENCES users(id) NOT NULL,
      report VARCHAR(255) NOT NULL
    );

    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id) NOT NULL,
      quantity INTEGER NOT NULL,
      total DECIMAL NOT NULL
    );

    CREATE TABLE purchase(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES cart(id)
    );
   
    `);
  } catch (error) {
    console.error("There's a problem in making the tables...");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Creating initial products");

    const hat = await createProduct({
      name: "Red Hat",
      price: "2.00",
      description: "A red hat",
      catId: "1",
      inventory: 5,
      photo: "https://cdn.pixabay.com/photo/2012/04/10/22/46/red-hat-26734_960_720.png"
    });

    const blueKeychain = await createProduct({
      name: "Blue Keychain",
      price: "1.00",
      description: "A blue keychain",
      catId: "2",
      inventory: "50",
      photo: "https://www.pantone.com/images/products/pantone-keychain-color-of-the-year-2020-classic-blue-19-4052.jpg"
    });

    console.log("Done creating products");
  } catch (error) {
    throw error;
  }
}

async function createInitialCategories() {
  try {
    console.log("Creating initial categories");

    const headware = await createCategories({ name: "hats" });
    const keychains = await createCategories({ name: "keychains" });
    const tops = await createCategories({ name: "tops" });
    const shoes = await createCategories({ name: "shoes" });

    console.log("Done creating categories");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Creating Users");

    const amber = await createUser({
      username: "hatGirl",
      password: "caplady007",
      name: "Amber",
    });

    const cherrie = await createUser({
      username: "cherry",
      password: "oranges5",
      name: "Cherrie",
    });

    const sree = await createUser({
      username: "skipper",
      password: "hahahaha",
      name: "Sree",
    });

    console.log("Done creating Users");
  } catch (error) {
    console.log("Problem with creating users");
    throw error;
  }
}

async function rebuildDB() {
  try {
    console.log("Rebuilding the DB");
    client.connect();

    await dropTables();
    await createTables();
    await createInitialCategories();
    await createInitialProducts();
    await createInitialUsers();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

async function dropTables() {
  try {
    console.log("Dropping tables");

    await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS purchase CASCADE;
    `);
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
}

async function testDB() {
  try {
    const products = await getAllProducts();

    const categories = await getAllCategories();

    const users = await getAllUsers();

    console.log("Products: ", products);
    console.log("Categories: ", categories);
    console.log("User: ", users);
  } catch (error) {
    console.error("Testing problem");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
