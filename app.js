var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// --- BẮT ĐẦU PHẦN KẾT NỐI DATABASE ---
// ĐÃ XÓA LOGIC KẾT NỐI MONGODB KHỎI ĐÂY
// Chúng ta sẽ chuyển nó sang file ./bin/www
/*
require('dotenv').config(); 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
  .catch(err => {
    console.error('❌ Lỗi kết nối MongoDB Atlas:', err);
    process.exit(1); 
  });
*/
// --- KẾT THÚC PHẦN KẾT NỐI DATABASE ---

var mainRoute = require("./routes/mainRoute");
var app = express();

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

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use((err, req, res, next) => {
  console.error("Chi tiết lỗi:", err);
  res.status(500).send("Lỗi: " + err.message);
});
module.exports = app;
