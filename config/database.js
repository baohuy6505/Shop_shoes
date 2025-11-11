const mongoose = require('mongoose');
require('dotenv').config();

const connectString = process.env.MONGODB_URI;

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Kết nối MongoDB thành công!'))
.catch((err) => console.error('Kết nối MongoDB thất bại:', err));