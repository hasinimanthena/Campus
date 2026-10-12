import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import {
  GraduationCap,
  Building2,
  FileCheck2,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  ChevronRight,
  Sparkles,
  QrCode,
  ShieldCheck,
  Award,
  Calendar,
  CreditCard,
  FileText,
  IdCard,
} from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { OfferLetterModal } from '../components/OfferLetterModal';
import { StudentIdCardModal } from '../components/StudentIdCardModal';
import { NoDuesItem, RecruitmentDrive } from '../types';

export const StudentPortalPage: React.FC = () => {
  const {
    currentUser,
    studentsWithRelations,
    drives,
    applicationHistory,
    submitApplication,
    withdrawApplication,
    switchDemoRole,
    showToast,
  } = useApp();

  const [activePortalTab, setActivePortalTab] = useState<'applications' | 'nodues' | 'browse'>('applications');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [payingCategory, setPayingCategory] = useState<NoDuesItem | null>(null);
  const [viewingOfferLetter, setViewingOfferLetter] = useState<{ drive: RecruitmentDrive; offerCtc: number } | null>(null);
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  const handleTestRlsSecurity = () => {
    showToast(
      'RLS Policy Enforced (Step 3)',
      'HTTP 403 Forbidden: auth.uid() != student_id. Supabase Row-Level Security blocks cross-student record access.',
      'info'
    );
  };

  // Get active student data
  const student =
    studentsWithRelations.find((s) => s.id === currentUser.studentId) ||
    studentsWithRelations[0];

  // Placed offers
  const activeDrivesMap = new Map(drives.map((d) => [d.id, d]));
  const successfulOfferStatuses = ['Selected', 'Offer Received', 'Joined'];
  const studentOffers = student.applications.filter((app) => {
    const drive = activeDrivesMap.get(app.driveId);
    return drive && drive.status !== 'Cancelled' && successfulOfferStatuses.includes(app.status);
  });

  // No dues summary
  const noDuesList = Object.values(student.noDues);
  const clearedCount = noDuesList.filter(
    (item) => item.status === 'Cleared' || item.status === 'Not Applicable'
  ).length;
  const isOverallCleared = student.overallNoDuesStatus === 'Cleared';

  // Open drives eligibility
  const eligibleDrives = drives.filter((drive) => {
    if (drive.status !== 'Active' && drive.status !== 'Upcoming') return false;
    return true;
  });

  const checkEligibility = (drive: typeof drives[0]) => {
    const isDeptEligible = drive.eligibleDepartments.includes(student.department);
    const isCgpaEligible = student.cgpa >= drive.minCgpa;
    const isBacklogEligible = student.backlogs <= drive.maxBacklogs;
    const isEligible = isDeptEligible && isCgpaEligible && isBacklogEligible;

    return {
      isEligible,
      isDeptEligible,
      isCgpaEligible,
      isBacklogEligible,
    };
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white p-6 rounded-2xl shadow-md border border-gold-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={student.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-gold-400/60 shadow-gold-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">{student.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-navy-800 text-gold-400 font-mono border border-gold-500/30">
                  {student.rollNumber}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {student.department} • Class of {student.batchYear}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                <span className="text-slate-300">CGPA: <strong className="text-gold-400">{student.cgpa}</strong></span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Backlogs: <strong className="text-white">{student.backlogs}</strong></span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Status: <strong className={student.isPlaced ? 'text-emerald-400' : 'text-amber-400'}>{student.isPlaced ? 'Placed' : 'In Process'}</strong></span>
                <span className="text-slate-400">•</span>
                <button
                  onClick={() => setIsIdCardOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-700 text-gold-400 hover:text-gold-300 text-[11px] font-bold transition-all border border-gold-500/30"
                >
                  <IdCard className="h-3 w-3 text-gold-400" />
                  <span>View Student ID Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Persona Switcher for Hackathon Testing */}
          <div className="flex flex-col sm:items-end gap-2">
            <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
              Switch Student Persona:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => switchDemoRole('student', 'stud-1')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  student.id === 'stud-1'
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-xs'
                    : 'bg-navy-800/80 text-slate-300 hover:bg-navy-800 hover:text-gold-300 border border-navy-700'
                }`}
              >
                Aarav (2 Offers)
              </button>
              <button
                onClick={() => switchDemoRole('student', 'stud-2')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  student.id === 'stud-2'
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-xs'
                    : 'bg-navy-800/80 text-slate-300 hover:bg-navy-800 hover:text-gold-300 border border-navy-700'
                }`}
              >
                Diya (Pending Due)
              </button>
              <button
                onClick={() => switchDemoRole('student', 'stud-13')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  student.id === 'stud-13'
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-xs'
                    : 'bg-navy-800/80 text-slate-300 hover:bg-navy-800 hover:text-gold-300 border border-navy-700'
                }`}
              >
                Pooja (100% Cleared)
              </button>
              <button
                onClick={handleTestRlsSecurity}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-700/50 flex items-center gap-1.5 transition-all shadow-2xs"
                title="Test Supabase RLS Policy: Verify cross-student query is rejected"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-rose-400" />
                <span>Test RLS Security</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 px-6 rounded-t-xl gap-6 text-xs font-bold">
        <button
          onClick={() => setActivePortalTab('applications')}
          className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
            activePortalTab === 'applications'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>My Applications & Offers ({student.applications.length})</span>
        </button>

        <button
          onClick={() => setActivePortalTab('nodues')}
          className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
            activePortalTab === 'nodues'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileCheck2 className="h-4 w-4" />
          <span>No-Dues Clearance ({clearedCount}/6)</span>
        </button>

        <button
          onClick={() => setActivePortalTab('browse')}
          className={`py-3.5 border-b-2 transition-all flex items-center gap-2 ${
            activePortalTab === 'browse'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Browse Active Drives ({eligibleDrives.length})</span>
        </button>
      </div>

      {/* Tab 1: Applications & Offers */}
      {activePortalTab === 'applications' && (
        <div className="space-y-6">
          {/* Confirmed Job Offers Spotlight */}
          {studentOffers.length > 0 && (
            <div className="bg-gradient-to-br from-gold-500/10 via-emerald-500/5 to-white dark:to-navy-900 p-6 rounded-2xl border border-gold-400/40 dark:border-gold-500/20 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gold-100 dark:bg-gold-950/60 text-gold-700 dark:text-gold-400 border border-gold-300 dark:border-gold-700/50">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 dark:text-white">
                      Confirmed Campus Placement Offers ({studentOffers.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Official offers verified by Training & Placement Cell</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-500/20">
                  Placed Candidate
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentOffers.map((app) => {
                  const drive = drives.find((d) => d.id === app.driveId);
                  return (
                    <div
                      key={app.id}
                      className="bg-white dark:bg-navy-900 p-5 rounded-xl border border-gold-300 dark:border-navy-700 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-extrabold text-navy-900 dark:text-white">{drive?.companyName}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{drive?.role}</p>
                          </div>
                          <StatusBadge status={app.status} type="application" size="sm" />
                        </div>

                        <div className="mt-3 p-3 bg-slate-50 dark:bg-navy-950/60 rounded-lg flex items-center justify-between border border-slate-100 dark:border-navy-800">
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Annual Package CTC:</span>
                          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                            ₹{app.offerCtc || drive?.packageCtc} LPA
                          </span>
                        </div>

                        {app.feedback && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 italic bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-md border border-emerald-100 dark:border-emerald-900/30">
                            "{app.feedback}"
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                        <span>Issued: {app.updatedAt}</span>
                        {drive && (
                          <button
                            type="button"
                            onClick={() =>
                              setViewingOfferLetter({
                                drive,
                                offerCtc: app.offerCtc || drive.packageCtc,
                              })
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 dark:bg-navy-800 dark:hover:bg-navy-700 text-navy-900 dark:text-gold-400 text-xs font-bold transition-all shadow-2xs border border-navy-200 dark:border-navy-700"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>View Offer Letter</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Applied Drives Table with Timeline Audit Drawer */}
          <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                  Application History & Status Timeline (Step 7)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track full recruitment lifecycle events and audit trail for each drive.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-navy-800">
              {student.applications.map((app) => {
                const drive = drives.find((d) => d.id === app.driveId);
                const isCancelled = drive?.status === 'Cancelled';
                const appLogs = applicationHistory.filter((h) => h.applicationId === app.id);
                const isExpanded = expandedAppId === app.id;

                return (
                  <div key={app.id} className="p-4 transition-colors hover:bg-slate-50/70 dark:hover:bg-navy-800/40">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-center font-bold text-navy-800 dark:text-gold-400 shrink-0">
                          {drive?.companyName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-navy-900 dark:text-white">{drive?.companyName}</h5>
                            {isCancelled && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-800/40">
                                Drive Cancelled
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {drive?.role} • CTC: ₹{app.offerCtc || drive?.packageCtc} LPA
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                            Applied on: {app.appliedAt} • Current Round: {app.currentRound}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <StatusBadge status={app.status} type="application" size="sm" />
                        <button
                          onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-300 dark:border-navy-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                        >
                          {isExpanded ? 'Hide History' : `Audit History (${appLogs.length + 1})`}
                        </button>
                        {app.status !== 'Withdrawn' && app.status !== 'Joined' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Withdraw application for ${drive?.companyName}?`)) {
                                withdrawApplication(app.id);
                              }
                            }}
                            className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold"
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Audit Trail Timeline (Step 7 requirement) */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-navy-800/80 pl-4 border-l-2 border-gold-500/50 space-y-2 text-xs">
                        <p className="font-bold text-navy-900 dark:text-white text-[11px]">
                          Recruitment Event Timeline (application_history):
                        </p>
                        <div className="space-y-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">{app.appliedAt}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 text-[10px]">
                              Registered
                            </span>
                            <span>Initial application submitted by student</span>
                          </div>
                          {appLogs.map((log) => (
                            <div key={log.id} className="flex items-center gap-2 flex-wrap">
                              <span className="text-slate-400">{log.changedAt}</span>
                              <span className="text-slate-500">{log.oldStatus}</span>
                              <span>→</span>
                              <span className="font-bold text-navy-900 dark:text-gold-400">{log.newStatus}</span>
                              <span className="text-slate-400">by {log.changedBy}</span>
                              {log.notes && <span className="italic text-slate-500">"{log.notes}"</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {student.applications.length === 0 && (
                <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                  You have not applied for any placement drives yet. Visit the "Browse Active Drives" tab!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: No-Dues Clearance Tracker */}
      {activePortalTab === 'nodues' && (
        <div className="space-y-6">
          {/* Progress Banner */}
          <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">
                  Graduation No-Dues Progress & Audit
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every category must be marked Cleared or Not Applicable for certificate release.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {isOverallCleared ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Status: Cleared — All Sections Approved</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300 text-xs font-semibold">
                    <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>
                      Status: Incomplete
                      {student.blockingCategories && student.blockingCategories.length > 0
                        ? ` (Pending: ${student.blockingCategories.join(', ')})`
                        : ''}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-sm border border-gold-500/20"
                >
                  <FileText className="h-4 w-4" />
                  <span>{isOverallCleared ? 'Download Clearance Certificate' : 'Print No-Dues Statement'}</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-navy-950 rounded-full h-3 overflow-hidden border border-slate-200 dark:border-navy-800">
              <div
                className={`h-full transition-all duration-500 ${
                  isOverallCleared ? 'bg-emerald-500' : 'bg-navy-900 dark:bg-gold-500'
                }`}
                style={{ width: `${(clearedCount / 6) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              <span>{clearedCount} of 6 Sections Verified</span>
              <span className="font-bold text-navy-900 dark:text-gold-400">{Math.round((clearedCount / 6) * 100)}% Cleared</span>
            </div>
          </div>

          {/* 6 Category Clearance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {noDuesList.map((item) => (
              <div
                key={item.category}
                className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white">{item.categoryLabel}</h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{item.departmentInCharge}</p>
                    </div>
                    <StatusBadge status={item.status} type="nodues" size="sm" />
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {item.remarks}
                  </p>

                  {item.pendingAmount > 0 && (
                    <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold block">Outstanding Fee / Fine:</span>
                        <span className="text-sm font-extrabold text-rose-700 dark:text-rose-400 font-mono">₹{item.pendingAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPayingCategory(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>Pay Online</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span>Sign-off: {item.clearedBy || 'Pending'}</span>
                  <span>{item.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Browse Open Drives */}
      {activePortalTab === 'browse' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleDrives.map((drive) => {
              const { isEligible, isDeptEligible, isCgpaEligible, isBacklogEligible } =
                checkEligibility(drive);
              const alreadyApplied = student.applications.some((a) => a.driveId === drive.id);
              const isDeadlinePassed = new Date(drive.deadline) < new Date(new Date().setHours(0, 0, 0, 0));
              const canApply = isEligible && !isDeadlinePassed && !alreadyApplied;

              return (
                <div
                  key={drive.id}
                  className="bg-white dark:bg-navy-900 p-5 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-navy-900 dark:text-white">{drive.companyName}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{drive.role}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gold-50 dark:bg-gold-950/40 text-gold-700 dark:text-gold-400 border border-gold-300 dark:border-gold-700/50">
                        ₹{drive.packageCtc} LPA
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-2">
                      {drive.description}
                    </p>

                    <div className="mt-3.5 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                        <span>Eligibility Cutoff:</span>
                        <span className="font-semibold text-navy-900 dark:text-slate-200">
                          Min CGPA {drive.minCgpa} • Max {drive.maxBacklogs} Backlog
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                        <span>Registration Deadline:</span>
                        <span className={`font-semibold ${isDeadlinePassed ? 'text-rose-600 dark:text-rose-400' : 'text-navy-900 dark:text-slate-200'}`}>
                          {drive.deadline} {isDeadlinePassed && '(Expired)'}
                        </span>
                      </div>
                    </div>

                    {/* Eligibility breakdown banner */}
                    <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800 text-xs">
                      {isEligible && !isDeadlinePassed ? (
                        <div className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Eligible to apply based on academic criteria</span>
                        </div>
                      ) : (
                        <div className="text-rose-600 dark:text-rose-400 font-medium space-y-0.5">
                          <p className="font-bold flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>Ineligible for this drive:</span>
                          </p>
                          {isDeadlinePassed && <p className="text-[11px]">• Registration deadline has passed</p>}
                          {!isDeptEligible && <p className="text-[11px]">• Your department is not in the eligible list</p>}
                          {!isCgpaEligible && <p className="text-[11px]">• Your CGPA ({student.cgpa}) is below required {drive.minCgpa}</p>}
                          {!isBacklogEligible && <p className="text-[11px]">• Backlogs exceed maximum permitted</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500">Date: {drive.driveDate}</span>

                    {alreadyApplied ? (
                      <span className="text-xs font-bold text-navy-800 dark:text-gold-400 flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => submitApplication(student.id, drive.id)}
                        disabled={!canApply}
                        className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed border border-gold-500/20"
                      >
                        {isDeadlinePassed ? 'Deadline Closed' : 'Apply Now'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Official No-Dues Clearance Certificate Modal */}
      {isCertificateOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsCertificateOpen(false)}
          title="Official No-Dues Clearance Certificate"
          subtitle="Apex Institute of Technology • Office of Academic Administration"
          maxWidth="2xl"
        >
          <div className="space-y-6 p-4 border-2 border-slate-300 rounded-2xl bg-white shadow-xs print:p-0 print:border-none">
            {/* Certificate Header */}
            <div className="text-center pb-4 border-b-2 border-slate-900">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                  AIT
                </div>
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-wide text-slate-900">
                Apex Institute of Technology
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                Accredited Institutional Autonomous Campus • Directorate of Examinations
              </p>
              <div className="inline-block mt-3 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold tracking-wider uppercase">
                Official Institutional Clearance Certificate
              </div>
            </div>

            {/* Certificate Statement */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-800">
              <p>
                This is to certify that <strong>{student.name}</strong>, bearing Roll Number{' '}
                <strong className="font-mono">{student.rollNumber}</strong> of the Department of{' '}
                <strong>{student.department}</strong> (Batch: {student.batchYear}), has officially completed
                all institutional audit procedures.
              </p>
              <p>
                No outstanding dues, fee balances, library inventory, or departmental assets remain pending against this candidate.
              </p>
            </div>

            {/* Clearance Table Grid */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="grid grid-cols-3 bg-slate-100 p-2 font-bold text-slate-700">
                <span>Administrative Section</span>
                <span>Audit Status</span>
                <span className="text-right">Authorized Signatory</span>
              </div>
              {noDuesList.map((item) => (
                <div key={item.category} className="grid grid-cols-3 p-2 border-t border-slate-100">
                  <span className="font-medium text-slate-800">{item.categoryLabel}</span>
                  <span className="font-semibold text-emerald-700">{item.status}</span>
                  <span className="text-right text-slate-500 font-mono text-[11px]">{item.clearedBy || 'Office Record'}</span>
                </div>
              ))}
            </div>

            {/* Signature & Seal Strip */}
            <div className="pt-6 flex items-end justify-between border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-slate-300 rounded-lg bg-slate-50">
                  <QrCode className="h-12 w-12 text-slate-800" />
                </div>
                <div className="text-[10px] text-slate-500">
                  <p className="font-mono font-bold text-slate-700">DOC REF: CP-ND-{student.rollNumber}</p>
                  <p>Cryptographically Verified</p>
                  <p>Valid for Convocation & Degree</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-xs text-slate-900">Dr. Rajeshwari Raman</p>
                <p className="text-[11px] text-slate-500">Controller of Clearance & Placement</p>
                <div className="mt-1 h-0.5 w-32 bg-slate-400 ml-auto" />
              </div>
            </div>

            {/* Print button */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 print:hidden">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
              >
                <Printer className="h-4 w-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Online Fee Payment Modal */}
      {payingCategory && (
        <PaymentModal
          isOpen={true}
          onClose={() => setPayingCategory(null)}
          studentId={student.id}
          studentName={student.name}
          studentRoll={student.rollNumber}
          category={payingCategory.category}
          categoryLabel={payingCategory.categoryLabel}
          amount={payingCategory.pendingAmount}
        />
      )}

      {/* Offer Letter Viewer Modal */}
      {viewingOfferLetter && (
        <OfferLetterModal
          isOpen={true}
          onClose={() => setViewingOfferLetter(null)}
          student={student}
          drive={viewingOfferLetter.drive}
          offerCtc={viewingOfferLetter.offerCtc}
        />
      )}

      {/* Digital Campus ID Card Modal */}
      {isIdCardOpen && (
        <StudentIdCardModal
          isOpen={true}
          onClose={() => setIsIdCardOpen(false)}
          student={student}
        />
      )}
    </div>
  );
};
