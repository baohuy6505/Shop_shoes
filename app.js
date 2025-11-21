var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mainRoute = require("./routes/clients/mainRoute");
var adminRoute = require("./routes/admin/adminRoute"); // thêm nếu bạn có router admin

var app = express();

var flash = require("connect-flash");
var exphbs = require("express-handlebars");
var session = require("express-session");
const hbs = require("hbs");

// ====== CẤU HÌNH HANDLEBARS ======
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "userLayout", // layout mặc định
    layoutsDir: path.join(__dirname, "views", "layouts"),
    helpers: {
      eq: (a, b) => a === b,
      toString: (value) => String(value),
      array: function (...args) {
        args.pop();
        return args;
      },
      lt: function (a, b) {
        return a < b;
      },
      ifeq: function (a, b, options) {
        if (String(a) === String(b)) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
      formatCurrency: function (amount) {
        if (amount === undefined || amount === null || isNaN(amount)) {
          return "0 ₫";
        }
        return Number(amount).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
        });
      },
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "chukicuatrangweb", // đổi thành chuỗi ngẫu nhiên
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 ngày
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.user || null;
  next();
});
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }
    next();
});
// routes
app.use("/", mainRoute);
app.use("/admin", adminRoute);

// Xử lý lỗi 404
app.use(function (req, res, next) {
  next(createError(404));
});

// Xử lý lỗi chung
app.use(function (err, req, res, next) {
  console.error("Chi tiết lỗi:", err.message, err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
