import { renderPosts } from '../render/renderPosts.js';

// Hàm debounce bọc lại logic
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export function searchPosts(posts) {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  // Bọc hàm xử lý sự kiện trong debounce 300ms
  const handleSearch = debounce((event) => {
    const searchTerm = event.target.value.toLowerCase().trim();
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm)
    );
    renderPosts(filteredPosts);
  }, 300);

  searchInput.addEventListener('input', handleSearch);
}