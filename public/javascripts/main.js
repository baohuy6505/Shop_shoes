// Quản lý navbar scroll, slider banner tự động, dots, prev/next và chuyển trang theo category
const navbar = document.querySelector("header");
console.log("Navbar:", navbar);

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const list = document.querySelector(".hero__list");
const banners = document.querySelectorAll(".hero__banner");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".hero__btn--prev");
const nextBtn = document.querySelector(".hero__btn--next");

const firstClone = banners[0].cloneNode(true);
const lastClone = banners[banners.length - 1].cloneNode(true);

list.appendChild(firstClone);
list.insertBefore(lastClone, banners[0]);

let current = 1;
const total = banners.length;
let isTransitioning = false;
let autoSlide;

list.style.transition = "none";
list.style.transform = `translateX(-${current * 100}%)`;

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === index - 1);
  });
}

function moveToSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  list.style.transition = "transform 0.8s ease";
  list.style.transform = `translateX(-${index * 100}%)`;
  current = index;
  updateDots(current);
}

list.addEventListener("transitionend", () => {
  isTransitioning = false;
  if (current === total + 1) {
    list.style.transition = "none";
    current = 1;
    list.style.transform = `translateX(-${current * 100}%)`;
  }
  if (current === 0) {
    list.style.transition = "none";
    current = total;
    list.style.transform = `translateX(-${current * 100}%)`;
  }
});

nextBtn.addEventListener("click", () => {
  moveToSlide(current + 1);
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  moveToSlide(current - 1);
  resetAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveToSlide(index + 1);
    resetAutoSlide();
  });
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    moveToSlide(current + 1);
  }, 10000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();
updateDots(current);

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".header-product-option");
  console.log("Danh sách options:", options);
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      const category = option.dataset.category;
      window.location.href = `products.html?category=${category}`;
    });
  });
});

// =========================
