// 示例：图片路由

const express = require('express');
const router = express.Router();
const ImageService = require('../services/ImageService');

const imageService = new ImageService();

// 获取图片列表
router.get('/list', async (req, res) => {
  try {
    const images = await imageService.getImages(req.query);
    res.json({ code: 200, data: images });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 上传图片
router.post('/upload', async (req, res) => {
  try {
    const result = await imageService.uploadImage(req.file, req.body);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 删除图片
router.delete('/:id', async (req, res) => {
  try {
    const result = await imageService.deleteImage(req.params.id);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 获取图片详情
router.get('/:id', async (req, res) => {
  try {
    const image = await imageService.getImageDetail(req.params.id);
    res.json({ code: 200, data: image });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
