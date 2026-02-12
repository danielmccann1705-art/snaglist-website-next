import React from 'react';
import { ClipboardList, Menu, X } from 'lucide-react';
import { Page } from '../types';
import { WaitlistForm } from './WaitlistForm';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const primaryNav = [
    { label: 'Features', page: Page.FEATURES },
    { label: 'Pricing', page: Page.PRICING },
    { label: 'About', page: Page.ABOUT },
    { label: 'Support', page: Page.SUPPORT },
  ];

  const secondaryNav = [
    { label: 'Magic Links', page: Page.MAGIC_LINKS },
    { label: 'Floor Plans', page: Page.FLOOR_PLANS },
    { label: 'Comparison', page: Page.COMPARISON },
    { label: 'Snagging App', page: Page.SNAGGING_APP_FOR },
    { label: 'Punch List App', page: Page.PUNCH_LIST_APP_FOR },
  ];

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.querySelector('input')?.focus();
    } else {
      onNavigate(Page.HOME);
      setTimeout(() => {
        const target = document.getElementById('waitlist-form');
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target?.querySelector('input')?.focus();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-display bg-background-light text-[#181411]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#f5f2f0] bg-white/90 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate(Page.HOME)}
            className="flex items-center gap-2 group"
          >
            <div className="text-primary size-8 flex items-center justify-center transition-transform group-hover:scale-110">
              <ClipboardList size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">Snaglist</h2>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 justify-center gap-6">
            {primaryNav.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.page ? 'text-primary' : 'text-[#181411] hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <button
              onClick={scrollToWaitlist}
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-orange-600 transition-colors text-white text-sm font-bold shadow-sm"
            >
              <span className="truncate">Join Waitlist</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-4 shadow-xl">
            <div className="flex flex-col gap-2 px-4">
              <button
                onClick={() => {
                  onNavigate(Page.HOME);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === Page.HOME ? 'bg-orange-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              {primaryNav.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    onNavigate(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === link.page ? 'bg-orange-50 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToWaitlist();
                }}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#181411] text-white py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="flex flex-col gap-6 max-w-lg text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Ready to clear the list?</h2>
              <p className="text-gray-400 text-lg">Built by a site manager, for site managers. Launching soon — join the waitlist for early access.</p>
              <WaitlistForm variant="compact" darkMode />
            </div>

            <div className="flex flex-col gap-6 text-center lg:text-right">
              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-end">
                {secondaryNav.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ClipboardList className="text-primary w-5 h-5" />
              <span className="font-bold text-white">Snaglist</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => onNavigate(Page.PRIVACY)} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => onNavigate(Page.TERMS)} className="hover:text-white transition-colors">Terms</button>
              <a href="mailto:Snaglistapp@gmail.com" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div>&copy; 2025 Snaglist Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
