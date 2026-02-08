import React from 'react';
import { MapPin, Calendar, ChevronRight, Image, AlertTriangle } from 'lucide-react';
import { StatusBadge, PriorityBadge } from './StatusBadge';
import type { Snag } from '../types';

interface SnagCardProps {
  snag: Snag;
  onClick: () => void;
}

export const SnagCard: React.FC<SnagCardProps> = ({ snag, onClick }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Check if snag is overdue
  const isOverdue = (): boolean => {
    if (!snag.dueDate) return false;
    if (snag.status === 'resolved' || snag.status === 'verified' || snag.status === 'closed') return false;
    const due = new Date(snag.dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return due < now;
  };

  // Calculate days late
  const getDaysLate = (): number => {
    if (!snag.dueDate) return 0;
    const due = new Date(snag.dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = now.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const thumbnailUrl = snag.photos[0]?.thumbnailUrl || snag.photos[0]?.url;
  const overdue = isOverdue();
  const daysLate = getDaysLate();

  return (
    <button
      onClick={onClick}
      className={`w-full bg-white rounded-2xl border shadow-sm p-4 text-left hover:shadow-md transition-all duration-200 group ${
        overdue ? 'border-red-200 hover:border-red-300' : 'border-gray-100 hover:border-primary/30'
      }`}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Image className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
              {snag.title}
            </h3>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* Location and Due Date line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
            {snag.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate max-w-[140px]">{snag.location}</span>
              </span>
            )}
            {snag.dueDate && formatDate(snag.dueDate) && (
              <>
                {snag.location && <span className="text-gray-300">·</span>}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Due: {formatDate(snag.dueDate)}
                </span>
              </>
            )}
          </div>

          {/* Status and Priority badges */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={snag.status} size="sm" />
            <PriorityBadge priority={snag.priority} size="sm" />
          </div>

          {/* Overdue badge */}
          {overdue && daysLate > 0 && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 text-red-700 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              {daysLate} {daysLate === 1 ? 'DAY' : 'DAYS'} LATE
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
