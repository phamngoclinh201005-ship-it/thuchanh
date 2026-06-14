export function openModal(post) {
  const modal = document.getElementById('post-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalId = document.getElementById('modal-id');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-btn');

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.innerText = post.title;
  modalId.innerText = post.id;
  modalBody.innerText = post.body;

  modal.classList.add('show');
  closeBtn.onclick = () => {
    modal.classList.remove('show');
  };
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  };
}