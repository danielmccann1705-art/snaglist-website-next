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
import { VsFieldwire } from './pages/VsFieldwire';
import { VsSiteAuditPro } from './pages/VsSiteAuditPro';
import { SnaggingAppFor } from './pages/SnaggingAppFor';
import { PunchListAppFor } from './pages/PunchListAppFor';
import { PersonaPage } from './pages/PersonaPage';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { MagicLinkViewer } from './pages/MagicLinkViewer';
import { getPersonaBySlug } from './data/personas';

// Extract magic link token from URL path /m/:token
function getMagicLinkToken(): string | null {
  const path = window.location.pathname;
  const match = path.match(/^\/m\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [magicLinkToken, setMagicLinkToken] = useState<string | null>(null);
  const [personaSlug, setPersonaSlug] = useState<string>('');

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

  // Scroll to top on page change
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const navigateToPersona = (pattern: 'snagging' | 'punch-list', slug: string) => {
    setPersonaSlug(slug);
    navigateTo(pattern === 'snagging' ? Page.SNAGGING_PERSONA : Page.PUNCH_LIST_PERSONA);
  };

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
        return <Comparison onNavigate={navigateTo} />;
      case Page.VS_FIELDWIRE:
        return <VsFieldwire onNavigate={navigateTo} />;
      case Page.VS_SITE_AUDIT_PRO:
        return <VsSiteAuditPro onNavigate={navigateTo} />;
      case Page.SNAGGING_APP_FOR:
        return <SnaggingAppFor onSelectPersona={(slug) => navigateToPersona('snagging', slug)} />;
      case Page.PUNCH_LIST_APP_FOR:
        return <PunchListAppFor onSelectPersona={(slug) => navigateToPersona('punch-list', slug)} />;
      case Page.SNAGGING_PERSONA: {
        const persona = getPersonaBySlug('snagging', personaSlug);
        if (!persona) return <SnaggingAppFor onSelectPersona={(slug) => navigateToPersona('snagging', slug)} />;
        return <PersonaPage persona={persona} onBack={() => navigateTo(Page.SNAGGING_APP_FOR)} />;
      }
      case Page.PUNCH_LIST_PERSONA: {
        const persona = getPersonaBySlug('punch-list', personaSlug);
        if (!persona) return <PunchListAppFor onSelectPersona={(slug) => navigateToPersona('punch-list', slug)} />;
        return <PersonaPage persona={persona} onBack={() => navigateTo(Page.PUNCH_LIST_APP_FOR)} />;
      }
      case Page.ABOUT:
        return <About />;
      case Page.PRIVACY:
        return <Privacy />;
      case Page.TERMS:
        return <Terms />;
      default:
        return <Landing />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={navigateTo}>
      {renderPage()}
    </Layout>
  );
};

export default App;
