// 默认暗色模式
document.documentElement.classList.add('dark');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// 检查用户偏好，默认为暗色模式
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  html.classList.remove('dark');
} else {
  html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const theme = html.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const showButton = document.getElementById('show-button');
const hideButton = document.getElementById('hide-button');

if (navToggle) {
  navToggle.addEventListener('change', () => {
    if (navToggle.checked) {
      navMenu.classList.remove('hidden');
      showButton.classList.add('hidden');
      hideButton.classList.remove('hidden');
    } else {
      navMenu.classList.add('hidden');
      showButton.classList.remove('hidden');
      hideButton.classList.add('hidden');
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.intersect\\:animate-fadeUp, .intersect\\:animate-fadeDown').forEach(el => {
  observer.observe(el);
});

// Smooth scroll for anchor links
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

// Add hover effect to glass cards
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Console welcome message
console.log('%c欢迎来到猫普的精神世界！🐱', 'color: #f97316; font-size: 20px; font-weight: bold;');
console.log('%c一个独立开发者的精神自留地', 'color: #94a3b8; font-size: 14px;');

// ============================================
// 网站优化功能
// ============================================

// 1. 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
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
    // Fallback for older browsers
    lazyImages.forEach(img => img.classList.add('loaded'));
  }
});

// 2. 平滑滚动到锚点
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

// 3. 返回顶部按钮
function createBackToTop() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'fixed bottom-20 right-4 z-50 w-10 h-10 bg-orange-500/80 text-white rounded-full backdrop-blur-sm border border-orange-400/30 opacity-0 invisible transition-all duration-300 hover:bg-orange-500 hover:shadow-lg';
  button.id = 'back-to-top';
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

// 4. 暗色模式切换优化
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.add(savedTheme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }
}

// 5. 移动端菜单优化
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

// 6. 性能优化 - 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 7. 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
  createBackToTop();
  initTheme();
  initMobileMenu();
  
  // 添加控制台欢迎信息
  console.log('%c欢迎来到十九的个人世界！🐱', 'color: #f97316; font-size: 16px; font-weight: bold;');
  console.log('%c一个对数码与AI充满热情的大二学生', 'color: #94a3b8; font-size: 12px;');
});
