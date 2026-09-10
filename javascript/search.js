// =====================================
// DENIAC COLLECTION SEARCH
// =====================================

let searchTerm = "";

function searchProducts(productList) {

    const term = searchTerm.trim().toLowerCase();

    if (!term) return productList;

    return productList.filter(product => {
        return product.name.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            (product.badge && product.badge.toLowerCase().includes(term));
    });

}

// =====================================
// SEARCH OVERLAY
// =====================================

function createSearchOverlay() {

    if (document.querySelector(".search-overlay")) return;

    const overlay = document.createElement("div");

    overlay.className = "search-overlay";

    overlay.innerHTML = `

        <div class="search-box">

            <i class="fa-solid fa-magnifying-glass"></i>

            <input
                type="text"
                id="searchInput"
                placeholder="Search for shoes, categories or badges..."
                autocomplete="off">

            <button id="closeSearch" aria-label="Close search">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>

    `;

    document.body.appendChild(overlay);

    const input = document.getElementById("searchInput");
    const close = document.getElementById("closeSearch");
    const isShopPage = document.getElementById("shopContainer") !== null;

    const hide = () => {

        overlay.classList.remove("active");

        if (searchTerm) {

            searchTerm = "";

            input.value = "";

            if (window.displayProducts) displayProducts();

        }

    };

    close.addEventListener("click", hide);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hide();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) hide();
    });

    if (isShopPage) {

        input.addEventListener("input", () => {

            searchTerm = input.value;

            if (window.displayProducts) displayProducts();

        });

        setTimeout(() => input.focus(), 300);

    }

}

document.addEventListener("click", (e) => {

    const searchBtn = e.target.closest("#searchBtn, .search-open");

    if (!searchBtn) return;

    if (!document.getElementById("shopContainer")) {

        window.location.href = "shop.html";

        return;

    }

    createSearchOverlay();

    const overlay = document.querySelector(".search-overlay");

    overlay.classList.add("active");

    const input = document.getElementById("searchInput");

    if (input) setTimeout(() => input.focus(), 100);

});