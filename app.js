var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mainRoute = require("./routes/mainRoute");
var app = express();
var flash = require("connect-flash");
var session = require("express-session");
// ...
const hbs = require("hbs"); // Đảm bảo đã import hbs

// Đăng ký helpers
hbs.registerHelper("array", function (...args) {
  args.pop(); // Loại bỏ đối tượng options cuối cùng
  return args;
});

hbs.registerHelper("ifeq", function (a, b, options) {
  // Chuyển đổi sang chuỗi để so sánh an toàn
  if (String(a) === String(b)) {
    return options.fn(this);
  }
  return options.inverse(this);
});
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
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
    res.locals.currentUser = req.session.user || null; // để hiển thị user đang login
  next();
});
// router(app);
app.use("/", mainRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
