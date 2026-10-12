import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const typeStyles = {
          success: {
            bg: 'bg-white dark:bg-navy-900 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600 dark:text-emerald-400',
            accent: 'bg-emerald-500',
          },
          error: {
            bg: 'bg-white dark:bg-navy-900 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100',
            icon: XCircle,
            iconColor: 'text-rose-600 dark:text-rose-400',
            accent: 'bg-rose-500',
          },
          warning: {
            bg: 'bg-white dark:bg-navy-900 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100',
            icon: AlertTriangle,
            iconColor: 'text-amber-600 dark:text-amber-400',
            accent: 'bg-amber-500',
          },
          info: {
            bg: 'bg-white dark:bg-navy-900 border-gold-300 dark:border-navy-700 text-slate-900 dark:text-white',
            icon: Info,
            iconColor: 'text-gold-500 dark:text-gold-400',
            accent: 'bg-gold-500',
          },
        }[toast.type];

        const Icon = typeStyles.icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${typeStyles.bg}`}
          >
            <div className={`p-1 rounded-lg ${typeStyles.iconColor} shrink-0 mt-0.5`}>
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold leading-tight">{toast.title}</h5>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md shrink-0 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
