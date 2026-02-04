import React, { useRef, useState } from 'react';
import { Camera, Image, X, Loader2, AlertCircle } from 'lucide-react';

interface PhotoUploadProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photos,
  onPhotosChange,
  maxPhotos = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    setError(null);

    const remainingSlots = maxPhotos - photos.length;
    const newFiles = Array.from(files).slice(0, remainingSlots);

    // Validate file types
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Images must be under 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    onPhotosChange([...photos, ...validFiles]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
    setPreviews(newPreviews);
  };

  const canAddMore = photos.length < maxPhotos;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Photos <span className="text-gray-400 font-normal">({photos.length}/{maxPhotos})</span>
      </label>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Existing Photos */}
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={preview}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add Photo Buttons */}
        {canAddMore && (
          <>
            {/* Camera Button (mobile) */}
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-500 hover:border-primary hover:text-primary transition-colors sm:hidden"
            >
              <Camera className="w-6 h-6" />
              <span className="text-xs">Camera</span>
            </button>

            {/* Gallery Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-500 hover:border-primary hover:text-primary transition-colors"
            >
              <Image className="w-6 h-6" />
              <span className="text-xs">Gallery</span>
            </button>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Hidden Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={e => handleFileSelect(e.target.files)}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={e => handleFileSelect(e.target.files)}
        className="hidden"
      />

      <p className="text-xs text-gray-500">
        Add photos of the completed work. Max 10MB per photo.
      </p>
    </div>
  );
};

// Progress indicator for uploads
interface UploadProgressProps {
  progress: number;
  filename: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ progress, filename }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <Loader2 className="w-5 h-5 text-primary animate-spin" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 truncate">{filename}</p>
        <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <span className="text-xs text-gray-500">{progress}%</span>
    </div>
  );
};
