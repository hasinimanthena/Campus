import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from './Sidebar';
import {
  Users,
  Building2,
  Briefcase,
  GitBranch,
  BarChart3,
  FileCheck2,
  FileText,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface WorkflowRibbonProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const WorkflowRibbon: React.FC<WorkflowRibbonProps> = ({
  activeTab,
  onNavigate,
}) => {
  const { stats } = useApp();

  const steps = [
    {
      id: 1,
      tab: 'students' as ActiveTab,
      label: 'Step 1: Students',
      shortLabel: 'Students',
      subtext: `${stats.totalStudents} Registered`,
      icon: Users,
    },
    {
      id: 2,
      tab: 'drives' as ActiveTab,
      label: 'Step 2: Drives',
      shortLabel: 'Drives',
      subtext: `${stats.activeDrivesCount} Active`,
      icon: Building2,
    },
    {
      id: 3,
      tab: 'student-portal' as ActiveTab,
      label: 'Step 3: Portal & RLS',
      shortLabel: 'Portal',
      subtext: 'Criteria Enforced',
      icon: Briefcase,
    },
    {
      id: 4,
      tab: 'applications' as ActiveTab,
      label: 'Step 4: Pipeline',
      shortLabel: 'Pipeline',
      subtext: '9 Stages & Bulk',
      icon: GitBranch,
    },
    {
      id: 5,
      tab: 'dashboard' as ActiveTab,
      label: 'Step 5: Live KPIs',
      shortLabel: 'KPIs',
      subtext: `${stats.placementPercentage}% (Denom)`,
      icon: BarChart3,
    },
    {
      id: 6,
      tab: 'nodues' as ActiveTab,
      label: 'Step 6: No-Dues',
      shortLabel: 'No-Dues',
      subtext: `${stats.noDuesClearedCount}/${stats.totalStudents} Cleared`,
      icon: FileCheck2,
    },
    {
      id: 7,
      tab: 'reports' as ActiveTab,
      label: 'Step 7: Reports',
      shortLabel: 'Reports',
      subtext: '5 Audits & Statements',
      icon: FileText,
    },
  ];

  return (
    <div className="bg-white/80 dark:bg-obsidian-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card p-2 sm:p-2.5 transition-all">
      <div className="flex items-center justify-between gap-2 px-2 pb-1.5 border-b border-slate-100 dark:border-slate-800/80 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold uppercase tracking-wider text-navy-900 dark:text-gold-400 flex items-center gap-1.5">
            <span>Workflow Navigator</span>
            <span className="text-[10px] text-slate-400 font-mono font-normal">(Steps 1–7 Live Sync)</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RLS Active</span>
          </span>
          <span>•</span>
          <span className="text-gold-600 dark:text-gold-400 font-semibold">
            CSE Placed: 60.0% (6 of 10)
          </span>
        </div>
      </div>

      {/* Steps Horizontal Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 pt-2">
        {steps.map((st) => {
          const isActive = activeTab === st.tab;
          const Icon = st.icon;

          return (
            <button
              key={st.id}
              onClick={() => onNavigate(st.tab)}
              className={`p-2 rounded-xl text-left transition-all duration-200 relative group overflow-hidden border ${
                isActive
                  ? 'bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-950 border-navy-900 dark:border-gold-400 shadow-sm'
                  : 'bg-slate-50/70 hover:bg-white dark:bg-obsidian-950/60 dark:hover:bg-obsidian-800/80 border-slate-200/60 dark:border-slate-800/80 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[9px] font-extrabold font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-navy-950/20 dark:text-navy-950'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  0{st.id}
                </span>
                <Icon
                  className={`h-3.5 w-3.5 ${
                    isActive ? 'text-gold-300 dark:text-navy-900' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
              </div>

              <p className="text-[11px] font-bold truncate leading-tight">
                {st.shortLabel}
              </p>
              <p
                className={`text-[9px] truncate font-medium ${
                  isActive ? 'text-slate-200 dark:text-navy-800' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {st.subtext}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
