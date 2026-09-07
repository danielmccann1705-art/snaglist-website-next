import React, { ReactNode } from "react";
import { APP_STORE_URL } from "../constants";
import { Wordmark } from "../app/components/Brand";

interface MagicLinkHeaderProps {
  showCTA?: boolean;
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  sticky?: boolean;
}

export const MagicLinkHeader: React.FC<MagicLinkHeaderProps> = ({
  showCTA = false,
  leftContent,
  centerContent,
  sticky = true,
}) => {
  return (
    <header
      className={`bg-white border-b border-gray-200 ${sticky ? "sticky top-0 z-20" : ""}`}
    >
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left */}
        {leftContent || (
          <div className="flex items-center gap-2">
            <Wordmark />
          </div>
        )}

        {/* Center */}
        {centerContent && (
          <div className="flex-1 min-w-0 mx-3">{centerContent}</div>
        )}

        {/* Right */}
        {showCTA && (
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-[#1A1D23] transition-colors"
          >
            Get Snaglist
          </a>
        )}
      </div>
    </header>
  );
};
