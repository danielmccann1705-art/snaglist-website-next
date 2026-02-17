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

// Page <-> URL path mapping
const pageToPath: Record<Page, string> = {
  [Page.HOME]: '/',
  [Page.FEATURES]: '/features',
  [Page.PRICING]: '/pricing',
  [Page.SUPPORT]: '/support',
  [Page.MAGIC_LINKS]: '/magic-links',
  [Page.ABOUT]: '/about',
  [Page.COMPARISON]: '/comparison',
  [Page.VS_FIELDWIRE]: '/vs-fieldwire',
  [Page.VS_SITE_AUDIT_PRO]: '/vs-site-audit-pro',
  [Page.FLOOR_PLANS]: '/floor-plans',
  [Page.SNAGGING_APP_FOR]: '/snagging-app',
  [Page.SNAGGING_PERSONA]: '/snagging-app',
  [Page.PUNCH_LIST_APP_FOR]: '/punch-list-app',
  [Page.PUNCH_LIST_PERSONA]: '/punch-list-app',
  [Page.PRIVACY]: '/privacy',
  [Page.TERMS]: '/terms',
  [Page.MAGIC_LINK_LANDING]: '/',
  [Page.MAGIC_LINK_SNAGS]: '/',
  [Page.MAGIC_LINK_SNAG_DETAIL]: '/',
};

// Resolve URL path to page (and optional persona slug)
function resolveRoute(): { page: Page; personaSlug?: string; magicLinkToken?: string } {
  const path = window.location.pathname;

  // Magic link routes: /m/:token
  const magicMatch = path.match(/^\/m\/([a-zA-Z0-9_-]+)/);
  if (magicMatch) return { page: Page.HOME, magicLinkToken: magicMatch[1] };

  // Persona routes: /snagging-app/:slug or /punch-list-app/:slug
  const snaggingPersona = path.match(/^\/snagging-app\/([a-zA-Z0-9_-]+)/);
  if (snaggingPersona) return { page: Page.SNAGGING_PERSONA, personaSlug: snaggingPersona[1] };

  const punchListPersona = path.match(/^\/punch-list-app\/([a-zA-Z0-9_-]+)/);
  if (punchListPersona) return { page: Page.PUNCH_LIST_PERSONA, personaSlug: punchListPersona[1] };

  // Static routes
  for (const [page, pagePath] of Object.entries(pageToPath)) {
    if (pagePath !== '/' && path === pagePath) return { page: page as Page };
  }

  return { page: Page.HOME };
}

const App: React.FC = () => {
  const initialRoute = resolveRoute();
  const [currentPage, setCurrentPage] = useState<Page>(initialRoute.page);
  const [magicLinkToken, setMagicLinkToken] = useState<string | null>(initialRoute.magicLinkToken ?? null);
  const [personaSlug, setPersonaSlug] = useState<string>(initialRoute.personaSlug ?? '');

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const route = resolveRoute();
      setCurrentPage(route.page);
      setMagicLinkToken(route.magicLinkToken ?? null);
      if (route.personaSlug) setPersonaSlug(route.personaSlug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // If we have a magic link token, render the viewer without the normal layout
  if (magicLinkToken) {
    return <MagicLinkViewer token={magicLinkToken} />;
  }

  // Navigate and update URL
  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    const path = pageToPath[page] || '/';
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
  };

  const navigateToPersona = (pattern: 'snagging' | 'punch-list', slug: string) => {
    setPersonaSlug(slug);
    const page = pattern === 'snagging' ? Page.SNAGGING_PERSONA : Page.PUNCH_LIST_PERSONA;
    const basePath = pattern === 'snagging' ? '/snagging-app' : '/punch-list-app';
    setCurrentPage(page);
    window.history.pushState({}, '', `${basePath}/${slug}`);
    window.scrollTo(0, 0);
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
