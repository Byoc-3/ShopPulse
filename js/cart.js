// =====================================================
// SHOPPULSE - SHOPPING CART
// =====================================================


// -----------------------------------------------------
// 1. CART DATA
// -----------------------------------------------------

let cart = JSON.parse(localStorage.getItem("shopPulseCart")) || [];


// -----------------------------------------------------
// 2. GET CART ELEMENTS
// -----------------------------------------------------

const cartDrawer = document.getElementById("cart-drawer");

const cartOverlay = document.getElementById("cart-overlay");

const openCartButton = document.getElementById("open-cart");

const closeCartButton = document.getElementById("close-cart");

const cartItemsContainer = document.getElementById("cart-items");

const emptyCart = document.getElementById("empty-cart");

const cartSummary = document.getElementById("cart-summary");

const cartCount = document.getElementById("cart-count");

const cartSubtotal = document.getElementById("cart-subtotal");

const cartDelivery = document.getElementById("cart-delivery");

const cartTotal = document.getElementById("cart-total");

const continueShopping =
    document.getElementById("continue-shopping");

const continueShoppingBottom =
    document.getElementById("continue-shopping-bottom");


// -----------------------------------------------------
// 3. FORMAT PRICE
// -----------------------------------------------------

function formatCartPrice(price) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);

}


// -----------------------------------------------------
// 4. SAVE CART
// -----------------------------------------------------

function saveCart() {

    localStorage.setItem(
        "shopPulseCart",
        JSON.stringify(cart)
    );

}


// -----------------------------------------------------
// 5. ADD PRODUCT TO CART
// -----------------------------------------------------

function addToCart(product, quantity = 1) {

    // Check if product already exists

    const existingProduct = cart.find(
        item => item.id === product.id
    );


    if (existingProduct) {

        // Increase quantity

        existingProduct.quantity += quantity;

    } else {

        // Add new product

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            category: product.category,

            image: product.image,

            quantity: quantity

        });

    }


    saveCart();

    renderCart();

    updateCartCount();


    // Automatically open cart

    openCart();

}


// -----------------------------------------------------
// 6. REMOVE PRODUCT FROM CART
// -----------------------------------------------------

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== Number(productId)
    );


    saveCart();

    renderCart();

    updateCartCount();

}


// -----------------------------------------------------
// 7. CHANGE QUANTITY
// -----------------------------------------------------

function changeQuantity(productId, change) {

    const product = cart.find(
        item => item.id === Number(productId)
    );


    if (!product) {
        return;
    }


    product.quantity += change;


    // Don't allow quantity below 1

    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    renderCart();

    updateCartCount();

}


// -----------------------------------------------------
// 8. CALCULATE SUBTOTAL
// -----------------------------------------------------

function calculateSubtotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (item.price * item.quantity);

        },
        0
    );

}


// -----------------------------------------------------
// 9. UPDATE CART COUNT
// -----------------------------------------------------

function updateCartCount() {

    if (!cartCount) {
        return;
    }


    const totalItems = cart.reduce(
        (total, item) => {

            return total + item.quantity;

        },
        0
    );


    cartCount.textContent = totalItems;

}


// -----------------------------------------------------
// 10. RENDER CART
// -----------------------------------------------------

function renderCart() {

    if (!cartItemsContainer) {
        return;
    }


    cartItemsContainer.innerHTML = "";


    // -------------------------------------------------
    // EMPTY CART
    // -------------------------------------------------

    if (cart.length === 0) {

        emptyCart.hidden = false;

        cartSummary.hidden = true;

        return;

    }


    // -------------------------------------------------
    // CART HAS PRODUCTS
    // -------------------------------------------------

    emptyCart.hidden = true;

    cartSummary.hidden = false;


    // -------------------------------------------------
    // CREATE CART ITEMS
    // -------------------------------------------------

    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-item-category">
                    ${item.category}
                </p>

                <p class="cart-item-price">
                    ${formatCartPrice(item.price)}
                </p>


                <div class="cart-item-actions">


                    <div class="cart-quantity">

                        <button
                            type="button"
                            class="quantity-decrease"
                            data-id="${item.id}"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-increase"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-cart-item"
                        data-id="${item.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    // -------------------------------------------------
    // UPDATE TOTALS
    // -------------------------------------------------

    const subtotal =
        calculateSubtotal();


    const delivery =
        5000;


    const total =
        subtotal + delivery;


    cartSubtotal.textContent =
        formatCartPrice(subtotal);


    cartDelivery.textContent =
        formatCartPrice(delivery);


    cartTotal.textContent =
        formatCartPrice(total);

}


// -----------------------------------------------------
// 11. CART ITEM BUTTONS
// -----------------------------------------------------

if (cartItemsContainer) {

    cartItemsContainer.addEventListener(
        "click",
        event => {


            // INCREASE

            if (
                event.target.classList.contains(
                    "quantity-increase"
                )
            ) {

                const id =
                    event.target.dataset.id;


                changeQuantity(id, 1);

            }


            // DECREASE

            if (
                event.target.classList.contains(
                    "quantity-decrease"
                )
            ) {

                const id =
                    event.target.dataset.id;


                changeQuantity(id, -1);

            }


            // REMOVE

            if (
                event.target.classList.contains(
                    "remove-cart-item"
                )
            ) {

                const id =
                    event.target.dataset.id;


                removeFromCart(id);

            }

        }
    );

}


// -----------------------------------------------------
// 12. OPEN CART
// -----------------------------------------------------

function openCart() {

    if (!cartDrawer) {
        return;
    }


    cartDrawer.classList.add("cart-open");


    if (cartOverlay) {

        cartOverlay.hidden = false;

    }

}


// -----------------------------------------------------
// 13. CLOSE CART
// -----------------------------------------------------

function closeCart() {

    if (!cartDrawer) {
        return;
    }


    cartDrawer.classList.remove(
        "cart-open"
    );


    if (cartOverlay) {

        cartOverlay.hidden = true;

    }

}


// -----------------------------------------------------
// 14. OPEN CART BUTTON
// -----------------------------------------------------

if (openCartButton) {

    openCartButton.addEventListener(
        "click",
        openCart
    );

}


// -----------------------------------------------------
// 15. CLOSE CART BUTTON
// -----------------------------------------------------

if (closeCartButton) {

    closeCartButton.addEventListener(
        "click",
        closeCart
    );

}


// -----------------------------------------------------
// 16. CLICK OUTSIDE CART
// -----------------------------------------------------

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCart
    );

}


// -----------------------------------------------------
// 17. CONTINUE SHOPPING
// -----------------------------------------------------

if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        closeCart
    );

}


if (continueShoppingBottom) {

    continueShoppingBottom.addEventListener(
        "click",
        closeCart
    );

}


// -----------------------------------------------------
// 18. INITIALIZE CART
// -----------------------------------------------------

renderCart();

updateCartCount();