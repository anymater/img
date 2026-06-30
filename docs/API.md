# API 文档

## 基础 URL

```
https://api.example.com/v1
```

## 认证

所有请求需要在 Header 中包含 Bearer Token：

```
Authorization: Bearer YOUR_TOKEN
```

## 端点

### 获取图片列表

```
GET /images
```

**参数：**
- `page` (可选): 页码，默认为 1
- `limit` (可选): 每页数量，默认为 20
- `category` (可选): 分类 ID
- `tag` (可选): 标签 ID

**响应：**
```json
{
  "code": 200,
  "data": [
    {
      "id": "1",
      "title": "图片标题",
      "url": "https://example.com/image.jpg",
      "category": "分类",
      "tags": ["标签1", "标签2"],
      "uploadedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100
}
```

### 上传图片

```
POST /images/upload
```

**请求体：**
- `file` (必需): 图片文件
- `title` (可选): 图片标题
- `category` (可选): 分类 ID
- `tags` (可选): 标签数组

**响应：**
```json
{
  "code": 200,
  "data": {
    "id": "1",
    "url": "https://example.com/image.jpg"
  }
}
```

更多端点待完善...
