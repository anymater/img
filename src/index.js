// 应用主文件

const express = require('express');
const path = require('path');
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 静态文件服务 - 提供上传的图片访问
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 路由
const imageRoutes = require('./routes/images');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');

app.use('/api/images', imageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ code: 500, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Uploads directory: ${path.join(__dirname, '../uploads')}`);
});

module.exports = app;
