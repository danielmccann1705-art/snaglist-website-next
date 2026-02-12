export enum Page {
  HOME = 'HOME',
  FEATURES = 'FEATURES',
  PRICING = 'PRICING',
  SUPPORT = 'SUPPORT',
  MAGIC_LINKS = 'MAGIC_LINKS',
  ABOUT = 'ABOUT',
  COMPARISON = 'COMPARISON',
  VS_FIELDWIRE = 'VS_FIELDWIRE',
  VS_SITE_AUDIT_PRO = 'VS_SITE_AUDIT_PRO',
  FLOOR_PLANS = 'FLOOR_PLANS',
  // Programmatic SEO persona pages
  SNAGGING_APP_FOR = 'SNAGGING_APP_FOR',
  SNAGGING_PERSONA = 'SNAGGING_PERSONA',
  PUNCH_LIST_APP_FOR = 'PUNCH_LIST_APP_FOR',
  PUNCH_LIST_PERSONA = 'PUNCH_LIST_PERSONA',
  // Legal pages
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  // Magic Link Viewer pages (contractor access)
  MAGIC_LINK_LANDING = 'MAGIC_LINK_LANDING',
  MAGIC_LINK_SNAGS = 'MAGIC_LINK_SNAGS',
  MAGIC_LINK_SNAG_DETAIL = 'MAGIC_LINK_SNAG_DETAIL'
}

export interface NavItem {
  label: string;
  page: Page;
}

// Magic Link Types
export interface MagicLinkInfo {
  id: string;
  label: string;
  accessLevel: 'view' | 'update' | 'full';
  requiresPin: boolean;
  expiresAt: string | null;
  snagIds: string[];
  projectName?: string;
  projectAddress?: string;
  contractorName?: string;
  createdByName?: string;
  // QR Code & Short URL fields (Phase 2)
  slug?: string;
  shortUrl?: string;
  qrCodeUrl?: string;
}

export interface Snag {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'verified' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  floorPlanName?: string;
  floorPlanId?: string;
  floorPlanImageURL?: string;
  pinX?: number;  // 0-1 normalized X coordinate on floor plan
  pinY?: number;  // 0-1 normalized Y coordinate on floor plan
  assignedTo?: string;
  dueDate?: string;
  photos: SnagPhoto[];
  createdAt: string;
  updatedAt: string;
  createdByName?: string;
}

export interface SnagPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  isBefore: boolean;
  createdAt: string;
}

export interface CompletionSubmission {
  contractorName: string;
  notes?: string;
  photoUrls?: string[];
}

export interface CompletionResponse {
  success: boolean;
  message: string;
  completionId?: string;
  newStatus?: string;
}

export type MagicLinkViewerState =
  | { stage: 'loading' }
  | { stage: 'pin_required'; linkInfo: MagicLinkInfo }
  | { stage: 'snag_list'; linkInfo: MagicLinkInfo; snags: Snag[]; snagListData?: SnagListData }
  | { stage: 'snag_detail'; linkInfo: MagicLinkInfo; snag: Snag; snags: Snag[]; snagListData?: SnagListData }
  | { stage: 'error'; message: string };

// Response data from the snag list endpoint
export interface SnagListData {
  snags: Snag[];
  totalCount: number;
  projectId: string;
  projectName: string;
  projectAddress?: string;
  contractorName: string;
  accessLevel: string;
  openCount: number;
  inProgressCount: number;
  completedCount: number;
}

// Floor plan information extracted from snags
export interface FloorPlanInfo {
  id: string;
  name: string;
  imageURL: string;
  snagCount: number;
}