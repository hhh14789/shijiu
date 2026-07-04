// ============================================
// 十九的个人世界 - JavaScript
// ============================================

// 1. 主题切换功能
function initTheme() {
  // 获取保存的主题，默认为暗色模式
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // 应用主题
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // 绑定切换按钮事件
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 切换dark类
      const isDark = document.documentElement.classList.toggle('dark');
      
      // 保存主题偏好
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // 强制更新按钮图标显示
      this.querySelectorAll('svg').forEach(svg => {
        svg.style.display = '';
      });
      
      console.log('主题已切换为:', isDark ? '暗色模式' : '亮色模式');
    });
  } else {
    console.error('未找到theme-toggle按钮');
  }
}

// 2. 移动端菜单优化
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    // 点击菜单项后关闭菜单
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.checked = false;
      });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.checked = false;
      }
    });
  }
}

// 3. 返回顶部按钮
function createBackToTop() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'fixed bottom-20 right-4 z-50 w-10 h-10 bg-orange-500/80 text-white rounded-full backdrop-blur-sm border border-orange-400/30 opacity-0 invisible transition-all duration-300 hover:bg-orange-500 hover:shadow-lg';
  button.id = 'back-to-top';
  button.title = '返回顶部';
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.classList.remove('opacity-0', 'invisible');
      button.classList.add('opacity-100', 'visible');
    } else {
      button.classList.remove('opacity-100', 'visible');
      button.classList.add('opacity-0', 'invisible');
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 4. 图片懒加载
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
}

// 5. 平滑滚动
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 6. 初始化所有功能


// 7. 控制台欢迎信息
console.log('%c欢迎来到十九的个人世界！🐱', 'color: #f97316; font-size: 16px; font-weight: bold;');
console.log('%c一个对数码与AI充满热情的大二学生', 'color: #94a3b8; font-size: 12px;');


// ============================================
// 移动端优化功能
// ============================================

// 1. 移动端菜单优化
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    // 点击菜单项后关闭菜单
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.checked = false;
      });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && 
          !e.target.closest('label[for="nav-toggle"]')) {
        navToggle.checked = false;
      }
    });
    
    // 防止菜单内部点击关闭
    navMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

// 2. 触摸反馈优化
function initTouchFeedback() {
  // 为所有可点击元素添加触摸反馈
  const clickables = document.querySelectorAll('a, button, .glass-card, [role="button"]');
  
  clickables.forEach(el => {
    el.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, { passive: true });
    
    el.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    }, { passive: true });
    
    el.addEventListener('touchcancel', function() {
      this.classList.remove('touch-active');
    }, { passive: true });
  });
}

// 3. 防止双击缩放
function preventDoubleTapZoom() {
  let lastTouchEnd = 0;
  
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

// 4. 优化滚动性能
function initSmoothScroll() {
  // 为所有锚点链接添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 5. 视口高度修复（移动端100vh问题）
function fixViewportHeight() {
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
}

// 6. 检测移动设备
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

// 7. 移动端特定优化
function initMobileOptimizations() {
  if (isMobileDevice()) {
    document.body.classList.add('is-mobile');
    
    // 防止双击缩放
    preventDoubleTapZoom();
    
    // 添加触摸反馈
    initTouchFeedback();
    
    // 修复视口高度
    fixViewportHeight();
    
    console.log('移动端优化已启用');
  }
}

// 8. 更新初始化函数
// 在DOMContentLoaded事件中添加移动端优化
document.addEventListener('DOMContentLoaded', function() {
  console.log('网站加载完成，初始化功能...');
  
  initTheme();
  initMobileMenu();
  createBackToTop();
  initLazyLoad();
  initSmoothScroll();
  initMobileOptimizations(); // 新增
  
  console.log('所有功能初始化完成');
  console.log('当前主题:', document.documentElement.classList.contains('dark') ? '暗色模式' : '亮色模式');
  console.log('设备类型:', isMobileDevice() ? '移动设备' : '桌面设备');
});
