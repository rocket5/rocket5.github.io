/**
 * Rocket 5 Studios - Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Rocket 5 Studios website loaded');
  
  // Create starfield
  initStarfield();
  
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

// Spherical Rotating Starfield
function initStarfield() {
  const starfield = document.querySelector('.starfield');
  if (!starfield) return;
  
  // Clear any existing stars
  starfield.innerHTML = '';
  
  // Configuration
  const config = {
    numStars: 1000,
    minSize: 1,
    maxSize: 4,
    sphereRadius: Math.max(window.innerWidth, window.innerHeight) * 0.8,
    // Keep a minimum distance from center to avoid stars passing too close to camera
    minDistanceFromCenter: 300,
    rotationSpeed: 0.01,
    perspective: 1000,
    // Counter-rotate stars for billboarding?
    enableBillboarding: true
  };
  
  // Create a container for stars with perspective
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('stars-container');
  starfield.appendChild(starsContainer);
  
  // Create a rotating parent element
  const starsParent = document.createElement('div');
  starsParent.classList.add('stars-parent');
  starsParent.style.position = 'absolute';
  starsParent.style.transformStyle = 'preserve-3d';
  starsParent.style.transform = 'translateZ(0)'; // Enable hardware acceleration
  starsParent.style.left = '0';
  starsParent.style.top = '0';
  starsParent.style.width = '100%';
  starsParent.style.height = '100%';
  starsParent.style.transformOrigin = '50% 50%'; // Ensure rotation happens around the exact center
  starsContainer.appendChild(starsParent);
  
  // Update the stars container to be full viewport size rather than a point
  starsContainer.style.top = '0';
  starsContainer.style.left = '0';
  starsContainer.style.width = '100%';
  starsContainer.style.height = '100%';
  starsContainer.style.transformOrigin = '50% 50%';
  
  // Stars array to track all stars
  let stars = [];
  
  // Create stars on a sphere
  for (let i = 0; i < config.numStars; i++) {
    // Create star DOM element
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Calculate a random position on a sphere using spherical coordinates
    // Use the golden ratio to distribute points evenly on a sphere
    const y = 1 - (i / (config.numStars - 1)) * 2; // Range from 1 to -1
    const radius = Math.sqrt(1 - y * y); // Radius at the given y
    
    // Golden ratio for even distribution
    const theta = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    
    // Scale the position by sphere radius and ensure minimum distance from center
    const distance = config.minDistanceFromCenter + 
                    (config.sphereRadius - config.minDistanceFromCenter) * Math.random();
    
    // Create star object with properties
    const starObj = {
      element: star,
      // Original spherical coordinates - these establish the sphere around origin (0,0,0)
      x: x * distance,
      y: y * distance,
      z: z * distance - config.sphereRadius * 0.3, // Offset z to keep stars mostly in front
      // Random size from configured range
      size: config.minSize + Math.random() * (config.maxSize - config.minSize),
      // Random opacity
      opacity: 0.1 + Math.random() * 0.5
    };
    
    // Add to our stars array
    stars.push(starObj);
    
    // Position star absolutely within parent
    star.style.position = 'absolute';
    // Position from center of container
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.marginLeft = `${starObj.size/-2}px`;
    star.style.marginTop = `${starObj.size/-2}px`;
    
    // Set star initial position directly in 3D space (without rotation yet)
    star.style.transform = `translate3d(${starObj.x}px, ${starObj.y}px, ${starObj.z}px)`;
    
    // Apply star styles
    star.style.width = `${starObj.size}px`;
    star.style.height = `${starObj.size}px`;
    star.style.opacity = starObj.opacity;
    star.style.transformStyle = 'preserve-3d'; // Ensure 3D rendering
    
    // Occasional subtle color variation (blue tint)
    if (Math.random() > 0.95) {
      const hue = 200 + Math.random() * 40; 
      star.style.backgroundColor = `hsl(${hue}, 80%, 85%)`;
    }
    
    // Add star to the parent container
    starsParent.appendChild(star);
  }
  
  // Track rotation
  let rotationY = 0;
  
  // Animation loop
  let animationFrame;
  function animate() {
    // Increment rotation
    rotationY += config.rotationSpeed;
    
    // Rotate the parent container around the Y axis, centered
    starsParent.style.transform = `rotateY(${rotationY}rad)`;
    
    // Update perspective effect
    starsContainer.style.perspective = `${config.perspective}px`;
    
    // Update star visibility and billboarding
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    
    // Only process a subset of stars each frame for better performance
    if (stars.length > 0) {
      // We update stars in chunks for better performance
      // Using a different chunk size for opacity updates vs. billboarding
      // Billboarding is more performance intensive
      const opacityChunkSize = 3; // Update 1/3 of stars' opacity each frame
      const billboardChunkSize = config.enableBillboarding ? 5 : 0; // Update 1/5 of stars' billboarding each frame if enabled
      
      const frameOffset = Math.floor(Math.random() * 10); // Randomize which stars get updated to avoid visible patterns
      
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Calculate rotated positions only once for both operations
        const rotatedZ = star.x * sinY + star.z * cosY;
        const rotatedX = star.x * cosY - star.z * sinY;
        
        // Update opacity on a subset of stars
        if (i % opacityChunkSize === frameOffset % opacityChunkSize) {
          // Update star visibility based on z position
          const normalizedZ = (rotatedZ + config.sphereRadius) / (config.sphereRadius * 2);
          const computedOpacity = star.opacity * (normalizedZ < 0.5 ? normalizedZ * 2 : 1);
          star.element.style.opacity = computedOpacity;
        }
        
        // Apply billboarding on a different subset of stars
        if (config.enableBillboarding && i % billboardChunkSize === frameOffset % billboardChunkSize) {
          // Apply counter-rotation for billboarding effect
          star.element.style.transform = `translate3d(${star.x}px, ${star.y}px, ${star.z}px) rotateY(${-rotationY}rad)`;
        }
      }
    }
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Update sphere radius on resize
    config.sphereRadius = Math.max(window.innerWidth, window.innerHeight) * 0.8;
    
    // Update perspective on resize
    starsContainer.style.perspective = `${config.perspective}px`;
  });
  
  // Cleanup on page hidden/unload
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animate();
    }
  });
}

// Helper function to position a star with 3D transform - kept for reference
function transformStar(x, y, z, config) {
  // Apply perspective projection
  const scale = config.perspective / (config.perspective - z);
  const translateX = x * scale;
  const translateY = y * scale;
  
  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// This function is no longer used in the optimized version
function updateStarStyle(star, config) {
  // Star position with perspective
  star.element.style.transform = transformStar(star.x, star.y, star.z, config);
  
  // Apply size
  star.element.style.width = `${star.size}px`;
  star.element.style.height = `${star.size}px`;
  
  // Apply opacity
  star.element.style.opacity = star.opacity;
  
  // Occasional subtle color variation (blue tint)
  if (Math.random() > 0.95) {
    const hue = 200 + Math.random() * 40; 
    star.element.style.backgroundColor = `hsl(${hue}, 80%, 85%)`;
  }
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