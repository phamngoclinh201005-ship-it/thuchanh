import { fetchPosts } from './api/postApi.js';
import { renderPosts } from './render/renderPosts.js';
import { searchPosts } from './modules/search.js';
import { initTheme } from './modules/theme.js';
async function init() {
  // 1. Gọi API lấy dữ liệu ban đầu
  initTheme();
  const posts = await fetchPosts();

  // 2. Hiển thị toàn bộ bài viết lên màn hình lúc mới tải trang
  renderPosts(posts);

  // 3. Kích hoạt tính năng tìm kiếm (truyền mốc dữ liệu gốc vào)
  searchPosts(posts);
}

// Chạy ứng dụng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', init);