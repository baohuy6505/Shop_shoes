var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mainRoute = require("./routes/mainRoute");
var adminRoute = require("./routes/admin/adminRoute");
var app = express();
var flash = require("connect-flash");
var exphbs = require("express-handlebars");
var session = require("express-session");

const hbs = require("hbs"); // Đảm bảo đã import hbs

// // Đăng ký helpers
// hbs.registerHelper("array", function (...args) {
//   args.pop(); // Loại bỏ đối tượng options cuối cùng
//   return args;
// });

// hbs.registerHelper("ifeq", function (a, b, options) {
//   // Chuyển đổi sang chuỗi để so sánh an toàn
//   if (String(a) === String(b)) {
//     return options.fn(this);
//   }
//   return options.inverse(this);
// });

// ====== CẤU HÌNH HANDLEBARS ======
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "userLayout", // layout mặc định
    layoutsDir: path.join(__dirname, "views", "layouts"),
    // THÊM KHỐI helpers VÀO ĐÂY
    helpers: {
      // Helper array
      eq: (a, b) => a === b,
      toString: (value) => String(value),
      array: function (...args) {
        // Loại bỏ đối tượng options cuối cùng
        args.pop();
        return args;
      },
      lt: function (a, b) {
        // Trả về true nếu a nhỏ hơn b
        return a < b;
      }, // Helper ifeq (Đã chuyển từ global hbs.registerHelper)
      ifeq: function (a, b, options) {
        // Chuyển đổi sang chuỗi để so sánh an toàn
        if (String(a) === String(b)) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      formatCurrency: function(amount) {
            // Kiểm tra và xử lý giá trị null/undefined
            if (amount === undefined || amount === null || isNaN(amount)) {
                return '0 ₫';
            }

            // Sử dụng toLocaleString với locale 'vi-VN' và style 'currency'
            return Number(amount).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0 // Đảm bảo không có số thập phân
            });
        },
    },
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "chukicuatrangweb", //đổi thành chuỗi ngẫu nhiên khó đoán
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // cookie tồn tại 1 ngày
    },
  })
);
app.use(flash());
// Cho phép gửi biến flash sang view (ví dụ với Handlebars, EJS,...)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.user || null; // để hiển thị user đang login
  next();
});
// router(app);
app.use("/", mainRoute);
app.use("/Admin", adminRoute);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// === SỬA LỖI: GỘP 2 TRÌNH XỬ LÝ LỖI LẠI ===
app.use(function (err, req, res, next) {
  // 1. Thêm dòng log chi tiết lỗi vào đây
  console.error("Chi tiết lỗi:", err.message, err.stack); // Ghi lại cả stack trace

  // 2. set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 3. render the error page
  res.status(err.status || 500);
  res.render("error"); // Đảm bảo bạn có file 'views/error.hbs'
});

module.exports = app;
