// Mock cart data — this will later be replaced with real cart state
let cartItems = [
  { id: 1, name: "AirPods Pro", price: 250000, quantity: 2, image: "https://placehold.co/60x60/f0f0f0/333?text=AirPods" },
  { id: 2, name: "Smart Watch", price: 180000, quantity: 1, image: "https://placehold.co/60x60/f0f0f0/333?text=Watch" },
  { id: 3, name: "Leather Handbag", price: 40000, quantity: 1, image: "https://placehold.co/60x60/f0f0f0/333?text=Bag" }
];

// Grab the elements we need
const cartIconBtn = document.getElementById('cartIconBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const checkoutBtn = document.getElementById('checkoutBtn');
const overlay = document.getElementById('overlay');

// Function to open the cart
function openCart() {
  cartDrawer.classList.add('active');
  overlay.classList.add('active');
}

// Function to close the cart
function closeCart() {
  cartDrawer.classList.remove('active');
  overlay.classList.remove('active');
}

// Event listeners
cartIconBtn.addEventListener('click', openCart);
checkoutBtn.addEventListener('click', function() {
  window.location.href = 'checkout.html';
});
closeCartBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart); // clicking outside also closes it

// Grab more elements we need
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const deliveryFee = 5000;

// Function to format numbers as Naira currency
function formatPrice(amount) {
  return '₦' + amount.toLocaleString();
}

// Function to render all cart items to the page
function renderCart() {
  cartItemsContainer.innerHTML = ''; // clear existing items first

  cartItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <p class="item-name">${item.name}</p>
        <p class="item-price">${formatPrice(item.price)}</p>
        <div class="quantity-controls">
          <button class="qty-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <span class="remove-btn" data-id="${item.id}">🗑</span>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  updateCartSummary();
}

// Function to update count, subtotal, and total
function updateCartSummary() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  cartCount.textContent = totalItems;
  subtotalEl.textContent = formatPrice(subtotal);
  totalEl.textContent = formatPrice(total);
}

// Run this once when the page loads
renderCart();

// Listen for clicks anywhere inside the cart items container
cartItemsContainer.addEventListener('click', function(e) {
  const id = Number(e.target.dataset.id); // grab the product id from the clicked button

  if (e.target.classList.contains('increase')) {
    increaseQuantity(id);
  }

  if (e.target.classList.contains('decrease')) {
    decreaseQuantity(id);
  }

  if (e.target.classList.contains('remove-btn')) {
    removeItem(id);
  }
});

// Increase quantity by 1
function increaseQuantity(id) {
  const item = cartItems.find(item => item.id === id);
  item.quantity += 1;
  renderCart();
}

// Decrease quantity by 1 (but remove item if it hits 0)
function decreaseQuantity(id) {
  const item = cartItems.find(item => item.id === id);
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeItem(id); // if quantity would go to 0, just remove it
    return;
  }
  renderCart();
}

// Remove item completely from the cart
function removeItem(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  renderCart();
}