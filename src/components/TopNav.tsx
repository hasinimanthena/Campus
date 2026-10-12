import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Bell,
  IdCard,
  Calendar,
  Check,
  Sun,
  Moon,
} from 'lucide-react';
import { StudentIdCardModal } from './StudentIdCardModal';

interface TopNavProps {
  onToggleMobileSidebar: () => void;
  activeTabTitle: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  onToggleMobileSidebar,
  activeTabTitle,
}) => {
  const {
    currentUser,
    stats,
    students,
    academicSession,
    setAcademicSession,
    theme,
    toggleTheme,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);

  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      title: 'Google Cloud Drive Assessment Results',
      time: '10m ago',
      type: 'success',
      desc: '2 students cleared final round and received official offer letters.',
      read: false,
    },
    {
      id: 2,
      title: 'Graduation No-Dues Clearance Required',
      time: '1h ago',
      type: 'warning',
      desc: `${stats.noDuesPendingCount} graduating students still have pending department or fee dues.`,
      read: false,
    },
    {
      id: 3,
      title: 'New Campus Drive Posted: TCS Innovate',
      time: '3h ago',
      type: 'info',
      desc: 'Drive open for CSE, ECE & IT students. Deadline in 4 days.',
      read: false,
    },
  ]);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const currentStudent = students.find((s) => s.id === currentUser.studentId) || students[0];

  return (
    <>
      <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#060B17]/95 px-4 backdrop-blur-md sm:px-6 transition-colors shadow-2xs">
        {/* Left: Mobile menu & breadcrumb title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            title="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              {activeTabTitle}
            </h1>
          </div>
        </div>

        {/* Right: Quick actions, notifications, user avatar */}
        <div className="flex items-center gap-2">
          {/* Academic Session Selector */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <select
              value={academicSession}
              onChange={(e) => setAcademicSession(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="2024-2025 (Semester 8 - Final Year)" className="dark:bg-[#060B17]">
                Session 2024–25 (Final Sem)
              </option>
              <option value="2023-2024 (Batch Archive)" className="dark:bg-[#060B17]">
                Session 2023–24 (Archive)
              </option>
            </select>
          </div>

          {/* Student ID Card Quick Button (Visible when student is logged in) */}
          {currentUser.role === 'student' && (
            <button
              onClick={() => setIsIdCardOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-indigo-400/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-xs font-bold text-indigo-700 dark:text-indigo-300 transition-colors"
              title="View Digital Student ID Card"
            >
              <IdCard className="h-3.5 w-3.5 text-indigo-500" />
              <span>Campus ID</span>
            </button>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
          </button>

          {/* Notifications Drawer */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-[#060B17]" />
              )}
            </button>

            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-2xl z-50 animate-in fade-in duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Alerts</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[10px] text-gold-600 dark:text-gold-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      <span>Mark read</span>
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-1 max-h-64 overflow-y-auto">
                  {notificationList.map((n) => (
                    <div
                      key={n.id}
                      className={`py-2 px-2 text-xs rounded-lg transition-colors ${
                        !n.read ? 'bg-gold-500/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-900 dark:text-white text-xs">{n.title}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-2">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="h-7 w-7 rounded-lg object-cover border border-slate-300 dark:border-slate-700 shrink-0"
            />
          </div>
        </div>
      </header>

      {/* Digital Student ID Card Modal */}
      {isIdCardOpen && (
        <StudentIdCardModal
          isOpen={true}
          onClose={() => setIsIdCardOpen(false)}
          student={currentStudent}
        />
      )}
    </>
  );
};
