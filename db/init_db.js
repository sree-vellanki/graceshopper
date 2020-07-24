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
  getReviewsByProduct,
  getAllReviews,
  createReview,

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
      "usersId" INTEGER REFERENCES users(id) NOT NULL,
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
      photo: "https://m.media-amazon.com/images/I/61nUX-qwxHL._SR500,500_.jpg",
    });

    const redHat = await createProduct({
      name: "Another Red Hat",
      price: "1.00",
      description: "Buy this and the Red Hat is half off",
      categoryId: "1",
      inventory: "50",
      photo:
        "https://images-na.ssl-images-amazon.com/images/I/612lct2Rr2L._AC_UX385_.jpg",
    });

    const nokeShirt = await createProduct({
      name: "Grey Noke Shirt",
      price: "15.00",
      description: "Just do it? How about no.",
      categoryId: "3",
      inventory: "20",
      photo: "https://i.ebayimg.com/images/g/Lm0AAOSwnH1WYSFJ/s-l1600.jpg",
    });

    const purpleHat = await createProduct({
      name: "Purple Hat",
      price: "10.00",
      description: "A purple hat",
      categoryId: "1",
      inventory: "10",
      photo:
        "https://cdn.shopify.com/s/files/1/0055/9254/7443/products/0acf553b-d7c2-44fc-bf13-b026f86fffb6.5d133a7e459b95026a8f3a575593c11d_1024x1024.jpeg?v=1584657753",
    });

    const duckPoster = await createProduct({
      name: "Anatidaephobia Poster",
      price: "40.00",
      description: "Maybe there's one behind you....right now",
      categoryId: "6",
      inventory: "5",
      photo:
        "https://rlv.zcache.com/duck_shiba_inu_dog_anatidaephobia_photo_funny_doge_poster-rc9f444cac8f94149aa82137ca6a68243_wva_8byvr_704.jpg",
    });

    const wumbology = await createProduct({
      name: "Wumbology Bag",
      price: "7.50",
      description: "You know, Wumbology",
      categoryId: "5",
      inventory: "100",
      photo:
        "https://images-na.ssl-images-amazon.com/images/I/6136FUTubnL._AC_SL1200_.jpg",
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
    const blackShirt = await createProduct({
      name: "Black Shirt",
      price: "15.00",
      description: "A black shirt",
      categoryId: "3",
      inventory: "20",
      photo:
        "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/408964/item/goods_69_408964.jpg?width=2000",
    });

    const orangeShoes = await createProduct({
      name: "Orange Shoes",
      price: "40.00",
      description: "A pair of orange shoes",
      categoryId: "4",
      inventory: "5",
      photo:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/4d48822742e041dfbd42aafa00a85217_9366/Dame_6_Shoes_Orange_FU6808_01_standard.jpg",
    });
    const greenShirt = await createProduct({
      name: "Green Shirt",
      price: "7.50",
      description: "A green shirt",
      categoryId: "3",
      inventory: "100",
      photo:
        "https://cdn.childrensalon.com/media/catalog/product/cache/0/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/g/u/gucci-green-cotton-logo-t-shirt-307519-51083c57c5ee5de46aeb01bf3e46e92a27a8e9e6.jpg",
    });

    const squidHoodie = await createProduct({
      name: "Squidward Hoodie",
      price: "20.00",
      description: "Let out your inner artisitc Squidward",
      categoryId: "3",
      inventory: "75",
      photo:
        "https://images-na.ssl-images-amazon.com/images/I/71AxmEfdPcL._AC_UL1500_.jpg",
    });

    const iroh = await createProduct({
      name: "Uncle Iroh Poster",
      price: "12.50",
      description: "A calming poster of the calmest person",
      categoryId: "6",
      inventory: "100",
      photo:
        "https://ih1.redbubble.net/image.626937052.4808/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg",
    });

    const batman = await createProduct({
      name: "Batman Keychain",
      price: "10.00",
      description: "Na na na na na na na na na na na na na.....BATMAN!!!",
      categoryId: "2",
      inventory: "75",
      photo: "https://i.ebayimg.com/images/g/qvMAAOSwqYBWpJMN/s-l640.jpg",
    });

    const whiteShoes = await createProduct({
      name: "White Shoes",
      price: "45.00",
      description: "A pair of white shoes",
      categoryId: "4",
      inventory: "15",
      photo:
        "https://www.famousfootwear.com/productimages/shoes_ia95364.jpg?trim.threshold=105&width=630&height=480&paddingWidth=60",
    });

    const patrick = await createProduct({
      name: "Patrick Bag",
      price: "7.50",
      description: "Yeah, mine too Patrick",
      categoryId: "5",
      inventory: "100",
      photo:
        "https://ih1.redbubble.net/image.679194748.4858/drawstring_bag,x600-pad,600x600,f8f8f8.u3.jpg",
    });

    console.log(
      "These are the categories: ",
      hat,
      redHat,
      nokeShirt,
      purpleHat,
      duckPoster,
      wumbology,
      blueKeychain,
      blackShirt,
      orangeShoes,
      greenShirt,
      squidHoodie,
      iroh,
      batman,
      whiteShoes,
      patrick
    );
    console.log("Done creating products");
  } catch (error) {
    throw error;
  }
}

async function createInitialCategories() {
  try {
    console.log("Creating initial categories");

    const cats = await createCategories([
      "hats",
      "keychains",
      "tops",
      "shoes",
      "bags",
      "posters",
      "hoodies",
    ]);
    // const keychains = await createCategories(["keychains"]);
    // const tops = await createCategories(["tops"]);
    // const shoes = await createCategories(["shoes"]);

    console.log(cats);

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
      admin: true,
    });

    console.log("Done creating Users");
  } catch (error) {
    console.log("Problem with creating users");
    throw error;
  }
}

async function createInitialReviews() {
  try {
    console.log("Creating initial reviews");
    const hatReview = await createReview({
      productId: "1",
      usersId: "1",
      report: "Prettiest hat you'll ever see, I'm buying 100 more!",
    });
    console.log(hatReview);
    const keychainReview = await createReview({
      productId: "1",
      usersId: "2",
      report: "Very nice keychain...",
    });
    console.log(keychainReview);
    const shirtReview = await createReview({
      productId: "1",
      usersId: "3",
      report: "Super comfy shirt.",
    });
    console.log(shirtReview);
    console.log("Done creating reviews.");
  } catch (error) {
    console.log("Problem creating reviews...");
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
    await createInitialReviews();
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
