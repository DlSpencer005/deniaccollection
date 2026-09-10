// =====================================
// DENIAC COLLECTION CART
// =====================================

const WHATSAPP_NUMBER = "2348130247501";

let cart = JSON.parse(localStorage.getItem("deniacCart")) || [];

function saveCart() {

    localStorage.setItem("deniacCart", JSON.stringify(cart));

    document.dispatchEvent(new CustomEvent("deniac:cartUpdated"));

    updateCartCount();

}

function formatPrice(amount) {

    return "₦" + amount.toLocaleString();

}

function getCart() {

    return [...cart];

}

function getSubtotal() {

    return cart.reduce((total, item) => total + item.price * item.qty, 0);

}

// =====================================
// ADD TO CART
// =====================================

function addToCart(productId) {

    const product = products.find(item => item.id === Number(productId));

    if (!product) return;

    const existing = cart.find(item => item.id === product.id);

    if (existing) {

        existing.qty += 1;

    } else {

        cart.push({ ...product, qty: 1 });

    }

    saveCart();

    renderCart();

    openCart();

}

// =====================================
// UPDATE QUANTITY / REMOVE
// =====================================

function updateCartQuantity(productId, change) {

    const index = cart.findIndex(item => item.id === Number(productId));

    if (index === -1) return;

    cart[index].qty += change;

    if (cart[index].qty <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();

}

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== Number(productId));

    saveCart();

    renderCart();

}

function clearCart() {

    cart = [];

    saveCart();

    renderCart();

}

// =====================================
// CART COUNT BADGE
// =====================================

function getCartCount() {

    return cart.reduce((total, item) => total + item.qty, 0);

}

function updateCartCount() {

    const badges = document.querySelectorAll(".cart-count");

    const count = getCartCount();

    badges.forEach((badge) => {

        badge.textContent = count;

        badge.style.display = count > 0 ? "block" : "none";

    });

}

// =====================================
// WHATSAPP CHECKOUT
// =====================================

function getWhatsAppCheckoutURL() {

    const lines = cart.map(item => {
        return `- ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}`;
    }).join("%0A");

    const message = `Hello Deniac Collection,%0A%0A` +
        `I would like to place an order:%0A%0A${lines}%0A%0A` +
        `Total: ${formatPrice(getSubtotal())}%0A%0A` +
        `Please confirm availability and delivery. Thank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

}

// =====================================
// RENDER CART DRAWER
// =====================================

function createCartItem(item) {

    return `

        <div class="cart-item" data-id="${item.id}">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>${formatPrice(item.price)}</p>

                <div class="quantity">

                    <button class="qty-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>

                    <span>${item.qty}</span>

                    <button class="qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>

                </div>

            </div>

            <button class="remove-item" data-id="${item.id}" aria-label="Remove">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>

    `;

}

function renderCart() {

    const container = document.querySelector(".cart-items");

    if (!container) return;

    const cartFooter = document.querySelector(".cart-footer");

    if (cart.length === 0) {

        container.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;

        if (cartFooter) cartFooter.style.display = "none";

    } else {

        container.innerHTML = cart.map(createCartItem).join("");

        if (cartFooter) cartFooter.style.display = "";

    }

    const subtotal = document.querySelector(".subtotal strong");

    if (subtotal) subtotal.textContent = formatPrice(getSubtotal());

}

// =====================================
// EVENT DELEGATION
// =====================================

document.addEventListener("click", (e) => {

    const addBtn = e.target.closest(".add-cart");

    if (addBtn) {

        addToCart(addBtn.dataset.id);

        return;

    }

    const plus = e.target.closest(".qty-plus");

    if (plus) {

        updateCartQuantity(plus.dataset.id, 1);

        return;

    }

    const minus = e.target.closest(".qty-minus");

    if (minus) {

        updateCartQuantity(minus.dataset.id, -1);

        return;

    }

    const remove = e.target.closest(".remove-item");

    if (remove) {

        removeFromCart(remove.dataset.id);

        return;

    }

    const viewCart = e.target.closest(".cart-footer .view-cart");

    if (viewCart) {

        e.preventDefault();

        window.location.href = "cart.html";

        return;

    }

    const checkout = e.target.closest(".cart-footer .checkout");

    if (checkout) {

        e.preventDefault();

        if (cart.length === 0) return;

        window.open(getWhatsAppCheckoutURL(), "_blank");

    }

});

document.addEventListener("DOMContentLoaded", () => {

    renderCart();

    updateCartCount();

});