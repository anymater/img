// 示例：单元测试

const ImageService = require('../../services/ImageService');

describe('ImageService', () => {
  let imageService;

  beforeEach(() => {
    imageService = new ImageService();
  });

  test('should upload image successfully', async () => {
    const file = { name: 'test.jpg' };
    const result = await imageService.uploadImage(file, {});
    expect(result.success).toBe(true);
  });

  test('should get images list', async () => {
    const images = await imageService.getImages({});
    expect(Array.isArray(images)).toBe(true);
  });

  test('should delete image', async () => {
    const result = await imageService.deleteImage('123');
    expect(result.success).toBe(true);
  });
});
