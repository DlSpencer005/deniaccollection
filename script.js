const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const counters = document.querySelectorAll(".counter");
const reveals = document.querySelectorAll(".reveal");

// Hamburger Menu
hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});

// close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// scrolled navbar
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: .2
});

reveals.forEach(section => {
    observer.observe(section);
});

// index page only ---------------------------------------------------------

// hero entrance animation
window.addEventListener("load", () => {

    const items = [
        ".hero-tag",
        ".hero-content h1",
        ".hero-content p",
        ".hero-buttons",
        ".hero-features",
        ".hero-image"
    ];

    items.forEach((item, index) => {

        const el = document.querySelector(item);

        if (!el) return;

        el.style.animation = `fadeUp .8s ease forwards ${index * .2}s`;

    });

});

// hero mouse parallax
const heroImage = document.querySelector(".hero-image");

if (heroImage) {

    document.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;

        heroImage.style.transform = `translate(${x}px, ${y}px)`;

    });

}

// counter animation
counters.forEach(counter => {

    const update = () => {

        const target = +counter.dataset.target;
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(update, 20);
        } else {
            counter.innerText = target;
        }

    };

    update();

});

// testimonial slider
const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let current = 0;

function updateSlider() {

    if (!track || !slides.length) return;

    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[current]) dots[current].classList.add("active");

}

if (next && slides.length) {

    next.addEventListener("click", () => {
        current++;
        if (current >= slides.length) current = 0;
        updateSlider();
    });

}

if (prev && slides.length) {

    prev.addEventListener("click", () => {
        current--;
        if (current < 0) current = slides.length - 1;
        updateSlider();
    });

}

if (slides.length > 1) {

    setInterval(() => {
        current++;
        if (current >= slides.length) current = 0;
        updateSlider();
    }, 5000);

}

// cart drawer (all pages) -------------------------------------------------

const cartOpenBtns = document.querySelectorAll(".cart-open");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

function openCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

}

function closeCartDrawer() {

    if (!cartDrawer) return;

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";

}

cartOpenBtns.forEach((btn) => btn.addEventListener("click", openCart));
if (closeCart) closeCart.addEventListener("click", closeCartDrawer);
if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer && cartDrawer.classList.contains("active")) {
        closeCartDrawer();
    }
});