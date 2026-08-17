// =======================================
// SAVE SELECTED PRODUCT
// =======================================

function setupProductLinks() {

    const links = document.querySelectorAll(".product-link");

    links.forEach(link => {

        link.addEventListener("click", () => {

            const productId = link.dataset.id;

            sessionStorage.setItem("selectedProduct", productId);

        });

    });

}