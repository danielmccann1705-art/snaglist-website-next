import React, { useState } from 'react';
import { ChevronUp, X } from 'lucide-react';
import { APP_STORE_URL, APP_STORE_BADGE_URL, LOGO_PATH, CTA_VALUE_PROPS, CTA_HEADING, CTA_SUBHEADING } from '../constants';

interface MagicLinkFooterProps {
  variant: 'inline' | 'sticky';
}

export const MagicLinkFooter: React.FC<MagicLinkFooterProps> = ({ variant }) => {
  const [expanded, setExpanded] = useState(false);

  if (variant === 'inline') {
    return (
      <footer className="bg-white border-t border-gray-200 py-8 px-4 text-center">
        <p className="text-sm text-gray-500 mb-3">
          {CTA_VALUE_PROPS.join(' \u00B7 ')}
        </p>
        <p className="text-lg font-semibold text-gray-900 mb-4">
          {CTA_HEADING} {CTA_SUBHEADING}
        </p>
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          <img
            src={APP_STORE_BADGE_URL}
            alt="Download on the App Store"
            className="h-12 mx-auto"
          />
        </a>
        <p className="text-xs text-gray-400 mt-4">Powered by Snaglist</p>
      </footer>
    );
  }

  // Sticky variant — mobile only
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden">
      {/* Expanded panel */}
      {expanded && (
        <div className="bg-white border-t border-gray-200 shadow-lg animate-fade-in-up px-4 pt-5 pb-6">
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 mb-2 text-center">
            {CTA_VALUE_PROPS.join(' \u00B7 ')}
          </p>
          <p className="text-base font-semibold text-gray-900 mb-3 text-center">
            {CTA_HEADING}
          </p>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="block">
            <img
              src={APP_STORE_BADGE_URL}
              alt="Download on the App Store"
              className="h-11 mx-auto"
            />
          </a>
        </div>
      )}

      {/* Collapsed bar */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="w-full bg-white border-t border-gray-200 shadow-lg py-3 px-4 flex items-center justify-center gap-2"
        >
          <img src={LOGO_PATH} alt="" className="h-6 w-6 rounded" />
          <span className="font-semibold text-sm text-gray-900">Get Snaglist Free</span>
          <ChevronUp className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};
