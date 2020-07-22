// code to build and initialize DB goes here
const {
  client,
  getAllProducts,
  createProduct,
  createCategories,
  getAllCategories,
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  getProductsByCategory,
  addProductToCategory,

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

     CREATE TABLE product(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price DECIMAL NOT NULL,
      description VARCHAR(255) NOT NULL,
      "categoryId" INTEGER REFERENCES categories(id),
      inventory INTEGER NOT NULL,
      photo VARCHAR(255) NOT NULL
    );

    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES product(id) NOT NULL,
      "userId" INTEGER REFERENCES users(id) NOT NULL,
      report VARCHAR(255) NOT NULL
    );

    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES product(id) NOT NULL,
      "userId" INTEGER REFERENCES users(id) NOT NULL,
      quantity INTEGER NOT NULL
    );

    CREATE TABLE cat_product(
      "productId" INTEGER REFERENCES product(id),
      "categoryId" INTEGER REFERENCES categories(id),
      UNIQUE ("productId", "categoryId") 
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
      categoryId: "1",
      inventory: 5,
      photo:
        "https://cdn.pixabay.com/photo/2012/04/10/22/46/red-hat-26734_960_720.png",
    });

    const blueKeychain = await createProduct({
      name: "Blue Keychain",
      price: "1.00",
      description: "A blue keychain",
      categoryId: "2",
      inventory: "50",
      photo:
        "https://www.pantone.com/images/products/pantone-keychain-color-of-the-year-2020-classic-blue-19-4052.jpg",
    });

    console.log("Done creating products");
  } catch (error) {
    throw error;
  }
}

async function createInitialCategories() {
  try {
    console.log("Creating initial categories");

    const headware = await createCategories(["hats"]);
    const keychains = await createCategories(["keychains"]);
    const tops = await createCategories(["tops"]);
    const shoes = await createCategories(["shoes"]);

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
    DROP TABLE IF EXISTS cat_product CASCADE;
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS product CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
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

    const testingCat = await getProductsByCategory(["hats"]);

    console.log("testing Cat_product");

    const cat_prod = await addProductToCategory(1, ["keychain", "tops"]); //Restructure data

    console.log(cat_prod);
  } catch (error) {
    console.error("Testing problem");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
