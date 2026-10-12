import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, Application } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import {
  GitBranch,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  Building2,
  User,
  GraduationCap,
  MessageSquare,
  FileCheck,
} from 'lucide-react';

export const ApplicationTrackingPage: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    bulkUpdateApplicationStatus,
    studentsWithRelations,
    drives,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriveId, setSelectedDriveId] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  // Bulk selection state (STEP 4)
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<ApplicationStatus>('Shortlisted');
  const [bulkNotes, setBulkNotes] = useState<string>('Batch progression approved');

  // Status update modal
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Interview');
  const [statusNotes, setStatusNotes] = useState('');
  const [offerCtc, setOfferCtc] = useState<number>(0);

  const allStatuses: ApplicationStatus[] = [
    'Registered',
    'Shortlisted',
    'Assessment',
    'Interview',
    'Selected',
    'Offer Received',
    'Joined',
    'Rejected',
    'Withdrawn',
  ];

  const enrichedApps = applications.map((app) => {
    const student = studentsWithRelations.find((s) => s.id === app.studentId);
    const drive = drives.find((d) => d.id === app.driveId);
    return {
      ...app,
      student,
      drive,
    };
  });

  const filteredApps = enrichedApps.filter((item) => {
    if (!item.student || !item.drive) return false;

    // Search query
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.student.name.toLowerCase().includes(q) ||
      item.student.rollNumber.toLowerCase().includes(q) ||
      item.drive.companyName.toLowerCase().includes(q) ||
      item.drive.role.toLowerCase().includes(q);
    if (!matchesSearch) return false;

    // Drive filter
    if (selectedDriveId !== 'All' && item.driveId !== selectedDriveId) return false;

    // Status filter
    if (selectedStatus !== 'All' && item.status !== selectedStatus) return false;

    // Dept filter
    if (selectedDept !== 'All' && item.student.department !== selectedDept) return false;

    return true;
  });

  const handleOpenStatusModal = (app: Application) => {
    setEditingApp(app);
    setNewStatus(app.status);
    setStatusNotes(app.notes || app.feedback || '');
    setOfferCtc(app.offerCtc || drives.find((d) => d.id === app.driveId)?.packageCtc || 0);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingApp) {
      updateApplicationStatus(editingApp.id, newStatus, statusNotes, offerCtc);
      setEditingApp(null);
    }
  };

  const handleBulkApply = async () => {
    if (selectedAppIds.length === 0) return;
    await bulkUpdateApplicationStatus(selectedAppIds, bulkStatus, bulkNotes);
    setSelectedAppIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedAppIds.length === filteredApps.length) {
      setSelectedAppIds([]);
    } else {
      setSelectedAppIds(filteredApps.map((a) => a.id));
    }
  };

  const toggleSelectApp = (id: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Pipeline stage counters
  const statusCounts = allStatuses.reduce((acc, st) => {
    acc[st] = applications.filter((a) => a.status === st).length;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
        <h2 className="text-xl font-bold text-navy-900 dark:text-white">
          Candidate Pipeline & Application Tracking
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor progression across all 9 recruitment stages. Live updates dynamically alter placement metrics.
        </p>

        {/* Pipeline Stage Pills */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {allStatuses.map((st) => {
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(isSelected ? 'All' : st)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-gold-500 bg-gold-50/80 dark:bg-gold-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950/60 hover:bg-slate-100/80 dark:hover:bg-navy-800/80'
                }`}
              >
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 truncate">{st}</p>
                <p className={`text-base font-extrabold mt-0.5 ${isSelected ? 'text-gold-700 dark:text-gold-400' : 'text-navy-900 dark:text-white'}`}>
                  {statusCounts[st] || 0}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-slate-200 dark:border-navy-800 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate, roll, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div>
            <select
              value={selectedDriveId}
              onChange={(e) => setSelectedDriveId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Companies & Drives</option>
              {drives.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.companyName} ({d.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Statuses (9 Stages)</option>
              {allStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science & Engineering">CSE</option>
              <option value="Electronics & Communication Engineering">ECE</option>
              <option value="Information Technology">IT</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 mt-3 border-t border-slate-100 dark:border-navy-800">
          <span>
            Found <strong className="text-navy-900 dark:text-white">{filteredApps.length}</strong> applications matching filter
            {selectedAppIds.length > 0 && (
              <span className="ml-2 font-semibold text-gold-600 dark:text-gold-400">
                ({selectedAppIds.length} selected for bulk action)
              </span>
            )}
          </span>
          <div className="flex items-center gap-3">
            {selectedAppIds.length > 0 && (
              <button
                onClick={() => setSelectedAppIds([])}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Clear Selection
              </button>
            )}
            {(searchQuery || selectedDriveId !== 'All' || selectedStatus !== 'All' || selectedDept !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDriveId('All');
                  setSelectedStatus('All');
                  setSelectedDept('All');
                }}
                className="text-gold-600 dark:text-gold-400 font-semibold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bulk Action Bar (STEP 4) */}
      {selectedAppIds.length > 0 && (
        <div className="bg-navy-900 text-white dark:bg-navy-950 p-4 rounded-xl border border-gold-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500 text-navy-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
              {selectedAppIds.length}
            </div>
            <div>
              <p className="text-xs font-bold text-white">Bulk Application Progress (Step 4)</p>
              <p className="text-[11px] text-slate-300">
                Move {selectedAppIds.length} selected candidates simultaneously with audit trail
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value as ApplicationStatus)}
              aria-label="Bulk update status"
              className="px-3 py-1.5 text-xs rounded-lg bg-navy-800 border border-navy-700 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              {allStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Bulk progression note / evaluation..."
              value={bulkNotes}
              onChange={(e) => setBulkNotes(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 min-w-[200px]"
            />

            <button
              onClick={handleBulkApply}
              className="px-4 py-1.5 text-xs font-bold bg-gold-500 hover:bg-gold-600 text-navy-950 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Apply to {selectedAppIds.length} Candidates
            </button>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-navy-950/60 border-b border-slate-200 dark:border-navy-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3.5 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    aria-label="Select all applications"
                    checked={filteredApps.length > 0 && selectedAppIds.length === filteredApps.length}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-gold-600 focus:ring-gold-500 h-3.5 w-3.5 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-3">Candidate</th>
                <th className="py-3.5 px-3">Drive & Company</th>
                <th className="py-3.5 px-3">Compensation</th>
                <th className="py-3.5 px-3">Current Round</th>
                <th className="py-3.5 px-3">Application Stage</th>
                <th className="py-3.5 px-3">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {filteredApps.map((item) => {
                const isCancelledDrive = item.drive?.status === 'Cancelled';
                const isSelected = selectedAppIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-gold-50/50 dark:bg-gold-950/20'
                        : 'hover:bg-slate-50/80 dark:hover:bg-navy-800/60'
                    }`}
                  >
                    {/* Selection Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        aria-label={`Select application for ${item.student?.name || item.id}`}
                        checked={isSelected}
                        onChange={() => toggleSelectApp(item.id)}
                        className="rounded border-slate-300 text-gold-600 focus:ring-gold-500 h-3.5 w-3.5 cursor-pointer"
                      />
                    </td>

                    {/* Candidate */}
                    <td className="py-3.5 px-3">
                      <div>
                        <span className="font-bold text-navy-900 dark:text-white block text-xs">
                          {item.student?.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.student?.rollNumber} • {item.student?.department.replace('Engineering', 'Eng.')}
                        </span>
                      </div>
                    </td>

                    {/* Drive */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-bold text-navy-900 dark:text-white flex items-center gap-1.5">
                            {item.drive?.companyName}
                            {isCancelledDrive && (
                              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">(Cancelled)</span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">{item.drive?.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Compensation */}
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        ₹{item.offerCtc || item.drive?.packageCtc} LPA
                      </span>
                    </td>

                    {/* Round */}
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-medium text-[11px] border border-slate-200/60 dark:border-navy-700">
                        {item.currentRound}
                      </span>
                      {item.notes && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-xs italic">
                          {item.notes}
                        </p>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <StatusBadge status={item.status} type="application" size="sm" />
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                      {item.updatedAt}
                    </td>

                    {/* Update Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenStatusModal(item)}
                        className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-navy-900 dark:text-gold-400 text-xs font-semibold transition-colors"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    No applications match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Status Modal */}
      {editingApp && (
        <Modal
          isOpen={true}
          onClose={() => setEditingApp(null)}
          title="Update Application Stage"
          subtitle="Advance or update candidate stage in the recruitment workflow"
          maxWidth="md"
        >
          <form onSubmit={handleSaveStatus} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select New Status (9 Pipeline Stages)
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-950 text-slate-900 dark:text-white"
              >
                {allStatuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Offer Package CTC input (Step 4 requirement) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Offered Package CTC (in LPA)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={offerCtc}
                onChange={(e) => setOfferCtc(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 14.5"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-950 text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Associated drive standard CTC: ₹{drives.find((d) => d.id === editingApp.driveId)?.packageCtc || 0} LPA
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Evaluation Notes / Interviewer Feedback
              </label>
              <textarea
                rows={3}
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="e.g. Cleared technical interview with positive recommendation."
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-950 text-slate-900 dark:text-white"
              />
            </div>

            <div className="p-3 rounded-lg bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-navy-800 text-navy-800 dark:text-gold-300 text-[11px] leading-relaxed">
              <strong>Business Rule Reminder:</strong> Changing status to <em>Selected</em>, <em>Offer Received</em>, or <em>Joined</em> automatically recalculates university placement metrics, provided the drive is not Cancelled. An audit row is appended to <code>application_history</code>.
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-navy-800">
              <button
                type="button"
                onClick={() => setEditingApp(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white dark:text-navy-950 bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 rounded-lg shadow-sm transition-colors border border-gold-500/20"
              >
                Update Candidate Stage
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
