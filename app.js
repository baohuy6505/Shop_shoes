var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mainRoute = require("./routes/mainRoute");
var app = express();

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
app.use("/", mainRoute);
// router(app);

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
