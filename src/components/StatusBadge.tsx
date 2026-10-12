import React from 'react';
import { ApplicationStatus, NoDuesStatus, DriveStatus } from '../types';

interface StatusBadgeProps {
  status: ApplicationStatus | NoDuesStatus | DriveStatus | 'Active' | 'Graduated' | 'Debarred' | string;
  type?: 'application' | 'nodues' | 'drive' | 'general' | 'payment';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'general',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  // Payment Statuses (Green for success, Amber for pending, Red for overdue/failed)
  if (type === 'payment' || ['SUCCESS', 'PENDING', 'FAILED', 'REFUNDED'].includes(status)) {
    switch (status) {
      case 'SUCCESS':
        return (
          <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Paid / Cleared
          </span>
        );
      case 'PENDING':
        return (
          <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
            Pending Due
          </span>
        );
      case 'FAILED':
      case 'OVERDUE':
        return (
          <span className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
            Overdue / Failed
          </span>
        );
      case 'REFUNDED':
        return (
          <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5" />
            Refunded
          </span>
        );
    }
  }

  // Application Statuses
  if (
    type === 'application' ||
    [
      'Registered',
      'Shortlisted',
      'Assessment',
      'Interview',
      'Selected',
      'Offer Received',
      'Joined',
      'Rejected',
      'Withdrawn',
    ].includes(status)
  ) {
    switch (status) {
      case 'Joined':
        return (
          <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Joined
          </span>
        );
      case 'Offer Received':
        return (
          <span className={`inline-flex items-center rounded-full bg-gold-50 text-gold-800 dark:bg-gold-950/60 dark:text-gold-300 border border-gold-300 dark:border-gold-700 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-1.5" />
            Offer Received
          </span>
        );
      case 'Selected':
        return (
          <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Selected
          </span>
        );
      case 'Interview':
        return (
          <span className={`inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5" />
            Interview
          </span>
        );
      case 'Assessment':
        return (
          <span className={`inline-flex items-center rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-1.5" />
            Assessment
          </span>
        );
      case 'Shortlisted':
        return (
          <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
            Shortlisted
          </span>
        );
      case 'Registered':
        return (
          <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
            Registered
          </span>
        );
      case 'Rejected':
        return (
          <span className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
            Rejected
          </span>
        );
      case 'Withdrawn':
        return (
          <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
            Withdrawn
          </span>
        );
      default:
        break;
    }
  }

  // No-Dues Statuses: Green = Cleared, Amber = Pending, Red = Action Required / Overdue
  if (type === 'nodues' || ['Cleared', 'Pending', 'Action Required', 'Not Applicable'].includes(status)) {
    switch (status) {
      case 'Cleared':
        return (
          <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Cleared
          </span>
        );
      case 'Action Required':
        return (
          <span className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5 animate-pulse" />
            Action Required
          </span>
        );
      case 'Pending':
        return (
          <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
            Pending Due
          </span>
        );
      case 'Not Applicable':
        return (
          <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
            Not Applicable
          </span>
        );
      default:
        break;
    }
  }

  // Drive Statuses
  if (type === 'drive' || ['Upcoming', 'Active', 'Completed', 'Cancelled'].includes(status)) {
    switch (status) {
      case 'Active':
        return (
          <span className={`inline-flex items-center rounded-full bg-navy-50 text-navy-900 dark:bg-navy-900 dark:text-gold-400 border border-navy-200 dark:border-navy-700 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-1.5 animate-pulse" />
            Active Drive
          </span>
        );
      case 'Upcoming':
        return (
          <span className={`inline-flex items-center rounded-full bg-gold-50 text-gold-800 dark:bg-gold-950/60 dark:text-gold-300 border border-gold-200 dark:border-gold-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-1.5" />
            Upcoming
          </span>
        );
      case 'Completed':
        return (
          <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 line-through border border-slate-200 dark:border-slate-700 ${sizeClasses}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
            Cancelled
          </span>
        );
      default:
        break;
    }
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 ${sizeClasses}`}>
      {status}
    </span>
  );
};
