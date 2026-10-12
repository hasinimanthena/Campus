import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  GitBranch,
  FileCheck2,
  BarChart3,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  CreditCard,
  Shield,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'students'
  | 'drives'
  | 'applications'
  | 'nodues'
  | 'dues'
  | 'student-portal'
  | 'reports';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: any;
  badge?: string;
  badgeAlert?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  onLogout,
}) => {
  const { currentUser, switchDemoRole, stats } = useApp();
  const isAdmin = currentUser.role === 'admin';
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const adminSections: NavSection[] = [
    {
      title: 'MANAGEMENT',
      items: [
        {
          id: 'dashboard',
          label: 'Placement Dashboard',
          icon: LayoutDashboard,
          badge: `${stats.placementPercentage}%`,
        },
        {
          id: 'students',
          label: 'Student Directory',
          icon: Users,
          badge: `${stats.totalStudents}`,
        },
        {
          id: 'drives',
          label: 'Companies & Drives',
          icon: Building2,
          badge: `${stats.activeDrivesCount} Active`,
        },
        {
          id: 'applications',
          label: 'Pipeline Tracking',
          icon: GitBranch,
          badge: `${stats.totalOffers} Offers`,
        },
      ],
    },
    {
      title: 'CLEARANCE & DUES',
      items: [
        {
          id: 'nodues',
          label: 'No-Dues Clearance',
          icon: FileCheck2,
          badge: `${stats.noDuesPendingCount} Pending`,
          badgeAlert: stats.noDuesPendingCount > 0,
        },
        {
          id: 'dues',
          label: 'PhonePe & Ledger',
          icon: CreditCard,
        },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        {
          id: 'reports',
          label: 'Reports & Audits',
          icon: BarChart3,
        },
        {
          id: 'student-portal',
          label: 'Student View Mirror',
          icon: GraduationCap,
        },
      ],
    },
  ];

  const studentSections: NavSection[] = [
    {
      title: 'MY PORTAL',
      items: [
        {
          id: 'student-portal',
          label: 'Applications & Status',
          icon: GraduationCap,
        },
        {
          id: 'drives',
          label: 'Eligible Drives',
          icon: Building2,
          badge: `${stats.activeDrivesCount} Open`,
        },
        {
          id: 'dues',
          label: 'My Dues & PhonePe',
          icon: CreditCard,
          badge: 'Online',
        },
        {
          id: 'nodues',
          label: 'No-Dues Tracker',
          icon: FileCheck2,
        },
        {
          id: 'dashboard',
          label: 'University Overview',
          icon: LayoutDashboard,
        },
      ],
    },
  ];

  const sections = isAdmin ? adminSections : studentSections;

  return (
    <aside
      className={`relative flex flex-col bg-slate-900 dark:bg-[#070D1E] text-slate-200 transition-all duration-300 ease-in-out border-r border-slate-800 z-30 select-none shadow-xl ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand & Crest Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800 bg-[#0B132B]">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-black text-base text-white tracking-tight leading-none">
                CampusPath
              </span>
              <span className="text-[11px] text-slate-400 font-medium truncate mt-1">
                Apex Institute of Tech
              </span>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="hidden lg:flex justify-center py-2 border-b border-slate-800">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Role / Persona Switcher directly on the Left Side */}
      {!isCollapsed && (
        <div className="p-3 border-b border-slate-800/80 bg-slate-950/40 relative">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Active Persona</span>
            <span className="text-emerald-400 text-[9px] font-mono">Live RLS</span>
          </div>

          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="w-full flex items-center justify-between p-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/90 hover:bg-slate-800/80 transition-colors text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              {isAdmin ? (
                <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Shield className="h-3.5 w-3.5" />
                </div>
              ) : (
                <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-3.5 w-3.5" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">
                  {isAdmin ? 'Placement In-Charge' : currentUser.rollNumber || 'Student'}
                </p>
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
          </button>

          {showPersonaMenu && (
            <div
              className="absolute left-3 right-3 top-16 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl z-50 space-y-1 animate-in fade-in duration-100"
              onClick={() => setShowPersonaMenu(false)}
            >
              <button
                onClick={() => switchDemoRole('admin')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                  isAdmin ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold">Dr. Rajeshwari Raman</p>
                  <p className="text-[10px] text-slate-400">Placement In-Charge (TPO)</p>
                </div>
                {isAdmin && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />}
              </button>

              <button
                onClick={() => switchDemoRole('student', 'stud-1')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                  !isAdmin && currentUser.studentId === 'stud-1'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold">Aarav Sharma (CSE)</p>
                  <p className="text-[10px] text-slate-400">Dual Offers (Google & MS)</p>
                </div>
                {!isAdmin && currentUser.studentId === 'stud-1' && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                )}
              </button>

              <button
                onClick={() => switchDemoRole('student', 'stud-2')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                  !isAdmin && currentUser.studentId === 'stud-2'
                    ? 'bg-amber-500/20 text-amber-300 font-bold'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold">Diya Patel (CSE)</p>
                  <p className="text-[10px] text-slate-400">Goldman Sachs • Due: ₹250</p>
                </div>
                {!isAdmin && currentUser.studentId === 'stud-2' && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                )}
              </button>

              <button
                onClick={() => switchDemoRole('student', 'stud-13')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between ${
                  !isAdmin && currentUser.studentId === 'stud-13'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <p className="font-bold">Pooja Hegde (ECE)</p>
                  <p className="text-[10px] text-slate-400">Cisco • 100% Cleared</p>
                </div>
                {!isAdmin && currentUser.studentId === 'stud-13' && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {section.title}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    } ${isCollapsed ? 'justify-center px-2' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div
                      className={`p-1 rounded-lg transition-colors shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800/60 text-slate-400 group-hover:text-white group-hover:bg-slate-700/60'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {!isCollapsed && (
                      <div className="flex flex-1 items-center justify-between truncate">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold ${
                              item.badgeAlert
                                ? 'bg-rose-500 text-white'
                                : isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Profile & Logout */}
      <div className="border-t border-slate-800 p-3 bg-slate-950/60">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="h-8 w-8 rounded-lg object-cover border border-slate-700 shrink-0"
          />

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">
                {isAdmin ? 'TPO Admin' : currentUser.rollNumber || 'Student'}
              </p>
            </div>
          )}

          {!isCollapsed && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
