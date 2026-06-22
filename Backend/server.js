const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");
db.run(`
CREATE TABLE IF NOT EXISTS products(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 category TEXT NOT NULL,
 price INTEGER NOT NULL
)
`);

// db.all(
//  "SELECT * FROM products",
//  [],
//  (err, rows) => {

//   if(err){
//    console.log(err);
//   }

//   console.log("DATABASE DATA:", rows);

//  });

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Products Database
let products = [
  { id: 1, name: "HP Victus", category: "Laptop", price: 65999 },
  { id: 2, name: "Dell G15", category: "Laptop", price: 72999 },
  { id: 3, name: "Lenovo LOQ", category: "Laptop", price: 69999 },
  { id: 4, name: "Acer Nitro V", category: "Laptop", price: 67999 },
  { id: 5, name: "MacBook Air M3", category: "Laptop", price: 109900 },

  { id: 6, name: "Logitech G102", category: "Mouse", price: 1499 },
  { id: 7, name: "Logitech G304", category: "Mouse", price: 2999 },

  { id: 8, name: "Cosmic Byte CB-GK-16", category: "Keyboard", price: 1999 },
  { id: 9, name: "Redragon K552", category: "Keyboard", price: 3499 },

  { id: 10, name: "Sony WH-CH520", category: "Headphones", price: 4499 },
  { id: 11, name: "Boat Rockerz 550", category: "Headphones", price: 1999 },

  { id: 12, name: "JBL Go 3", category: "Speaker", price: 2999 },
  { id: 13, name: "Boat Stone 350", category: "Speaker", price: 1799 },

  { id: 14, name: "Razer Gigantus V2", category: "Mouse Pad", price: 999 },
  { id: 15, name: "Realme Buds Air 6", category: "Earbuds", price: 2999 }
];

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to TechStore API");
});

// GET All Products
app.get("/products",(req,res)=>{

 db.all(
  "SELECT * FROM products",
  [],
  (err,rows)=>{

   if(err){

    return res.status(500).json(err);

   }

   res.json(rows);

 });

});

// GET Product By ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.status(200).json(product);
});

// POST New Product
app.post("/products", (req, res) => {

  const { name, category, price } = req.body;

  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, category and price are required"
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a positive number"
    });
  }

  db.run(
    `INSERT INTO products (name, category, price)
     VALUES (?, ?, ?)`,

    [name, category, price],

    function(err) {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        id: this.lastID
      });

    }
  );

});

// PUT Update Product
app.put("/products/:id", (req, res) => {

  const id = req.params.id;

  const { name, category, price } = req.body;

  db.run(
    `UPDATE products
     SET name=?, category=?, price=?
     WHERE id=?`,

    [name, category, price, id],

    function(err) {

      if(err){
        return res.status(500).json(err);
      }

      res.json({
        message: "Product Updated"
      });

    }
  );

});

// DELETE Product
app.delete(
"/products/:id",
(req,res)=>{

 const id = req.params.id;

 db.run(

  `DELETE FROM products
   WHERE id=?`,

  [id],

  function(err){

   if(err){

    return res
    .status(500)
    .json(err);

   }

   res.json({

    message:
    "Product Deleted"

   });

  }

 );

});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});