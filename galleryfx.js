import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Animate gallery hero title
  animate(".hero-content h1", 
    { opacity: [0, 1], y: [30, 0] },
    { duration: 0.8, easing: "ease-out" }
  );
});
