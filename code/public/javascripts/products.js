// // ===== DỮ LIỆU SẢN PHẨM =====
// const shoeList = [
//   {
//     name: "NIKE GIÀY 1",
//     price: "12001",
//     image: "/images/banner1.jpeg",
//     category: "giay",
//   },
//   {
//     name: "NIKE GIÀY 2",
//     price: "12002",
//     image: "/images/banner2.jpeg",
//     category: "giay",
//   },
//   {
//     name: "NIKE GIÀY 2",
//     price: "12002",
//     image: "/images/banner2.jpeg",
//     category: "giay",
//   },
//   {
//     name: "NIKE GIÀY 2",
//     price: "12002",
//     image: "/images/banner2.jpeg",
//     category: "giay",
//   },
//   {
//     name: "NIKE GIÀY 2",
//     price: "12002",
//     image: "/images/banner2.jpeg",
//     category: "giay",
//   },
//   {
//     name: "NIKE GIÀY 2",
//     price: "12002",
//     image: "/images/banner2.jpeg",
//     category: "giay",
//   },
//   {
//     name: "NIKE DÉP 1",
//     price: "9001",
//     image: "/images/banner3.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
//   {
//     name: "NIKE DÉP 2",
//     price: "9002",
//     image: "/images/banner1.jpeg",
//     category: "dep",
//   },
// ];

// // ===== CẤU HÌNH PHÂN TRANG =====
// const itemsPerPage = 12;
// let currentPage = 1;

// // ===== HÀM HIỂN THỊ SẢN PHẨM =====
// function renderShoes(list) {
//   const container = document.querySelector(".products__list");
//   if (!container) return;
//   container.innerHTML = "";

//   list.forEach((shoe) => {
//     const card = document.createElement("div");
//     card.classList.add("products__item");
//     card.innerHTML = `
//  <div class="products__image">
// <img src="${shoe.image}" class="products__img" alt="${shoe.name}" />
//  </div>
//  <div class="products__content">
// <h3 class="products__name">${shoe.name}</h3>
//  <p class="products__price">${shoe.price}₫</p>
//  <a href="./detail.html" class="products__btn">Shop Now</a>
// </div>
//  `;
//     container.appendChild(card);
//   });
// }

// // ===== HÀM HIỂN THỊ THEO TRANG =====
// function displayPage(page, list) {
//   const start = (page - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const visibleShoes = list.slice(start, end);
//   renderShoes(visibleShoes);
// }

// // ===== HÀM TẠO PHÂN TRANG =====
// function setupPagination(list) {
//   const totalPages = Math.ceil(list.length / itemsPerPage);
//   const paginationContainer = document.querySelector(".pagination");
//   if (!paginationContainer) return;
//   paginationContainer.innerHTML = "";

//   const prev = document.createElement("span");
//   prev.textContent = "<";
//   prev.classList.add("page-item");
//   prev.onclick = () => {
//     if (currentPage > 1) {
//       currentPage--;
//       displayPage(currentPage, list);
//       setupPagination(list);
//     }
//   };
//   paginationContainer.appendChild(prev);

//   for (let i = 1; i <= totalPages; i++) {
//     const page = document.createElement("span");
//     page.textContent = i;
//     page.classList.add("page-item");
//     if (i === currentPage) page.classList.add("active");
//     page.onclick = () => {
//       currentPage = i;
//       displayPage(currentPage, list);
//       setupPagination(list);
//     };
//     paginationContainer.appendChild(page);
//   }

//   const next = document.createElement("span");
//   next.textContent = ">";
//   next.classList.add("page-item");
//   next.onclick = () => {
//     if (currentPage < totalPages) {
//       currentPage++;
//       displayPage(currentPage, list);
//       setupPagination(list);
//     }
//   };
//   paginationContainer.appendChild(next);
// }

// // ===================================================
// // ===== KHỞI CHẠY SAU KHI DOM ĐƯỢC TẢI XONG =====
// // ===================================================
// document.addEventListener("DOMContentLoaded", () => {
//   displayPage(currentPage, shoeList);
//   setupPagination(shoeList);
// });
