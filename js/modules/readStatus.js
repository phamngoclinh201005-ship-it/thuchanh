// File: js/modules/readStatus.js

// Hàm này dùng nội bộ nên không cần export
function getReadPostIds() {
  const readPosts = localStorage.getItem('read_posts');
  return readPosts ? JSON.parse(readPosts) : [];
}

// THÊM TỪ KHÓA EXPORT VÀO TRƯỚC TẤT CẢ CÁC HÀM DƯỚI ĐÂY:

export function checkIsRead(postId) {
  const readIds = getReadPostIds();
  return readIds.includes(postId);
}

export function markAsRead(postId) {
  const readIds = getReadPostIds();
  if (!readIds.includes(postId)) {
    readIds.push(postId);
    localStorage.setItem('read_posts', JSON.stringify(readIds));
  }
}

export function markAsUnread(postId) {
  let readIds = getReadPostIds();
  // Lọc bỏ ID này ra khỏi mảng
  readIds = readIds.filter(id => id !== postId);
  localStorage.setItem('read_posts', JSON.stringify(readIds));
}