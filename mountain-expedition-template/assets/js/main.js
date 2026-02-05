// Mountain Expedition Template - Main JavaScript

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initDarkMode();
  initRTL(); // Added RTL initialization
  initFormValidation();
  initScrollAnimations();
  setActiveNavLink();
});

// Navigation Toggle for Mobile
function initNavigation() {
  const navToggle = document.querySelector('.navbar-toggle');
  const navMenu = document.querySelector('.navbar-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
  }
}

// Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved user preference
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateDarkModeIcon(isDark);
    });
  }
}

function updateDarkModeIcon(isDark) {
  const toggle = document.querySelector('.dark-mode-toggle');
  if (toggle) {
    toggle.innerHTML = isDark ? '☀️' : '🌙';
  }
}

// RTL Toggle
function initRTL() {
  const rtlToggle = document.getElementById('rtlToggle');
  const htmlTag = document.documentElement;
  
  // Check for saved user preference
  const currentDir = localStorage.getItem('dir');
  
  if (currentDir === 'rtl') {
    htmlTag.setAttribute('dir', 'rtl');
  } else if (currentDir === 'ltr') {
    htmlTag.setAttribute('dir', 'ltr');
  }
  
  if (rtlToggle) {
    rtlToggle.addEventListener('click', function() {
      const isRTL = htmlTag.getAttribute('dir') === 'rtl';
      const newDir = isRTL ? 'ltr' : 'rtl';
      htmlTag.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      
      // Update toggle button text/state if needed
      rtlToggle.classList.toggle('active', newDir === 'rtl');
    });
  }
}

// Fixed to handle ALL toggle buttons
function updateDarkModeIcon(isDark) {
  const toggles = document.querySelectorAll('.dark-mode-toggle');
  toggles.forEach(toggle => {
    toggle.innerHTML = isDark ? '☀️' : '🌙';
  });
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(error => error.remove());
      form.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
      
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Show success message
        showNotification('Form submitted successfully!', 'success');
        form.reset();
      } else {
        showNotification('Please fix the errors in the form.', 'error');
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (input.hasAttribute('required')) {
          validateField(input);
        }
      });
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Remove existing error
  const existingError = field.parentElement.querySelector('.form-error');
  if (existingError) existingError.remove();
  field.classList.remove('error');
  
  // Required validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = 'This field is required.';
    isValid = false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address.';
      isValid = false;
    }
  }
  
  // Phone validation
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 10) {
      errorMessage = 'Please enter a valid phone number.';
      isValid = false;
    }
  }
  
  // Min length validation
  if (field.hasAttribute('minlength')) {
    const minLength = parseInt(field.getAttribute('minlength'));
    if (value.length < minLength) {
      errorMessage = `Minimum ${minLength} characters required.`;
      isValid = false;
    }
  }
  
  if (!isValid) {
    field.classList.add('error');
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = errorMessage;
    field.parentElement.appendChild(error);
  }
  
  return isValid;
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.card, .expedition-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Set Active Navigation Link
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath === '/' && linkPath.includes('index.html'))) {
      link.classList.add('active');
    }
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .form-control.error {
    border-color: #ef4444;
  }
`;
document.head.appendChild(style);
