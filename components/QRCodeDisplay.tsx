import React, { useState } from 'react';
import { Download, Share2, Copy, Check } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeUrl: string;
  shortUrl: string;
  label: string;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCodeUrl,
  shortUrl,
  label,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(qrCodeUrl);
      if (!response.ok) throw new Error('Failed to fetch QR code');

      // Get SVG content
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Sanitize label for filename
      const safeLabel = label.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      a.download = `${safeLabel}-qr.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: label,
          text: `Access snags: ${label}`,
          url: shortUrl
        });
      } catch (error) {
        // User cancelled or share failed, fall back to copy
        if ((error as Error).name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <div className="text-center">
        {/* QR Code Image */}
        <div className="relative inline-block">
          <img
            src={qrCodeUrl}
            alt={`QR Code for ${label}`}
            className="mx-auto w-48 h-48 rounded-lg shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Short URL */}
        <div className="mt-4 mb-4">
          <p className="text-xs text-gray-500 mb-1">Share this link</p>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-mono text-sm text-gray-700"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{shortUrl}</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Downloading...' : 'Download'}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
