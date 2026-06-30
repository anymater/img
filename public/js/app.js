// 应用前端脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  console.log('应用已加载');
  loadImages();
  setupUploadForm();
});

// 设置上传表单
function setupUploadForm() {
  const uploadForm = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');
  const uploadMessage = document.getElementById('uploadMessage');

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 清空之前的消息
    uploadMessage.textContent = '';
    uploadMessage.className = 'message';

    // 验证文件
    if (!fileInput.files.length) {
      showMessage('请选择要上传的文件', 'error');
      return;
    }

    const file = fileInput.files[0];
    const title = document.getElementById('titleInput').value.trim();
    const category = document.getElementById('categorySelect').value;
    const tags = document.getElementById('tagsInput').value.trim();

    if (!title) {
      showMessage('请输入图片标题', 'error');
      return;
    }

    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    formData.append('tags', tags);

    try {
      // 禁用按钮
      const submitBtn = uploadForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = '上传中...';

      // 发送请求
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.code === 200) {
        showMessage('✓ 图片上传成功！', 'success');
        // 重置表单
        uploadForm.reset();
        // 重新加载图片列表
        loadImages();
      } else {
        showMessage('✗ ' + result.message, 'error');
      }
    } catch (error) {
      showMessage('✗ 上传失败: ' + error.message, 'error');
      console.error('上传错误:', error);
    } finally {
      // 恢复按钮
      const submitBtn = uploadForm.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = '上传图片';
    }
  });
}

// 显示消息
function showMessage(text, type) {
  const messageEl = document.getElementById('uploadMessage');
  messageEl.textContent = text;
  messageEl.className = 'message ' + type;
  
  // 3秒后自动隐藏错误消息
  if (type === 'error') {
    setTimeout(() => {
      messageEl.className = 'message';
    }, 3000);
  }
}

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
  
  if (!images || images.length === 0) {
    gallery.innerHTML = '<div class="gallery-empty">还没有上传任何图片，快去上传第一张吧！</div>';
    return;
  }

  gallery.innerHTML = images.map(image => `
    <div class="gallery-item">
      <img src="${image.url}" alt="${image.title}" class="gallery-item-image" onerror="this.src='/images/placeholder.png'">
      <div class="gallery-item-content">
        <div class="gallery-item-title" title="${image.title}">${image.title}</div>
        <div class="gallery-item-category">${image.category}</div>
        <div class="gallery-item-tags">
          ${image.tags && image.tags.length > 0 
            ? image.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
            : '<span class="tag">无标签</span>'
          }
        </div>
      </div>
    </div>
  `).join('');
}
