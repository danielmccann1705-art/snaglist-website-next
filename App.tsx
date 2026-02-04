import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { Page } from './types';
import { Support } from './pages/Support';
import { MagicLinks } from './pages/MagicLinks';
import { FloorPlans } from './pages/FloorPlans';
import { Comparison } from './pages/Comparison';
import { About } from './pages/About';
import { MagicLinkViewer } from './pages/MagicLinkViewer';

// Extract magic link token from URL path /m/:token
function getMagicLinkToken(): string | null {
  const path = window.location.pathname;
  const match = path.match(/^\/m\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [magicLinkToken, setMagicLinkToken] = useState<string | null>(null);

  // Check for magic link on initial load and URL changes
  useEffect(() => {
    const checkForMagicLink = () => {
      const token = getMagicLinkToken();
      setMagicLinkToken(token);
    };

    checkForMagicLink();

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', checkForMagicLink);
    return () => window.removeEventListener('popstate', checkForMagicLink);
  }, []);

  // If we have a magic link token, render the viewer without the normal layout
  if (magicLinkToken) {
    return <MagicLinkViewer token={magicLinkToken} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Landing />;
      case Page.FEATURES:
        return <Features />;
      case Page.PRICING:
        return <Pricing />;
      case Page.SUPPORT:
        return <Support />;
      case Page.MAGIC_LINKS:
        return <MagicLinks />;
      case Page.FLOOR_PLANS:
        return <FloorPlans />;
      case Page.COMPARISON:
        return <Comparison />;
      case Page.ABOUT:
        return <About />;
      default:
        return <Landing />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;
