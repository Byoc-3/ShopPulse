// =====================================================
// SHOPPULSE - PRODUCT FILTERING & PRODUCT SELECTION
// =====================================================


// -----------------------------------------------------
// 1. GET ELEMENTS FROM HTML
// -----------------------------------------------------

const productGrid = document.getElementById("product-grid");

const productSearch = document.getElementById("product-search");

const searchButton = document.getElementById("search-button");

const sortProducts = document.getElementById("sort-products");

const productCount = document.getElementById("product-count");

const noResults = document.getElementById("no-results");

const clearSearch = document.getElementById("clear-search");

const categoryButtons =
    document.querySelectorAll(".category-button");


// Product modal

const productModal =
    document.getElementById("product-modal");

const closeProductModal =
    document.getElementById("close-product-modal");

const modalProductImage =
    document.getElementById("modal-product-image");

const modalProductName =
    document.getElementById("modal-product-name");

const modalProductCategory =
    document.getElementById("modal-product-category");

const modalProductPrice =
    document.getElementById("modal-product-price");

const modalProductDescription =
    document.getElementById("modal-product-description");

const modalQuantity =
    document.getElementById("modal-quantity");

const modalDecrease =
    document.getElementById("modal-decrease");

const modalIncrease =
    document.getElementById("modal-increase");

const modalAddToCart =
    document.getElementById("modal-add-to-cart");


// -----------------------------------------------------
// 2. SHOP STATE
// -----------------------------------------------------

let currentCategory = "All";

let currentSearch = "";

let currentSort = "featured";

let selectedProduct = null;

let selectedQuantity = 1;


// -----------------------------------------------------
// 3. FORMAT PRICE
// -----------------------------------------------------

function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);

}


// -----------------------------------------------------
// 4. CREATE PRODUCT CARD
// -----------------------------------------------------

function createProductCard(product) {

    const card = document.createElement("article");

    card.classList.add("product-card");


    card.innerHTML = `

        <div class="product-image-container">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                loading="lazy"
            >

            <button
                type="button"
                class="quick-view-button"
                data-product-id="${product.id}"
            >
                Quick View
            </button>

        </div>


        <div class="product-info">

            <p class="product-category">
                ${product.category}
            </p>

            <h3 class="product-name">
                ${product.name}
            </h3>


            <div class="product-rating">

                <span>
                    ★★★★★
                </span>

                <small>
                    ${product.rating}
                </small>

            </div>


            <div class="product-bottom">

                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>

                <button
                    type="button"
                    class="add-to-cart-button"
                    data-product-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>

        </div>

    `;


    return card;

}


// -----------------------------------------------------
// 5. DISPLAY PRODUCTS
// -----------------------------------------------------

function displayProducts(productList) {

    productGrid.innerHTML = "";


    // No products found

    if (productList.length === 0) {

        noResults.hidden = false;

        productGrid.hidden = true;

        productCount.textContent =
            "No products found";

        return;

    }


    // Products found

    noResults.hidden = true;

    productGrid.hidden = false;


    productCount.textContent =
        `Showing ${productList.length} product${productList.length === 1 ? "" : "s"}`;


    productList.forEach(product => {

        const card = createProductCard(product);

        productGrid.appendChild(card);

    });

}


// -----------------------------------------------------
// 6. FILTER PRODUCTS
// -----------------------------------------------------

function filterProducts() {

    let filteredProducts = [...products];


    // -----------------------------
    // CATEGORY FILTER
    // -----------------------------

    if (currentCategory !== "All") {

        filteredProducts = filteredProducts.filter(
            product =>
                product.category === currentCategory
        );

    }


    // -----------------------------
    // SEARCH FILTER
    // -----------------------------

    if (currentSearch.trim() !== "") {

        const searchTerm =
            currentSearch.toLowerCase().trim();


        filteredProducts =
            filteredProducts.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                product.description
                    .toLowerCase()
                    .includes(searchTerm)

            );

    }


    // -----------------------------
    // SORT PRODUCTS
    // -----------------------------

    switch (currentSort) {


        case "price-low":

            filteredProducts.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "price-high":

            filteredProducts.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "name":

            filteredProducts.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;


        case "featured":

        default:

            // Keep original order

            break;

    }


    displayProducts(filteredProducts);

}


// -----------------------------------------------------
// 7. CATEGORY BUTTONS
// -----------------------------------------------------

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentCategory =
            button.dataset.category;


        // Remove active state

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Add active state to clicked button

        button.classList.add("active");


        filterProducts();

    });

});


// -----------------------------------------------------
// 8. SEARCH INPUT
// -----------------------------------------------------

if (productSearch) {

    productSearch.addEventListener(
        "input",
        () => {

            currentSearch =
                productSearch.value;

            filterProducts();

        }
    );

}


// -----------------------------------------------------
// 9. SEARCH BUTTON
// -----------------------------------------------------

if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            currentSearch =
                productSearch.value;

            filterProducts();

        }
    );

}


// -----------------------------------------------------
// 10. SORT PRODUCTS
// -----------------------------------------------------

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        () => {

            currentSort =
                sortProducts.value;

            filterProducts();

        }
    );

}


