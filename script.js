// Modern Portfolio Script
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initLoading();
  initThemeToggle();
  initMobileMenu();
  initScrollReveal();
  initTypewriter();
  initProficiencyBars();
  initProjectFilter();
  initFormValidation();
  initBackToTop();
  initScrollSpy();
  initAnimations();
  initParticles();
});

// Loading Screen
function initLoading() {
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500);
  }
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('no-scroll');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    });
  }
}

// Scroll Reveal
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.85) {
        element.classList.add('active');
      }
    });
  };

  // Throttle function for performance
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Initial check
  revealOnScroll();
  
  // Check on scroll with throttling
  window.addEventListener('scroll', throttle(revealOnScroll, 100));
}

// Typewriter Effect
function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter');
  if (!typewriterElement) return;

  const typedText = typewriterElement.querySelector('.typed-text');
  const cursor = typewriterElement.querySelector('.cursor');
  
  const phrases = [
    "Machine Learning Engineer",
    "Computer Vision Specialist",
    "Frontend Web Developer",
    "Research Enthusiast"
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isEnd = true;
      setTimeout(type, 1500);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    const normalDelay = isEnd ? 1000 : typingSpeed;
    
    setTimeout(type, normalDelay);
    
    if (isEnd) {
      isDeleting = true;
      isEnd = false;
    }
  }

  setTimeout(type, 500);
}

// Proficiency Bars Animation
function initProficiencyBars() {
  const proficiencyItems = document.querySelectorAll('.proficiency-item');
  const proficiencyLevels = document.querySelectorAll('.proficiency-level');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        item.classList.add('animate');
        
        // Animate the bar
        const bar = item.querySelector('.proficiency-level');
        if (bar) {
          const level = bar.getAttribute('data-level');
          setTimeout(() => {
            bar.style.width = level + '%';
          }, 300);
        }
      }
    });
  }, {
    threshold: 0.5
  });

  proficiencyItems.forEach(item => observer.observe(item));
}

// Project Filter
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Function to filter projects
  const filterProjects = (filterValue) => {
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      
      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.style.display = 'block';
        // Add animation after display
        setTimeout(() => {
          card.classList.add('animate');
        }, 100);
      } else {
        card.style.display = 'none';
        card.classList.remove('animate');
      }
    });
  };

  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value and apply filter
      const filterValue = button.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });

  // Auto-show all projects on page load
  window.addEventListener('load', () => {
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
      // First make sure all projects are visible
      filterProjects('all');
      
      // Then simulate click to update active state
      allButton.click();
    }
  });
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
      const message = contactForm.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Scroll Spy for Navigation
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Additional Animations
function initAnimations() {
  // Sticky header on scroll
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Animate elements on hover
  const cards = document.querySelectorAll('.category-card, .project-card, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });
  
  // Counter animation for stats
  const stats = document.querySelectorAll('.stat h3');
  
  const startCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 20);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent);
        if (!isNaN(target)) {
          startCounter(entry.target, target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => observer.observe(stat));
}

// Particles Animation
function initParticles() {
  const particlesContainer = document.querySelector('.floating-particles');
  if (!particlesContainer) return;
  
  // Create additional particles
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 15 + 15;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add loading class to body
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
