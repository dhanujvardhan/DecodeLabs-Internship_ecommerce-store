

const productGrid = document.querySelector(".product-grid");

async function loadProducts() {

  try {

    const response =
    await fetch(
    "https://ecommerce-store-u1gk.onrender.com/products"
    );

    const products =
    await response.json();

    const productImages = {

   "HP Victus":"images/hp-victus.jpg",
   "Dell G15":"images/dell-g15.jpg",
   "Lenovo LOQ":"images/lenovo-loq.jpg",
   "Acer Nitro V":"images/acer-nitro-v.jpg",
   "MacBook Air M3":"images/macbook-air-m3.jpg",

   "Logitech G102":"images/logitech-g102.jpg",
   "Logitech G304":"images/logitech-g304.jpg",

   "Cosmic Byte CB-GK-16":"images/cosmic-byte-gk16.jpg",
   "Redragon K552":"images/redragon-k552.jpg",

   "Sony WH-CH520":"images/sony-whch520.jpg",
   "Boat Rockerz 550":"images/boat-rockerz550.jpg",

   "JBL Go 3":"images/jbl-go3.jpg",
   "Boat Stone 350":"images/boat-stone350.jpg",

   "Razer Gigantus V2":"images/razer-gigantus.jpg",

   "Realme Buds Air 6":"images/realme-buds-air6.jpg"

   };

    const productGrid =
    document.querySelector(".product-grid");

    productGrid.innerHTML = "";

    products.forEach(product => {

      productGrid.innerHTML += `

      <div class="card">

        <img
        src="${productImages[product.name]}"
        alt="${product.name}"
        >

        <h3>${product.name}</h3>

        <p class="specs">
        Category: ${product.category}
        </p>

        <p class="price">
        ₹${product.price.toLocaleString()}
        </p>

        <button
         onclick="addToWishlist('${product.name}')"
         >
         ❤️ Wishlist
        </button>
        
        

        <button
         onclick="
         showDetails(
         '${product.name}',
         '${product.category}',
         ${product.price}
         )"
         >
         View Details
        </button>


        <button
        onclick="addToCart('${product.name}',${product.price})"
        >
        Add To Cart
        </button>

      </div>

      `;

    });

  }

  catch(error){

    console.error(error);

  }

}




/* ===========================
   SHOPPING CART
=========================== */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let total = cart.reduce(
(sum,item) => sum + item.price,
0
);

let orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

let wishlist =
JSON.parse(
localStorage.getItem("wishlist")
) || [];

async function addToCart(productName, price){

 try{

  const response = await fetch(
   "https://ecommerce-store-u1gk.onrender.com/cart",
   {
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body: JSON.stringify({
     product_name: productName,
     price: price
    })
   }
  );

  const data = await response.json();

  console.log(data);

  showToast(
   `${productName} Added Successfully`
  );

  loadCart();

 }
 catch(error){

  console.error(error);

 }

}


async function loadCart(){

 try{

   const response = await fetch(
   "https://ecommerce-store-u1gk.onrender.com/cart"
   );

  const cart = await response.json();

  console.log("Cart Data:", cart);

 }
 catch(error){

  console.error(error);

 }

}



/* ===========================
   UPDATE CART
=========================== */

function updateCart(){

const cartItems =
document.getElementById("cartItems");

const totalPrice =
document.getElementById("totalPrice");

cartItems.innerHTML = "";

cart.forEach((item,index)=>{

const li =
document.createElement("li");

li.innerHTML = `

${item.name}

<button onclick="decreaseQuantity(${index})">
-
</button>

${item.quantity}

<button onclick="increaseQuantity(${index})">
+
</button>

- ₹${(item.price * item.quantity).toLocaleString()}

<button
onclick="removeFromCart(${index})"
style="
margin-left:10px;
background:red;
color:white;
border:none;
padding:5px 10px;
border-radius:5px;
cursor:pointer;
">
Remove
</button>

`;

cartItems.appendChild(li);

});

totalPrice.innerText =
`Total: ₹${total.toLocaleString()}`;

updateCartCount();

}

function updateCartCount(){

 document.getElementById(
 "cartCount"
 ).innerText = cart.length;

}


/* ===========================
   REMOVE FROM CART
=========================== */

function removeFromCart(index){

total -= cart[index].price;

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCart();

}

/* ===========================
   DARK MODE
=========================== */

const darkModeBtn =
document.getElementById(
"darkModeBtn"
);

darkModeBtn.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark-mode"
);

if(
document.body.classList.contains(
"dark-mode"
)
){
darkModeBtn.innerHTML="☀️";
}
else{
darkModeBtn.innerHTML="🌙";
}

}
);

/* ===========================
   SEARCH PRODUCTS
=========================== */

const searchInput =
document.getElementById(
"searchInput"
);

searchInput.addEventListener(
"keyup",
function(){

const filter =
searchInput.value.toLowerCase();

const cards =
document.querySelectorAll(
".card"
);

cards.forEach(card=>{

const title =
card.querySelector("h3")
.innerText
.toLowerCase();

if(
title.includes(filter)
){
card.style.display="block";
}
else{
card.style.display="none";
}

});

}
);

/* ===========================
   CATEGORY FILTER
=========================== */

const categoryButtons =
document.querySelectorAll(
".category-btn"
);

categoryButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

const category =
button.innerText
.toLowerCase();

