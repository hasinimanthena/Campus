import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Student,
  RecruitmentDrive,
  Application,
  ApplicationHistory,
  NoDuesCategory,
  NoDuesItem,
  NoDuesCategoryConfig,
  User,
  StudentWithRelations,
  PlacementStats,
  ApplicationStatus,
  NoDuesStatus,
  ToastMessage,
  CsvImportReport,
} from '../types';
import { api } from '../services/api';
import {
  ALL_INITIAL_STUDENTS,
  INITIAL_DRIVES,
  INITIAL_APPLICATIONS,
  INITIAL_APPLICATION_HISTORY,
  NO_DUES_CATEGORIES,
  generateInitialNoDuesMap,
} from '../data/initialData';

export const DEMO_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Dr. Rajeshwari Raman',
    email: 'placement.head@campuspath.edu',
    role: 'admin',
    designation: 'Director, Training & Placement Cell',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Training & Placement Office',
  },
  {
    id: 'user-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.campuspath.edu',
    role: 'student',
    studentId: 'stud-1',
    rollNumber: '2021CS0101',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user-student-2',
    name: 'Diya Patel',
    email: 'diya.patel@student.campuspath.edu',
    role: 'student',
    studentId: 'stud-2',
    rollNumber: '2021CS0102',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchDemoRole: (role: 'admin' | 'student', studentId?: string) => void;

  students: Student[];
  drives: RecruitmentDrive[];
  applications: Application[];
  applicationHistory: ApplicationHistory[];
  categoriesConfig: NoDuesCategoryConfig[];
  noDuesMap: Record<string, Record<NoDuesCategory, NoDuesItem>>;

  studentsWithRelations: StudentWithRelations[];
  stats: PlacementStats;

  academicSession: string;
  setAcademicSession: (session: string) => void;

  // Student actions (STEP 1)
  addStudent: (student: Omit<Student, 'id'>) => Promise<Student>;
  updateStudent: (student: Student) => Promise<void>;
  deleteStudent: (studentId: string) => Promise<void>;
  importStudentsFromCsv: (newStudents: Omit<Student, 'id'>[]) => Promise<number>;
  importStudentsCsvWithReport: (rows: any[]) => Promise<CsvImportReport>;

  // Drive actions (STEP 2)
  addDrive: (drive: Omit<RecruitmentDrive, 'id'>) => Promise<RecruitmentDrive>;
  updateDrive: (drive: RecruitmentDrive) => Promise<void>;
  cancelDrive: (driveId: string, reason?: string) => Promise<void>;
  deleteDrive: (driveId: string) => Promise<void>;

  // Application actions (STEP 3 & 4)
  updateApplicationStatus: (
    appId: string,
    status: ApplicationStatus,
    notes?: string,
    offerCtc?: number
  ) => Promise<void>;
  bulkUpdateApplicationStatus: (
    appIds: string[],
    status: ApplicationStatus,
    notes?: string
  ) => Promise<void>;
  submitApplication: (studentId: string, driveId: string) => Promise<Application>;
  withdrawApplication: (appId: string) => Promise<void>;

  // No-Dues actions (STEP 6)
  updateNoDuesItem: (
    studentId: string,
    category: NoDuesCategory,
    status: NoDuesStatus,
    remarks?: string,
    clearedBy?: string,
    pendingAmount?: number
  ) => Promise<void>;
  clearAllDuesForStudent: (studentId: string, clearedBy: string) => Promise<void>;
  payNoDuesFine: (
    studentId: string,
    category: NoDuesCategory,
    amount: number,
    paymentRef: string
  ) => Promise<void>;

  // Sync / Refresh
  refreshData: () => Promise<void>;

  // Toast feedback actions
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;

  // Theme actions
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // System actions
  resetToInitialData: () => void;
}

