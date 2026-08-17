// ==========================================
// CREATE PRODUCT CARD
// ==========================================

function createProductCard(product) {

    return `

        <article class="product-card" data-id="${product.id}">

            <div class="product-image">

                <a href="product.html" class="product-link" data-id="${product.id}">

                <img src="${product.image}" alt="${product.name}">

                </a>

                <span class="product-badge">

                ${product.badge}

                </span>

            </div>

            <div class="product-info">

                <h3>
                 <a href="product.html"
                 class="product-link"
                data-id="${product.id}">
                
                ${product.name}

                </a>
                
                </h3>

                <p class="price">

                    ₦${product.price.toLocaleString()}

                </p>

                <button
                    class="add-cart"
                    data-id="${product.id}">

                    Add to Cart

                </button>

            </div>

        </article>

    `;

}
// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts(products, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += createProductCard(product);

    });

}

renderProducts({
    products: allProducts,
    containerId: "shopContainer"
});