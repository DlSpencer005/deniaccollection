// =====================================
// DENIAC COLLECTION CART PAGE
// =====================================

function createCartPageItem(item) {

    return `

        <div class="cart-page-item" data-id="${item.id}">

            <div class="cp-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="cp-details">

                <h4>${item.name}</h4>

                <span>${item.category}</span>

                <button class="remove-item" data-id="${item.id}" aria-label="Remove">

                    <i class="fa-solid fa-trash-can"></i> Remove

                </button>

            </div>

            <div class="cp-price">${formatPrice(item.price)}</div>

            <div class="cp-qty">

                <div class="quantity">

                    <button class="qty-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>

                    <span>${item.qty}</span>

                    <button class="qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>

                </div>

            </div>

            <div class="cp-total">${formatPrice(item.price * item.qty)}</div>

        </div>

    `;

}

function renderCartPage() {

    const container = document.getElementById("cartPageList");

    if (!container) return;

    const items = getCart();

    const emptyState = document.getElementById("cartPageEmpty");
    const summary = document.getElementById("cartPageSummary");
    const whatsappBtn = document.getElementById("cartCheckoutWhatsApp");

    if (items.length === 0) {

        container.innerHTML = "";

        if (emptyState) emptyState.style.display = "block";

        if (summary) summary.style.display = "none";

        return;

    }

    container.innerHTML = items.map(createCartPageItem).join("");

    if (emptyState) emptyState.style.display = "none";

    if (summary) summary.style.display = "";

    const subtotal = document.getElementById("cartPageSubtotal");
    const total = document.getElementById("cartPageTotal");

    if (subtotal) subtotal.textContent = formatPrice(getSubtotal());
    if (total) total.textContent = formatPrice(getSubtotal());

    if (whatsappBtn) whatsappBtn.href = getWhatsAppCheckoutURL();

}

document.addEventListener("deniac:cartUpdated", renderCartPage);

document.addEventListener("DOMContentLoaded", renderCartPage);