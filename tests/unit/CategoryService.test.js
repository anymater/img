// 示例：单元测试

const CategoryService = require('../../services/CategoryService');

describe('CategoryService', () => {
  let categoryService;

  beforeEach(() => {
    categoryService = new CategoryService();
  });

  test('should create category', async () => {
    const result = await categoryService.createCategory('Nature', 'Natural photos');
    expect(result.name).toBe('Nature');
  });

  test('should get categories list', async () => {
    const categories = await categoryService.getCategories();
    expect(Array.isArray(categories)).toBe(true);
  });

  test('should delete category', async () => {
    const result = await categoryService.deleteCategory('1');
    expect(result.success).toBe(true);
  });
});
