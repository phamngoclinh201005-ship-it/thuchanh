export function openModal(post) {
  const modal = document.getElementById('post-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalId = document.getElementById('modal-id');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-btn');

  if (!modal || !modalTitle || !modalBody) return;

  // 1. Đổ dữ liệu chi tiết của bài viết được click vào modal
  modalTitle.innerText = post.title;
  modalId.innerText = post.id;
  modalBody.innerText = post.body;

  // 2. Hiển thị modal lên màn hình
  modal.classList.add('show');

  // 3. Lắng nghe sự kiện click nút (X) để đóng modal
  closeBtn.onclick = () => {
    modal.classList.remove('show');
  };

  // 4. Click ra vùng ngoài xám của modal cũng đóng modal (giống Pinterest)
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  };
}