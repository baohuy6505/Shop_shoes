document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".admin-menu-toggle");
  const sidebar = document.querySelector(".admin-sidebar");
  const overlay = document.querySelector(".admin-overlay");
    const links = document.querySelectorAll(".admin-nav-link");
    //xuwr lý mở/đóng sidebar
  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("admin-active");
      overlay.classList.toggle("admin-active");
    });
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("admin-active");
      overlay.classList.remove("admin-active");
    });
    }
    //ddánh dấu liên kết hiện tại trong thanh điều hướng
  const currentPath = window.location.pathname;
  let hasActiveLink = false;
  links.forEach((link) => {
    link.classList.remove("admin-active");
  });
  const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    //so sánh đường dẫn hiện tại với href của liên kết
  if (currentPath.startsWith(href)) {
    link.classList.add("admin-active");
    hasActiveLink = true;
    const parentCollapse = link.closest(".collapse");
    if (parentCollapse) {
      parentCollapse.classList.add("show");
      const parentToggle = document.querySelector(
        `[href="#${parentCollapse.id}"]`
      );
      if (parentToggle) {
        parentToggle.classList.remove("collapsed");
        parentToggle.setAttribute("aria-expanded", "true");
      }
    }
  }
});
