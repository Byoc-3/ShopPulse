```javascript
// ======================================
// SHOPPULSE APP.JS
// Product Rendering + Search + Filter +
// Sort + Product Modal + Add To Cart
// ======================================

let filteredProducts = [...products];

let currentProduct = null;
let selectedQuantity = 1;

// ======================================
// ELEMENTS
// ======================================

const productGrid = document.getElementById("product-grid");
const productCount = document.getElementById("product-count");
const noResults = document.getElementById("no-results");

const searchInput = document.getElementById("product-search");
const sortSelect = document.getElementById("sort-products");

const categoryButtons = document.querySelectorAll(".category-button");

// Modal
const productModal = document.getElementById("product-modal");
const closeModalBtn = document.getElementById("close-product-modal");

const modalImage = document.getElementById("modal-product-image");
const modalName = document.getElementById("modal-product-name");
const modalPrice = document.getElementById("modal-product-price");
const modalCategory = document.getElementById("modal-product-category");
const modalDescription = document.getElementById("modal-product-description");

const modalQuantity = document.getElementById("modal-quantity");
const modalIncrease = document.getElementById("modal-increase");
const modalDecrease = document.getElementById("modal-decrease");

const modalAddToCart = document.getElementById("modal-add-to-cart");

// ======================================
// HELPERS
// ======================================

function formatPrice(amount) {
    return "₦" + amount.toLocaleString();
}

// ======================================
// RENDER PRODUCTS
// ======================================

function renderProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        noResults.hidden = false;
        productCount.textContent = "0 products found";
        return;
    }

    noResults.hidden = true;

    productCount.textContent =
        `Showing ${productList.length} product${productList.length !== 1 ? "s" : ""}`;

    productList.forEach(product => {

        const card = document.createElement("article");

        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            </div>

            <div class="product-content">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>

                <button
                    class="view-product-button"
                    data-id="${product.id}"
                >
                    View Product
                </button>

            </div>
        `;

        productGrid.appendChild(card);
    });
}

// ======================================
// PRODUCT MODAL
// ======================================

function openProductModal(productId) {

    currentProduct =
        products.find(product => product.id === productId);

    if (!currentProduct) return;

    selectedQuantity = 1;

    modalImage.src = currentProduct.image;
    modalImage.alt = currentProduct.name;

    modalName.textContent = currentProduct.name;
    modalPrice.textContent = formatPrice(currentProduct.price);
    modalCategory.textContent = currentProduct.category;
    modalDescription.textContent = currentProduct.description;

    modalQuantity.textContent = selectedQuantity;

    productModal.hidden = false;
}

function closeProductModal() {
    productModal.hidden = true;
}

// ======================================
// QUANTITY
// ======================================

modalIncrease.addEventListener("click", () => {
    selectedQuantity++;
    modalQuantity.textContent = selectedQuantity;
});

modalDecrease.addEventListener("click", () => {

    if (selectedQuantity > 1) {
        selectedQuantity--;
        modalQuantity.textContent = selectedQuantity;
    }

});

// ======================================
// ADD TO CART
// ======================================

modalAddToCart.addEventListener("click", () => {

    if (!currentProduct) return;

    addToCart(
        currentProduct.id,
        selectedQuantity
    );

    closeProductModal();
});

// ======================================
// FILTERING
// ======================================

function filterProducts(category) {

    if (category === "All") {
        filteredProducts = [...products];
    }
    else {
        filteredProducts =
            products.filter(
                product =>
                    product.category === category
            );
    }

    applySearchAndSort();
}

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        filterProducts(
            button.dataset.category
        );
    });

});

// ======================================
// SEARCH
// ======================================

function applySearchAndSort() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    let result =
        filteredProducts.filter(product =>
            product.name
                .toLowerCase()
                .includes(searchTerm)
        );

    const sortValue = sortSelect.value;

    if (sortValue === "price-low") {
        result.sort((a, b) =>
            a.price - b.price
        );
    }

    if (sortValue === "price-high") {
        result.sort((a, b) =>
            b.price - a.price
        );
    }

    if (sortValue === "name") {
        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    renderProducts(result);
}

searchInput.addEventListener(
    "input",
    applySearchAndSort
);

sortSelect.addEventListener(
    "change",
    applySearchAndSort
);

// ======================================
// EVENT DELEGATION
// ======================================

productGrid.addEventListener("click", event => {

    const button =
        event.target.closest(
            ".view-product-button"
        );

    if (!button) return;

    const productId =
        Number(button.dataset.id);

    openProductModal(productId);
});

closeModalBtn.addEventListener(
    "click",
    closeProductModal
);

productModal.addEventListener(
    "click",
    event => {

        if (event.target === productModal) {
            closeProductModal();
        }
    }
);

// ======================================
// INITIALIZE
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProducts(products);

    }
);
```
