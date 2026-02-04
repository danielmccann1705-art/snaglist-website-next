import React, { useState } from 'react';
import {
  ArrowLeft, MapPin, Calendar, User, Clock, AlertTriangle,
  Image as ImageIcon, ChevronLeft, ChevronRight, X, CheckCircle2
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { CompletionForm } from '../components/CompletionForm';
import type { MagicLinkInfo, Snag, SnagListData } from '../types';

interface SnagDetailViewProps {
  linkInfo: MagicLinkInfo;
  snag: Snag;
  snags: Snag[];
  snagListData?: SnagListData;
  token: string;
  onBack: () => void;
  onCompletionSuccess: () => void;
}

export const SnagDetailView: React.FC<SnagDetailViewProps> = ({
  linkInfo,
  snag,
  snags,
  snagListData,
  token,
  onBack,
  onCompletionSuccess,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const canComplete = linkInfo.accessLevel !== 'view' &&
    (snag.status === 'open' || snag.status === 'in_progress');

  const isAlreadyCompleted = linkInfo.accessLevel !== 'view' &&
    snag.status !== 'open' && snag.status !== 'in_progress';

  // Calculate snag index (1-based) for display
  const snagIndex = snags.findIndex(s => s.id === snag.id) + 1;

  // Get project name from snagListData or linkInfo
  const projectName = snagListData?.projectName || linkInfo.projectName || linkInfo.label;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
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

  const beforePhotos = snag.photos.filter(p => p.isBefore);
  const afterPhotos = snag.photos.filter(p => !p.isBefore);
  const allPhotos = [...beforePhotos, ...afterPhotos];
  const hasPhotos = allPhotos.length > 0;

  const overdue = isOverdue();
  const daysLate = getDaysLate();

  const handleLightboxPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const handleLightboxNext = () => {
    if (lightboxIndex !== null && lightboxIndex < allPhotos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-gray-900 truncate">
              #{snagIndex} - {snag.title}
            </h1>
            <p className="text-xs text-gray-500 truncate">{projectName}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Photo Section */}
          {hasPhotos ? (
            <div className="bg-black">
              <div className="relative aspect-[4/3]">
                <img
                  src={allPhotos[0].url}
                  alt={snag.title}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => setLightboxIndex(0)}
                />
                {allPhotos.length > 1 && (
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    +{allPhotos.length - 1} more
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 aspect-[4/3] flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-16 h-16 mb-2" />
              <p className="text-sm">No photo available</p>
            </div>
          )}

          <div className="px-4 py-5 space-y-5">
            {/* Status & Priority */}
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={snag.status} />
              <PriorityBadge priority={snag.priority} />
              {overdue && daysLate > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  {daysLate} {daysLate === 1 ? 'DAY' : 'DAYS'} LATE
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{snag.title}</h2>
              {snag.description ? (
                <p className="text-gray-700 whitespace-pre-wrap">{snag.description}</p>
              ) : (
                <p className="text-gray-400 italic">No description provided</p>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-5">
              {/* Location */}
              {snag.location && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Location</p>
                    <p className="text-sm text-gray-900 font-medium">{snag.location}</p>
                    {snag.floorPlanName && (
                      <p className="text-xs text-gray-500 mt-0.5">{snag.floorPlanName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Due Date */}
              {snag.dueDate && formatDate(snag.dueDate) && (
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${overdue ? 'bg-red-100' : 'bg-gray-100'}`}>
                    <Calendar className={`w-4 h-4 ${overdue ? 'text-red-500' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Due Date</p>
                    <p className={`text-sm font-medium ${overdue ? 'text-red-700' : 'text-gray-900'}`}>
                      {formatDate(snag.dueDate)}
                    </p>
                    {overdue && daysLate > 0 && (
                      <p className="text-xs text-red-600 font-medium mt-0.5">
                        {daysLate} {daysLate === 1 ? 'day' : 'days'} overdue
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Assigned To */}
              {snag.assignedTo && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Assigned To</p>
                    <p className="text-sm text-gray-900 font-medium">{snag.assignedTo}</p>
                  </div>
                </div>
              )}

              {/* Created / Logged By */}
              {(snag.createdAt || snag.createdByName) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Logged By</p>
                    {snag.createdByName && (
                      <p className="text-sm text-gray-900 font-medium">{snag.createdByName}</p>
                    )}
                    {snag.createdAt && formatDate(snag.createdAt) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formatDate(snag.createdAt)}
                        {formatTime(snag.createdAt) && `, ${formatTime(snag.createdAt)}`}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Before Photos Section */}
            {beforePhotos.length > 0 && (
              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Before Photos ({beforePhotos.length})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {beforePhotos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => setLightboxIndex(index)}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={photo.thumbnailUrl || photo.url}
                        alt={`Before ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* After Photos Section (from previous completions) */}
            {afterPhotos.length > 0 && (
              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  After Photos ({afterPhotos.length})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {afterPhotos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => setLightboxIndex(beforePhotos.length + index)}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                    >
                      <img
                        src={photo.thumbnailUrl || photo.url}
                        alt={`After ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Completion Form - Always visible when can complete */}
            {canComplete && (
              <div className="border-t border-gray-100 pt-5">
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Submit Completion
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload photos of completed work and add any notes below.
                  </p>
                  <CompletionForm
                    snag={snag}
                    token={token}
                    onSuccess={onCompletionSuccess}
                    onCancel={onBack}
                  />
                </div>
              </div>
            )}

            {/* Already completed banner */}
            {isAlreadyCompleted && (
              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-xl text-green-700 border border-green-100">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">This snag has been {snag.status}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleLightboxPrev(); }}
              className="absolute left-4 p-2 text-white/70 hover:text-white z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          {lightboxIndex < allPhotos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleLightboxNext(); }}
              className="absolute right-4 p-2 text-white/70 hover:text-white z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <img
            src={allPhotos[lightboxIndex].url}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {allPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
};
