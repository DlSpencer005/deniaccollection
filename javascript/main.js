let currentCategory = "All";
let currentSort = "newest";
let productsPerPage = 6;

document.addEventListener("DOMContentLoaded", () => {

    displayProducts();

    setupCategoryFilters();

    setupSorting();

    setupLoadMore();
});


document.addEventListener("DOMContentLoaded", () => {

    let currentCategory = "All";

    let currentSort = "newest";

    displayProducts();

    setupCategoryFilters();

    setupSorting();

});

function updateProductCount(products) {

    const productCount = document.getElementById("productCount");

    if (!productCount) return;

    productCount.textContent = `Showing ${products.length} Products`;

}

// ===========================================
// CATEGORY FILTERS
// ===========================================

function setupCategoryFilters() {

    const buttons = document.querySelectorAll(".shop-categories button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            // Remove active class
            buttons.forEach(btn => btn.classList.remove("active"));

            // Add active class
            button.classList.add("active");

            // Get selected category
            const category = button.dataset.category;

          currentCategory = category;

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

    const visibleProducts = filteredProducts.slice(0, productsPerPage);

    renderProducts(visibleProducts, "shopContainer");

    setupProductLinks();

    updateProductCount(filteredProducts);

    toggleLoadMoreButton(filteredProducts.length);

}

// toggle load more buttonn
function toggleLoadMoreButton(totalProducts) {

    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!loadMoreBtn) return;

    if (productsPerPage >= totalProducts) {

        loadMoreBtn.style.display = "none";

    } else {

        loadMoreBtn.style.display = "inline-block";

    }

}

// set up more loadd
function setupLoadMore() {

    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", () => {

        productsPerPage += 6;

        displayProducts();

    });

}


