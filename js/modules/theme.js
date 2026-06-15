export function initTheme() {
  const toggleBtn = document.querySelector('#theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Bật đèn';
  } else {
  
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Tắt đèn';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
     
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Bật đèn';
      localStorage.setItem('theme', 'dark');
    } else {
     
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Tắt đèn';
      localStorage.setItem('theme', 'light');
    }
  });
}