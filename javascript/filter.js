// ===========================================
// GET ALL PRODUCTS
// ===========================================

function getAllProducts() {

    return [...products];

}

// ===========================================
// GET RELATED PRODUCTS
// ===========================================

function getRelatedProducts(productId, limit) {

    const current = products.find(product => product.id === Number(productId));

    if (!current) return [];

    const related = products.filter(product =>
        product.category === current.category &&
        product.id !== current.id
    );

    return related.slice(0, limit || 3);

}

// ===========================================
// GET FEATURED PRODUCTS
// ===========================================

function getFeaturedProducts(limit) {

    const featured = products.filter(product =>
        product.badge === "Best Seller" ||
        product.badge === "Featured"
    );

    if (featured.length === 0) return products.slice(0, limit || 4);

    return featured.slice(0, limit || 4);

}


// ===========================================
// FILTER BY CATEGORY
// ===========================================

function filterByCategory(category) {

    if (category === "All") {

        return getAllProducts();

    }

    return products.filter(product => product.category === category);

}

// ===========================================
// SORT PRODUCTS
// ===========================================

function sortProducts(productsArray, sortBy) {

    const sorted = [...productsArray];

    switch (sortBy) {

        case "low":

            sorted.sort((a, b) => a.price - b.price);

            break;

        case "high":

            sorted.sort((a, b) => b.price - a.price);

            break;

        case "name":

            sorted.sort((a, b) => a.name.localeCompare(b.name));

            break;

        default:

            break;

    }

    return sorted;

}