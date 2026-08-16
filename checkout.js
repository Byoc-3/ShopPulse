// Reusing the same mock cart data (later this will come from the actual cart state,
// e.g. shared via localStorage once cart.js and checkout.js are connected)
let cartItems = [
  { id: 1, name: "AirPods Pro", price: 250000, quantity: 2 },
  { id: 2, name: "Smart Watch", price: 180000, quantity: 1 },
  { id: 3, name: "Leather Handbag", price: 40000, quantity: 1 }
];

const deliveryFee = 5000;

// Grab the elements we need
const orderItemsContainer = document.getElementById('orderItemsContainer');
const checkoutSubtotal = document.getElementById('checkoutSubtotal');
const checkoutTotal = document.getElementById('checkoutTotal');
const cartCount = document.getElementById('cartCount');
const placeOrderBtn = document.getElementById('placeOrderBtn');

// Format numbers as Naira currency
function formatPrice(amount) {
  return '₦' + amount.toLocaleString();
}

// Render each item into the order summary
function renderOrderSummary() {
  orderItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('order-item');
    row.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>${formatPrice(item.price * item.quantity)}</span>
    `;
    orderItemsContainer.appendChild(row);
  });

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  cartCount.textContent = totalItems;
  checkoutSubtotal.textContent = formatPrice(subtotal);
  checkoutTotal.textContent = formatPrice(total);
}

// Validate the form fields
function validateForm() {
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!fullName || !email || !phone || !address) {
    alert('Please fill in all required fields before placing your order.');
    return false;
  }
  return true;
}

// Handle "Place Order" click
placeOrderBtn.addEventListener('click', function() {
  if (validateForm()) {
    // Generate a random order number, e.g. LUXE-48213
    const orderNumber = 'LUXE-' + Math.floor(10000 + Math.random() * 90000);

    // Calculate the total again to pass it along
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;

    // Save order details so confirmation.html can read them
    localStorage.setItem('orderNumber', orderNumber);
    localStorage.setItem('orderTotal', total);

    // Show a loading state on the button
    placeOrderBtn.textContent = 'PLACING ORDER...';
    placeOrderBtn.disabled = true;
    placeOrderBtn.style.opacity = '0.7';
    placeOrderBtn.style.cursor = 'not-allowed';

    // Wait 1.5 seconds before redirecting, to simulate processing
    setTimeout(function() {
      window.location.href = 'confirmation.html';
    }, 1500);
  }
});

// Run once on page load
renderOrderSummary();