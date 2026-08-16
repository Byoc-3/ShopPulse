// Shared cart state - accessible by any page that loads this file
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [
  { id: 1, name: "AirPods Pro", price: 250000, quantity: 2, image: "https://placehold.co/60x60/f0f0f0/333?text=AirPods" },
  { id: 2, name: "Smart Watch", price: 180000, quantity: 1, image: "https://placehold.co/60x60/f0f0f0/333?text=Watch" },
  { id: 3, name: "Leather Handbag", price: 40000, quantity: 1, image: "https://placehold.co/60x60/f0f0f0/333?text=Bag" }
];

const deliveryFee = 5000;

// Save cart to localStorage so it persists across pages
function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Format numbers as Naira currency
function formatPrice(amount) {
  return '₦' + amount.toLocaleString();
}

// Get cart totals
function getCartTotals() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;
  return { totalItems, subtotal, total };
}

// Update the cart count badge in the navbar (every page has this)
function updateCartCountBadge() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    const { totalItems } = getCartTotals();
    cartCountEl.textContent = totalItems;
  }
}

// Run on every page load
updateCartCountBadge();