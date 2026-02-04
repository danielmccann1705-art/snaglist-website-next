import type { MagicLinkInfo, Snag, SnagListData, CompletionSubmission, CompletionResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'https://snaglist-backend.fly.dev';

// MARK: - QR Code URL Helper
export const getQRCodeUrl = (linkId: string, size: number = 300): string => {
  return `${API_BASE}/api/v1/magic-links/${linkId}/qr?size=${size}`;
};

// Store session token after PIN verification
let sessionToken: string | null = null;

export function setSessionToken(token: string) {
  sessionToken = token;
}

export function clearSessionToken() {
  sessionToken = null;
}

// MARK: - Validate Magic Link
export async function validateMagicLink(token: string): Promise<{
  valid: boolean;
  requiresPin: boolean;
  linkInfo?: MagicLinkInfo;
  error?: string;
}> {
  try {
    const response = await fetch(`${API_BASE}/api/v1/magic-links/${token}/validate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        valid: false,
        requiresPin: false,
        error: data.reason || 'Invalid or expired link',
      };
    }

    return {
      valid: data.valid,
      requiresPin: data.requiresPin,
      linkInfo: data.valid ? {
        id: data.linkId,
        label: data.label || 'Shared Snags',
        accessLevel: data.accessLevel || 'view',
        requiresPin: data.requiresPin,
        expiresAt: data.expiresAt,
        snagIds: data.snagIds || [],
        projectName: data.projectName,
        projectAddress: data.projectAddress,
        contractorName: data.contractorName,
        createdByName: data.createdByName,
        slug: data.slug,
        shortUrl: data.shortUrl,
        qrCodeUrl: data.qrCodeUrl,
      } : undefined,
    };
  } catch (error) {
    console.error('Failed to validate magic link:', error);
    return {
      valid: false,
      requiresPin: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// MARK: - Verify PIN
export async function verifyPin(token: string, pin: string): Promise<{
  success: boolean;
  sessionToken?: string;
  snags?: Snag[];
  error?: string;
  attemptsRemaining?: number;
}> {
  try {
    const response = await fetch(`${API_BASE}/api/v1/magic-links/${token}/verify-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.reason || 'Invalid PIN',
        attemptsRemaining: data.attemptsRemaining,
      };
    }

    // Store session token for subsequent requests
    if (data.sessionToken) {
      setSessionToken(data.sessionToken);
    }

    return {
      success: true,
      sessionToken: data.sessionToken,
      snags: data.snags || [],
    };
  } catch (error) {
    console.error('Failed to verify PIN:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// MARK: - Get Snags for Magic Link
export async function getSnags(token: string): Promise<{
  success: boolean;
  snags?: Snag[];
  snagListData?: SnagListData;
  error?: string;
}> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${API_BASE}/api/v1/magic-links/${token}/snags`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.reason || 'Failed to load snags',
      };
    }

    // Parse the full response including status counts and project info
    const snagListData: SnagListData = {
      snags: data.snags || [],
      totalCount: data.totalCount || 0,
      projectId: data.projectId,
      projectName: data.projectName || 'Project',
      projectAddress: data.projectAddress,
      contractorName: data.contractorName || 'Contractor',
      accessLevel: data.accessLevel || 'view',
      openCount: data.openCount || 0,
      inProgressCount: data.inProgressCount || 0,
      completedCount: data.completedCount || 0,
    };

    return {
      success: true,
      snags: data.snags || [],
      snagListData,
    };
  } catch (error) {
    console.error('Failed to get snags:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// MARK: - Get Single Snag
export async function getSnag(token: string, snagId: string): Promise<{
  success: boolean;
  snag?: Snag;
  error?: string;
}> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${API_BASE}/api/v1/magic-links/${token}/snags/${snagId}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.reason || 'Failed to load snag details',
      };
    }

    return {
      success: true,
      snag: data,
    };
  } catch (error) {
    console.error('Failed to get snag:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// MARK: - Submit Completion
export async function submitCompletion(
  token: string,
  snagId: string,
  submission: CompletionSubmission
): Promise<CompletionResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${API_BASE}/api/v1/magic-links/${token}/snags/${snagId}/complete`, {
      method: 'POST',
      headers,
      body: JSON.stringify(submission),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.reason || 'Failed to submit completion',
      };
    }

    return {
      success: true,
      message: data.message || 'Completion submitted successfully',
      completionId: data.completionId,
      newStatus: data.newStatus,
    };
  } catch (error) {
    console.error('Failed to submit completion:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.',
    };
  }
}

// MARK: - Upload Photo (returns URL)
export async function uploadPhoto(file: File): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const headers: Record<string, string> = {};
    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${API_BASE}/api/v1/uploads/photo`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.reason || 'Failed to upload photo',
      };
    }

    return {
      success: true,
      url: data.url,
    };
  } catch (error) {
    console.error('Failed to upload photo:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}

// MARK: - Download PDF Report
export async function downloadPDF(token: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const headers: Record<string, string> = {};
    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const response = await fetch(`${API_BASE}/api/v1/magic-links/${token}/pdf`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        error: data.reason || 'Failed to download PDF',
      };
    }

    // Get the blob from response
    const blob = await response.blob();

    // Extract filename from Content-Disposition header or use default
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'snag-report.html';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^";\n]+)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }

    // Create download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error) {
    console.error('Failed to download PDF:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.',
    };
  }
}
