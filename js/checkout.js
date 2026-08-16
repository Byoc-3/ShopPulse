// Grab elements from checkout.html
const checkoutItemsContainer = document.getElementById('checkout-items');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutTotal = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');

// Modal elements
const errorModal = document.getElementById('error-modal');
const errorModalMessage = document.getElementById('error-modal-message');
const closeErrorModalBtn = document.getElementById('close-error-modal');
const errorModalBtn = document.getElementById('error-modal-button');
const successModal = document.getElementById('success-modal');

// Render the order summary using cart data from cart.js
function renderCheckoutSummary() {
  checkoutItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('checkout-item-row');
    row.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span>${formatPrice(item.price * item.quantity)}</span>
    `;
    checkoutItemsContainer.appendChild(row);
  });

  const { subtotal, total } = getCartTotals();
  checkoutSubtotal.textContent = formatPrice(subtotal);
  checkoutTotal.textContent = formatPrice(total);
}

// Show error modal with a specific message
function showErrorModal(message) {
  errorModalMessage.textContent = message;
  errorModal.hidden = false;
}

// Hide error modal
function hideErrorModal() {
  errorModal.hidden = true;
}

closeErrorModalBtn.addEventListener('click', hideErrorModal);
errorModalBtn.addEventListener('click', hideErrorModal);

// Validate the form
function validateCheckoutForm() {
  const fullName = document.getElementById('full-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const country = document.getElementById('country').value;
  const paymentSelected = document.querySelector('input[name="payment"]:checked');

  if (!fullName || !email || !phone || !address || !city || !country) {
    showErrorModal('Please fill in all required fields before placing your order.');
    return false;
  }

  if (!paymentSelected) {
    showErrorModal('Please select a payment method.');
    return false;
  }

  return true;
}

// Handle form submission
checkoutForm.addEventListener('submit', function(e) {
  e.preventDefault(); // stop the page from reloading

  if (validateCheckoutForm()) {
    // Generate order number
    const orderNumber = 'ShopPulse-' + Math.floor(10000 + Math.random() * 90000);

    // Update the success modal with the real order number
    document.querySelector('.order-number').textContent = 'Order #' + orderNumber;

    // Clear the cart after successful order
    cartItems = [];
    saveCart();

    // Show success modal
    successModal.hidden = false;
  }
});

// Run once on page load
renderCheckoutSummary();