import { checkIsRead, markAsRead, markAsUnread } from '../modules/readStatus.js';

function createPostHTML(post, isRead) {
  return `
    <div class="post-content">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    <button class="read-toggle-btn" title="Đánh dấu đã đọc/chưa đọc">
      ${isRead ? '✓' : ''}
    </button>
  `;
}


function attachEvents(postItem, post) {
  const toggleBtn = postItem.querySelector('.read-toggle-btn');
  const postContent = postItem.querySelector('.post-content');

  postContent.addEventListener('click', () => {
    if (!postItem.classList.contains('is-read')) {
      markAsRead(post.id);
      postItem.classList.add('is-read');
      toggleBtn.innerText = '✓';
    }

    const modal = document.querySelector('#post-modal');
    if (modal) {
      document.querySelector('#modal-title').innerText = post.title;
      document.querySelector('#modal-body').innerText = post.body;
      modal.classList.add('show');
    }
  });

  
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    const isCurrentlyRead = postItem.classList.contains('is-read');
    if (isCurrentlyRead) {
      markAsUnread(post.id);
      postItem.classList.remove('is-read');
      toggleBtn.innerText = '';
    } else {
      markAsRead(post.id);
      postItem.classList.add('is-read');
      toggleBtn.innerText = '✓';
    }
  });
}


export function renderPosts(posts) {
  const postListContainer = document.querySelector('#post-list');
  if (!postListContainer) return;
  
  postListContainer.innerHTML = ''; 

  posts.forEach(post => {
    const isRead = checkIsRead(post.id);
    const postItem = document.createElement('div');
    
    postItem.className = `post-item ${isRead ? 'is-read' : ''}`;
    postItem.dataset.id = post.id;
    postItem.innerHTML = createPostHTML(post, isRead);
    
    attachEvents(postItem, post);
    postListContainer.appendChild(postItem);
  });
  setupModalClose(); 
}


function setupModalClose() {
  const modal = document.querySelector('#post-modal');
  const closeBtn = document.querySelector('.close-btn');
  if (!modal) return;

  const closeModal = () => modal.classList.remove('show');
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}