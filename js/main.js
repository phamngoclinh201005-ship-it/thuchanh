import { fetchPosts } from './api/postApi.js';
import { renderPosts, setupModalClose } from './render/renderPosts.js';
import { searchPosts } from './modules/search.js';
import { initTheme } from './modules/theme.js';
import { initInfiniteScroll } from './modules/infiniteScroll.js';

async function init() {
  initTheme();
  setupModalClose();
  const posts = await fetchPosts();
  const featuredPosts = posts.slice(0, 10);
  renderPosts(featuredPosts);
  searchPosts(posts); 
  const container = document.querySelector('#posts-container');
  const sentinel = document.querySelector('#sentinel');
  if (sentinel) {
    initInfiniteScroll({
      container: container,
      sentinel: sentinel,
      fetchCallback: (page) => fetchPosts(page),
      renderCallback: (data) => renderPosts(data, true)
    });
  } else {
    console.warn("Không tìm thấy phần tử #sentinel trong DOM!");
  }
}

document.addEventListener('DOMContentLoaded', init);