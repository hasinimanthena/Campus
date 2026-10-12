import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RecruitmentDrive, Department, CompanyTier, DriveStatus } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import {
  Building2,
  Plus,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  GraduationCap,
  Users,
  AlertTriangle,
  Edit,
  XCircle,
  Search,
  CheckCircle2,
  Briefcase,
  Layers,
} from 'lucide-react';

export const CompaniesDrivesPage: React.FC = () => {
  const { drives, addDrive, updateDrive, cancelDrive, applications, studentsWithRelations } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDrive, setEditingDrive] = useState<RecruitmentDrive | null>(null);
  const [viewingApplicantsDrive, setViewingApplicantsDrive] = useState<RecruitmentDrive | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    tier: 'Dream' as CompanyTier,
    packageCtc: 12.0,
    stipend: '₹50,000/mo',
    minCgpa: 7.5,
    maxBacklogs: 0,
    eligibleDepartments: [
      'Computer Science & Engineering',
      'Information Technology',
    ] as Department[],
    driveDate: '2025-04-10',
    deadline: '2025-04-05',
    location: 'Bengaluru / Hybrid',
    status: 'Upcoming' as DriveStatus,
    rounds: 'Online Test, Technical Round, HR Interview',
    description: '',
    jobType: 'Full-time' as 'Full-time' | 'Internship + PPO' | 'Direct Hire',
  });

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter !== 'All' && drive.status !== statusFilter) return false;
    if (tierFilter !== 'All' && drive.tier !== tierFilter) return false;

    return true;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roundsList = formData.rounds.split(',').map((r) => r.trim()).filter(Boolean);

    if (editingDrive) {
      updateDrive({
        ...editingDrive,
        companyName: formData.companyName,
        role: formData.role,
        tier: formData.tier,
        packageCtc: Number(formData.packageCtc),
        stipend: formData.stipend,
        minCgpa: Number(formData.minCgpa),
        maxBacklogs: Number(formData.maxBacklogs),
        eligibleDepartments: formData.eligibleDepartments,
        driveDate: formData.driveDate,
        deadline: formData.deadline,
        location: formData.location,
        status: formData.status,
        rounds: roundsList,
        description: formData.description,
        jobType: formData.jobType,
      });
      setEditingDrive(null);
    } else {
      addDrive({
        companyName: formData.companyName,
        role: formData.role,
        tier: formData.tier,
        packageCtc: Number(formData.packageCtc),
        stipend: formData.stipend,
        minCgpa: Number(formData.minCgpa),
        maxBacklogs: Number(formData.maxBacklogs),
        eligibleDepartments: formData.eligibleDepartments,
        driveDate: formData.driveDate,
        deadline: formData.deadline,
        location: formData.location,
        status: formData.status,
        rounds: roundsList,
        description: formData.description,
        jobType: formData.jobType,
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
      });
      setIsAddModalOpen(false);
    }

    // Reset
    setFormData({
      companyName: '',
      role: '',
      tier: 'Dream',
      packageCtc: 12.0,
      stipend: '₹50,000/mo',
      minCgpa: 7.5,
      maxBacklogs: 0,
      eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
      driveDate: '2025-04-10',
      deadline: '2025-04-05',
      location: 'Bengaluru / Hybrid',
      status: 'Upcoming',
      rounds: 'Online Test, Technical Round, HR Interview',
      description: '',
      jobType: 'Full-time',
    });
  };

  const openEditModal = (drive: RecruitmentDrive) => {
    setEditingDrive(drive);
    setFormData({
      companyName: drive.companyName,
      role: drive.role,
      tier: drive.tier,
      packageCtc: drive.packageCtc,
      stipend: drive.stipend || '',
      minCgpa: drive.minCgpa,
      maxBacklogs: drive.maxBacklogs,
      eligibleDepartments: drive.eligibleDepartments,
      driveDate: drive.driveDate,
      deadline: drive.deadline,
      location: drive.location,
      status: drive.status,
      rounds: drive.rounds.join(', '),
      description: drive.description,
      jobType: drive.jobType,
    });
  };

  const toggleDept = (dept: Department) => {
    setFormData((prev) => {
      const exists = prev.eligibleDepartments.includes(dept);
      return {
        ...prev,
        eligibleDepartments: exists
          ? prev.eligibleDepartments.filter((d) => d !== dept)
          : [...prev.eligibleDepartments, dept],
      };
    });
  };

  // Get applicants for selected drive
  const driveApplicants = viewingApplicantsDrive
    ? applications
        .filter((app) => app.driveId === viewingApplicantsDrive.id)
        .map((app) => {
          const student = studentsWithRelations.find((s) => s.id === app.studentId);
          return { app, student };
        })
    : [];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">
            Recruitment Drives & Corporate Partners
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage placement schedules, eligibility criteria, corporate packages, and candidate selection.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDrive(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-sm self-start sm:self-auto border border-gold-500/20"
        >
          <Plus className="h-4 w-4" />
          <span>Add Recruitment Drive</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-slate-200 dark:border-navy-800 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search companies, roles, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Drive Statuses</option>
              <option value="Active">Active Drives</option>
              <option value="Upcoming">Upcoming Drives</option>
              <option value="Completed">Completed Drives</option>
              <option value="Cancelled">Cancelled Drives</option>
            </select>
          </div>

          <div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Compensation Tiers</option>
              <option value="Super Dream">Super Dream (&gt;20 LPA)</option>
              <option value="Dream">Dream (15-20 LPA)</option>
              <option value="Core">Core (8-15 LPA)</option>
              <option value="Mass">Mass (&lt;8 LPA)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recruitment Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDrives.map((drive) => {
          const driveApps = applications.filter((a) => a.driveId === drive.id);
          const offersCount = driveApps.filter((a) =>
            ['Selected', 'Offer Received', 'Joined'].includes(a.status)
          ).length;

          const tierColorMap = {
            'Super Dream': 'bg-gold-50 dark:bg-gold-950/40 text-gold-800 dark:text-gold-300 border-gold-300 dark:border-gold-700/50',
            Dream: 'bg-navy-50 dark:bg-navy-800 text-navy-800 dark:text-gold-400 border-navy-200 dark:border-navy-700',
            Core: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40',
            Mass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/40',
          }[drive.tier];

          return (
            <div
              key={drive.id}
              className={`bg-white dark:bg-navy-900 rounded-2xl border p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                drive.status === 'Cancelled'
                  ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/20 dark:bg-rose-950/20 opacity-85'
                  : 'border-slate-200 dark:border-navy-800'
              }`}
            >
              <div>
                {/* Header: Company & Tier */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-navy-900 dark:bg-navy-800 text-gold-400 font-bold text-base flex items-center justify-center shrink-0 shadow-xs border border-gold-500/30">
                      {drive.companyName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-navy-900 dark:text-white leading-tight">
                        {drive.companyName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{drive.role}</p>
                    </div>
                  </div>

                  <StatusBadge status={drive.status} type="drive" size="sm" />
                </div>

                {/* Package & Tier Banner */}
                <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-100 dark:border-navy-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                      Package CTC
                    </span>
                    <p className="text-base font-extrabold text-navy-900 dark:text-gold-400">
                      ₹{drive.packageCtc} <span className="text-xs font-semibold">LPA</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tierColorMap}`}>
                      {drive.tier}
                    </span>
                    {drive.stipend && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{drive.stipend}</p>
                    )}
                  </div>
                </div>

                {/* Eligibility specs */}
                <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Min CGPA:</span>
                    <strong className="text-navy-900 dark:text-white">{drive.minCgpa}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Max Backlogs:</span>
                    <strong className="text-navy-900 dark:text-white">{drive.maxBacklogs} allowed</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Location:</span>
                    <span className="truncate max-w-[160px] text-navy-900 dark:text-slate-200">{drive.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Drive Date:</span>
                    <span className="font-medium text-navy-900 dark:text-slate-200">{drive.driveDate}</span>
                  </div>
                </div>

                {/* Eligible departments pills */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {drive.eligibleDepartments.map((dept) => (
                    <span
                      key={dept}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium border border-slate-200/60 dark:border-navy-700"
                    >
                      {dept.replace('Engineering', 'Eng.')}
                    </span>
                  ))}
                </div>

                {drive.status === 'Cancelled' && (
                  <div className="mt-3 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-[11px] text-rose-700 dark:text-rose-400 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span>Cancelled: Offers do NOT count in official totals.</span>
                  </div>
                )}
              </div>

              {/* Card Footer: stats & actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <button
                  onClick={() => setViewingApplicantsDrive(drive)}
                  className="flex items-center gap-1.5 text-xs font-bold text-navy-800 dark:text-gold-400 hover:text-gold-600 dark:hover:text-gold-300"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>
                    {driveApps.length} Applicants ({offersCount} {drive.status === 'Cancelled' ? 'Voided' : 'Offers'})
                  </span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(drive)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                    title="Edit Drive"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>

                  {drive.status !== 'Cancelled' ? (
                    <button
                      onClick={() => {
                        if (window.confirm(`Mark ${drive.companyName} drive as Cancelled? Placements will be voided per business rules.`)) {
                          cancelDrive(drive.id);
                        }
                      }}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Cancel Drive"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateDrive({ ...drive, status: 'Active' });
                      }}
                      className="p-1.5 rounded-md text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                      title="Reactivate Drive"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Drive Modal */}
      <Modal
        isOpen={isAddModalOpen || editingDrive !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingDrive(null);
        }}
        title={editingDrive ? `Edit Drive: ${editingDrive.companyName}` : 'Create Recruitment Drive'}
        subtitle="Configure company details, CTC package, eligibility, and assessment schedule"
        maxWidth="xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Adobe Systems"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Role Designation *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Member of Technical Staff"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Package CTC (LPA) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.packageCtc}
                onChange={(e) => setFormData({ ...formData, packageCtc: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tier
              </label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value as CompanyTier })}
                className="w-full px-2 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Super Dream">Super Dream (&gt;20 LPA)</option>
                <option value="Dream">Dream (15-20 LPA)</option>
                <option value="Core">Core (8-15 LPA)</option>
                <option value="Mass">Mass (&lt;8 LPA)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stipend
              </label>
              <input
                type="text"
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="₹60,000/mo"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Minimum CGPA Cutoff
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.minCgpa}
                onChange={(e) => setFormData({ ...formData, minCgpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Max Allowed Backlogs
              </label>
              <input
                type="number"
                min="0"
                value={formData.maxBacklogs}
                onChange={(e) => setFormData({ ...formData, maxBacklogs: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Eligible Departments
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Computer Science & Engineering',
                'Electronics & Communication Engineering',
                'Information Technology',
              ].map((dept) => {
                const selected = formData.eligibleDepartments.includes(dept as Department);
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDept(dept as Department)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      selected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Drive Date
              </label>
              <input
                type="date"
                value={formData.driveDate}
                onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registration Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DriveStatus })}
                className="w-full px-2 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assessment Rounds (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.rounds}
              onChange={(e) => setFormData({ ...formData, rounds: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Online Assessment, Technical Interview 1, Technical Interview 2, HR Round"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingDrive(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              {editingDrive ? 'Save Drive Updates' : 'Publish Drive'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Drive Applicants Drawer / Modal */}
      {viewingApplicantsDrive && (
        <Modal
          isOpen={true}
          onClose={() => setViewingApplicantsDrive(null)}
          title={`Applicants for ${viewingApplicantsDrive.companyName}`}
          subtitle={`${viewingApplicantsDrive.role} • CTC: ₹${viewingApplicantsDrive.packageCtc} LPA`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Total Applicants: <strong>{driveApplicants.length}</strong></span>
              {viewingApplicantsDrive.status === 'Cancelled' && (
                <span className="text-rose-600 font-bold">Drive is Cancelled</span>
              )}
            </div>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {driveApplicants.map(({ app, student }) => (
                <div key={app.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{student?.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {student?.rollNumber} • {student?.department} • CGPA: {student?.cgpa}
                    </p>
                    {app.feedback && (
                      <p className="text-[11px] text-slate-600 mt-1 italic">
                        Feedback: {app.feedback}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <StatusBadge status={app.status} type="application" size="sm" />
                    <p className="text-[10px] text-slate-400 mt-1">Round: {app.currentRound}</p>
                  </div>
                </div>
              ))}

              {driveApplicants.length === 0 && (
                <p className="text-xs text-slate-400 py-6 text-center italic">
                  No student applications found for this drive yet.
                </p>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewingApplicantsDrive(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
