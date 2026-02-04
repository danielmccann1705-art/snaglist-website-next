import React from 'react';

interface StatusBadgeProps {
  status: 'open' | 'in_progress' | 'resolved' | 'verified' | 'closed';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = {
    open: {
      label: 'Open',
      bg: 'bg-red-100',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
    in_progress: {
      label: 'In Progress',
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      dot: 'bg-yellow-500',
    },
    resolved: {
      label: 'Resolved',
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
    },
    verified: {
      label: 'Verified',
      bg: 'bg-green-100',
      text: 'text-green-700',
      dot: 'bg-green-500',
    },
    closed: {
      label: 'Closed',
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      dot: 'bg-gray-500',
    },
  };

  const { label, bg, text, dot } = config[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${bg} ${text} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const config = {
    low: {
      label: 'Low',
      bg: 'bg-gray-100',
      text: 'text-gray-600',
    },
    medium: {
      label: 'Medium',
      bg: 'bg-blue-100',
      text: 'text-blue-700',
    },
    high: {
      label: 'High',
      bg: 'bg-red-100',
      text: 'text-red-700',
    },
    critical: {
      label: 'Critical',
      bg: 'bg-red-200',
      text: 'text-red-800',
    },
  };

  const { label, bg, text } = config[priority];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${bg} ${text} ${sizeClasses}`}>
      {label}
    </span>
  );
};