const LOCAL_STORAGE_KEY_PREFIX = 'campuspath_relational_v2_';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}user`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEMO_USERS[0]; // Admin by default
  });

  // Students
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}students`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return ALL_INITIAL_STUDENTS as Student[];
  });

  // Drives
  const [drives, setDrives] = useState<RecruitmentDrive[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}drives`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_DRIVES as RecruitmentDrive[];
  });

  // Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}applications`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_APPLICATIONS as Application[];
  });

  // Application History
  const [applicationHistory, setApplicationHistory] = useState<ApplicationHistory[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}app_history`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_APPLICATION_HISTORY as ApplicationHistory[];
  });

  // No-Dues Categories Configuration
  const [categoriesConfig, setCategoriesConfig] = useState<NoDuesCategoryConfig[]>(
    NO_DUES_CATEGORIES as NoDuesCategoryConfig[]
  );

  // No-Dues Map
  const [noDuesMap, setNoDuesMap] = useState<Record<string, Record<NoDuesCategory, NoDuesItem>>>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}nodues`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object') return parsed;
      } catch (e) {}
    }
    return generateInitialNoDuesMap(ALL_INITIAL_STUDENTS) as Record<string, Record<NoDuesCategory, NoDuesItem>>;
  });

  // Academic session
  const [academicSession, setAcademicSession] = useState('2024-2025 (Semester 8 - Final Year)');

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (
      title: string,
      message: string,
      type: 'success' | 'info' | 'warning' | 'error' = 'info'
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Synchronize with backend on mount
  const refreshData = useCallback(async () => {
    try {
      const [fetchedStudents, fetchedDrives, fetchedApps, fetchedNodues, fetchedHistory, fetchedCats] =
        await Promise.all([
          api.getStudents(),
          api.getDrives(),
          api.getApplications(),
          api.getNoDuesMap(),
          api.getApplicationHistory(),
          api.getNoDuesCategories(),
        ]);

      if (fetchedStudents && fetchedStudents.length > 0) setStudents(fetchedStudents);
      if (fetchedDrives && fetchedDrives.length > 0) setDrives(fetchedDrives);
      if (fetchedApps && fetchedApps.length > 0) setApplications(fetchedApps);
      if (fetchedNodues && Object.keys(fetchedNodues).length > 0) setNoDuesMap(fetchedNodues);
      if (fetchedHistory && fetchedHistory.length > 0) setApplicationHistory(fetchedHistory);
      if (fetchedCats && fetchedCats.length > 0) setCategoriesConfig(fetchedCats);
    } catch (err) {
      console.warn('[AppContext] Server sync skipped, relying on local store:', err);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}drives`, JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}app_history`, JSON.stringify(applicationHistory));
  }, [applicationHistory]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}nodues`, JSON.stringify(noDuesMap));
  }, [noDuesMap]);

  // -------------------------------------------------------------
  // BUSINESS RULES: COMPUTE STUDENT RELATIONS & OUTCOMES
  // -------------------------------------------------------------
  const studentsWithRelations = useMemo<StudentWithRelations[]>(() => {
    const activeDrivesMap = new Map(drives.map((d) => [d.id, d]));
    const successfulOfferStatuses: ApplicationStatus[] = ['Selected', 'Offer Received', 'Joined'];

    return students.map((student) => {
      const studentApps = applications.filter((app) => app.studentId === student.id);

      // Business rule: Successful placement counts ONLY if drive is NOT Cancelled
      // and status is in successfulOfferStatuses (excludes Rejected & Withdrawn).
      // Worked Example 3: stud-7 in drive-intel (Cancelled) is excluded here -> unplaced!
      const validOffers = studentApps.filter((app) => {
        const drive = activeDrivesMap.get(app.driveId);
        if (!drive || drive.status === 'Cancelled') return false;
        return successfulOfferStatuses.includes(app.status);
      });

      const totalOffers = validOffers.length;
      const isPlaced = totalOffers > 0;

      // Find highest offer LPA
      let highestOfferLpa = 0;
      validOffers.forEach((app) => {
        const drive = activeDrivesMap.get(app.driveId);
        const ctc = app.offerCtc || drive?.packageCtc || 0;
        if (ctc > highestOfferLpa) {
          highestOfferLpa = ctc;
        }
      });

      // No dues computation (STEP 6)
      const studentNoDues = noDuesMap[student.id] || {
        library: { category: 'library', categoryLabel: 'Central Library', departmentInCharge: 'Library', status: 'Pending', remarks: 'Record init', pendingAmount: 0, updatedAt: new Date().toISOString() },
        laboratory: { category: 'laboratory', categoryLabel: 'Department Laboratories', departmentInCharge: 'Lab', status: 'Pending', remarks: 'Record init', pendingAmount: 0, updatedAt: new Date().toISOString() },
        department: { category: 'department', categoryLabel: 'Academic Department', departmentInCharge: student.department, status: 'Pending', remarks: 'Record init', pendingAmount: 0, updatedAt: new Date().toISOString() },
        placement: { category: 'placement', categoryLabel: 'Placement Cell', departmentInCharge: 'Placement', status: 'Pending', remarks: 'Record init', pendingAmount: 0, updatedAt: new Date().toISOString() },
        accounts: { category: 'accounts', categoryLabel: 'Accounts & Finance', departmentInCharge: 'Accounts', status: 'Pending', remarks: 'Record init', pendingAmount: 0, updatedAt: new Date().toISOString() },
        hostel: { category: 'hostel', categoryLabel: 'Hostel & Residence', departmentInCharge: 'Hostel', status: 'Not Applicable', remarks: 'Day scholar', pendingAmount: 0, updatedAt: new Date().toISOString() },
      };

      // Mandatory check:
      // Status is "Cleared" ONLY if ALL mandatory applicable categories are Cleared or Not Applicable;
      // otherwise "Incomplete" and list the blocking items.
      const blockingCategories: string[] = [];
      categoriesConfig.forEach((cfg) => {
        const item = studentNoDues[cfg.category];
        if (cfg.isMandatory) {
          if (!item || (item.status !== 'Cleared' && item.status !== 'Not Applicable')) {
            blockingCategories.push(cfg.label);
          }
        }
      });

      // Worked Example 2: stud-2 has Library Pending -> Incomplete with blockingCategories: ['Central Library']
      const isOverallCleared = blockingCategories.length === 0;
      const overallNoDuesStatus: 'Cleared' | 'Incomplete' = isOverallCleared ? 'Cleared' : 'Incomplete';

      return {
        ...student,
        applications: studentApps,
        noDues: studentNoDues,
        overallNoDuesStatus,
        blockingCategories,
        totalOffers,
        isPlaced,
        highestOfferLpa: highestOfferLpa > 0 ? highestOfferLpa : undefined,
      };
    });
  }, [students, drives, applications, noDuesMap, categoriesConfig]);

  // -------------------------------------------------------------
  // BUSINESS RULES: COMPUTE OVERALL PLACEMENT METRICS (STEP 5)
  // -------------------------------------------------------------
  const stats = useMemo<PlacementStats>(() => {
    const totalStudents = students.length;
    const eligibleStudents = students.filter((s) => s.status === 'Active').length;

    let uniquePlacedStudents = 0;
    let totalOffers = 0;
    let totalCtcSum = 0;
    let highestPackageCtc = 0;
    let noDuesClearedCount = 0;
    let noDuesPendingCount = 0;

    studentsWithRelations.forEach((student) => {
      if (student.isPlaced) {
        uniquePlacedStudents += 1;
        totalOffers += student.totalOffers;
        if (student.highestOfferLpa) {
          totalCtcSum += student.highestOfferLpa;
          if (student.highestOfferLpa > highestPackageCtc) {
            highestPackageCtc = student.highestOfferLpa;
          }
        }
      }

      if (student.overallNoDuesStatus === 'Cleared') {
        noDuesClearedCount += 1;
      } else {
        noDuesPendingCount += 1;
      }
    });

    const unplacedStudents = Math.max(0, eligibleStudents - uniquePlacedStudents);
    const placementPercentage =
      eligibleStudents > 0 ? Number(((uniquePlacedStudents / eligibleStudents) * 100).toFixed(1)) : 0;
    const averagePackageCtc =
      uniquePlacedStudents > 0 ? Number((totalCtcSum / uniquePlacedStudents).toFixed(2)) : 0;

    const activeDrivesCount = drives.filter((d) => d.status === 'Active' || d.status === 'Upcoming').length;
    const completedDrivesCount = drives.filter((d) => d.status === 'Completed').length;
    const totalCompaniesCount = new Set(drives.map((d) => d.companyName)).size;

    return {
      totalStudents,
      eligibleStudents,
      uniquePlacedStudents,
      totalOffers,
      unplacedStudents,
      placementPercentage,
      averagePackageCtc,
      highestPackageCtc,
      activeDrivesCount,
      completedDrivesCount,
      totalCompaniesCount,
      noDuesClearedCount,
      noDuesPendingCount,
    };
  }, [students, drives, studentsWithRelations]);

  // Role switching
  const switchDemoRole = (role: 'admin' | 'student', studentId?: string) => {
    if (role === 'admin') {
      const admin = DEMO_USERS.find((u) => u.role === 'admin') || DEMO_USERS[0];
      setCurrentUser(admin);
    } else {
      const targetStudentId = studentId || 'stud-1';
      const studentRec = students.find((s) => s.id === targetStudentId);
      const studentUser: User = {
        id: `user-${targetStudentId}`,
        name: studentRec?.name || 'Aarav Sharma',
        email: studentRec?.email || 'aarav.sharma@student.campuspath.edu',
        role: 'student',
        studentId: targetStudentId,
        rollNumber: studentRec?.rollNumber || '2021CS0101',
        department: studentRec?.department,
        avatar: studentRec?.avatarUrl,
      };
      setCurrentUser(studentUser);
    }
  };

  // -------------------------------------------------------------
  // STEP 1: STUDENT CRUD & CSV ACTIONS
  // -------------------------------------------------------------
  const addStudent = async (studentData: Omit<Student, 'id'>): Promise<Student> => {
    try {
      const newStudent = await api.addStudent(studentData);
      setStudents((prev) => [newStudent, ...prev]);

      // Init clearance locally
      setNoDuesMap((prev) => ({
        ...prev,
        [newStudent.id]: {
          library: { category: 'library', categoryLabel: 'Central Library', departmentInCharge: 'Library Directorate', status: 'Pending', remarks: 'New student onboarded', pendingAmount: 0, updatedAt: new Date().toISOString() },
          laboratory: { category: 'laboratory', categoryLabel: 'Department Laboratories', departmentInCharge: 'Central Lab Cell', status: 'Pending', remarks: 'New student onboarded', pendingAmount: 0, updatedAt: new Date().toISOString() },
          department: { category: 'department', categoryLabel: 'Academic Department', departmentInCharge: newStudent.department, status: 'Pending', remarks: 'New student onboarded', pendingAmount: 0, updatedAt: new Date().toISOString() },
          placement: { category: 'placement', categoryLabel: 'Placement Cell', departmentInCharge: 'Training & Placement Office', status: 'Pending', remarks: 'New student onboarded', pendingAmount: 0, updatedAt: new Date().toISOString() },
          accounts: { category: 'accounts', categoryLabel: 'Accounts & Finance', departmentInCharge: 'Bursar & Finance Office', status: 'Pending', remarks: 'New student onboarded', pendingAmount: 0, updatedAt: new Date().toISOString() },
          hostel: { category: 'hostel', categoryLabel: 'Hostel & Residence', departmentInCharge: 'Chief Warden Office', status: 'Not Applicable', remarks: 'Day scholar profile', pendingAmount: 0, updatedAt: new Date().toISOString() },
        },
      }));

      showToast('Student Added', `${newStudent.name} (${newStudent.rollNumber}) registered in student directory.`, 'success');
      return newStudent;
    } catch (err: any) {
      showToast('Error', err.message, 'error');
      throw err;
    }
  };

  const updateStudent = async (updatedStudent: Student) => {
    try {
      await api.updateStudent(updatedStudent);
      setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
      showToast('Record Updated', `Profile updated for ${updatedStudent.name}.`, 'success');
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  const deleteStudent = async (studentId: string) => {
    try {
      await api.deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      setApplications((prev) => prev.filter((a) => a.studentId !== studentId));
      showToast('Student Removed', 'Student profile deleted from database.', 'info');
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  const importStudentsCsvWithReport = async (rows: any[]): Promise<CsvImportReport> => {
    try {
      const report = await api.importStudentsCsv(rows);
      await refreshData();
      return report;
    } catch (err: any) {
      showToast('Import Failed', err.message, 'error');
      throw err;
    }
  };

  const importStudentsFromCsv = async (newStudents: Omit<Student, 'id'>[]): Promise<number> => {
    const report = await importStudentsCsvWithReport(newStudents);
    return report.imported;
  };

  // -------------------------------------------------------------
  // STEP 2: RECRUITMENT DRIVES ACTIONS
  // -------------------------------------------------------------
  const addDrive = async (driveData: Omit<RecruitmentDrive, 'id'>): Promise<RecruitmentDrive> => {
    try {
      const newDrive = await api.addDrive(driveData);
      setDrives((prev) => [newDrive, ...prev]);
      showToast('Recruitment Drive Created', `${newDrive.companyName} (${newDrive.role}) is now open for registration.`, 'success');
      return newDrive;
    } catch (err: any) {
      showToast('Error', err.message, 'error');
      throw err;
    }
  };

  const updateDrive = async (updatedDrive: RecruitmentDrive) => {
    try {
      await api.updateDrive(updatedDrive);
      setDrives((prev) => prev.map((d) => (d.id === updatedDrive.id ? updatedDrive : d)));
      showToast('Drive Updated', `Details updated for ${updatedDrive.companyName}.`, 'success');
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  // Cancelling a drive immediately excludes it from placement counts
  const cancelDrive = async (driveId: string, reason = 'Recruiter hiring cancelled') => {
    try {
      const cancelled = await api.cancelDrive(driveId, reason);
      setDrives((prev) => prev.map((d) => (d.id === driveId ? cancelled : d)));
      showToast(
        'Drive Cancelled',
        `${cancelled.companyName} recruitment drive was cancelled. Related offers excluded from placement stats.`,
        'warning'
      );
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  const deleteDrive = async (driveId: string) => {
    try {
      await api.deleteDrive(driveId);
      setDrives((prev) => prev.filter((d) => d.id !== driveId));
      setApplications((prev) => prev.filter((a) => a.driveId !== driveId));
      showToast('Drive Removed', 'Recruitment drive record deleted.', 'info');
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  // -------------------------------------------------------------
  // STEP 3 & 4: APPLICATIONS & RECRUITMENT OUTCOMES
  // -------------------------------------------------------------
  const submitApplication = async (studentId: string, driveId: string): Promise<Application> => {
    try {
      const result = await api.registerForDrive(studentId, driveId, currentUser.name);
      setApplications((prev) => [result.application, ...prev.filter((a) => a.id !== result.application.id)]);
      if (result.historyEntry) {
        setApplicationHistory((prev) => [result.historyEntry, ...prev]);
      }
      showToast('Registered Successfully', result.message, 'success');
      return result.application;
    } catch (err: any) {
      showToast('Registration Denied', err.message, 'error');
      throw err;
    }
  };

  const updateApplicationStatus = async (
    appId: string,
    status: ApplicationStatus,
    notes?: string,
    offerCtc?: number
  ) => {
    try {
      const result = await api.updateApplicationStage(appId, status, offerCtc, currentUser.name, notes);
      setApplications((prev) => prev.map((a) => (a.id === appId ? result.application : a)));
      if (result.historyEntry) {
        setApplicationHistory((prev) => [result.historyEntry, ...prev]);
      }
      showToast('Stage Transitioned', `Moved application to "${status}". History logged.`, 'success');
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  const bulkUpdateApplicationStatus = async (
    appIds: string[],
    status: ApplicationStatus,
    notes?: string
  ) => {
    try {
      await api.bulkUpdateApplicationStages(appIds, status, currentUser.name, notes);
      await refreshData();
      showToast('Bulk Action Complete', `${appIds.length} candidates advanced to "${status}".`, 'success');
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  const withdrawApplication = async (appId: string) => {
    await updateApplicationStatus(appId, 'Withdrawn', 'Candidate voluntarily withdrew application');
  };

  // -------------------------------------------------------------
  // STEP 6: NO-DUES CLEARANCES & COMPUTED OVERALL STATUS
  // -------------------------------------------------------------
  const updateNoDuesItem = async (
    studentId: string,
    category: NoDuesCategory,
    status: NoDuesStatus,
    remarks?: string,
    clearedBy?: string,
    pendingAmount = 0
  ) => {
    try {
      const result = await api.updateNoDuesClearance(
        studentId,
        category,
        status,
        remarks,
        pendingAmount,
        clearedBy || currentUser.name
      );

      setNoDuesMap((prev) => ({
        ...prev,
        [studentId]: result.clearances,
      }));

      showToast(
        'Clearance Updated',
        `${category.toUpperCase()} marked as "${status}". Overall status: ${result.overall.overallStatus}`,
        status === 'Cleared' ? 'success' : 'info'
      );
    } catch (err: any) {
      showToast('Error', err.message, 'error');
    }
  };

  const clearAllDuesForStudent = async (studentId: string, clearedBy: string) => {
    const categories: NoDuesCategory[] = ['library', 'laboratory', 'department', 'placement', 'accounts', 'hostel'];
    for (const cat of categories) {
      await updateNoDuesItem(studentId, cat, 'Cleared', 'Full institutional clearance sign-off', clearedBy, 0);
    }
    showToast('All Dues Cleared', `Institutional graduation clearance verified for student record.`, 'success');
  };

  const payNoDuesFine = async (
    studentId: string,
    category: NoDuesCategory,
    amount: number,
    paymentRef: string
  ) => {
    await updateNoDuesItem(
      studentId,
      category,
      'Cleared',
      `Cleared online via PhonePe Gateway (Txn: ${paymentRef}).`,
      'PhonePe S2S Settlement',
      0
    );
    showToast('Payment Verified', `₹${amount.toLocaleString('en-IN')} settled for ${category}. Clearance recorded!`, 'success');
  };

  // Reset to initial worked example dataset
  const resetToInitialData = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}students`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}drives`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}applications`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}app_history`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}nodues`);

    setCurrentUser(DEMO_USERS[0]);
    setStudents(ALL_INITIAL_STUDENTS as Student[]);
    setDrives(INITIAL_DRIVES as RecruitmentDrive[]);
    setApplications(INITIAL_APPLICATIONS as Application[]);
    setApplicationHistory(INITIAL_APPLICATION_HISTORY as ApplicationHistory[]);
    setNoDuesMap(generateInitialNoDuesMap(ALL_INITIAL_STUDENTS) as Record<string, Record<NoDuesCategory, NoDuesItem>>);
    showToast('Relational Reset Complete', 'Persistent worked examples restored (CSE 10 students, 6 placed, 8 offers).', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchDemoRole,
        students,
        drives,
        applications,
        applicationHistory,
        categoriesConfig,
        noDuesMap,
        studentsWithRelations,
        stats,
        academicSession,
        setAcademicSession,
        addStudent,
        updateStudent,
        deleteStudent,
        importStudentsFromCsv,
        importStudentsCsvWithReport,
        addDrive,
        updateDrive,
        cancelDrive,
        deleteDrive,
        updateApplicationStatus,
        bulkUpdateApplicationStatus,
        submitApplication,
        withdrawApplication,
        updateNoDuesItem,
        clearAllDuesForStudent,
        payNoDuesFine,
        refreshData,
        toasts,
        showToast,
        dismissToast,
        theme,
        toggleTheme,
        resetToInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
