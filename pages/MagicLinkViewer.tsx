import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MagicLinkLanding } from './MagicLinkLanding';
import { SnagListView } from './SnagListView';
import { SnagDetailView } from './SnagDetailView';
import { getSnags } from '../api/magicLink';
import type { MagicLinkInfo, Snag, SnagListData, MagicLinkViewerState } from '../types';

// Polling interval in milliseconds (30 seconds)
const POLLING_INTERVAL = 30000;

interface MagicLinkViewerProps {
  token: string;
}

export const MagicLinkViewer: React.FC<MagicLinkViewerProps> = ({ token }) => {
  const [state, setState] = useState<MagicLinkViewerState>({ stage: 'loading' });
  const [selectedSnag, setSelectedSnag] = useState<Snag | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to check if snag data has changed
  const hasDataChanged = useCallback((oldSnags: Snag[], newSnags: Snag[]): boolean => {
    if (oldSnags.length !== newSnags.length) return true;

    for (let i = 0; i < oldSnags.length; i++) {
      const oldSnag = oldSnags[i];
      const newSnag = newSnags.find(s => s.id === oldSnag.id);
      if (!newSnag) return true;
      if (oldSnag.status !== newSnag.status) return true;
      if (oldSnag.updatedAt !== newSnag.updatedAt) return true;
    }

    return false;
  }, []);

  // Poll for updates
  const pollForUpdates = useCallback(async () => {
    // Only poll when in snag_list or snag_detail stage
    if (state.stage !== 'snag_list' && state.stage !== 'snag_detail') return;

    try {
      const result = await getSnags(token);
      if (result.success && result.snags) {
        const currentSnags = state.stage === 'snag_list' ? state.snags : state.snags;

        // Only update if data has changed
        if (hasDataChanged(currentSnags, result.snags)) {
          console.log('Snag data updated via polling');
          setLastUpdated(new Date());

          if (state.stage === 'snag_list') {
            setState({
              ...state,
              snags: result.snags,
              snagListData: result.snagListData,
            });
          } else if (state.stage === 'snag_detail') {
            // Update snags and the current selected snag if it changed
            const updatedSelectedSnag = result.snags.find(s => s.id === selectedSnag?.id);
            if (updatedSelectedSnag) {
              setSelectedSnag(updatedSelectedSnag);
              setState({
                ...state,
                snag: updatedSelectedSnag,
                snags: result.snags,
                snagListData: result.snagListData,
              });
            } else {
              // Selected snag no longer exists, go back to list
              setSelectedSnag(null);
              setState({
                stage: 'snag_list',
                linkInfo: state.linkInfo,
                snags: result.snags,
                snagListData: result.snagListData,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Polling error:', error);
      // Don't update state on polling errors - just try again next interval
    }
  }, [state, token, selectedSnag, hasDataChanged]);

  // Set up polling interval
  useEffect(() => {
    // Start polling when authenticated (in snag_list or snag_detail stage)
    if (state.stage === 'snag_list' || state.stage === 'snag_detail') {
      pollingRef.current = setInterval(pollForUpdates, POLLING_INTERVAL);

      // Initial update timestamp
      if (!lastUpdated) {
        setLastUpdated(new Date());
      }
    }

    // Cleanup on unmount or stage change
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [state.stage, pollForUpdates, lastUpdated]);

  const handleAuthenticated = async (linkInfo: MagicLinkInfo, initialSnags: Snag[]) => {
    // If we already have snags (from PIN verification), use them
    if (initialSnags.length > 0) {
      setState({ stage: 'snag_list', linkInfo, snags: initialSnags });
      return;
    }

    // Otherwise, fetch snags with full list data
    const result = await getSnags(token);
    if (result.success && result.snags) {
      setState({
        stage: 'snag_list',
        linkInfo,
        snags: result.snags,
        snagListData: result.snagListData
      });
    } else {
      setState({ stage: 'error', message: result.error || 'Failed to load snags' });
    }
  };

  const handleSelectSnag = (snag: Snag) => {
    setSelectedSnag(snag);
    if (state.stage === 'snag_list') {
      setState({
        ...state,
        stage: 'snag_detail',
        snag,
        snags: state.snags,
        snagListData: state.snagListData
      });
    }
  };

  const handleBackToList = () => {
    setSelectedSnag(null);
    if (state.stage === 'snag_detail') {
      setState({
        stage: 'snag_list',
        linkInfo: state.linkInfo,
        snags: state.snags,
        snagListData: state.snagListData
      });
    }
  };

  const handleCompletionSuccess = async () => {
    // Refresh snags to get updated status
    if (state.stage === 'snag_detail') {
      const result = await getSnags(token);
      if (result.success && result.snags) {
        // Find updated snag
        const updatedSnag = result.snags.find(s => s.id === selectedSnag?.id);
        if (updatedSnag) {
          setSelectedSnag(updatedSnag);
          setState({
            stage: 'snag_detail',
            linkInfo: state.linkInfo,
            snag: updatedSnag,
            snags: result.snags,
            snagListData: result.snagListData,
          });
        } else {
          // Snag no longer accessible, go back to list
          setSelectedSnag(null);
          setState({
            stage: 'snag_list',
            linkInfo: state.linkInfo,
            snags: result.snags,
            snagListData: result.snagListData,
          });
        }
      }
    }
  };

  // Render based on state
  switch (state.stage) {
    case 'loading':
      return (
        <MagicLinkLanding
          token={token}
          onAuthenticated={handleAuthenticated}
        />
      );

    case 'pin_required':
      return (
        <MagicLinkLanding
          token={token}
          onAuthenticated={handleAuthenticated}
        />
      );

    case 'snag_list':
      return (
        <SnagListView
          linkInfo={state.linkInfo}
          snags={state.snags}
          snagListData={state.snagListData}
          token={token}
          onSelectSnag={handleSelectSnag}
        />
      );

    case 'snag_detail':
      return (
        <SnagDetailView
          linkInfo={state.linkInfo}
          snag={state.snag}
          snags={state.snags}
          snagListData={state.snagListData}
          token={token}
          onBack={handleBackToList}
          onCompletionSuccess={handleCompletionSuccess}
        />
      );

    case 'error':
      return (
        <MagicLinkLanding
          token={token}
          onAuthenticated={handleAuthenticated}
        />
      );

    default:
      return null;
  }
};
