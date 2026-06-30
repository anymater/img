const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generateId } = require('../utils/helper');
const { FILE_TYPES, FILE_SIZE_LIMIT } = require('../utils/constants');

const router = express.Router();

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 创建上传目录（按年/月组织）
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const uploadDir = path.join(__dirname, '../../uploads', year.toString(), month);
    
    // 确保目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 生成唯一的文件名
    const uniqueSuffix = generateId();
    const ext = path.extname(file.originalname);
    const filename = `img_${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

// 文件过滤
const fileFilter = (req, file, cb) => {
  // 检查文件类型
  if (Object.values(FILE_TYPES).includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只支持 JPEG、PNG、GIF 和 WebP 格式的图片'), false);
  }
};

// 初始化 multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: FILE_SIZE_LIMIT  // 10MB
  }
});

// 获取图片列表
router.get('/list', async (req, res) => {
  try {
    // TODO: 从数据库获取图片列表
    const images = [
      {
        id: '1',
        title: '示例图片 1',
        url: '/uploads/sample1.jpg',
        category: 'Nature',
        tags: ['自然', '风景'],
        uploadedAt: new Date()
      }
    ];
    res.json({ code: 200, data: images });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 上传图片
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ code: 400, message: '请选择要上传的文件' });
    }

    // 构建图片 URL（相对路径）
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const imageUrl = `/uploads/${year}/${month}/${req.file.filename}`;

    // 构建图片数据
    const imageData = {
      id: generateId(),
      title: req.body.title || req.file.originalname,
      url: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      category: req.body.category || 'Uncategorized',
      tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [],
      uploadedAt: new Date(),
      uploadedBy: req.body.uploadedBy || 'Anonymous'
    };

    // TODO: 保存图片信息到数据库
    // await ImageModel.create(imageData);

    res.json({
      code: 200,
      message: '图片上传成功',
      data: imageData
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || '图片上传失败'
    });
  }
});

// 删除图片
router.delete('/:id', async (req, res) => {
  try {
    // TODO: 从数据库删除图片记录并删除文件
    res.json({ code: 200, message: '图片删除成功' });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 获取图片详情
router.get('/:id', async (req, res) => {
  try {
    // TODO: 从数据库获取图片详情
    res.json({ code: 200, data: {} });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