const cards =
document.querySelectorAll(
".card"
);

cards.forEach(card=>{

const title =
card.querySelector("h3")
.innerText
.toLowerCase();

if(
category === "gaming"
){

if(
title.includes("victus") ||
title.includes("g15") ||
title.includes("loq") ||
title.includes("tuf")
){
card.style.display="block";
}
else{
card.style.display="none";
}

}

else if(
category === "student"
){

if(
title.includes("pavilion")
){
card.style.display="block";
}
else{
card.style.display="none";
}

}

else if(
category === "macbook"
){

if(
title.includes("macbook")
){
card.style.display="block";
}
else{
card.style.display="none";
}

}

else{

card.style.display="block";

}

});

});

});

/* ===========================
   CONTACT FORM
=========================== */

const contactForm =
document.querySelector(
".contact-form"
);

contactForm.addEventListener(
"submit",
function(e){

e.preventDefault();

alert(
"Message Sent Successfully!"
);

contactForm.reset();

}
);

/* ===========================
   PAGE LOAD
=========================== */
window.onload = () => {

  loadProducts();

  loadCart();

  updateCart();

  updateWishlist();

  updateOrderHistory();

  console.log(
   "TechStore Pro Loaded Successfully"
  );

};




function showToast(message){

 const toast =
 document.getElementById("toast");

 toast.innerText = message;

 toast.style.display = "block";

 setTimeout(()=>{

  toast.style.display = "none";

 },2000);

}
function increaseQuantity(index){

 cart[index].quantity++;

 total += cart[index].price;

 updateCart();

}

function decreaseQuantity(index){

 if(cart[index].quantity > 1){

  cart[index].quantity--;

  total -= cart[index].price;

 }
 else{

  total -= cart[index].price;

  cart.splice(index,1);

 }

 updateCart();

}

function showDetails(
name,
category,
price
){

 document.getElementById(
 "modalBody"
 ).innerHTML = `

 <h2>${name}</h2>

 <p><strong>Category:</strong> ${category}</p>

 <p><strong>Price:</strong> ₹${price.toLocaleString()}</p>

 <p>🚚 Free Delivery</p>

 <p>🛡️ 1 Year Warranty</p>

 <p>🔄 7 Days Replacement</p>

 `;

 document.getElementById(
 "productModal"
 ).style.display = "block";

}

window.addEventListener("DOMContentLoaded", () => {

 const closeBtn =
 document.getElementById("closeModal");

 if(closeBtn){

  closeBtn.addEventListener("click", () => {

   document.getElementById(
   "productModal"
   ).style.display = "none";

  });

 }

});
window.onclick = function(event){

 const modal =
 document.getElementById(
 "productModal"
 );

 if(event.target === modal){

  modal.style.display = "none";

 }

};

function addToWishlist(productName){

 if(!wishlist.includes(productName)){

  wishlist.push(productName);

  localStorage.setItem(
   "wishlist",
   JSON.stringify(wishlist)
  );

  updateWishlist();

  showToast(
   `${productName} Added To Wishlist`
  );

 }

}

function updateWishlist(){

 const wishlistItems =
 document.getElementById(
 "wishlistItems"
 );

 wishlistItems.innerHTML = "";

 wishlist.forEach((item,index)=>{

  const li =
  document.createElement("li");

  li.innerHTML = `

  ${item}

  <button
  onclick="removeFromWishlist(${index})"
  style="
  margin-left:10px;
  background:red;
  color:white;
  border:none;
  padding:5px 10px;
  border-radius:5px;
  cursor:pointer;
  ">
  remove
  </button>

  `;

  wishlistItems.appendChild(li);

 });

}

function removeFromWishlist(index){

 wishlist.splice(index,1);

 localStorage.setItem(
 "wishlist",
 JSON.stringify(wishlist)
 );

 updateWishlist();

 showToast(
 "Item Removed From Wishlist"
 );

}

const checkoutForm =
document.getElementById(
"checkoutForm"
);

if(checkoutForm){

 checkoutForm.addEventListener(
 "submit",
 function(e){

  e.preventDefault();

  const name =
  document.getElementById(
  "customerName"
  ).value;



const newOrder = {

 id: orders.length + 1,

 customer: name,

 products: cart.map(
 item => `${item.name} x${item.quantity}`
 ),

 total: total,

 date:
 new Date()
 .toLocaleDateString()

};

orders.push(newOrder);

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

updateOrderHistory();


  alert(
  `Order Placed Successfully!\n\nThank You ${name}`
  );

  cart = [];

  total = 0;

  localStorage.removeItem(
  "cart"
  );

  updateCart();

  checkoutForm.reset();

 });

}

function updateOrderHistory(){

 const orderList =
 document.getElementById(
 "orderList"
 );

 orderList.innerHTML = "";

 orders.forEach(order=>{

  const li =
  document.createElement("li");

li.innerHTML = `

<strong>
📦 Order #${order.id}
</strong>

<br><br>

👤 Customer:
${order.customer}

<br><br>

🛍️ Products:

<ul>

${order.products
? order.products.map(product =>
`<li>${product}</li>`
).join("")
: "<li>No Product Data</li>"
}

</ul>

💰 Total:
₹${order.total.toLocaleString()}

<br><br>

📅 Date:
${order.date}

`;

  orderList.appendChild(li);

 });

}

