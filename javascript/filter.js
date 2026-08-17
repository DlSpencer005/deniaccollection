// ===========================================
// GET ALL PRODUCTS
// ===========================================

function getAllProducts() {

    return [...products];

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