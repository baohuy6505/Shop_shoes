// =============================
// JS điều khiển giao diện động
// =============================

const auth = document.getElementById("auth");
const switchBtn = document.getElementById("switchBtn");
const authForm = document.getElementById("authForm");
const modeInput = document.getElementById("modeInput");
const fullname = document.getElementById("fullname");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const sideTitle = document.getElementById("sideTitle");
const sideText = document.getElementById("sideText");

let mode = "login"; // login hoặc register

// Hàm chuyển mode
function setMode(newMode) {
  mode = newMode;
  modeInput.value = mode;

  if (mode === "register") {
    fullname.style.display = "block";
    formTitle.textContent = "Đăng Ký";
    submitBtn.textContent = "Tạo tài khoản";
    switchBtn.textContent = "Đăng Nhập";
    sideTitle.textContent = "Chào mừng bạn!";
    sideText.textContent = "Nếu đã có tài khoản, đăng nhập ngay.";
    auth.classList.add("auth--active");
  } else {
    fullname.style.display = "none";
    formTitle.textContent = "Đăng Nhập";
    submitBtn.textContent = "Đăng Nhập";
    switchBtn.textContent = "Đăng Ký";
    sideTitle.textContent = "Xin chào!";
    sideText.textContent = "Bạn chưa có tài khoản? Hãy đăng ký ngay.";
    auth.classList.remove("auth--active");
  }
}

// Mặc định là login
setMode("login");

// Khi click đổi chế độ
switchBtn.addEventListener("click", () => {
  setMode(mode === "login" ? "register" : "login");
});
