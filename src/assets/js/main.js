/**
 * Rocket 5 Studios - Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Rocket 5 Studios website loaded');
  
  // Create starfield - Make sure starfield gets initialized first
  initStarfield();
  
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
  if (!starfield) {
    console.error('Starfield element not found!');
    return;
  }
  
  // Ensure starfield is properly fixed
  starfield.style.position = 'fixed';
  starfield.style.top = '0';
  starfield.style.left = '0';
  starfield.style.width = '100%';
  starfield.style.height = '100%';
  starfield.style.zIndex = '0';
  starfield.style.pointerEvents = 'none';
  starfield.style.opacity = '1';
  
  // Clear any existing stars
  starfield.innerHTML = '';
  
  // Configuration - Increase number of stars and size
  const config = {
    numStars: 500,
    minSize: 6,
    maxSize: 10,
    sphereRadius: Math.max(window.innerWidth, window.innerHeight) * 1.2,
    // Keep a minimum distance from center to avoid stars passing too close to camera
    minDistanceFromCenter: 300,
    rotationSpeed: 0.0005,
    perspective: 1000,
    // Counter-rotate stars for billboarding?
    enableBillboarding: true,
    // Distance from camera to the starfield origin (z-distance)
    cameraDistance: 1000,
    // Distribution of stars (higher values cluster stars more toward the edges of the sphere)
    distributionPower: 1,
    // Star color options
    starColorBase: '#ffffff',  // Base color for stars
    starColorVariation: 0.15,  // Increased from 0.05 - more colored stars
    starColorHueMin: 200,      // Minimum hue for colored stars
    starColorHueMax: 255       // Maximum hue for colored stars
  };
  
  // Create a container for stars with perspective
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('stars-container');
  starsContainer.style.perspective = `${config.perspective}px`;
  starsContainer.style.position = 'absolute';
  starsContainer.style.top = '0';
  starsContainer.style.left = '0';
  starsContainer.style.width = '100%';
  starsContainer.style.height = '100%';
  starsContainer.style.pointerEvents = 'none';
  starfield.appendChild(starsContainer);
  
  // Create a rotating parent element
  const starsParent = document.createElement('div');
  starsParent.classList.add('stars-parent');
  starsParent.style.position = 'absolute';
  starsParent.style.transformStyle = 'preserve-3d';
  // Position the starfield origin at the configured distance from camera
  starsParent.style.transform = `translateZ(-${config.cameraDistance}px)`;
  starsParent.style.left = '0';
  starsParent.style.top = '0';
  starsParent.style.width = '100%';
  starsParent.style.height = '100%';
  starsParent.style.transformOrigin = '50% 50%'; // Ensure rotation happens around the exact center
  starsParent.style.pointerEvents = 'none';  // Ensure it doesn't interfere with page interactions
  starsContainer.appendChild(starsParent);
  
  // Update the stars container to be full viewport size rather than a point
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
    
    // Apply distribution power to control clustering (higher values = more stars at edges)
    const adjustedY = Math.sign(y) * Math.pow(Math.abs(y), config.distributionPower);
    
    const radius = Math.sqrt(1 - adjustedY * adjustedY); // Radius at the given y
    
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
      y: adjustedY * distance,
      z: z * distance - config.sphereRadius * 0.3, // Offset z to keep stars mostly in front
      // Random size from configured range
      size: config.minSize + Math.random() * (config.maxSize - config.minSize),
      // Increased opacity for better visibility
      opacity: 0.4 + Math.random() * 0.6
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
    
    // Apply base color
    star.style.backgroundColor = config.starColorBase;
    
    // Occasional subtle color variation 
    if (Math.random() < config.starColorVariation) {
      const hue = config.starColorHueMin + Math.random() * (config.starColorHueMax - config.starColorHueMin); 
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
    // Maintain the z-distance from the camera during rotation
    starsParent.style.transform = `translateZ(-${config.cameraDistance}px) rotateY(${rotationY}rad)`;
    
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
          // Factor in the camera distance to ensure proper visibility calculations
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
    
    // Reapply perspective and camera distance on resize
    starsContainer.style.perspective = `${config.perspective}px`;
    
    // Maintain the camera distance and current rotation
    starsParent.style.transform = `translateZ(-${config.cameraDistance}px) rotateY(${rotationY}rad)`;
  });
  
  // Cleanup on page hidden/unload
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animationFrame = requestAnimationFrame(animate);
    }
  });
}

// Function to create a typing animation effect
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-header');
  if (!typingElement) return;
  
  const text = typingElement.textContent;
  typingElement.textContent = '';
  
  let charIndex = 0;
  
  function type() {
    if (charIndex < text.length) {
      typingElement.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      typingElement.classList.add('typing-complete');
    }
  }
  
  setTimeout(type, 1000);
} 