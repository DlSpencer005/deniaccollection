const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");
const counters = document.querySelectorAll(".counter");
const navbar = document.querySelector(".navbar");
const reveals = document.querySelectorAll(".reveal");
const logo = document.getElementById("logo");
const cart = document.querySelector(".nav-btn");

logo.addEventListener("click", function() {
    window.location.href = "index.html";
});

cart.addEventListener("click", function() {
    window.location.href = "shop.html";
});

// reveal animation javascript
const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:.2
});

reveals.forEach(section=>{

    observer.observe(section);

});


// Hamburger Menu
hamburger.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});


// add eventlistener to window scroll event to add or remove the "scrolled" class from the navbar based on the scroll position. If the user has scrolled more than 80 pixels down, the "scrolled" class is added to the navbar, which can be used to change its appearance (like background color, height, etc.). If the user scrolls back up above 80 pixels, the "scrolled" class is removed.
window.addEventListener("scroll",()=>{

    if(window.scrollY>80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

// javascript for hero section animation
window.addEventListener("load",()=>{

const items=[

".hero-tag",

".hero-content h1",

".hero-content p",

".hero-buttons",

".hero-features",

".hero-image"

];

items.forEach((item,index)=>{

document.querySelector(item).style.animation=

`fadeUp .8s ease forwards ${index*.2}s`;

});

});

// mouse parallax effect for hero section
const heroImage = document.querySelector(".hero-image");

document.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform =
    `translate(${x}px, ${y}px)`;

});

// javascript for counter animation
counters.forEach(counter => {

    const update = () => {

        const target = +counter.dataset.target;

        const current = +counter.innerText;

        const increment = target / 100;

        if(current < target){

            counter.innerText = Math.ceil(current + increment);

            setTimeout(update,20);

        }else{

            counter.innerText = target;

        }

    };

    update();

});

// javascript for testimonial slider
const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial");

const dots = document.querySelectorAll(".dot");

const next = document.getElementById("next");
const prev = document.getElementById("prev");

let current = 0;

function updateSlider(){

    track.style.transform =
    `translateX(-${current*100}%)`;

    dots.forEach(dot=>dot.classList.remove("active"));

    dots[current].classList.add("active");

}

next.addEventListener("click",()=>{

    current++;

    if(current>=slides.length){

        current=0;

    }

    updateSlider();

});

prev.addEventListener("click",()=>{

    current--;

    if(current<0){

        current=slides.length-1;

    }

    updateSlider();

});

// javascript for auto sliding testimonial
setInterval(()=>{

    current++;

    if(current>=slides.length){

        current=0;

    }

    updateSlider();

},5000);


// adding to cart javascript
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

function openCart(){

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow="hidden";

}

function closeCartDrawer(){

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow="";

}

cartBtn.addEventListener("click",openCart);

closeCart.addEventListener("click",closeCartDrawer);

cartOverlay.addEventListener("click",closeCartDrawer);

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeCartDrawer();

    }

});
