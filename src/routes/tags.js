// 示例：标签路由

const express = require('express');
const router = express.Router();
const TagService = require('../services/TagService');

const tagService = new TagService();

// 获取标签列表
router.get('/list', async (req, res) => {
  try {
    const tags = await tagService.getTags();
    res.json({ code: 200, data: tags });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 创建标签
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await tagService.createTag(name);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 删除标签
router.delete('/:id', async (req, res) => {
  try {
    const result = await tagService.deleteTag(req.params.id);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 搜索标签
router.get('/search/:keyword', async (req, res) => {
  try {
    const tags = await tagService.searchTags(req.params.keyword);
    res.json({ code: 200, data: tags });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
