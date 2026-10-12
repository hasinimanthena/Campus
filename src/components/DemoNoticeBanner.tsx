import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, UserCheck, RefreshCw, X, Info, Globe } from 'lucide-react';

interface DemoNoticeBannerProps {
  onOpenLanding?: () => void;
}

export const DemoNoticeBanner: React.FC<DemoNoticeBannerProps> = ({ onOpenLanding }) => {
  const { currentUser, switchDemoRole, resetToInitialData } = useApp();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-navy-950 text-slate-200 border-b border-navy-800 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-gold-400 animate-ping" />
          <span className="font-bold text-gold-400 uppercase tracking-wider text-[11px] bg-navy-900 px-2 py-0.5 rounded border border-gold-500/30">
            Apex Portal Demo
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">
            Placement & Clearance Engine with PhonePe Gateway & Multi-Department Auditing
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-navy-900 rounded-lg p-0.5 border border-navy-800">
            <button
              onClick={() => switchDemoRole('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-navy-800 text-gold-300 border border-gold-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800/50'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
              <span>Placement In-Charge</span>
            </button>
            <button
              onClick={() => switchDemoRole('student', 'stud-1')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                currentUser.role === 'student' && currentUser.studentId === 'stud-1'
                  ? 'bg-navy-800 text-gold-300 border border-gold-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800/50'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Aarav (Placed)</span>
            </button>
            <button
              onClick={() => switchDemoRole('student', 'stud-2')}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                currentUser.role === 'student' && currentUser.studentId === 'stud-2'
                  ? 'bg-navy-800 text-gold-300 border border-gold-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800/50'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Diya (Pending Due)</span>
            </button>
          </div>

          {onOpenLanding && (
            <button
              onClick={onOpenLanding}
              title="View Public Institutional Landing Page"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gold-500 hover:bg-gold-600 text-navy-950 border border-gold-400 transition-colors font-bold shadow-2xs"
            >
              <Globe className="h-3 w-3 text-navy-950" />
              <span>Public Site</span>
            </button>
          )}

          <button
            onClick={() => {
              if (window.confirm('Reset all demo students, applications, and no-dues items to defaults?')) {
                resetToInitialData();
              }
            }}
            title="Reset to factory demo dataset"
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span className="hidden sm:inline">Reset Demo Data</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
