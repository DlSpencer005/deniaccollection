let currentCategory = "All";
let currentSort = "newest";
let productsPerPage = 6;

document.addEventListener("DOMContentLoaded", () => {

    initFromUrl();

    displayProducts();

    setupCategoryFilters();

    setupSorting();

    setupLoadMore();
});

// ===========================================
// INITIAL STATE FROM URL (?category=..., ?wishlist=on)
// ===========================================

function initFromUrl() {

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (category) {

        currentCategory = category;

        const button = document.querySelector(`.shop-categories button[data-category="${category}"]`);

        if (button) {

            document.querySelectorAll(".shop-categories button").forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

        }

    }

}

// ===========================================
// CATEGORY FILTERS
// ===========================================

function setupCategoryFilters() {

    const buttons = document.querySelectorAll(".shop-categories button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            currentCategory = button.dataset.category;

            productsPerPage = 6;

            displayProducts();
        });

    });

}

// ===========================================
// SORT PRODUCTS
// ===========================================

function setupSorting() {

    const sortSelect = document.getElementById("sortProducts");

    if (!sortSelect) return;

    sortSelect.addEventListener("change", () => {

        currentSort = sortSelect.value;

        productsPerPage = 6;

        displayProducts();

    });

}

// ===========================================
// DISPLAY PRODUCTS
// ===========================================

function displayProducts() {

    let filteredProducts = filterByCategory(currentCategory);

    filteredProducts = sortProducts(filteredProducts, currentSort);

    if (window.filterByWishlist) filteredProducts = window.filterByWishlist(filteredProducts);

    if (window.searchProducts) filteredProducts = window.searchProducts(filteredProducts);

    const visibleProducts = filteredProducts.slice(0, productsPerPage);

    renderProducts(visibleProducts, "shopContainer");

    setupProductLinks();

    if (window.refreshWishlistIcons) refreshWishlistIcons();

    updateProductCount(filteredProducts);

    toggleLoadMoreButton(filteredProducts.length);

}

// ===========================================
// PRODUCT COUNT
// ===========================================

function updateProductCount(products) {

    const productCount = document.getElementById("productCount");

    if (!productCount) return;

    productCount.textContent = `Showing ${products.length} Products`;

}

// ===========================================
// LOAD MORE
// ===========================================

function toggleLoadMoreButton(totalProducts) {

    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!loadMoreBtn) return;

    if (productsPerPage >= totalProducts) {

        loadMoreBtn.style.display = "none";

    } else {

        loadMoreBtn.style.display = "inline-block";

    }

}

function setupLoadMore() {

    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", () => {

        productsPerPage += 6;

        displayProducts();

    });

}