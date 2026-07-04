// ============================================
// 十九的个人世界 - JavaScript
// ============================================

// 1. 主题切换
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.add(savedTheme);
  updateThemeDisplay();
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeDisplay();
      console.log('主题已切换为:', isDark ? '暗色模式' : '亮色模式');
    });
  }
}

function updateThemeDisplay() {
  const isDark = document.documentElement.classList.contains('dark');
  console.log('当前主题:', isDark ? '暗色模式' : '亮色模式');
}

// 2. 移动端菜单
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (!navToggle || !navMenu) {
    console.log('菜单元素未找到');
    return;
  }
  
  // 点击菜单项关闭菜单
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      navToggle.checked = false;
    });
  });
  
  // 点击外部关闭菜单
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && 
        !e.target.closest('label[for="nav-toggle"]') &&
        navToggle.checked) {
      navToggle.checked = false;
    }
  });
  
  console.log('移动端菜单初始化完成');
}

// 3. 返回顶部按钮
function createBackToTop() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'fixed bottom-20 right-4 z-50 w-10 h-10 bg-orange-500/80 text-white rounded-full backdrop-blur-sm border border-orange-400/30 opacity-0 invisible transition-all duration-300 hover:bg-orange-500';
  button.id = 'back-to-top';
  button.title = '返回顶部';
  document.body.appendChild(button);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      button.classList.remove('opacity-0', 'invisible');
      button.classList.add('opacity-100', 'visible');
    } else {
      button.classList.remove('opacity-100', 'visible');
      button.classList.add('opacity-0', 'invisible');
    }
  });

  button.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 4. 平滑滚动
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// 5. 检测移动设备
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

// 6. 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
  console.log('网站加载完成...');
  
  initTheme();
  initMobileMenu();
  createBackToTop();
  initSmoothScroll();
  
  console.log('所有功能初始化完成');
  console.log('设备类型:', isMobileDevice() ? '移动设备' : '桌面设备');
});
