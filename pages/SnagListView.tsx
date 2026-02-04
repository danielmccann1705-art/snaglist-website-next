import React, { useState, useMemo } from 'react';
import { Search, Filter, X, AlertTriangle, Clock, Calendar, CheckCircle2, Download, Loader2, Map, List } from 'lucide-react';
import { SnagCard } from '../components/SnagCard';
import { FloorPlanView } from '../components/FloorPlanView';
import { downloadPDF } from '../api/magicLink';
import type { MagicLinkInfo, Snag, SnagListData } from '../types';

interface SnagListViewProps {
  linkInfo: MagicLinkInfo;
  snags: Snag[];
  snagListData?: SnagListData;
  token: string;
  onSelectSnag: (snag: Snag) => void;
}

type StatusFilter = 'all' | 'open' | 'in_progress' | 'resolved' | 'verified' | 'closed';
type SortOption = 'newest' | 'oldest' | 'priority' | 'status' | 'due_date';

// Group type for organizing snags by due date urgency
type SnagGroup = {
  key: string;
  label: string;
  snags: Snag[];
  style: 'danger' | 'warning' | 'normal' | 'muted';
};

export const SnagListView: React.FC<SnagListViewProps> = ({
  linkInfo,
  snags,
  snagListData,
  token,
  onSelectSnag,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('due_date');
  const [showFilters, setShowFilters] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);

  // Check if any snags have floor plan data
  const hasFloorPlanData = useMemo(() => {
    return snags.some(s => s.floorPlanId && s.floorPlanImageURL && s.pinX != null && s.pinY != null);
  }, [snags]);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const result = await downloadPDF(token);
      if (!result.success) {
        console.error('Failed to download PDF:', result.error);
        // Could show a toast notification here
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFloorPlanSnagClick = (snag: Snag) => {
    setShowFloorPlan(false);
    onSelectSnag(snag);
  };

  // Use data from snagListData if available, fall back to linkInfo
  const contractorName = snagListData?.contractorName || linkInfo.contractorName;
  const projectName = snagListData?.projectName || linkInfo.projectName || linkInfo.label;
  const projectAddress = snagListData?.projectAddress || linkInfo.projectAddress;

  // Status counts - prefer from API, fall back to calculated
  const openCount = snagListData?.openCount ?? snags.filter(s => s.status === 'open').length;
  const inProgressCount = snagListData?.inProgressCount ?? snags.filter(s => s.status === 'in_progress').length;
  const completedCount = snagListData?.completedCount ?? snags.filter(s => ['resolved', 'verified', 'closed'].includes(s.status)).length;

  // Helper to check if a date is overdue
  const isOverdue = (dueDate: string | undefined): boolean => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return due < now;
  };

  // Helper to check if due this week
  const isDueThisWeek = (dueDate: string | undefined): boolean => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const weekFromNow = new Date(now);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return due >= now && due <= weekFromNow;
  };

  // Filter and sort snags
  const filteredSnags = useMemo(() => {
    let result = [...snags];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(snag =>
        snag.title.toLowerCase().includes(query) ||
        snag.description?.toLowerCase().includes(query) ||
        snag.location?.toLowerCase().includes(query) ||
        snag.assignedTo?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(snag => snag.status === statusFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'priority': {
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case 'status': {
          const statusOrder = { open: 0, in_progress: 1, resolved: 2, verified: 3, closed: 4 };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        case 'due_date': {
          // Overdue first, then by due date, then no due date last
          const aOverdue = isOverdue(a.dueDate);
          const bOverdue = isOverdue(b.dueDate);
          if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        default:
          return 0;
      }
    });

    return result;
  }, [snags, searchQuery, statusFilter, sortBy]);

  // Group snags by due date urgency
  const groupedSnags = useMemo((): SnagGroup[] => {
    const groups: SnagGroup[] = [];

    // Only group open/in_progress snags by due date; others go to their own section
    const activeSnags = filteredSnags.filter(s => s.status === 'open' || s.status === 'in_progress');
    const completedSnags = filteredSnags.filter(s => ['resolved', 'verified', 'closed'].includes(s.status));

    const overdueSnags = activeSnags.filter(s => isOverdue(s.dueDate));
    const dueThisWeekSnags = activeSnags.filter(s => !isOverdue(s.dueDate) && isDueThisWeek(s.dueDate));
    const upcomingSnags = activeSnags.filter(s => !isOverdue(s.dueDate) && !isDueThisWeek(s.dueDate) && s.dueDate);
    const noDueDateSnags = activeSnags.filter(s => !s.dueDate);

    if (overdueSnags.length > 0) {
      groups.push({
        key: 'overdue',
        label: 'NEEDS ATTENTION',
        snags: overdueSnags,
        style: 'danger',
      });
    }

    if (dueThisWeekSnags.length > 0) {
      groups.push({
        key: 'this-week',
        label: 'DUE THIS WEEK',
        snags: dueThisWeekSnags,
        style: 'warning',
      });
    }

    if (upcomingSnags.length > 0) {
      groups.push({
        key: 'upcoming',
        label: 'UPCOMING',
        snags: upcomingSnags,
        style: 'normal',
      });
    }

    if (noDueDateSnags.length > 0) {
      groups.push({
        key: 'no-date',
        label: 'NO DUE DATE',
        snags: noDueDateSnags,
        style: 'muted',
      });
    }

    if (completedSnags.length > 0) {
      groups.push({
        key: 'completed',
        label: 'COMPLETED',
        snags: completedSnags,
        style: 'muted',
      });
    }

    return groups;
  }, [filteredSnags]);

  // Status counts for filter pills
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: snags.length };
    snags.forEach(snag => {
      counts[snag.status] = (counts[snag.status] || 0) + 1;
    });
    return counts;
  }, [snags]);

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('due_date');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || sortBy !== 'due_date';

  const groupStyleClasses = {
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    normal: 'bg-gray-50 text-gray-700 border-gray-200',
    muted: 'bg-gray-50 text-gray-500 border-gray-200',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Contractor Identity */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              {contractorName && (
                <h1 className="font-bold text-lg text-gray-900 uppercase tracking-wide">
                  {contractorName}
                </h1>
              )}
              <p className="text-base font-medium text-gray-700">{projectName}</p>
              {projectAddress && (
                <p className="text-sm text-gray-500">{projectAddress}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Floor Plan Toggle Button */}
              {hasFloorPlanData && (
                <button
                  onClick={() => setShowFloorPlan(!showFloorPlan)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    showFloorPlan
                      ? 'text-white bg-primary hover:bg-primary/90'
                      : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  title={showFloorPlan ? 'Show list view' : 'Show floor plan'}
                >
                  {showFloorPlan ? (
                    <List className="w-4 h-4" />
                  ) : (
                    <Map className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{showFloorPlan ? 'List' : 'Map'}</span>
                </button>
              )}
              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Download PDF Report"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>
          </div>

          {/* Status Summary Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-sm font-medium text-gray-700">
              {snags.length} items assigned
            </span>
            <span className="text-gray-300">|</span>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                Open: {openCount}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                In Progress: {inProgressCount}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Complete: {completedCount}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search snags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-4">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'open', 'in_progress', 'resolved', 'verified', 'closed'] as StatusFilter[]).map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === status
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-primary'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <span className="ml-1 opacity-70">({statusCounts[status] || 0})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Sort by
                </label>
                <div className="flex flex-wrap gap-2">
                  {([
                    { value: 'due_date', label: 'Due date' },
                    { value: 'newest', label: 'Newest first' },
                    { value: 'oldest', label: 'Oldest first' },
                    { value: 'priority', label: 'Priority' },
                    { value: 'status', label: 'Status' },
                  ] as { value: SortOption; label: string }[]).map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-primary'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-6">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Floor Plan View */}
          {showFloorPlan && hasFloorPlanData && (
            <div className="mb-6">
              <FloorPlanView
                snags={snags}
                onSnagClick={handleFloorPlanSnagClick}
                onClose={() => setShowFloorPlan(false)}
              />
            </div>
          )}

          {/* Results count when filtering */}
          {hasActiveFilters && !showFloorPlan && (
            <p className="text-sm text-gray-500 mb-3">
              Showing {filteredSnags.length} of {snags.length} snags
            </p>
          )}

          {/* Grouped Snag List */}
          {!showFloorPlan && filteredSnags.length > 0 ? (
            <div className="space-y-6">
              {groupedSnags.map(group => (
                <div key={group.key}>
                  {/* Group Header */}
                  <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-lg border ${groupStyleClasses[group.style]}`}>
                    {group.style === 'danger' && <AlertTriangle className="w-4 h-4" />}
                    {group.style === 'warning' && <Clock className="w-4 h-4" />}
                    {group.key === 'upcoming' && <Calendar className="w-4 h-4" />}
                    {group.key === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {group.label}
                    </span>
                    <span className="text-xs opacity-70">({group.snags.length})</span>
                  </div>

                  {/* Group Snags */}
                  <div className="space-y-3">
                    {group.snags.map(snag => (
                      <SnagCard
                        key={snag.id}
                        snag={snag}
                        onClick={() => onSelectSnag(snag)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : !showFloorPlan ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">No snags found</h3>
              <p className="text-gray-500 text-sm">
                {hasActiveFilters
                  ? 'Try adjusting your filters'
                  : 'No snags have been shared with this link'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary font-medium text-sm hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
        Powered by <a href="/" className="text-primary hover:underline font-medium">Snaglist</a>
        <span className="mx-2">·</span>
        <a href="https://snaglist.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Get your own free
        </a>
      </footer>
    </div>
  );
};
