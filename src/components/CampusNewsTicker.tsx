import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, ChevronLeft, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';

export const CampusNewsTicker: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: 'Google Cloud: Final Round Results Declared',
      summary: '2 students cleared technical & Googliness rounds. Official offer letters issued via TPO.',
      date: 'Today, 10:30 AM',
      author: 'Office of Training & Placement',
      category: 'Recruitment',
    },
    {
      id: 2,
      title: 'Mandatory Graduation No-Dues Clearance Window Open',
      summary: 'All final year batch students must ensure all 6 departmental clearances (Library, Lab, Dept, Placement, Accounts, Hostel) are signed off by April 25 to receive convocation admit cards.',
      date: 'Yesterday, 04:15 PM',
      author: 'Academic Registrar & Clearance Cell',
      category: 'Clearance',
    },
    {
      id: 3,
      title: 'Cisco Systems: Onboarding BGV Documentation',
      summary: 'Shortlisted candidates from ECE and CSE streams are advised to submit soft copies of all semester marksheets on the corporate onboarding portal.',
      date: 'April 10, 2025',
      author: 'Corporate Relations Cell',
      category: 'Recruitment',
    },
    {
      id: 4,
      title: 'Central Library: Book Return & Fine Waiver Week',
      summary: 'Students returning overdue library books between April 10–15 will receive a 50% waiver on accrued late return penalty fees.',
      date: 'April 08, 2025',
      author: 'Central Library Directorate',
      category: 'Library Notice',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof announcements[0] | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, announcements.length]);

  const current = announcements[currentIndex];

  return (
    <>
      <div className="bg-navy-950 border-b border-navy-800 text-white px-4 py-2 text-xs flex items-center justify-between gap-3 overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 font-bold uppercase tracking-wider text-[10px]">
            <Volume2 className="h-3 w-3 animate-pulse text-gold-400" />
            <span>Campus Bulletin</span>
          </span>
          <span className="text-navy-700 hidden sm:inline">|</span>
        </div>

        {/* Marquee Content */}
        <div
          className="flex-1 min-w-0 cursor-pointer group flex items-center gap-2"
          onClick={() => setSelectedAnnouncement(current)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="px-1.5 py-0.2 rounded bg-navy-800 text-gold-300/90 font-mono text-[10px] hidden md:inline border border-navy-700">
            {current.category}
          </span>
          <p className="text-slate-300 group-hover:text-gold-300 transition-colors truncate font-medium">
            <strong className="text-white font-semibold">{current.title}</strong> — {current.summary}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] text-slate-400 font-mono hidden lg:inline mr-2">
            {currentIndex + 1}/{announcements.length}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
            className="p-1 rounded hover:bg-navy-800 text-slate-400 hover:text-gold-400 transition-colors"
            title="Previous notice"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
            className="p-1 rounded hover:bg-navy-800 text-slate-400 hover:text-gold-400 transition-colors"
            title="Next notice"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Full Circular Modal */}
      {selectedAnnouncement && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAnnouncement(null)}
          title={selectedAnnouncement.title}
          subtitle={`Issued by ${selectedAnnouncement.author} • ${selectedAnnouncement.date}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-500 dark:text-gold-400 font-semibold text-[11px] border border-gold-500/30">
                Official Circular: {selectedAnnouncement.category}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{selectedAnnouncement.date}</span>
            </div>

            <p className="text-slate-900 dark:text-white text-sm font-bold">
              Attention: All Graduating Students & Faculty Advisors
            </p>

            <p className="text-slate-600 dark:text-slate-300">{selectedAnnouncement.summary}</p>

            <p className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-400 text-[11px]">
              For clarifications regarding this circular, contact the respective department coordinator or the Training & Placement helpdesk.
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 font-bold text-xs shadow-sm transition-colors border border-gold-500/20"
              >
                Dismiss Notice
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
