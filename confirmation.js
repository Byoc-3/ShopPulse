// Read the order data saved by checkout.js
const orderNumber = localStorage.getItem('orderNumber');
const orderTotal = localStorage.getItem('orderTotal');

// Format as Naira currency
function formatPrice(amount) {
  return '₦' + Number(amount).toLocaleString();
}

// Fill in the receipt box
document.getElementById('orderNumber').textContent = orderNumber || 'N/A';
document.getElementById('orderTotal').textContent = orderTotal ? formatPrice(orderTotal) : 'N/A';

// Estimated delivery = today + 3 days
const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 3);
const formattedDate = deliveryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
document.getElementById('deliveryDate').textContent = formattedDate;

// Clean up so a page refresh doesn't show stale data forever
localStorage.removeItem('orderNumber');
localStorage.removeItem('orderTotal');