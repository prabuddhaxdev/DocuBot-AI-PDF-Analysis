import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');

  useEffect(() => {
    // Handle initial route
    setCurrentRoute(window.location.pathname);

    // Listen for browser back/forward navigation
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToChat = () => {
    window.history.pushState({}, '', '/chat');
    setCurrentRoute('/chat');
  };

  const navigateToLanding = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('/');
  };

  return (
    <div className="min-h-screen bg-vintage-white">
      {currentRoute === '/chat' ? (
        <Chat onBackToLanding={navigateToLanding} />
      ) : (
        <LandingPage onNavigateToChat={navigateToChat} />
      )}
    </div>
  );
};

export default App;