// -----------------------------------------------------
// 11. CLEAR SEARCH
// -----------------------------------------------------

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            currentCategory = "All";

            currentSearch = "";

            currentSort = "featured";


            productSearch.value = "";

            sortProducts.value = "featured";


            categoryButtons.forEach(button => {

                button.classList.remove("active");

            });


            const allButton =
                document.querySelector(
                    '[data-category="All"]'
                );


            if (allButton) {

                allButton.classList.add("active");

            }


            filterProducts();

        }
    );

}


// -----------------------------------------------------
// 12. OPEN PRODUCT DETAILS
// -----------------------------------------------------

function openProductModal(productId) {

    selectedProduct =
        products.find(
            product =>
                product.id === Number(productId)
        );


    if (!selectedProduct) {
        return;
    }


    // Reset quantity

    selectedQuantity = 1;

    modalQuantity.textContent =
        selectedQuantity;


    // Product image

    modalProductImage.src =
        selectedProduct.image;

    modalProductImage.alt =
        selectedProduct.name;


    // Product information

    modalProductName.textContent =
        selectedProduct.name;

    modalProductCategory.textContent =
        selectedProduct.category;

    modalProductPrice.textContent =
        formatPrice(selectedProduct.price);

    modalProductDescription.textContent =
        selectedProduct.description;


    // Show modal

    productModal.hidden = false;

    document.body.classList.add("modal-open");

}


// -----------------------------------------------------
// 13. CLOSE PRODUCT MODAL
// -----------------------------------------------------

function closeProductDetails() {

    productModal.hidden = true;

    document.body.classList.remove("modal-open");

    selectedProduct = null;

}


// Close button

if (closeProductModal) {

    closeProductModal.addEventListener(
        "click",
        closeProductDetails
    );

}


// Close by clicking outside modal

if (productModal) {

    productModal.addEventListener(
        "click",
        event => {

            if (
                event.target === productModal
            ) {

                closeProductDetails();

            }

        }
    );

}


// -----------------------------------------------------
// 14. PRODUCT CARD CLICK EVENTS
// -----------------------------------------------------

productGrid.addEventListener(
    "click",
    event => {


        // QUICK VIEW

        const quickView =
            event.target.closest(
                ".quick-view-button"
            );


        if (quickView) {

            const productId =
                quickView.dataset.productId;


            openProductModal(productId);

            return;

        }


        // ADD TO CART

        const addButton =
            event.target.closest(
                ".add-to-cart-button"
            );


        if (addButton) {

            const productId =
                addButton.dataset.productId;


            const product =
                products.find(
                    item =>
                        item.id === Number(productId)
                );


            if (product) {

                addProductToCart(product, 1);

            }

        }

    }
);


// -----------------------------------------------------
// 15. QUANTITY - DECREASE
// -----------------------------------------------------

if (modalDecrease) {

    modalDecrease.addEventListener(
        "click",
        () => {

            if (selectedQuantity > 1) {

                selectedQuantity--;

                modalQuantity.textContent =
                    selectedQuantity;

            }

        }
    );

}


// -----------------------------------------------------
// 16. QUANTITY - INCREASE
// -----------------------------------------------------

if (modalIncrease) {

    modalIncrease.addEventListener(
        "click",
        () => {

            selectedQuantity++;

            modalQuantity.textContent =
                selectedQuantity;

        }
    );

}


// -----------------------------------------------------
// 17. ADD SELECTED PRODUCT TO CART
// -----------------------------------------------------

if (modalAddToCart) {

    modalAddToCart.addEventListener(
        "click",
        () => {

            if (!selectedProduct) {
                return;
            }


            addProductToCart(
                selectedProduct,
                selectedQuantity
            );


            closeProductDetails();

        }
    );

}


// -----------------------------------------------------
// 18. ADD PRODUCT TO CART
// -----------------------------------------------------

function addProductToCart(product, quantity) {

    /*
        This function connects app.js
        to cart.js.

        cart.js will contain the actual
        cart management logic.
    */

    if (
        typeof addToCart === "function"
    ) {

        addToCart(
            product,
            quantity
        );

    } else {

        console.log(
            "Product selected:",
            product.name
        );

        console.log(
            "Quantity:",
            quantity
        );

    }

}


// -----------------------------------------------------
// 19. READ CATEGORY FROM URL
// -----------------------------------------------------

function loadCategoryFromURL() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const category =
        urlParams.get("category");


    if (!category) {
        return;
    }


    const validCategory =
        products.some(
            product =>
                product.category === category
        );


    if (!validCategory) {
        return;
    }


    currentCategory = category;


    categoryButtons.forEach(button => {

        button.classList.remove("active");


        if (
            button.dataset.category === category
        ) {

            button.classList.add("active");

        }

    });

}


// -----------------------------------------------------
// 20. ESC KEY CLOSES MODAL
// -----------------------------------------------------

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            productModal &&
            !productModal.hidden
        ) {

            closeProductDetails();

        }

    }
);


// -----------------------------------------------------
// 21. INITIALIZE SHOP
// -----------------------------------------------------

function initializeShop() {

    loadCategoryFromURL();

    filterProducts();

}


// Start the shop

initializeShop();