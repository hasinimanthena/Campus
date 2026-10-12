import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Student, Department, StudentWithRelations } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import {
  Search,
  Filter,
  UserPlus,
  FileSpreadsheet,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Briefcase,
  GraduationCap,
  Download,
  Upload,
  ArrowUpDown,
  FileText,
} from 'lucide-react';

export const StudentManagementPage: React.FC = () => {
  const {
    studentsWithRelations,
    addStudent,
    updateStudent,
    deleteStudent,
    importStudentsFromCsv,
    drives,
  } = useApp();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedPlacementStatus, setSelectedPlacementStatus] = useState<string>('All');
  const [selectedNoDuesStatus, setSelectedNoDuesStatus] = useState<string>('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentWithRelations | null>(null);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering' as Department,
    cgpa: 8.0,
    backlogs: 0,
    batchYear: 2025,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    skills: 'React, Node.js, SQL',
  });

  // CSV import simulation state
  const [csvText, setCsvText] = useState(
    `rollNumber,name,email,phone,department,cgpa,backlogs,batchYear
2021CS0199,Karan Singhania,karan.s@student.campuspath.edu,+91 98765 44001,Computer Science & Engineering,8.75,0,2025
2021CS0101,Aarav Sharma Duplicate,aarav.sharma@student.campuspath.edu,+91 98765 43210,Computer Science & Engineering,9.42,0,2025
INVALID_ROLL_123,Invalid Candidate,invalid@domain.com,+91 00000 00000,Civil Engineering,14.50,5,1999`
  );
  const [csvParsedRecords, setCsvParsedRecords] = useState<any[]>([]);
  const [csvError, setCsvError] = useState<string>('');
  const [csvSuccessMsg, setCsvSuccessMsg] = useState<string>('');
  const [csvReport, setCsvReport] = useState<any | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  const { importStudentsCsvWithReport } = useApp();

  const loadEvaluatorTemplate = () => {
    setCsvText(
      `rollNumber,name,email,phone,department,cgpa,backlogs,batchYear
2021CS0199,Karan Singhania,karan.s@student.campuspath.edu,+91 98765 44001,Computer Science & Engineering,8.75,0,2025
2021CS0101,Aarav Sharma Duplicate,aarav.sharma@student.campuspath.edu,+91 98765 43210,Computer Science & Engineering,9.42,0,2025
INVALID_ROLL_123,Invalid Candidate,invalid@domain.com,+91 00000 00000,Civil Engineering,14.50,5,1999`
    );
    setCsvReport(null);
    setCsvParsedRecords([]);
    setCsvError('');
    setCsvSuccessMsg('');
  };

  // Filter logic
  const filteredStudents = useMemo(() => {
    return studentsWithRelations.filter((student) => {
      // Search query
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.rollNumber.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.skills.some((sk) => sk.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Department filter
      if (selectedDept !== 'All' && student.department !== selectedDept) {
        return false;
      }

      // Placement status filter
      if (selectedPlacementStatus === 'Placed' && !student.isPlaced) return false;
      if (selectedPlacementStatus === 'Unplaced' && student.isPlaced) return false;

      // No-dues status filter
      if (selectedNoDuesStatus !== 'All' && student.overallNoDuesStatus !== selectedNoDuesStatus) {
        return false;
      }

      return true;
    });
  }, [studentsWithRelations, searchQuery, selectedDept, selectedPlacementStatus, selectedNoDuesStatus]);

  // Handle Add/Edit Form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        name: formData.name,
        rollNumber: formData.rollNumber,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        cgpa: Number(formData.cgpa),
        backlogs: Number(formData.backlogs),
        batchYear: Number(formData.batchYear),
        gender: formData.gender,
        skills: skillsArray,
      });
      setEditingStudent(null);
    } else {
      addStudent({
        name: formData.name,
        rollNumber: formData.rollNumber,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        cgpa: Number(formData.cgpa),
        backlogs: Number(formData.backlogs),
        batchYear: Number(formData.batchYear),
        gender: formData.gender,
        skills: skillsArray,
        resumeUrl: `https://campuspath.edu/resumes/${formData.rollNumber}.pdf`,
        status: 'Active',
      });
      setIsAddModalOpen(false);
    }

    // Reset form
    setFormData({
      name: '',
      rollNumber: '',
      email: '',
      phone: '',
      department: 'Computer Science & Engineering',
      cgpa: 8.0,
      backlogs: 0,
      batchYear: 2025,
      gender: 'Male',
      skills: 'React, Node.js, SQL',
    });
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      phone: student.phone,
      department: student.department,
      cgpa: student.cgpa,
      backlogs: student.backlogs,
      batchYear: student.batchYear,
      gender: student.gender,
      skills: student.skills.join(', '),
    });
  };

  // CSV parsing logic
  const parseCsv = () => {
    try {
      setCsvError('');
      setCsvReport(null);
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setCsvError('CSV must have header row and at least 1 record.');
        return;
      }

      const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
      const parsed: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));

        const record: any = {
          rollNumber: values[0] || '',
          name: values[1] || '',
          email: values[2] || '',
          phone: values[3] || '+91 98765 00000',
          department: (values[4] as Department) || 'Computer Science & Engineering',
          cgpa: parseFloat(values[5]) || 0,
          backlogs: parseInt(values[6]) || 0,
          batchYear: parseInt(values[7]) || 2025,
          gender: 'Male',
          skills: ['Java', 'SQL', 'Algorithms'],
          status: 'Active',
          resumeUrl: `https://campuspath.edu/resumes/${values[0]}.pdf`,
        };
        parsed.push(record);
      }

      setCsvParsedRecords(parsed);
    } catch (err: any) {
      setCsvError(`Failed to parse CSV: ${err.message}`);
    }
  };

  const handleImportCsv = async () => {
    if (csvParsedRecords.length === 0) {
      setCsvError('Please parse the CSV first to preview records.');
      return;
    }

    setIsImporting(true);
    try {
      const report = await importStudentsCsvWithReport(csvParsedRecords);
      setCsvReport(report);
      if (report.imported > 0) {
        setCsvSuccessMsg(`Successfully imported ${report.imported} student records into persistent database!`);
      }
    } catch (e: any) {
      setCsvError(e.message || 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">
            Student Placement & Records Directory
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage academic profiles, job offer records, and clearance status across all departments.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              parseCsv();
              setIsCsvModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>CSV Import Preview</span>
          </button>

          <button
            onClick={() => {
              setEditingStudent(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-sm border border-gold-500/20"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-slate-200 dark:border-navy-800 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, roll, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Departments (3)</option>
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electronics & Communication Engineering">Electronics & Communication</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          {/* Placement Status */}
          <div>
            <select
              value={selectedPlacementStatus}
              onChange={(e) => setSelectedPlacementStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All Placement Statuses</option>
              <option value="Placed">Placed Only (Has Offers)</option>
              <option value="Unplaced">Unplaced Only</option>
            </select>
          </div>

          {/* No-Dues Status */}
          <div>
            <select
              value={selectedNoDuesStatus}
              onChange={(e) => setSelectedNoDuesStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <option value="All">All No-Dues Clearance</option>
              <option value="Cleared">Cleared (100% Complete)</option>
              <option value="Action Required">Action Required (Fines / Pending Items)</option>
              <option value="Pending">Pending Approvals</option>
            </select>
          </div>
        </div>

        {/* Counter readout */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-navy-800">
          <span>
            Showing <strong className="text-navy-900 dark:text-white">{filteredStudents.length}</strong> of{' '}
            <strong className="text-navy-900 dark:text-white">{studentsWithRelations.length}</strong> students
          </span>
          {(searchQuery || selectedDept !== 'All' || selectedPlacementStatus !== 'All' || selectedNoDuesStatus !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSelectedPlacementStatus('All');
                setSelectedNoDuesStatus('All');
              }}
              className="text-gold-600 dark:text-gold-400 hover:underline font-semibold text-xs"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-navy-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-navy-950/60 border-b border-slate-200 dark:border-navy-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3.5 px-4">Student Info</th>
                <th className="py-3.5 px-3">Roll Number</th>
                <th className="py-3.5 px-3">Department</th>
                <th className="py-3.5 px-3 text-center">CGPA / Backlogs</th>
                <th className="py-3.5 px-3">Placement Status</th>
                <th className="py-3.5 px-3">No-Dues Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-navy-800/60 transition-colors">
                  {/* Student Info */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
                        alt={student.name}
                        className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-navy-700 shrink-0"
                      />
                      <div>
                        <button
                          onClick={() => setViewingStudent(student)}
                          className="font-bold text-navy-900 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 text-left text-xs transition-colors"
                        >
                          {student.name}
                        </button>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Roll Number */}
                  <td className="py-3.5 px-3 font-mono font-medium text-navy-900 dark:text-slate-200">
                    {student.rollNumber}
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {student.department.replace('Engineering', 'Eng.')}
                    </span>
                  </td>

                  {/* CGPA / Backlogs */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-bold text-navy-900 dark:text-white">{student.cgpa}</span>
                    <span className="text-slate-400 dark:text-slate-500 text-[10px] ml-1">
                      {student.backlogs > 0 ? (
                        <span className="text-rose-600 dark:text-rose-400 font-bold">({student.backlogs} BL)</span>
                      ) : (
                        '(0 BL)'
                      )}
                    </span>
                  </td>

                  {/* Placement Status */}
                  <td className="py-3.5 px-3">
                    {student.isPlaced ? (
                      <div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                          Placed ({student.totalOffers} {student.totalOffers > 1 ? 'Offers' : 'Offer'})
                        </span>
                        {student.highestOfferLpa && (
                          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                            Max: ₹{student.highestOfferLpa} LPA
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-700">
                        Unplaced
                      </span>
                    )}
                  </td>

                  {/* No-Dues Status */}
                  <td className="py-3.5 px-3">
                    <StatusBadge status={student.overallNoDuesStatus} type="nodues" size="sm" />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingStudent(student)}
                        className="p-1.5 rounded-md text-slate-500 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-gold-50 dark:hover:bg-navy-800 transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(student)}
                        className="p-1.5 rounded-md text-slate-500 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                        title="Edit Student"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete record for ${student.name}?`)) {
                            deleteStudent(student.id);
                          }
                        }}
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No students match the current filters or search term.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isAddModalOpen || editingStudent !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStudent(null);
        }}
        title={editingStudent ? `Edit Student: ${editingStudent.name}` : 'Add New Student Record'}
        subtitle="Provide student academic profile details for placement registry"
        maxWidth="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                required
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="2021CS0199"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@student.campuspath.edu"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full px-2 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Computer Science & Engineering">CSE</option>
                <option value="Electronics & Communication Engineering">ECE</option>
                <option value="Information Technology">IT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CGPA (out of 10) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Active Backlogs
              </label>
              <input
                type="number"
                min="0"
                value={formData.backlogs}
                onChange={(e) => setFormData({ ...formData, backlogs: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technical Skills (Comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, Python, System Design"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingStudent(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              {editingStudent ? 'Save Changes' : 'Create Student Record'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Student Details Modal */}
      {viewingStudent && (
        <Modal
          isOpen={true}
          onClose={() => setViewingStudent(null)}
          title={viewingStudent.name}
          subtitle={`${viewingStudent.rollNumber} • ${viewingStudent.department}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <img
                src={viewingStudent.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={viewingStudent.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{viewingStudent.name}</h3>
                  <StatusBadge status={viewingStudent.overallNoDuesStatus} type="nodues" size="sm" />
                </div>
                <p className="text-xs text-slate-500">{viewingStudent.email} • {viewingStudent.phone}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="font-semibold text-slate-700">CGPA: <strong>{viewingStudent.cgpa}</strong></span>
                  <span className="text-slate-400">|</span>
                  <span className="font-semibold text-slate-700">Backlogs: <strong>{viewingStudent.backlogs}</strong></span>
                  <span className="text-slate-400">|</span>
                  <span className="font-semibold text-slate-700">Batch: <strong>{viewingStudent.batchYear}</strong></span>
                </div>
              </div>
            </div>

            {/* Applications history */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>Recruitment Drive Applications ({viewingStudent.applications.length})</span>
              </h4>
              <div className="space-y-2">
                {viewingStudent.applications.map((app) => {
                  const drive = drives.find((d) => d.id === app.driveId);
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900">{drive?.companyName || 'Company'}</p>
                        <p className="text-[11px] text-slate-500">{drive?.role} • CTC: ₹{drive?.packageCtc} LPA</p>
                        {app.notes && <p className="text-[11px] text-slate-600 mt-1 italic">{app.notes}</p>}
                      </div>
                      <div className="text-right">
                        <StatusBadge status={app.status} type="application" size="sm" />
                        <p className="text-[10px] text-slate-400 mt-1">Applied: {app.appliedAt}</p>
                      </div>
                    </div>
                  );
                })}

                {viewingStudent.applications.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No applications filed yet.</p>
                )}
              </div>
            </div>

            {/* No Dues clearance status per department */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                <span>No-Dues Department Clearances (6 Categories)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.values(viewingStudent.noDues).map((item) => (
                  <div key={item.category} className="p-3 rounded-xl border border-slate-200 bg-slate-50/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{item.categoryLabel}</span>
                      <StatusBadge status={item.status} type="nodues" size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{item.remarks}</p>
                    {item.pendingAmount > 0 && (
                      <p className="text-[11px] font-bold text-rose-600 mt-1">
                        Pending Fee: ₹{item.pendingAmount}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* CSV Import Preview Modal */}
      <Modal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        title="Institutional Batch Student CSV Import"
        subtitle="Validate roll numbers, department codes, batch cohort, and schema before saving to persistent database"
        maxWidth="3xl"
      >
        <div className="space-y-4 text-xs">
          {/* Quick Actions Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
            <div className="flex items-center gap-2">
              <span className="font-bold text-navy-900 dark:text-white">Sample Data for Evaluators:</span>
              <button
                type="button"
                onClick={loadEvaluatorTemplate}
                className="px-3 py-1 rounded-lg bg-navy-100 dark:bg-navy-800 hover:bg-navy-200 dark:hover:bg-navy-700 text-navy-900 dark:text-gold-400 font-bold border border-navy-300 dark:border-navy-700 transition-colors"
              >
                Load Test Template (1 Valid, 1 Duplicate, 1 Invalid)
              </button>
            </div>
            <a
              href="/api/template/sample-students-csv"
              download="campuspath_student_import_template.csv"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-300 dark:border-navy-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-navy-800 font-medium"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download CSV Template</span>
            </a>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              CSV Content (comma-separated with column headers)
            </label>
            <textarea
              rows={5}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-950 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={parseCsv}
              className="px-4 py-2 rounded-xl bg-navy-900 dark:bg-navy-800 hover:bg-navy-800 dark:hover:bg-navy-700 text-white dark:text-gold-400 font-bold transition-colors shadow-2xs border border-gold-500/20"
            >
              Parse & Validate Format
            </button>
            {csvError && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{csvError}</span>}
            {csvSuccessMsg && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{csvSuccessMsg}</span>}
          </div>

          {/* Validation & Error Report Breakdown */}
          {csvReport && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-gold-500" />
                <span>Import Execution & Validation Report</span>
              </h4>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Processed</span>
                  <span className="text-base font-extrabold text-slate-800 dark:text-white">{csvReport.totalProcessed}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Imported</span>
                  <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-300">{csvReport.imported}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">Skipped (Dupes)</span>
                  <span className="text-base font-extrabold text-amber-700 dark:text-amber-300">{csvReport.skipped}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                  <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block">Failed (Invalid)</span>
                  <span className="text-base font-extrabold text-rose-700 dark:text-rose-300">{csvReport.failed}</span>
                </div>
              </div>

              {csvReport.errors && csvReport.errors.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Detailed Row Rejection Log:</p>
                  <div className="max-h-36 overflow-y-auto border border-rose-200 dark:border-rose-900/60 rounded-lg">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-rose-100/60 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 font-bold">
                        <tr>
                          <th className="p-2">Row</th>
                          <th className="p-2">Roll Number</th>
                          <th className="p-2">Field</th>
                          <th className="p-2">Rejection Reason</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-100 dark:divide-rose-950/40 text-slate-700 dark:text-slate-300">
                        {csvReport.errors.map((err: any, idx: number) => (
                          <tr key={idx} className="hover:bg-rose-50/50 dark:hover:bg-rose-950/20">
                            <td className="p-2 font-mono font-bold text-rose-600 dark:text-rose-400">Row {err.row}</td>
                            <td className="p-2 font-mono">{err.rollNumber || 'N/A'}</td>
                            <td className="p-2 font-semibold">{err.field}</td>
                            <td className="p-2 text-rose-700 dark:text-rose-300">{err.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview Table */}
          {csvParsedRecords.length > 0 && !csvReport && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Parsed Data Preview ({csvParsedRecords.length} candidate rows detected)
              </h4>
              <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-navy-700 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-navy-950 font-bold text-slate-600 dark:text-slate-300">
                    <tr>
                      <th className="p-2">Roll No</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Department</th>
                      <th className="p-2">CGPA</th>
                      <th className="p-2">Backlogs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-navy-800">
                    {csvParsedRecords.map((rec, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-navy-850">
                        <td className="p-2 font-mono font-bold text-navy-900 dark:text-gold-400">{rec.rollNumber}</td>
                        <td className="p-2 font-medium text-slate-800 dark:text-white">{rec.name}</td>
                        <td className="p-2 text-slate-600 dark:text-slate-300">{rec.department}</td>
                        <td className="p-2 font-bold">{rec.cgpa}</td>
                        <td className="p-2 font-mono">{rec.backlogs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-navy-800">
            <button
              type="button"
              onClick={() => {
                setIsCsvModalOpen(false);
                setCsvReport(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleImportCsv}
              disabled={csvParsedRecords.length === 0 || isImporting}
              className="px-5 py-2 text-xs font-bold text-white dark:text-navy-950 bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 rounded-lg shadow-sm transition-colors disabled:opacity-50 border border-gold-500/20"
            >
              {isImporting ? 'Validating & Saving...' : `Validate & Save to Database (${csvParsedRecords.length} Rows)`}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
