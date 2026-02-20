// Array para guardar productos en el carrito
let cart = [];
let stripe = Stripe("TU_PUBLIC_KEY_DE_STRIPE"); // Poner tu clave pública

// Banner rotativo
const banner = document.getElementById('banner-text');
const messages = [
  "Free Shipping on orders over $29.99",
  "New Arrivals: Check our latest collection!",
  "Limited Time Offer: Buy 2 Get 1 Free!"
];
let bannerIndex = 0;
function rotateBanner() {
  banner.textContent = messages[bannerIndex];
  bannerIndex = (bannerIndex + 1) % messages.length;
}
setInterval(rotateBanner, 4000);

// Cargar productos
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("products");
    data.forEach(product => {
      container.innerHTML += `
        <div>
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>$${product.price / 100}</p>
          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Agregar</button>
        </div>
      `;
    });
  });

// Agregar producto al carrito
function addToCart(id, name, price) {
  cart.push({id, name, price});
  renderCart();
}

// Mostrar carrito y contar items
function renderCart() {
  let cartDiv = document.getElementById("cart");
  let cartCount = document.getElementById("cart-count");
  let cartTotal = document.getElementById("cart-total");
  
  cartDiv.innerHTML = "";
  let total = 0;
  
  cart.forEach(item => {
    total += item.price;
    cartDiv.innerHTML += `<p>${item.name} - $${item.price / 100}</p>`;
  });
  
  cartCount.textContent = cart.length;
  cartTotal.textContent = `Total: $${(total/100).toFixed(2)}`;
}

// Checkout con Stripe
function checkout() {
  fetch("TU_BACKEND_STRIPE_URL", { // Poner URL de backend
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({cart})
  })
  .then(res => res.json())
  .then(data => {
    stripe.redirectToCheckout({ sessionId: data.id });
  });
}
