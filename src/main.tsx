
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
      }, 600);
    }
  }, 2000); // Show splash for 2 seconds

  createRoot(document.getElementById("root")!).render(<App />);
});
