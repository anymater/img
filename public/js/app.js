// 应用脚本

document.addEventListener('DOMContentLoaded', async () => {
  console.log('应用已加载');
  await loadImages();
});

// 加载图片列表
async function loadImages() {
  try {
    const response = await fetch('/api/images/list');
    const result = await response.json();
    
    if (result.code === 200) {
      renderGallery(result.data);
    }
  } catch (error) {
    console.error('加载图片失败:', error);
  }
}

// 渲染图片库
function renderGallery(images) {
  const gallery = document.getElementById('gallery');
  
  if (images.length === 0) {
    gallery.innerHTML = '<p>暂无图片</p>';
    return;
  }

  gallery.innerHTML = images.map(image => `
    <div class="gallery-item">
      <img src="${image.url}" alt="${image.title}">
      <div class="gallery-item-title">${image.title}</div>
      <div class="gallery-item-tags">
        ${image.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}
