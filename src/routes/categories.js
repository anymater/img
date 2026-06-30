// 示例：分类路由

const express = require('express');
const router = express.Router();
const CategoryService = require('../services/CategoryService');

const categoryService = new CategoryService();

// 获取分类列表
router.get('/list', async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({ code: 200, data: categories });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 创建分类
router.post('/create', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await categoryService.createCategory(name, description);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 删除分类
router.delete('/:id', async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

// 更新分类
router.put('/:id', async (req, res) => {
  try {
    const result = await categoryService.updateCategory(req.params.id, req.body);
    res.json({ code: 200, data: result });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
});

module.exports = router;
