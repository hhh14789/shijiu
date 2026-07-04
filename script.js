// 主题切换和移动端菜单
document.addEventListener('DOMContentLoaded', function() {
  console.log('网站加载完成');
  
  // ============================================
  // 主题切换
  // ============================================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // 初始化主题
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  
  // 主题切换事件
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      console.log('主题已切换为:', isDark ? '暗色模式' : '亮色模式');
    });
  }
  
  // ============================================
  // 移动端菜单
  // ============================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;
  
  if (menuToggle && mobileMenu) {
    // 菜单按钮点击事件
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      menuOpen = !menuOpen;
      
      if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        // 添加动画
        mobileMenu.style.animation = 'none';
        mobileMenu.offsetHeight; // 触发重绘
        mobileMenu.style.animation = 'slideDown 0.3s ease';
      } else {
        mobileMenu.classList.add('hidden');
      }
      
      console.log('菜单状态:', menuOpen ? '打开' : '关闭');
    });
    
    // 点击菜单项关闭菜单
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuOpen = false;
        console.log('点击菜单项，关闭菜单');
      });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
      if (menuOpen && 
          !mobileMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuOpen = false;
        console.log('点击外部，关闭菜单');
      }
    });
  }
  
  console.log('导航栏初始化完成');
});
