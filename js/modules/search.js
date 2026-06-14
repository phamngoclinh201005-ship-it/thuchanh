import { renderPosts } from '../render/renderPosts.js';

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export function searchPosts(posts) {
  const searchInput = document.querySelector('#search-input');
  const noResultElement = document.querySelector('.no-result'); 
  
  if (!searchInput) return;
  const handleSearch = debounce((searchValue) => {
    const searchTerm = searchValue.toLowerCase().trim();

    if (searchTerm === '') {
      renderPosts(posts.slice(0, 10)); 
      if (noResultElement) noResultElement.style.display = 'none';
      return;
    }


    const filteredPosts = posts.filter(post => {
      const matchTitle = post.title && post.title.toLowerCase().includes(searchTerm);
      const matchBody = post.body && post.body.toLowerCase().includes(searchTerm);
      
      return matchTitle || matchBody;
    });

    renderPosts(filteredPosts);

    if (noResultElement) {
      noResultElement.style.display = filteredPosts.length === 0 ? 'block' : 'none';
    }
  }, 300);

  searchInput.addEventListener('input', (event) => {
    handleSearch(event.target.value);
  });
}