const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products"); // Lưu vào ./public/images/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Tránh trùng tên
  },
});

const imageFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
            cb(null, true);
        } else {
            cb(new Error("Định dạng file không được hỗ trợ (chỉ chấp nhận .jpg, .jpeg, .png)!"), false);
        }
    } else {
        cb(new Error("File không phải là ảnh!"), false);
    }
};

const deleteFile = (filePath) => { 
    const fullPath = path.join(__dirname, '..', 'public', filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`Lỗi: File không tồn tại tại đường dẫn: ${fullPath}`);
                return;
            }
            console.error('Lỗi khi cố gắng xoá file:', err);
        } else {
            console.log(`Đã xoá file thành công: ${fullPath}`);
        }
    });
}
module.exports = {
  storage,
    imageFilter,
  deleteFile
};
