
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// First wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Clear all localStorage data to restart the system
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('hms_')) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('HMS system restarted: All data cleared');

  // Create a timeout for the splash screen
  setTimeout(() => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.classList.add('hide');
      
      // Remove splash screen from DOM after transition completes
      setTimeout(() => {
        splashScreen.remove();
        
        // Start the app immediately - no intro overlay
        createRoot(document.getElementById("root")!).render(<App />);
      }, 800);
    }
  }, 2000); // Show splash for 2 seconds
});
