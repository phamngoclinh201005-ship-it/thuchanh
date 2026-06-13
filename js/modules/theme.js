// File: js/modules/theme.js

export function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // 1. Kiểm tra xem lần trước người dùng có tắt đèn không (Lấy từ LocalStorage)
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    toggleBtn.innerText = '☀️ Bật đèn';
  }

  // 2. Lắng nghe sự kiện click vào nút
  toggleBtn.addEventListener('click', () => {
    // Toggle (nếu có class dark-theme thì xóa, không có thì thêm vào)
    document.body.classList.toggle('dark-theme');
    
    // Kiểm tra xem hiện tại đang là tối hay sáng để đổi chữ nút bấm và lưu lại
    if (document.body.classList.contains('dark-theme')) {
      toggleBtn.innerText = '☀️ Bật đèn';
      localStorage.setItem('theme', 'dark'); // Lưu trạng thái tối
    } else {
      toggleBtn.innerText = '🌙 Tắt đèn';
      localStorage.setItem('theme', 'light'); // Lưu trạng thái sáng
    }
  });
}