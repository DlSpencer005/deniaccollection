// =====================================
// DENIAC COLLECTION WISHLIST
// =====================================

let wishlist = [];

try {

    wishlist = JSON.parse(localStorage.getItem("deniacWishlist")) || [];

} catch (e) {

    wishlist = [];

}

let wishlistFilterMode = new URLSearchParams(window.location.search).get("wishlist") === "on";

function saveWishlist() {

    localStorage.setItem("deniacWishlist", JSON.stringify(wishlist));

}

function isWishlisted(productId) {

    return wishlist.includes(Number(productId));

}

function toggleWishlist(productId) {

    const id = Number(productId);

    const index = wishlist.indexOf(id);

    if (index === -1) {

        wishlist.push(id);

        showToast("Added to wishlist");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");

    }

    saveWishlist();

    refreshWishlistIcons();

    updateWishlistCount();

}

function getWishlistProducts() {

    return products.filter(product => wishlist.includes(product.id));

}

function filterByWishlist(productList) {

    if (!wishlistFilterMode) return productList;

    const favs = getWishlistProducts();

    const favIds = favs.map(item => item.id);

    return productList.filter(product => favIds.includes(product.id));

}

// =====================================
// WISHLIST ICONS
// =====================================

function refreshWishlistIcons() {

    document.querySelectorAll(".wishlist-btn").forEach(btn => {

        const active = isWishlisted(btn.dataset.id);

        btn.classList.toggle("active", active);

        const icon = btn.querySelector("i");

        if (icon) icon.className = active ? "fa-solid fa-heart" : "fa-regular fa-heart";

    });

}

function updateWishlistCount() {

    const badges = document.querySelectorAll(".wishlist-count");

    badges.forEach((badge) => {

        badge.textContent = wishlist.length;

        badge.style.display = wishlist.length > 0 ? "flex" : "none";

    });

}

// =====================================
// TOAST
// =====================================

function showToast(message) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast._timer);

    showToast._timer = setTimeout(() => toast.classList.remove("show"), 2200);

}

// =====================================
// EVENT DELEGATION
// =====================================

document.addEventListener("click", (e) => {

    const wishlistBtn = e.target.closest(".wishlist-btn");

    if (wishlistBtn) {

        e.preventDefault();

        toggleWishlist(wishlistBtn.dataset.id);
        return;

    }

    const navWish = e.target.closest("#wishlistNavBtn, .wishlist-nav");

    if (navWish) {

        e.preventDefault();

        window.location.href = "shop.html?wishlist=on";
    }

});

document.addEventListener("DOMContentLoaded", () => {

    refreshWishlistIcons();

    updateWishlistCount();

});