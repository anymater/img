// 常量定义

// 图片状态
const IMAGE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted'
};

// HTTP 状态码
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

// 业务状态码
const CODE = {
  SUCCESS: 200,
  ERROR: 500,
  INVALID_PARAMS: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401
};

// 文件类型
const FILE_TYPES = {
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_WEBP: 'image/webp'
};

// 文件大小限制（单位：字节）
const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

module.exports = {
  IMAGE_STATUS,
  HTTP_STATUS,
  CODE,
  FILE_TYPES,
  FILE_SIZE_LIMIT
};
