import React, { useEffect, useState } from 'react';
import { ClipboardList, AlertTriangle, Loader2, Shield, Clock, Eye } from 'lucide-react';
import { PinEntry } from '../components/PinEntry';
import { validateMagicLink, verifyPin } from '../api/magicLink';
import type { MagicLinkInfo, Snag } from '../types';

interface MagicLinkLandingProps {
  token: string;
  onAuthenticated: (linkInfo: MagicLinkInfo, snags: Snag[]) => void;
}

type LandingState =
  | { stage: 'loading' }
  | { stage: 'no_pin'; linkInfo: MagicLinkInfo }
  | { stage: 'pin_required'; linkInfo: MagicLinkInfo; error?: string; attemptsRemaining?: number }
  | { stage: 'error'; message: string; isExpired?: boolean };

export const MagicLinkLanding: React.FC<MagicLinkLandingProps> = ({ token, onAuthenticated }) => {
  const [state, setState] = useState<LandingState>({ stage: 'loading' });

  useEffect(() => {
    const validate = async () => {
      const result = await validateMagicLink(token);

      if (!result.valid || !result.linkInfo) {
        setState({
          stage: 'error',
          message: result.error || 'This link is invalid or has expired',
          isExpired: result.error?.toLowerCase().includes('expired'),
        });
        return;
      }

      if (result.requiresPin) {
        setState({ stage: 'pin_required', linkInfo: result.linkInfo });
      } else {
        setState({ stage: 'no_pin', linkInfo: result.linkInfo });
        // Auto-proceed to snag list for non-PIN links
        handleContinue(result.linkInfo);
      }
    };

    validate();
  }, [token]);

  const handleContinue = async (linkInfo: MagicLinkInfo) => {
    // For links without PIN, we still need to fetch snags
    // The API will return snags directly on validation for non-PIN links
    // For now, proceed with empty snags - they'll be loaded in the list view
    onAuthenticated(linkInfo, []);
  };

  const handlePinSubmit = async (pin: string) => {
    if (state.stage !== 'pin_required') return;

    const result = await verifyPin(token, pin);

    if (result.success) {
      onAuthenticated(state.linkInfo, result.snags || []);
    } else {
      setState({
        ...state,
        error: result.error,
        attemptsRemaining: result.attemptsRemaining,
      });

      // Check for lockout
      if (result.attemptsRemaining === 0) {
        setState({
          stage: 'error',
          message: 'Too many failed attempts. This link has been temporarily locked.',
        });
      }
    }
  };

  // Loading state
  if (state.stage === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light p-4">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-gray-600">Validating link...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state.stage === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            {state.isExpired ? (
              <Clock className="w-8 h-8 text-red-600" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {state.isExpired ? 'Link Expired' : 'Invalid Link'}
          </h2>
          <p className="text-gray-600 mb-6">{state.message}</p>
          <p className="text-sm text-gray-500">
            Please contact the project manager for a new link.
          </p>
        </div>

        <a
          href="/"
          className="mt-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
        >
          <ClipboardList className="w-5 h-5" />
          <span className="font-medium">Snaglist</span>
        </a>
      </div>
    );
  }

  // PIN entry or no-PIN landing
  const linkInfo = state.stage === 'pin_required' ? state.linkInfo : state.stage === 'no_pin' ? state.linkInfo : null;

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">Snaglist</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          {state.stage === 'pin_required' ? (
            <PinEntry
              onSubmit={handlePinSubmit}
              error={state.error}
              attemptsRemaining={state.attemptsRemaining}
              projectName={linkInfo?.projectName}
            />
          ) : (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-gray-600">Loading...</p>
            </div>
          )}

          {/* Link Info */}
          {linkInfo && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  Secure access
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {linkInfo.accessLevel === 'view' ? 'View only' :
                   linkInfo.accessLevel === 'update' ? 'Can update' : 'Full access'}
                </span>
              </div>
              {linkInfo.expiresAt && (
                <p className="text-center text-xs text-gray-400 mt-2">
                  Link expires {new Date(linkInfo.expiresAt).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        Powered by <a href="/" className="text-primary hover:underline">Snaglist</a>
      </footer>
    </div>
  );
};
