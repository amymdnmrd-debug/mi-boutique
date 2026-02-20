// Array para guardar los productos que el cliente agrega
let cart = [];

// Conectar Stripe (pon tu clave pública)
let stripe = Stripe("TU_PUBLIC_KEY_DE_STRIPE"); 

// Cargar productos desde products.json
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("products");
    data.forEach(product => {
      container.innerHTML += `
        <div>
          <h3>${product.name}</h3>
          <p>$${product.price / 100}</p>
          <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Agregar</button>
        </div>
      `;
    });
  });

// Función para agregar un producto al carrito
function addToCart(id, name, price) {
  cart.push({id, name, price});
  renderCart();
}

// Función para mostrar el carrito
function renderCart() {
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartDiv.innerHTML += `<p>${item.name} - $${item.price / 100}</p>`;
  });

  cartDiv.innerHTML += `<h3>Total: $${total / 100}</h3>`;
}

// Función para enviar carrito a Stripe y abrir Checkout
function checkout() {
  fetch("TU_BACKEND_STRIPE_URL", { // Pon aquí tu URL del backend gratis
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({cart})
  })
  .then(res => res.json())
  .then(data => {
    stripe.redirectToCheckout({ sessionId: data.id });
  });
}
