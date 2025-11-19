// Lấy phần tử ảnh lớn
const mainImage = document.querySelector(".detail__main-img");

// Lấy tất cả ảnh nhỏ (thumbnail)
const thumbs = document.querySelectorAll(".detail__thumb");

// Lấy container của dãy ảnh nhỏ
const thumbContainer = document.querySelector(".detail__thumb-container");

// Lấy nút mũi tên trái/phải của dãy ảnh nhỏ
const thumbNext = document.querySelector(".detail__thumb-next");
const thumbPrev = document.querySelector(".detail__thumb-prev");

// Biến lưu vị trí hiện tại
let currentIndex = 0;

// Hàm cập nhật ảnh lớn
function updateMainImage(index) {
  // Nếu index vượt quá số lượng ảnh, quay vòng lại
  if (index < 0) {
    index = thumbs.length - 1;
  } else if (index >= thumbs.length) {
    index = 0;
  }

  // Đổi ảnh lớn sang ảnh nhỏ tương ứng
  mainImage.src = thumbs[index].src;

  // Xóa class active khỏi tất cả ảnh nhỏ
  thumbs.forEach((t) => t.classList.remove("active"));

  // Thêm class active cho ảnh nhỏ được chọn
  thumbs[index].classList.add("active");

  // ✅ Cuộn ảnh nhỏ được chọn vào giữa container
  const thumbWidth = thumbs[index].offsetWidth;
  const containerWidth = thumbContainer.offsetWidth;
  const scrollPosition =
    thumbs[index].offsetLeft - containerWidth / 2 + thumbWidth / 2;

  thumbContainer.scrollTo({
    left: scrollPosition,
    behavior: "smooth",
  });

  // Cập nhật lại chỉ số hiện tại
  currentIndex = index;
}

// Sự kiện khi click vào từng ảnh nhỏ
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", (event) => {
    event.preventDefault();
    updateMainImage(index);
  });
});

// Sự kiện khi nhấn nút mũi tên phải
thumbNext.addEventListener("click", (e) => {
  e.preventDefault();
  currentIndex++;
  updateMainImage(currentIndex);
});

// Sự kiện khi nhấn nút mũi tên trái
thumbPrev.addEventListener("click", (e) => {
  e.preventDefault();
  currentIndex--;
  updateMainImage(currentIndex);
});

// ========================================
const decreaseBtn = document.getElementById("decrease");
const increaseBtn = document.getElementById("increase");
const quantityInput = document.getElementById("quantity");

function updateButtons() {
  const value = parseInt(quantityInput.value) || 1;
  decreaseBtn.disabled = value <= 1;
  quantityInput.value = value;
}

// Nút -
decreaseBtn.addEventListener("click", () => {
  let value = parseInt(quantityInput.value) || 1;
  if (value > 1) value -= 1;
  quantityInput.value = value;
  updateButtons();
});

// Nút +
increaseBtn.addEventListener("click", () => {
  let value = parseInt(quantityInput.value) || 1;
  value += 1;
  quantityInput.value = value;
  updateButtons();
});

// Nhập trực tiếp
quantityInput.addEventListener("input", () => {
  let value = parseInt(quantityInput.value.replace(/\D/g, "")) || 1;
  quantityInput.value = value;
  updateButtons();
});
