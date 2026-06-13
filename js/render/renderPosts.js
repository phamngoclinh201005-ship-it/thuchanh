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
    // --- SỬA LẠI ĐOẠN CLICK VÙNG CHỮ ĐỂ BẬT MODAL ---
    const postContent = postItem.querySelector('.post-content');
    postContent.addEventListener('click', () => {
      console.log("Mở modal cho bài viết số:", post.id);

      // 1. Tìm cái hộp modal ngoài giao diện HTML
      const modal = document.getElementById('post-modal'); // Bạn kiểm tra xem id của thẻ modal trong file index.html là gì nhé (thường là 'post-modal' hoặc 'modal')
      
      if (modal) {
        // 2. Đổ dữ liệu của bài viết vào các thẻ bên trong modal
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (modalTitle) modalTitle.innerText = post.title;
        if (modalBody) modalBody.innerText = post.body;

        // 3. Thêm class 'show' để CSS ép modal hiện lên dạng flex
        modal.classList.add('show');
      }
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
  // Đoạn này đặt ở cuối file js/render/renderPosts.js hoặc file main.js của bạn nhé:
  const modal = document.getElementById('post-modal'); // Nhớ sửa đúng ID thẻ modal của bạn
  const closeBtn = document.querySelector('.close-btn');

  if (modal && closeBtn) {
    // Click vào nút X thì xóa class 'show' để ẩn đi
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    // Click ra vùng nền tối mờ xung quanh cũng ẩn modal đi luôn
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }
}