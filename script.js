// Scroll Reveal effect with improved performance
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

// Throttle function for scroll performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Initialize scroll reveal on load and scroll
document.addEventListener("DOMContentLoaded", () => {
  // Initial check for elements in viewport
  revealOnScroll();
  
  // Add scroll event listener with throttling
  window.addEventListener("scroll", throttle(revealOnScroll, 100));
});

// Dark/Light Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentSlide = 0;
  let autoSlideInterval;
  const totalSlides = slides.length;
  
  // Initialize carousel
  function initCarousel() {
    showSlide(currentSlide);
    startAutoSlide();
    
    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', pauseAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Touch events for mobile swipe
    let startX = 0;
    let endX = 0;
    
    if (carouselContainer) {
      carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
      });
    }
    
    function handleSwipe() {
      const swipeThreshold = 50;
      if (startX - endX > swipeThreshold) {
        nextSlide(); // Swipe left
      } else if (endX - startX > swipeThreshold) {
        prevSlide(); // Swipe right
      }
    }
  }
  
  // Show specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    slides[index].style.display = 'block';
    setTimeout(() => {
      slides[index].classList.add('active');
    }, 50);
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Next slide
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
    resetAutoSlide();
  }
  
  // Previous slide
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
    resetAutoSlide();
  }
  
  // Auto slide functionality
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
  
  function pauseAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }
  
  function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
  }
  
  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlide();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Initialize carousel if elements exist
  if (slides.length > 0) {
    initCarousel();
  }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      }
    });
  });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
  // Remove loading class after page load
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
});
