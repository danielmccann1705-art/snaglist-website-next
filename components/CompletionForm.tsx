import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PhotoUpload } from './PhotoUpload';
import { uploadPhoto, submitCompletion } from '../api/magicLink';
import type { Snag, CompletionSubmission } from '../types';

interface CompletionFormProps {
  snag: Snag;
  token: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CompletionForm: React.FC<CompletionFormProps> = ({
  snag,
  token,
  onSuccess,
  onCancel,
}) => {
  const [contractorName, setContractorName] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!contractorName.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload photos first
      const photoUrls: string[] = [];
      for (let i = 0; i < photos.length; i++) {
        setUploadProgress(Math.round(((i + 0.5) / photos.length) * 50));
        const result = await uploadPhoto(photos[i]);
        if (result.success && result.url) {
          photoUrls.push(result.url);
        } else {
          throw new Error(result.error || 'Failed to upload photo');
        }
        setUploadProgress(Math.round(((i + 1) / photos.length) * 50));
      }

      setUploadProgress(75);

      // Submit completion
      const submission: CompletionSubmission = {
        contractorName: contractorName.trim(),
        notes: notes.trim() || undefined,
        photoUrls: photoUrls.length > 0 ? photoUrls : undefined,
      };

      const result = await submitCompletion(token, snag.id, submission);

      setUploadProgress(100);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Submitted!</h3>
        <p className="text-gray-600 text-center max-w-xs">
          Your completion has been submitted for review. The project manager will be notified.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Snag Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-500 mb-1">Completing:</p>
        <p className="font-semibold text-gray-900">{snag.title}</p>
        {snag.location && (
          <p className="text-sm text-gray-600 mt-1">{snag.location}</p>
        )}
      </div>

      {/* Contractor Name */}
      <div>
        <label htmlFor="contractorName" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="contractorName"
          value={contractorName}
          onChange={e => setContractorName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Describe the work completed, any issues encountered, etc."
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          disabled={isSubmitting}
        />
      </div>

      {/* Photo Upload */}
      <PhotoUpload
        photos={photos}
        onPhotosChange={setPhotos}
        maxPhotos={5}
      />

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Progress Bar */}
      {isSubmitting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {uploadProgress < 50 ? 'Uploading photos...' :
               uploadProgress < 100 ? 'Submitting...' : 'Done!'}
            </span>
            <span className="text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !contractorName.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Completion
            </>
          )}
        </button>
      </div>
    </form>
  );
};
