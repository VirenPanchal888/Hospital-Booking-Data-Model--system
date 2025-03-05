
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
      }, 800); // Transition time
    }
  }, 1500); // Show splash for 1.5 seconds (reduced for better UX)
  
  // Function to skip introduction and start the app
  function skipIntroduction() {
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay && introOverlay.classList.contains('show')) {
      introOverlay.classList.remove('show');
      
      // Add a fade-out class for smoother transition
      introOverlay.classList.add('fade-out');
      
      // Remove intro overlay from DOM after transition completes
      setTimeout(() => {
        introOverlay.remove();
      }, 800);
    }
  }

  // Create a splash screen element
  const createSplashScreen = () => {
    const splash = document.createElement('div');
    splash.id = 'splash-screen';
    splash.className = 'splash-screen';
    
    const logoContainer = document.createElement('div');
    logoContainer.className = 'splash-logo-container';
    
    const logo = document.createElement('img');
    logo.src = '/lovable-uploads/d848b625-067d-4f8a-aff8-2cf03ce52183.png';
    logo.alt = 'HealthWave';
    logo.className = 'splash-logo';
    logo.width = 280;
    
    logoContainer.appendChild(logo);
    splash.appendChild(logoContainer);
    
    document.body.appendChild(splash);
  };
  
  // Create intro overlay with hospital description
  const createIntroOverlay = () => {
    const intro = document.createElement('div');
    intro.id = 'intro-overlay';
    intro.className = 'intro-overlay';
    
    const content = document.createElement('div');
    content.className = 'intro-content';
    
    // Add logo
    const logo = document.createElement('img');
    logo.src = '/lovable-uploads/d848b625-067d-4f8a-aff8-2cf03ce52183.png';
    logo.alt = 'HealthWave';
    logo.className = 'intro-logo';
    logo.width = 250;
    
    // Add description text
    const text = document.createElement('div');
    text.className = 'intro-text';
    text.innerHTML = `
      <p>Our Hospital Application System is designed to streamline healthcare operations, enhance patient care, and ensure compliance with medical policies and standards. The system integrates advanced technology, AI-driven automation, and real-time monitoring to create an efficient, secure, and patient-centric healthcare environment.</p>
      
      <p>🔹 <strong>Healthcare Policy & Compliance</strong><br>
      Our hospital management system aligns with national and international healthcare policies, ensuring that patient data is managed securely, medical records are maintained accurately, and all operations comply with HIPAA (Health Insurance Portability and Accountability Act) and NABH (National Accreditation Board for Hospitals & Healthcare Providers) guidelines. The system ensures confidentiality, integrity, and availability of patient records through end-to-end encryption, role-based access control, and automated compliance tracking.</p>
      
      <p>🔹 <strong>Patient Care & Safety</strong><br>
      We prioritize patient safety and quality care by enabling automated appointment scheduling, real-time doctor availability, AI-driven diagnostics, and medication tracking. The system integrates electronic health records (EHR), telemedicine support, and emergency management features, ensuring that patients receive the right treatment at the right time. AI-powered health analytics help doctors predict potential health risks, monitor chronic conditions, and provide data-driven medical recommendations.</p>
      
      <p>🔹 <strong>Efficient Hospital Operations & Workflow Automation</strong><br>
      The system optimizes hospital workflow management, allowing doctors, nurses, and administrative staff to collaborate efficiently. It includes billing automation, insurance claim processing, real-time inventory tracking, and patient discharge management, reducing paperwork and administrative burdens. The system also integrates with pharmacy and laboratory services, ensuring smooth coordination between departments for timely diagnosis and treatment.</p>
      
      <p>🔹 <strong>Digital Transformation in Healthcare</strong><br>
      Our HMS leverages AI, machine learning, and IoT (Internet of Things) to create a smart healthcare ecosystem. Features like predictive analytics, AI-assisted medical report analysis, and automated reminders for follow-ups ensure proactive patient care. Patients can book appointments online, access medical reports, and receive personalized healthcare suggestions through a user-friendly interface.</p>
      
      <p>🔹 <strong>Future of Smart Healthcare</strong><br>
      The future of hospital management lies in the integration of blockchain for secure patient data storage, AI-powered robotic assistance for surgeries, and cloud-based healthcare solutions. Our system is designed to be scalable, adaptable, and future-ready, ensuring hospitals can continuously evolve to meet the growing demands of modern healthcare.</p>
    `;
    
    // Add skip button
    const skipButton = document.createElement('button');
    skipButton.id = 'skip-intro';
    skipButton.className = 'skip-button';
    skipButton.textContent = 'Start Application';
    
    // Assemble the intro overlay
    content.appendChild(logo);
    content.appendChild(text);
    content.appendChild(skipButton);
    intro.appendChild(content);
    
    document.body.appendChild(intro);
  };
  
  // Create splash and intro elements
  createSplashScreen();
  createIntroOverlay();

  // Mount the React app
  createRoot(document.getElementById("root")!).render(<App />);
});
