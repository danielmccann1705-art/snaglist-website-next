import React, { useState, useMemo } from 'react';
import { X, ZoomIn, ZoomOut, Maximize2, AlertTriangle } from 'lucide-react';
import type { Snag, FloorPlanInfo } from '../types';

interface FloorPlanViewProps {
  snags: Snag[];
  onSnagClick: (snag: Snag) => void;
  onClose: () => void;
}

// Pin colors based on status
const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  open: { bg: 'bg-red-500', border: 'border-red-600', text: 'text-white' },
  in_progress: { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-white' },
  resolved: { bg: 'bg-green-500', border: 'border-green-600', text: 'text-white' },
  verified: { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-white' },
  closed: { bg: 'bg-gray-400', border: 'border-gray-500', text: 'text-white' },
};

// Priority indicator colors
const priorityColors: Record<string, string> = {
  critical: 'ring-red-500 ring-2',
  high: 'ring-orange-500 ring-2',
  medium: '',
  low: '',
};

export const FloorPlanView: React.FC<FloorPlanViewProps> = ({
  snags,
  onSnagClick,
  onClose,
}) => {
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [hoveredSnag, setHoveredSnag] = useState<string | null>(null);

  // Extract unique floor plans from snags
  const floorPlans = useMemo((): FloorPlanInfo[] => {
    const planMap = new Map<string, FloorPlanInfo>();

    snags.forEach(snag => {
      if (snag.floorPlanId && snag.floorPlanImageURL && snag.floorPlanName) {
        const existing = planMap.get(snag.floorPlanId);
        if (existing) {
          existing.snagCount++;
        } else {
          planMap.set(snag.floorPlanId, {
            id: snag.floorPlanId,
            name: snag.floorPlanName,
            imageURL: snag.floorPlanImageURL,
            snagCount: 1,
          });
        }
      }
    });

    return Array.from(planMap.values());
  }, [snags]);

  // Auto-select first floor plan if none selected
  React.useEffect(() => {
    if (!selectedFloorPlan && floorPlans.length > 0) {
      setSelectedFloorPlan(floorPlans[0].id);
    }
  }, [floorPlans, selectedFloorPlan]);

  // Get snags for current floor plan
  const currentFloorPlanSnags = useMemo(() => {
    if (!selectedFloorPlan) return [];
    return snags.filter(s => s.floorPlanId === selectedFloorPlan && s.pinX != null && s.pinY != null);
  }, [snags, selectedFloorPlan]);

  // Get current floor plan info
  const currentFloorPlan = floorPlans.find(p => p.id === selectedFloorPlan);

  // No floor plans available
  if (floorPlans.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Maximize2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">No Floor Plans Available</h3>
        <p className="text-gray-500 text-sm">
          Floor plan locations have not been set for these snags.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to List
        </button>
      </div>
    );
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Floor Plan View</h3>
          {/* Floor plan selector */}
          {floorPlans.length > 1 && (
            <select
              value={selectedFloorPlan || ''}
              onChange={e => setSelectedFloorPlan(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              {floorPlans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} ({plan.snagCount} snag{plan.snagCount !== 1 ? 's' : ''})
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-500 min-w-[40px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors ml-2"
            title="Close floor plan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floor Plan with Pins */}
      <div className="relative overflow-auto bg-gray-100" style={{ maxHeight: '500px' }}>
        <div
          className="relative inline-block min-w-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        >
          {/* Floor plan image */}
          {currentFloorPlan && (
            <img
              src={currentFloorPlan.imageURL}
              alt={currentFloorPlan.name}
              className="w-full h-auto block"
              draggable={false}
            />
          )}

          {/* Snag pins */}
          {currentFloorPlanSnags.map((snag, index) => {
            const colors = statusColors[snag.status] || statusColors.open;
            const priorityRing = priorityColors[snag.priority] || '';
            const isHovered = hoveredSnag === snag.id;

            return (
              <button
                key={snag.id}
                className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-150 ${
                  isHovered ? 'z-20 scale-125' : 'z-10'
                }`}
                style={{
                  left: `${(snag.pinX || 0) * 100}%`,
                  top: `${(snag.pinY || 0) * 100}%`,
                }}
                onClick={() => onSnagClick(snag)}
                onMouseEnter={() => setHoveredSnag(snag.id)}
                onMouseLeave={() => setHoveredSnag(null)}
                title={snag.title}
              >
                {/* Pin marker */}
                <div className="relative">
                  {/* Priority indicator for critical/high */}
                  {(snag.priority === 'critical' || snag.priority === 'high') && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${snag.priority === 'critical' ? 'bg-red-500' : 'bg-orange-500'} rounded-full border border-white flex items-center justify-center z-10`}>
                      <AlertTriangle className="w-2 h-2 text-white" />
                    </div>
                  )}

                  {/* Pin body */}
                  <div
                    className={`w-7 h-7 rounded-full ${colors.bg} ${colors.border} border-2 shadow-lg flex items-center justify-center ${colors.text} font-bold text-xs ${priorityRing}`}
                  >
                    {index + 1}
                  </div>

                  {/* Pin tail */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${colors.bg.replace('bg-', 'border-t-')}`}
                    style={{ top: '100%', marginTop: '-2px' }}
                  />
                </div>

                {/* Tooltip on hover */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-3 text-left pointer-events-none">
                    <p className="font-semibold text-gray-900 text-sm truncate">{snag.title}</p>
                    {snag.location && (
                      <p className="text-xs text-gray-500 mt-1 truncate">{snag.location}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {snag.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {snag.priority} priority
                      </span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="text-gray-500 font-medium">Status:</span>
          {Object.entries(statusColors).map(([status, colors]) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
              <span className="text-gray-600 capitalize">{status.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
