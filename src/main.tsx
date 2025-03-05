
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// First wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Create a timeout for the splash screen
  setTimeout(() => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.classList.add('hide');
      
      // Remove splash screen from DOM after transition completes
      setTimeout(() => {
        splashScreen.remove();
        
        // Show intro overlay after splash screen is removed
        const introOverlay = document.getElementById('intro-overlay');
        if (introOverlay) {
          introOverlay.classList.add('show');
          
          // Add event listener to skip button
          const skipButton = document.getElementById('skip-intro');
          if (skipButton) {
            skipButton.addEventListener('click', skipIntroduction);
          }
          
          // Auto-hide intro after 4.9 seconds if not skipped
          setTimeout(() => {
            skipIntroduction();
          }, 4900); // 4.9 seconds
        }
      }, 600);
    }
  }, 2000); // Show splash for 2 seconds
  
  // Function to skip introduction and start the app
  function skipIntroduction() {
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay && introOverlay.classList.contains('show')) {
      introOverlay.classList.remove('show');
      
      // Remove intro overlay from DOM after transition completes
      setTimeout(() => {
        introOverlay.remove();
      }, 600);
    }
  }

  createRoot(document.getElementById("root")!).render(<App />);
});
