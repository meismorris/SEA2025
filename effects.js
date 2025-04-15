// Import Motion library from CDN
import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Animate hero title
  animate(".hero-title", 
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.8 }
  );
  
  // Animated discover button
  animate(".discover-btn", 
    { y: [0, -5, 0] }, 
    { duration: 2, repeat: Infinity }
  );
  
  // Animate aquarium cards on scroll
  document.querySelectorAll('.aquarium-card').forEach((card, index) => {
    animate(card, 
      { opacity: [0, 1], y: [50, 0] },
      { 
        delay: index * 0.2,
        duration: 0.5, 
        easing: [0.25, 1, 0.5, 1] 
      }
    );
  });
  
  // Bottom feature animation
  animate(".feature-image-container", 
    { opacity: [0, 1], scale: [0.95, 1] },
    { duration: 1 }
  );
  
  animate(".discover-more-link", 
    { x: [-20, 0], opacity: [0, 1] },
    { duration: 0.5, delay: 0.3 }
  );
});