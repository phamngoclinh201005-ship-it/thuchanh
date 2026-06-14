import { fetchPosts } from './api/postApi.js';
import { renderPosts } from './render/renderPosts.js';
import { searchPosts } from './modules/search.js';
import { initTheme } from './modules/theme.js';

async function init() {
  initTheme();
  const posts = await fetchPosts();
  const featuredPosts = posts.slice(0, 10);
  renderPosts(featuredPosts);
  searchPosts(posts); 
}

document.addEventListener('DOMContentLoaded', init);