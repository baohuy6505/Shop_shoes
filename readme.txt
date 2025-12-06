HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY DỰ ÁN
Tên dự án: Module quản lý giày dép
Công nghệ: Node.js, Express, MongoDB Atlas
Nhóm thực hiện: Nhóm 9

1. YÊU CẦU HỆ THỐNG
- Đã cài đặt Node.js (phiên bản 14 trở lên)
- Đã cài đặt MongoDB (hoặc có tài khoản MongoDB Atlas)

2. CẤU TRÚC THƯ MỤC
Project/
[unit_test]
[code] 
us.txt 
readme.txt 
db.docx
db.sql
release note.txt

3. HƯỚNG DẪN CÀI ĐẶT
Bước 1: Mở terminal và di chuyển vào thư mục code
   Command: cd code
Bước 2: Cài đặt các thư viện (node_modules)
   Command: npm install

4. CẤU HÌNH DATABASE 
Bước 1: Tạo file .env trong thư mục [code] (nếu chưa có).
Bước 2: Copy nội dung sau và cho Paste vào file .env:
   MONGODB_URI=mongodb+srv://ProjectShopShoes:abcd1234%40@cluster0.3mjofbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

5. CÁCH CHẠY DỰ ÁN
Bước 1: Tại terminal (đang ở thư mục code), chạy lệnh:
   Command: node run devall
Bước 2: Mở trình duyệt và truy cập:
   Link: http://localhost:5000

6. TÀI KHOẢN TEST 
- Admin: nguyennguyen672004@gmail.com / 12345678
- User: nguyen672004@gmail.com / 12345678