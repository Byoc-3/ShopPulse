// ===================================================
// CART STATE
// Cart only stores { id, quantity } — full product
// details are looked up from the `products` array
// (already loaded globally by products.js)
// ===================================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const deliveryFee = 5000;

// Save cart to localStorage so it persists across pages
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Format numbers as Naira currency
function formatPrice(amount) {
  return '₦' + amount.toLocaleString();
}

// ===================================================
// CART ACTIONS (called by app.js when "Add to Cart" is clicked)
// ===================================================

function addToCart(productId, quantity = 1) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function increaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) item.quantity += 1;
  saveCart();
  renderCart();
}

function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCart();
}

// ===================================================
// CART CALCULATIONS
// ===================================================

function getCartTotals() {
  let subtotal = 0;
  let totalItems = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.id);
    if (product) {
      subtotal += product.price * cartItem.quantity;
      totalItems += cartItem.quantity;
    }
  });

  const total = cart.length > 0 ? subtotal + deliveryFee : 0;
  return { subtotal, total, totalItems };
}

// ===================================================
// RENDER CART
// ===================================================

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartDrawerEl = document.getElementById('cart-drawer');
  const cartCountEl = document.getElementById('cart-count');
  const subtotalEl = document.getElementById('cart-subtotal');
  const deliveryEl = document.getElementById('cart-delivery');
  const totalEl = document.getElementById('cart-total');

  if (!cartItemsContainer) return; // safety check in case cart isn't on this page

  cartItemsContainer.innerHTML = '';

  // Toggle empty state using the is-empty class (CSS handles showing/hiding)
  if (cart.length === 0) {
    cartDrawerEl.classList.add('is-empty');
  } else {
    cartDrawerEl.classList.remove('is-empty');

    cart.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (!product) return;

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="cart-item-info">
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatPrice(product.price)}</p>
          <div class="cart-item-qty">
            <button class="decrease" data-id="${product.id}">−</button>
            <span>${cartItem.quantity}</span>
            <button class="increase" data-id="${product.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${product.id}">×</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  // Update totals
  const { subtotal, total, totalItems } = getCartTotals();
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (deliveryEl) deliveryEl.textContent = formatPrice(deliveryFee);
  if (totalEl) totalEl.textContent = formatPrice(total);
  if (cartCountEl) cartCountEl.textContent = totalItems;
}

// ===================================================
// EVENT LISTENERS
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsContainer = document.getElementById('cart-items');
  const continueShoppingBtn = document.getElementById('continue-shopping');
  const continueShoppingBottomBtn = document.getElementById('continue-shopping-bottom');

  function openCart() {
    cartDrawer.classList.add('is-open');
    cartOverlay.hidden = false;
    cartOverlay.classList.add('is-open');
  }

  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartOverlay.classList.remove('is-open');
    cartOverlay.hidden = true;
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCart);
  if (continueShoppingBottomBtn) continueShoppingBottomBtn.addEventListener('click', closeCart);

  // Handle quantity +/- and remove clicks (event delegation)
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', function(e) {
      const id = Number(e.target.dataset.id);
      if (!id) return;

      if (e.target.classList.contains('increase')) increaseQuantity(id);
      if (e.target.classList.contains('decrease')) decreaseQuantity(id);
      if (e.target.classList.contains('cart-item-remove')) removeFromCart(id);
    });
  }

  // Render cart on page load
  renderCart();
});