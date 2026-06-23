# 🛒 TechStore Pro - Full Stack E-Commerce Website

## 📌 Overview

TechStore Pro is a Full Stack E-Commerce Web Application developed using HTML, CSS, JavaScript, Node.js, Express.js, and SQLite.

The platform allows users to browse products, view product details, add products to cart, manage quantities, maintain a wishlist, and place orders. Data is stored using SQLite and served through REST APIs.

---

## 🚀 Features

### 👤 User Features

* Browse products dynamically from database
* Product details modal
* Add to Cart
* Increase/Decrease Quantity
* Remove Items from Cart
* Wishlist Management
* Order Placement
* Order History
* Responsive Design

### ⚙️ Backend Features

* REST API Architecture
* SQLite Database Integration
* Product Management APIs
* Cart Management APIs
* Quantity Update APIs
* Delete APIs
* Persistent Data Storage

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* SQLite

### Deployment

* Render
* Vercel

---

## 📂 Project Structure

```text
ecommerce-store/
│
├── Frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── techstore.db
│
└── README.md
```

---

## 📡 API Endpoints

### Products

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /products     |
| GET    | /products/:id |
| POST   | /products     |
| PUT    | /products/:id |
| DELETE | /products/:id |

### Cart

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /cart              |
| POST   | /cart              |
| PUT    | /cart/increase/:id |
| PUT    | /cart/decrease/:id |
| DELETE | /cart/:id          |

---

## 🗄️ Database Tables

### Products

* id
* name
* category
* price

### Cart

* id
* product_name
* price
* quantity

---

## 🌐 Live Demo

### Frontend:
https://ecommercestore-dun.vercel.app/

### Backend API:
https://ecommerce-store-u1gk.onrender.com

---

## 📸 Screenshots

### 🏠 Home Page

<img width="1892" height="837" alt="image" src="https://github.com/user-attachments/assets/729e344c-2e9b-4646-9d21-cc8ba832c2ed" />
<img width="1893" height="857" alt="image" src="https://github.com/user-attachments/assets/ae8dab4a-0a56-4c96-95b3-a469083d16b3" />


### 🛒 Shopping Cart

<img width="1882" height="305" alt="image" src="https://github.com/user-attachments/assets/51030fb9-8176-48ea-a09a-1346147084b8" />


### ❤️ Wishlist

<img width="1896" height="150" alt="image" src="https://github.com/user-attachments/assets/cea25dc5-d18c-4453-a646-9acdbce95287" />


### 📦 Order History

<img width="1887" height="462" alt="image" src="https://github.com/user-attachments/assets/7d3d6f2d-f82b-4656-aea8-c56ec62543a3" />

---

## ⭐ Project Highlights

- Full Stack E-Commerce Application
- REST API Integration
- SQLite Database Management
- Dynamic Product Loading
- Persistent Shopping Cart
- Wishlist Functionality
- Responsive User Interface
- Deployed on Vercel & Render

---

## 🎯 Future Improvements

* User Authentication
* Admin Dashboard
* Order Tracking
* Payment Gateway Integration
* Product Search & Filters
* Inventory Management
* User Profiles

---

## 👨‍💻 Author

**Dhanuj Vardhan Goyal**

B.Tech CSE (AI & ML)  

GitHub: https://github.com/dhanujvardhan

