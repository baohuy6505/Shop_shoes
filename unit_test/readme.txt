
# Hướng Dẫn Test - AccountController
Mục tiêu: Kiểm thử các chức năng đăng ký, đăng nhập
## Yêu Cầu Hệ Thống

- Node.js (>= 14)
- npm hoặc yarn
- Jest (đã cài trong `devDependencies`)
- MongoDB (hoặc mock nếu dùng in-memory)
## Cài Đặt & Chuẩn Bị


# 1. Cài dependencies(PHẢI CÀI MỚI CHẠY ĐƯỢC )
npm install

# 2. Đảm bảo Jest đã được cài
npm install --save-dev jest supertest

TẠO MỤC/FILE THEO CẤU TRÚC 

controllers/
└── clients/AccountController.js
models/
└── userModel.js
tests/
└── AccountController.test.js

 CÁCH CHẠY TEST 
 1.MỞ TERMINAL(powershell)
 2.CMD VỚI QUYỀN QUẢN TRỊ (cd chính xác link cần test )
 LỆCH TEST 
npm test                    # Chạy tất cả test
npx jest --coverage         # Xem độ bao phủ code
npx jest tests/Account*     # Chạy test theo pattern


