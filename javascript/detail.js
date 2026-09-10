// =====================================
// DENIAC COLLECTION PRODUCT DETAIL
// =====================================

let selectedSize = null;
let detailQty = 1;

function getSelectedProduct() {

    const id = sessionStorage.getItem("selectedProduct");

    const found = products.find(product => product.id === Number(id));

    return found || products[0];

}

function createSizeOptions(product) {

    const defaultSize = Array.isArray(product.sizes) && product.sizes.length ? product.sizes[2] : null;

    selectedSize = defaultSize;

    detailQty = 1;

    return product.sizes.map(size => {
        return `<button class="size-option${size === defaultSize ? " active" : ""}" data-size="${size}">${size}</button>`;
    }).join("");

}

function renderProductDetail() {

    const container = document.getElementById("productDetail");

    if (!container) return;

    const product = getSelectedProduct();

    document.title = `${product.name} | Deniac Collection`;

    const oldPrice = product.oldPrice
        ? `<span class="old-price">₦${product.oldPrice.toLocaleString()}</span>`
        : "";

    container.innerHTML = `

        <div class="breadcrumb">

            <a href="shop.html">Shop</a>

            <span>/</span>

            <a href="shop.html?category=${product.category}">${product.category}</a>

            <span>/</span>

            <span>${product.name}</span>

        </div>

        <div class="detail-grid">

            <div class="detail-images">

                <div class="detail-main-img">

                    <img src="${product.image}" alt="${product.name}">

                    <span class="product-badge">${product.badge}</span>

                </div>

            </div>

            <div class="detail-info">

                <span class="detail-category">${product.category}</span>

                <h1>${product.name}</h1>

                <p class="detail-price">₦${product.price.toLocaleString()} ${oldPrice}</p>

                <p class="detail-desc">${product.description}</p>

                <p class="size-label">Select Size</p>

                <div class="size-options">${createSizeOptions(product)}</div>

                <div class="detail-options">

                    <div class="qty-selector">

                        <button class="detail-min" aria-label="Decrease quantity">-</button>

                        <span id="detailQty">${detailQty}</span>

                        <button class="detail-plus" aria-label="Increase quantity">+</button>

                    </div>

                    <button class="add-cart detail-add" data-id="${product.id}">

                        Add to Cart

                    </button>

                </div>

                <div class="detail-meta">

                    <p><i class="fa-solid fa-truck-fast"></i> Free nationwide delivery</p>

                    <p><i class="fa-solid fa-hammer"></i> Handcrafted in Lagos</p>

                </div>

            </div>

        </div>

    `;

}

// =====================================
// RELATED PRODUCTS
// =====================================

function renderRelatedProducts() {

    const container = document.getElementById("relatedContainer");

    if (!container) return;

    const product = getSelectedProduct();

    const related = getRelatedProducts(product.id, 3);

    if (related.length === 0) {

        const section = document.querySelector(".related-section");

        if (section) section.style.display = "none";

        return;

    }

    renderProducts(related, "relatedContainer");

    setupProductLinks();

    if (window.refreshWishlistIcons) refreshWishlistIcons();

}

// =====================================
// DETAIL PAGE CONTROLS
// =====================================

document.addEventListener("click", (e) => {

    const sizeBtn = e.target.closest(".size-option");

    if (sizeBtn) {

        document.querySelectorAll(".size-option").forEach(btn => btn.classList.remove("active"));

        sizeBtn.classList.add("active");

        selectedSize = Number(sizeBtn.dataset.size);

        return;

    }

    const minus = e.target.closest(".detail-min");

    if (minus) {

        if (detailQty > 1) {

            detailQty -= 1;

            const qtyEl = document.getElementById("detailQty");
            if (qtyEl) qtyEl.textContent = detailQty;

        }

        return;

    }

    const plus = e.target.closest(".detail-plus");

    if (plus) {

        detailQty += 1;

        const qtyEl = document.getElementById("detailQty");
        if (qtyEl) qtyEl.textContent = detailQty;

    }

});

document.addEventListener("DOMContentLoaded", () => {

    renderProductDetail();

    renderRelatedProducts();

});