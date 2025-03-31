/**
 * Rocket 5 Studios - Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Rocket 5 Studios website loaded');
  
  // Create starfield
  createStarfield();
  
  // Initialize typing animation
  initTypingAnimation();
  
  // Enable Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

// Starfield Animation
function createStarfield() {
  const starfield = document.querySelector('.starfield');
  const numStars = 200;
  
  // Create stars
  for (let i = 0; i < numStars; i++) {
    createStar(starfield);
  }
  
  // Continuously create new stars
  setInterval(() => {
    // Remove some old stars to prevent too many elements
    const stars = document.querySelectorAll('.star');
    if (stars.length > 300) {
      for (let i = 0; i < 10; i++) {
        if (stars[i]) stars[i].remove();
      }
    }
    
    // Add new stars
    for (let i = 0; i < 5; i++) {
      createStar(starfield);
    }
  }, 1000);
}

function createStar(container) {
  const star = document.createElement('div');
  star.classList.add('star');
  
  // Random star properties
  const size = Math.random() * 3;
  const posX = Math.random() * window.innerWidth;
  const posY = Math.random() * window.innerHeight;
  const duration = 3 + Math.random() * 10;
  const delay = Math.random() * 5;
  
  // Set star styles
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${posX}px`;
  star.style.top = `${posY}px`;
  star.style.opacity = Math.random();
  
  // Add the star to the starfield
  container.appendChild(star);
  
  // Animate the star
  setTimeout(() => {
    star.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
    star.style.transform = `translateY(${window.innerHeight + 100}px)`;
    star.style.opacity = '0';
    
    // Remove the star after the animation completes
    setTimeout(() => {
      star.remove();
    }, duration * 1000);
  }, delay * 1000);
}

// Typing Animation
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-header');
  if (!typingElement) return;
  
  const text = typingElement.getAttribute('data-text');
  const typingDelay = 100; // Delay between each character
  let charIndex = 0;
  
  typingElement.textContent = '';
  typingElement.style.visibility = 'visible';
  
  function type() {
    if (charIndex < text.length) {
      typingElement.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      // Add blinking cursor at the end
      typingElement.classList.add('typing-complete');
    }
  }
  
  // Start typing animation after a delay
  setTimeout(type, 1000);
} 