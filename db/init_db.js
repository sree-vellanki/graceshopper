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
      photo: "https://m.media-amazon.com/images/I/61nUX-qwxHL._SR500,500_.jpg"
    });

    const blueKeychain = await createProduct({
      name: "Blue Keychain",
      price: "1.00",
      description: "A blue keychain",
      catId: "2",
      inventory: "50",
      photo: "https://www.pantone.com/images/products/pantone-keychain-color-of-the-year-2020-classic-blue-19-4052.jpg"
    });

    const blackShirt = await createProduct({
      name: "Black Shirt",
      price: "15.00",
      description: "A black shirt",
      catId: "3",
      inventory: "20",
      photo: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/408964/item/goods_69_408964.jpg?width=2000"
    });

    const purpleHat = await createProduct({
      name: "Purple Hat",
      price: "10.00",
      description: "A purple hat",
      catId: "1",
      inventory: "10",
      photo: "https://cdn.shopify.com/s/files/1/0055/9254/7443/products/0acf553b-d7c2-44fc-bf13-b026f86fffb6.5d133a7e459b95026a8f3a575593c11d_1024x1024.jpeg?v=1584657753"
    });

    const orangeShoes = await createProduct({
      name: "Orange Shoes",
      price: "40.00",
      description: "A pair of orange shoes",
      catId: "4",
      inventory: "5",
      photo: "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/4d48822742e041dfbd42aafa00a85217_9366/Dame_6_Shoes_Orange_FU6808_01_standard.jpg"
    });

    const greenShirt = await createProduct({
      name: "Green Shirt",
      price: "7.50",
      description: "A green shirt",
      catId: "3",
      inventory: "100",
      photo: "https://cdn.childrensalon.com/media/catalog/product/cache/0/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/g/u/gucci-green-cotton-logo-t-shirt-307519-51083c57c5ee5de46aeb01bf3e46e92a27a8e9e6.jpg"
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

    const admin = await createUser({
      username: "adminTest",
      password: "ihavethecon",
      name: "A. D. Min",
      admin: true
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
