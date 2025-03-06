
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AnimatePresence } from 'framer-motion'

// Create root element
const rootElement = document.getElementById("root");

// Create root
if (rootElement) {
  const root = createRoot(rootElement);
  
  // Clear any existing hospital data from localStorage for fresh start
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('hospital_')) {
      localStorage.removeItem(key);
    }
  });
  
  // Render the app with AnimatePresence for smooth transitions
  root.render(
    <AnimatePresence mode="wait">
      <App />
    </AnimatePresence>
  );
}
