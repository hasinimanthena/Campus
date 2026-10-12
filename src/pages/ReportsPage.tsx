import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download,
  FileSpreadsheet,
  Printer,
  BarChart3,
  TrendingUp,
  FileText,
  CheckCircle,
  AlertTriangle,
  Building2,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  Building,
  GraduationCap,
  Award,
  Filter,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const ReportsPage: React.FC = () => {
  const { studentsWithRelations, drives, stats, applications } = useApp();
  const [activeTab, setActiveTab] = useState<
    'department' | 'company' | 'unplaced' | 'pending_nodues' | 'student_statement'
  >('department');

  const [exportNotice, setExportNotice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [statementStudentId, setStatementStudentId] = useState(
    studentsWithRelations[0]?.id || ''
  );

  // Departments list
  const departments = [
    'Computer Science & Engineering',
    'Electronics & Communication Engineering',
    'Information Technology',
  ];

  // 1. Department Placement Report Data (Live SQL-equivalent over students & applications)
  const departmentReports = departments.map((dept) => {
    const deptStudents = studentsWithRelations.filter((s) => s.department === dept);
    const eligibleStudents = deptStudents.filter((s) => s.isRegisteredForPlacement !== false).length;
    const uniquePlaced = deptStudents.filter((s) => s.isPlaced).length;
    const totalOffers = deptStudents.reduce((sum, s) => sum + (s.totalOffers || 0), 0);
    const unplaced = eligibleStudents - uniquePlaced;
    const placementRate =
      eligibleStudents > 0
        ? Number(((uniquePlaced / eligibleStudents) * 100).toFixed(1))
        : 0;

    const placedOffers = deptStudents.flatMap((s) =>
      s.applications
        .filter((a) => ['Selected', 'Offer Received', 'Joined'].includes(a.status))
        .map((a) => a.offerCtc || drives.find((d) => d.id === a.driveId)?.packageCtc || 0)
    );
    const avgCtc =
      placedOffers.length > 0
        ? Number((placedOffers.reduce((a, b) => a + b, 0) / placedOffers.length).toFixed(1))
        : 0;
    const highestCtc = placedOffers.length > 0 ? Math.max(...placedOffers) : 0;

    const shortName = dept.includes('Computer')
      ? 'CSE'
      : dept.includes('Electronics')
      ? 'ECE'
      : 'IT';

    return {
      department: shortName,
      fullName: dept,
      totalStudents: deptStudents.length,
      eligibleStudents,
      uniquePlaced,
      totalOffers,
      unplaced,
      placementRate,
      avgCtc,
      highestCtc,
    };
  });

  // 2. Company Outcomes Report Data
  const companyOutcomes = drives.map((drive) => {
    const driveApps = applications.filter((a) => a.driveId === drive.id);
    const registered = driveApps.length;
    const shortlisted = driveApps.filter((a) => a.status === 'Shortlisted').length;
    const interviewed = driveApps.filter((a) => a.status === 'Interview').length;
    const selected = driveApps.filter((a) => a.status === 'Selected').length;
    const offersReceived = driveApps.filter((a) => a.status === 'Offer Received').length;
    const joined = driveApps.filter((a) => a.status === 'Joined').length;
    const rejected = driveApps.filter((a) => a.status === 'Rejected').length;
    const qualifyingHires =
      drive.status === 'Cancelled' ? 0 : selected + offersReceived + joined;

    return {
      id: drive.id,
      companyName: drive.companyName,
      role: drive.role,
      tier: drive.tier,
      packageCtc: drive.packageCtc,
      status: drive.status,
      registered,
      shortlisted,
      interviewed,
      selected,
      offersReceived,
      joined,
      rejected,
      qualifyingHires,
    };
  });

  // 3. Unplaced Students List
  const unplacedStudents = studentsWithRelations.filter(
    (s) => !s.isPlaced && s.isRegisteredForPlacement !== false
  );

  // 4. Pending No-Dues List
  const pendingNoDuesStudents = studentsWithRelations.filter(
    (s) => s.overallNoDuesStatus !== 'Cleared'
  );

  // 5. Selected Student for Statement
  const statementStudent =
    studentsWithRelations.find((s) => s.id === statementStudentId) ||
    studentsWithRelations[0];

  // CSV Export Helper
  const downloadCsv = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportNotice(`Exported successfully: ${filename}`);
    setTimeout(() => setExportNotice(''), 3500);
  };

  const exportDepartmentReport = () => {
    let csv =
      'Department,Total Enrolled,Eligible Students,Unique Placed Students,Total Offers Held,Unplaced Students,Placement % (Placed/Eligible),Avg CTC (LPA),Highest CTC (LPA)\n';
    departmentReports.forEach((d) => {
      csv += `"${d.fullName}",${d.totalStudents},${d.eligibleStudents},${d.uniquePlaced},${d.totalOffers},${d.unplaced},${d.placementRate}%,${d.avgCtc},${d.highestCtc}\n`;
    });
    downloadCsv(`CampusPath_Department_Placement_Report_${new Date().toISOString().split('T')[0]}.csv`, csv);
  };

  const exportCompanyOutcomes = () => {
    let csv =
      'Company Name,Role,Tier,Package CTC (LPA),Drive Status,Registered,Shortlisted,Interview,Selected,Offers Received,Joined,Rejected,Net Valid Placements\n';
    companyOutcomes.forEach((c) => {
      csv += `"${c.companyName}","${c.role}","${c.tier}",${c.packageCtc},"${c.status}",${c.registered},${c.shortlisted},${c.interviewed},${c.selected},${c.offersReceived},${c.joined},${c.rejected},${c.qualifyingHires}\n`;
    });
    downloadCsv(`CampusPath_Company_Outcomes_Report_${new Date().toISOString().split('T')[0]}.csv`, csv);
  };

  const exportUnplacedList = () => {
    let csv = 'Roll Number,Student Name,Department,Email,CGPA,Backlogs,Registration Status\n';
    unplacedStudents.forEach((s) => {
      csv += `"${s.rollNumber}","${s.name}","${s.department}","${s.email}",${s.cgpa},${s.backlogs},"Unplaced"\n`;
    });
    downloadCsv(`CampusPath_Unplaced_Candidates_${new Date().toISOString().split('T')[0]}.csv`, csv);
  };

  const exportPendingNoDues = () => {
    let csv =
      'Roll Number,Student Name,Department,Overall Clearance Status,Blocking Categories,Total Pending Fines (INR)\n';
    pendingNoDuesStudents.forEach((s) => {
      const blocking = s.blockingCategories.join('; ');
      const totalAmount = Object.values(s.noDues).reduce(
        (sum, item) => sum + (item.pendingAmount || 0),
        0
      );
      csv += `"${s.rollNumber}","${s.name}","${s.department}","${s.overallNoDuesStatus}","${blocking}",${totalAmount}\n`;
    });
    downloadCsv(`CampusPath_Pending_NoDues_Report_${new Date().toISOString().split('T')[0]}.csv`, csv);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-navy-900 dark:text-white">
              Institutional Reports & Regulatory Statements (Step 7)
            </h2>
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-gold-50 dark:bg-gold-950/60 text-gold-800 dark:text-gold-400 border border-gold-500/20">
              Live DB Synced
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Department-wise audits, company recruitment funnels, unplaced rosters, and student-wise printable clearance statements.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs print:hidden"
            title="Print Current Statement"
          >
            <Printer className="h-4 w-4" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Subtab Navigation for 5 Required Step 7 Reports */}
      <div className="flex border-b border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 px-4 rounded-xl gap-2 overflow-x-auto text-xs font-bold print:hidden">
        <button
          onClick={() => setActiveTab('department')}
          className={`py-3 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'department'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>1. Department Placement Report</span>
        </button>

        <button
          onClick={() => setActiveTab('company')}
          className={`py-3 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'company'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building className="h-4 w-4" />
          <span>2. Company-wise Outcomes</span>
        </button>

        <button
          onClick={() => setActiveTab('unplaced')}
          className={`py-3 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'unplaced'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>3. Unplaced Candidates ({unplacedStudents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pending_nodues')}
          className={`py-3 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'pending_nodues'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <span>4. Pending No-Dues List ({pendingNoDuesStudents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('student_statement')}
          className={`py-3 px-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'student_statement'
              ? 'border-navy-900 dark:border-gold-500 text-navy-900 dark:text-gold-400 font-extrabold'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>5. Student-wise No-Dues Statement</span>
        </button>
      </div>

      {/* REPORT 1: Department Placement Report */}
      {activeTab === 'department' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">
                  Department Placement Performance Summary
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Accreditation format metrics computed strictly over live student & offer records.
                </p>
              </div>
              <button
                onClick={exportDepartmentReport}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-xs border border-gold-500/20"
              >
                <Download className="h-4 w-4" />
                <span>Export Department Report (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-navy-950/60 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-3 text-center">Enrolled</th>
                    <th className="py-3.5 px-3 text-center">Eligible</th>
                    <th className="py-3.5 px-3 text-center">Unique Placed</th>
                    <th className="py-3.5 px-3 text-center">Total Offers</th>
                    <th className="py-3.5 px-3 text-center">Unplaced</th>
                    <th className="py-3.5 px-3 text-center">Placement % (Visible Denominator)</th>
                    <th className="py-3.5 px-3 text-right">Avg CTC</th>
                    <th className="py-3.5 px-4 text-right">Highest CTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {departmentReports.map((d) => (
                    <tr
                      key={d.department}
                      className="hover:bg-slate-50/70 dark:hover:bg-navy-800/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-navy-900 dark:text-white">
                        {d.fullName}
                      </td>
                      <td className="py-3.5 px-3 text-center font-medium">{d.totalStudents}</td>
                      <td className="py-3.5 px-3 text-center font-semibold text-slate-700 dark:text-slate-300">
                        {d.eligibleStudents}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                        {d.uniquePlaced}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-gold-600 dark:text-gold-400">
                        {d.totalOffers}
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-500 dark:text-slate-400">
                        {d.unplaced}
                      </td>
                      <td className="py-3.5 px-3 text-center font-extrabold text-navy-900 dark:text-gold-400">
                        <span>{d.placementRate}%</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                          ({d.uniquePlaced} of {d.eligibleStudents} eligible)
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-semibold">
                        ₹{d.avgCtc} LPA
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                        ₹{d.highestCtc} LPA
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50/80 dark:bg-navy-950/80 font-bold text-navy-900 dark:text-white border-t border-slate-200 dark:border-navy-800">
                    <td className="py-3.5 px-4">University Total</td>
                    <td className="py-3.5 px-3 text-center">{stats.totalStudents}</td>
                    <td className="py-3.5 px-3 text-center">{stats.eligibleStudents || stats.totalStudents}</td>
                    <td className="py-3.5 px-3 text-center text-emerald-600 dark:text-emerald-400">
                      {stats.uniquePlacedStudents}
                    </td>
                    <td className="py-3.5 px-3 text-center text-gold-600 dark:text-gold-400">
                      {stats.totalOffers}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-600 dark:text-slate-400">
                      {stats.unplacedStudents}
                    </td>
                    <td className="py-3.5 px-3 text-center text-navy-900 dark:text-gold-400">
                      <span>{stats.placementPercentage}%</span>
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                        ({stats.uniquePlacedStudents} of {stats.eligibleStudents || stats.totalStudents} eligible)
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono">₹{stats.averagePackageCtc} LPA</td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{stats.highestPackageCtc} LPA
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT 2: Company-wise Outcomes Report */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">
                  Recruitment Drives & Company Outcomes
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full funnel breakdown from registration to offers. Cancelled drives yield zero qualifying placements.
                </p>
              </div>
              <button
                onClick={exportCompanyOutcomes}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-xs border border-gold-500/20"
              >
                <Download className="h-4 w-4" />
                <span>Export Company Outcomes (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-navy-950/60 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Company & Role</th>
                    <th className="py-3.5 px-3">Tier</th>
                    <th className="py-3.5 px-3">Package CTC</th>
                    <th className="py-3.5 px-3">Drive Status</th>
                    <th className="py-3.5 px-2 text-center">Reg.</th>
                    <th className="py-3.5 px-2 text-center">Short.</th>
                    <th className="py-3.5 px-2 text-center">Intv.</th>
                    <th className="py-3.5 px-2 text-center">Select</th>
                    <th className="py-3.5 px-2 text-center">Offers</th>
                    <th className="py-3.5 px-2 text-center">Joined</th>
                    <th className="py-3.5 px-2 text-center">Reject</th>
                    <th className="py-3.5 px-4 text-center">Valid Placements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {companyOutcomes.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-navy-800/60 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-navy-900 dark:text-white block">
                          {c.companyName}
                        </span>
                        <span className="text-[11px] text-slate-400">{c.role}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                          {c.tier}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{c.packageCtc} LPA
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'Cancelled'
                              ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                              : c.status === 'Completed'
                              ? 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-center">{c.registered}</td>
                      <td className="py-3.5 px-2 text-center">{c.shortlisted}</td>
                      <td className="py-3.5 px-2 text-center">{c.interviewed}</td>
                      <td className="py-3.5 px-2 text-center font-semibold">{c.selected}</td>
                      <td className="py-3.5 px-2 text-center font-semibold">{c.offersReceived}</td>
                      <td className="py-3.5 px-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                        {c.joined}
                      </td>
                      <td className="py-3.5 px-2 text-center text-slate-400">{c.rejected}</td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-navy-900 dark:text-gold-400 text-sm">
                        {c.qualifyingHires}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT 3: Unplaced Candidates Roster */}
      {activeTab === 'unplaced' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">
                  Unplaced Candidates Roster ({unplacedStudents.length} Students)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Students actively eligible for upcoming recruitment drives and remediation counseling.
                </p>
              </div>
              <button
                onClick={exportUnplacedList}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-xs border border-gold-500/20"
              >
                <Download className="h-4 w-4" />
                <span>Export Unplaced Roster (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-navy-950/60 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-3">Roll Number</th>
                    <th className="py-3.5 px-3">Department</th>
                    <th className="py-3.5 px-3 text-center">CGPA</th>
                    <th className="py-3.5 px-3 text-center">Backlogs</th>
                    <th className="py-3.5 px-3">Applications Submitted</th>
                    <th className="py-3.5 px-4 text-center">Placement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {unplacedStudents.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-navy-800/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-navy-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-500">{s.rollNumber}</td>
                      <td className="py-3.5 px-3">{s.department}</td>
                      <td className="py-3.5 px-3 text-center font-bold text-navy-900 dark:text-white">
                        {s.cgpa}
                      </td>
                      <td className="py-3.5 px-3 text-center font-medium">
                        <span
                          className={`px-2 py-0.5 rounded-md ${
                            s.backlogs > 0
                              ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}
                        >
                          {s.backlogs}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {s.applications.length > 0 ? (
                          <span className="text-slate-600 dark:text-slate-300">
                            {s.applications.length} drive(s) applied
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 italic">
                            No active applications
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                          Unplaced
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT 4: Pending No-Dues List */}
      {activeTab === 'pending_nodues' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">
                  Pending No-Dues Audit & Defaulters List ({pendingNoDuesStudents.length} Students)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Students with incomplete clearance status. Lists blocking departments and pending amounts.
                </p>
              </div>
              <button
                onClick={exportPendingNoDues}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-xs border border-gold-500/20"
              >
                <Download className="h-4 w-4" />
                <span>Export Defaulters CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-navy-950/60 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-navy-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-3">Department</th>
                    <th className="py-3.5 px-3">Overall Clearance Status</th>
                    <th className="py-3.5 px-3">Blocking Categories</th>
                    <th className="py-3.5 px-3 text-right">Outstanding Fines</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                  {pendingNoDuesStudents.map((s) => {
                    const totalDues = Object.values(s.noDues).reduce(
                      (sum, item) => sum + (item.pendingAmount || 0),
                      0
                    );
                    return (
                      <tr
                        key={s.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-navy-800/60 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-navy-900 dark:text-white block">
                            {s.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {s.rollNumber}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">{s.department}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                            Incomplete
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {s.blockingCategories.map((cat) => (
                              <span
                                key={cat}
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300/40"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                          {totalDues > 0 ? `₹${totalDues.toLocaleString('en-IN')}` : 'None (Audit Pending)'}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => {
                              setStatementStudentId(s.id);
                              setActiveTab('student_statement');
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-slate-300 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-800 text-navy-900 dark:text-gold-400"
                          >
                            View Statement
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT 5: Student-wise Printable No-Dues Statement */}
      {activeTab === 'student_statement' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs print:border-none print:shadow-none">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 print:hidden">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Student:
                </label>
                <select
                  value={statementStudentId}
                  onChange={(e) => setStatementStudentId(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  {studentsWithRelations.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNumber}) — {s.department} [{s.overallNoDuesStatus}]
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-xs"
              >
                <Printer className="h-4 w-4" />
                <span>Print Student Statement</span>
              </button>
            </div>

            {/* Printable Institutional Clearance Statement Document */}
            <div className="p-8 border-2 border-slate-300 rounded-2xl bg-white text-slate-900 space-y-6 shadow-sm">
              <div className="text-center pb-4 border-b-2 border-slate-900">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                    CP
                  </div>
                </div>
                <h3 className="text-xl font-extrabold uppercase tracking-wide text-slate-900">
                  Apex Institute of Technology
                </h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                  Office of Academic Examinations & Training & Placement Cell
                </p>
                <div className="inline-block mt-3 px-4 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-slate-100 text-slate-800">
                  Official Institutional Clearance & Placement Statement
                </div>
              </div>

              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Candidate Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{statementStudent.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Roll Number:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {statementStudent.rollNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Department:</span>
                  <span className="font-semibold text-slate-900">
                    {statementStudent.department}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Batch Year:</span>
                  <span className="font-semibold text-slate-900">
                    Class of {statementStudent.batchYear}
                  </span>
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-600 block">
                    Institutional Audit Status:
                  </span>
                  <span
                    className={`text-base font-extrabold ${
                      statementStudent.overallNoDuesStatus === 'Cleared'
                        ? 'text-emerald-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {statementStudent.overallNoDuesStatus === 'Cleared'
                      ? '100% Fully Cleared — Eligible for Convocation & Degree'
                      : `Incomplete Clearance (Blocking: ${statementStudent.blockingCategories.join(
                          ', '
                        )})`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase text-slate-600 block">
                    Placement Status:
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {statementStudent.isPlaced
                      ? `Placed (${statementStudent.totalOffers} Offer${
                          statementStudent.totalOffers > 1 ? 's' : ''
                        })`
                      : 'Unplaced'}
                  </span>
                </div>
              </div>

              {/* 6 Categories Clearance Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <div className="grid grid-cols-4 bg-slate-100 p-2.5 font-bold text-slate-700">
                  <span>Administrative Section</span>
                  <span>Clearance Status</span>
                  <span>Signatory / Remarks</span>
                  <th className="text-right">Outstanding Fee</th>
                </div>
                {Object.values(statementStudent.noDues).map((item) => (
                  <div
                    key={item.category}
                    className="grid grid-cols-4 p-2.5 border-t border-slate-100 items-center"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{item.categoryLabel}</span>
                      <span className="block text-[10px] text-slate-500 font-medium">
                        {item.departmentInCharge}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          item.status === 'Cleared' || item.status === 'Not Applicable'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="text-slate-600 italic text-[11px]">
                      {item.remarks || 'No remarks recorded'}
                    </div>
                    <div className="text-right font-mono font-bold">
                      {item.pendingAmount > 0 ? `₹${item.pendingAmount}` : 'Nil'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Signatures */}
              <div className="pt-8 flex items-end justify-between border-t border-slate-200 text-xs">
                <div>
                  <p className="font-mono text-[10px] text-slate-500">
                    CERTIFICATE ID: CP-ND-STMT-{statementStudent.rollNumber}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Digitally generated from live university database
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">Dr. Rajeshwari Raman</p>
                  <p className="text-[11px] text-slate-500">
                    Director, Training & Placement Cell
                  </p>
                  <div className="mt-1 h-0.5 w-36 bg-slate-400 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
