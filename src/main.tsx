
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AnimatePresence } from 'framer-motion'

// Create root element
const rootElement = document.getElementById("root");

// Create root
if (rootElement) {
  const root = createRoot(rootElement);
  
  // Render the app with AnimatePresence for smooth transitions
  root.render(
    <AnimatePresence mode="wait">
      <App />
    </AnimatePresence>
  );
}
