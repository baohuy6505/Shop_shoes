document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".nav__modal");
  const openBtn = document.querySelector(".header__menu");
  const closeBtn = document.querySelector(".nav__modal-close");

  console.log(modal);
  console.log(openBtn);
  console.log(closeBtn);
  // Logic Mở Modal
  if (modal && openBtn) {
    openBtn.addEventListener("click", () => {
      // Dùng console.log để xác nhận sự kiện click có được gán không
      console.log("Open Menu clicked!");
      modal.classList.add("open");
    });
  }

  // Logic Đóng Modal
  if (modal && closeBtn) {
    closeBtn.addEventListener("click", () => {
      // Dùng console.log để xác nhận sự kiện click có được gán không
      console.log("Close Menu clicked!");
      modal.classList.remove("open");
    });
  }
});
