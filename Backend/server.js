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

db.get(
  "SELECT COUNT(*) as count FROM products",
  [],
  (err,row)=>{

    if(row.count===0){

      db.run(`
      INSERT INTO products (name,category,price)
      VALUES

      ('HP Victus','Laptop',65999),
      ('Dell G15','Laptop',72999),
      ('Lenovo LOQ','Laptop',69999),
      ('Acer Nitro V','Laptop',67999),
      ('MacBook Air M3','Laptop',109900),

      ('Logitech G102','Mouse',1499),
      ('Logitech G304','Mouse',2999),

      ('Cosmic Byte CB-GK-16','Keyboard',1999),
      ('Redragon K552','Keyboard',3499),

      ('Sony WH-CH520','Headphones',4499),
      ('Boat Rockerz 550','Headphones',1999),

      ('JBL Go 3','Speaker',2999),
      ('Boat Stone 350','Speaker',1799),

      ('Razer Gigantus V2','Mouse Pad',999),

      ('Realme Buds Air 6','Earbuds',2999)
      `);

      console.log("✅ Default products inserted");

    }

  }
);

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
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



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

  const id = req.params.id;

  db.get(
    "SELECT * FROM products WHERE id = ?",
    [id],

    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (!row) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.status(200).json(row);

    }
  );

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