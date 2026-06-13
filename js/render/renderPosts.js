// File: js/render/renderPosts.js
import { checkIsRead, markAsRead, markAsUnread } from '../modules/readStatus.js';
// import { openModal } from './modal.js'; // <-- Giả sử đây là hàm mở modal cũ của bạn, hãy giữ nguyên dòng import cũ nếu có nhé

export function renderPosts(posts) {
  const postListContainer = document.getElementById('post-list');
  if (!postListContainer) return;

  postListContainer.innerHTML = ''; 

  posts.forEach(post => {
    const isRead = checkIsRead(post.id);
    const isReadClass = isRead ? 'is-read' : '';

    const postItem = document.createElement('div');
    postItem.className = `post-item ${isReadClass}`;
    postItem.dataset.id = post.id;
    
    // Giữ nguyên cấu trúc HTML sạch sẽ
    postItem.innerHTML = `
      <div class="post-content">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
      <button class="read-toggle-btn" title="Đánh dấu đã đọc/chưa đọc">
        ${isRead ? '✓' : ''}
      </button>
    `;

    // --- SỬA LỖI MODAL: Lắng nghe click vào vùng nội dung chữ ---
    const postContent = postItem.querySelector('.post-content');
    postContent.addEventListener('click', () => {
      // Gọi lại logic mở Modal cũ của bạn ở đây. Ví dụ:
      // openModal(post); 
      
      console.log("Mở modal cho bài viết số:", post.id); // Dòng này để test thử xem nhận click chưa
    });

    // --- GIỮ NGUYÊN: Lắng nghe click vào riêng nút ô tròn ---
    const toggleBtn = postItem.querySelector('.read-toggle-btn');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Tuyệt đối không cho lan truyền sự kiện sang vùng chữ
      
      const currentlyRead = postItem.classList.contains('is-read');
      
      if (currentlyRead) {
        markAsUnread(post.id);
        postItem.classList.remove('is-read');
        toggleBtn.innerText = '';
      } else {
        markAsRead(post.id);
        postItem.classList.add('is-read');
        toggleBtn.innerText = '✓';
      }
    });

    postListContainer.appendChild(postItem);
  });
}