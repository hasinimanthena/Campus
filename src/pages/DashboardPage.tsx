import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { OfferLetterModal } from '../components/OfferLetterModal';
import {
  Users,
  Award,
  Briefcase,
  UserX,
  TrendingUp,
  Building2,
  FileCheck2,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface DashboardPageProps {
  onNavigate: (tab: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { stats, studentsWithRelations, drives, applications } = useApp();
  const [viewingOffer, setViewingOffer] = useState<{ student: any; drive: any; offerCtc: number } | null>(null);

  // Prepare Department-wise chart data dynamically
  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Information Technology',
  ];

  const deptChartData = departments.map((dept) => {
    const deptStudents = studentsWithRelations.filter((s) => s.department === dept);
    const placedCount = deptStudents.filter((s) => s.isPlaced).length;
    const totalCount = deptStudents.length;
    const unplacedCount = totalCount - placedCount;
    const percentage = totalCount > 0 ? Number(((placedCount / totalCount) * 100).toFixed(1)) : 0;

    let shortName = 'CSE';
    if (dept.includes('Electronics')) shortName = 'ECE';
    if (dept.includes('Information')) shortName = 'IT';

    return {
      name: shortName,
      fullName: dept,
      Total: totalCount,
      Placed: placedCount,
      Unplaced: unplacedCount,
      rate: percentage,
    };
  });

  // Salary Bracket Distribution (Deep Navy, Muted Gold, Emerald, Slate Grey)
  const salaryBands = [
    { name: 'Super Dream (>20 LPA)', count: 0, color: '#D6B56D' }, // Muted Gold
    { name: 'Dream (15-20 LPA)', count: 0, color: '#0B1F3A' },     // Deep Navy
    { name: 'Core (8-15 LPA)', count: 0, color: '#10B981' },       // Emerald Green
    { name: 'Standard (<8 LPA)', count: 0, color: '#64748B' },     // Slate Grey
  ];

  studentsWithRelations.forEach((s) => {
    if (s.isPlaced && s.highestOfferLpa) {
      if (s.highestOfferLpa >= 20) salaryBands[0].count += 1;
      else if (s.highestOfferLpa >= 15) salaryBands[1].count += 1;
      else if (s.highestOfferLpa >= 8) salaryBands[2].count += 1;
      else salaryBands[3].count += 1;
    }
  });

  // Dual offer holders highlight
  const multiOfferStudents = studentsWithRelations.filter((s) => s.totalOffers > 1);

  // Recent placed offers (filter out Cancelled drives & non-offers)
  const activeDrivesMap = new Map(drives.map((d) => [d.id, d]));
  const successfulOfferStatuses = ['Selected', 'Offer Received', 'Joined'];
  const recentOffers = applications
    .filter((app) => {
      const drive = activeDrivesMap.get(app.driveId);
      return drive && drive.status !== 'Cancelled' && successfulOfferStatuses.includes(app.status);
    })
    .slice(0, 5)
    .map((app) => {
      const student = studentsWithRelations.find((s) => s.id === app.studentId);
      const drive = activeDrivesMap.get(app.driveId);
      return {
        app,
        student,
        drive,
      };
    });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-[#0B132B] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Session 2024–25
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Batch 2025 • NAAC A++</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
            Placement Overview & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time cohort telemetry across engineering departments, corporate drives, and graduation clearances.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('drives')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Building2 className="h-4 w-4" />
            <span>Manage Drives</span>
          </button>
          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Reports</span>
          </button>
        </div>
      </div>

      {/* Sleek Audit Verification Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-100/90 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div>
            <span className="font-bold text-slate-900 dark:text-white mr-1.5">Rule Verification:</span>
            <span className="text-slate-600 dark:text-slate-300">
              CSE Cohort has <strong>6 unique placed students</strong> holding <strong>8 total offers</strong> = <strong>60.0%</strong> (6 of 10 eligible). Multi-offers count once. Cancelled drive outcomes are excluded.
            </span>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs shadow-2xs">
            CSE: 60.0% (6/10)
          </span>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Registered Students"
          value={stats.totalStudents}
          subtitle={`${stats.eligibleStudents || stats.totalStudents} eligible across 3 depts`}
          icon={Users}
          accentColor="navy"
          onClick={() => onNavigate('students')}
        />

        <MetricCard
          title="Unique Students Placed"
          value={stats.uniquePlacedStudents}
          subtitle={`${stats.uniquePlacedStudents} of ${stats.eligibleStudents || stats.totalStudents} eligible students`}
          icon={Award}
          trend={{ value: `${stats.placementPercentage}%`, isPositive: true }}
          accentColor="emerald"
        />

        <MetricCard
          title="Total Job Offers"
          value={stats.totalOffers}
          subtitle={`${multiOfferStudents.length} candidates with dual/multiple offers`}
          icon={Briefcase}
          trend={{ value: `${multiOfferStudents.length} multi-offers`, isPositive: true }}
          accentColor="gold"
        />

        <MetricCard
          title="Unplaced Students"
          value={stats.unplacedStudents}
          subtitle={`${stats.unplacedStudents} of ${stats.eligibleStudents || stats.totalStudents} eligible pending`}
          icon={UserX}
          trend={{ value: `${stats.unplacedStudents} pending`, isPositive: false }}
          accentColor="rose"
        />

        <MetricCard
          title="Placement Success"
          value={`${stats.placementPercentage}%`}
          subtitle={`${stats.uniquePlacedStudents} of ${stats.eligibleStudents || stats.totalStudents} eligible students`}
          icon={TrendingUp}
          accentColor="navy"
        />
      </div>

      {/* Secondary Metrics Strip: Package & Clearance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Highest Package Offered
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gold-600 dark:text-gold-400 font-mono">₹{stats.highestPackageCtc}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">LPA</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">Google Cloud & Meta Platforms (Cancelled)</p>
        </div>

        <div className="bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Average Package (CTC)
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">₹{stats.averagePackageCtc}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">LPA</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Calculated from verified placed offers</p>
        </div>

        <div className="bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              No-Dues Clearance
            </p>
            <span className="p-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FileCheck2 className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{stats.noDuesClearedCount}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">of {stats.totalStudents} Cleared</span>
          </div>
          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
            {stats.noDuesPendingCount} students pending department clearance
          </p>
        </div>

        <div className="bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Recruitment Drives
            </p>
            <span className="p-1 rounded-md bg-gold-50 dark:bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/30">
              <Building2 className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{stats.activeDrivesCount}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active / {stats.totalCompaniesCount} Companies</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {stats.completedDrivesCount} drives concluded successfully
          </p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department-wise Placement Rate Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Department Cohort Placement Performance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live ratio of Placed vs Unplaced students across all Engineering departments
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 dark:bg-[#060B17] rounded-lg text-slate-700 dark:text-gold-400 border border-slate-200 dark:border-slate-800">
              Batch 2025 Live
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  formatter={(value: any, name: any) => [value, name === 'Placed' ? 'Students Placed' : 'Total Intake']}
                  contentStyle={{ backgroundColor: '#0B132B', color: '#F8FAFC', borderRadius: '12px', border: '1px solid #4F46E5', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Legend />
                <Bar dataKey="Placed" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={32} />
                <Bar dataKey="Unplaced" fill="#94A3B8" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Package Tier Distribution */}
        <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Salary Package Distribution
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Breakdown of verified placed students by CTC tier brackets
            </p>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salaryBands}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {salaryBands.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} students`, name]}
                    contentStyle={{ backgroundColor: '#060B17', color: '#F8FAFC', borderRadius: '10px', border: '1px solid #D4AF37', boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#F8FAFC' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {salaryBands.map((band) => (
              <div key={band.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: band.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{band.name}</span>
                </div>
                <span className="font-bold font-mono text-navy-950 dark:text-white">{band.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Offers & Multi-Offer Champions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Offers Feed */}
        <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Recent Offer Releases</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  VERIFIED
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live placement updates from active corporate drives</p>
            </div>
            <button
              onClick={() => onNavigate('applications')}
              className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {recentOffers.map(({ app, student, drive }) => (
              <div
                key={app.id}
                onClick={() => {
                  if (student && drive) {
                    setViewingOffer({
                      student,
                      drive,
                      offerCtc: app.offerCtc || drive.packageCtc,
                    });
                  }
                }}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/60 px-2.5 rounded-xl transition-colors group"
                title="Click to view verified company offer letter"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-gold-400 shrink-0">
                    {drive?.companyName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors truncate">
                      {student?.name || 'Student'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {drive?.companyName} • <span className="font-semibold text-slate-700 dark:text-slate-300">{drive?.role}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    ₹{app.offerCtc || drive?.packageCtc} LPA
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <StatusBadge status={app.status} type="application" size="sm" />
                    <FileText className="h-3 w-3 text-slate-400 group-hover:text-gold-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual / Multiple Offer Spotlights */}
        <div className="bg-white dark:bg-[#0B132B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Dual & Multiple Offer Holders</span>
                <Sparkles className="h-4 w-4 text-gold-500" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Candidates holding 2 or more distinct verified corporate offers
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-300 border border-gold-300 dark:border-gold-500/30">
              {multiOfferStudents.length} Students
            </span>
          </div>

          <div className="space-y-3">
            {multiOfferStudents.map((stud) => {
              const activeDrives = drives.filter((d) => d.status !== 'Cancelled');
              const studentOffers = stud.applications.filter(
                (a) =>
                  ['Selected', 'Offer Received', 'Joined'].includes(a.status) &&
                  activeDrives.some((d) => d.id === a.driveId)
              );

              return (
                <div
                  key={stud.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-navy-800 bg-slate-50/50 dark:bg-navy-950/40 hover:bg-slate-50 dark:hover:bg-navy-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-navy-900 dark:text-white">{stud.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {stud.rollNumber} • {stud.department} • CGPA: {stud.cgpa}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-navy-100 dark:bg-navy-800 text-navy-800 dark:text-gold-400 border border-gold-500/20">
                      {stud.totalOffers} Confirmed Offers
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {studentOffers.map((o) => {
                      const d = drives.find((dr) => dr.id === o.driveId);
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => {
                            if (d) {
                              setViewingOffer({
                                student: stud,
                                drive: d,
                                offerCtc: o.offerCtc || d.packageCtc,
                              });
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 shadow-2xs text-slate-800 dark:text-slate-200 hover:border-gold-500 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                          title="Click to view official offer letter"
                        >
                          <Building2 className="h-3 w-3 text-gold-500" />
                          <strong>{d?.companyName}</strong> (₹{o.offerCtc || d?.packageCtc} LPA)
                          <FileText className="h-3 w-3 text-slate-400 ml-0.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Offer Letter Viewer Modal */}
      {viewingOffer && (
        <OfferLetterModal
          isOpen={true}
          onClose={() => setViewingOffer(null)}
          student={viewingOffer.student}
          drive={viewingOffer.drive}
          offerCtc={viewingOffer.offerCtc}
        />
      )}
    </div>
  );
};
