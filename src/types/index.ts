export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string; // Links to Student record if role is student
  rollNumber?: string;
  department?: string;
  designation?: string;
}

export type Department = 
  | 'Computer Science & Engineering'
  | 'Electronics & Communication Engineering'
  | 'Information Technology';

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  cgpa: number;
  backlogs: number;
  batchYear: number;
  gender: 'Male' | 'Female' | 'Other';
  skills: string[];
  resumeUrl: string;
  status: 'Active' | 'Graduated' | 'Debarred';
  registrationStatus?: 'Registered' | 'Pending' | 'Debarred';
  isRegisteredForPlacement?: boolean;
  avatarUrl?: string;
}

export type DriveStatus = 'Upcoming' | 'Active' | 'Completed' | 'Cancelled';
export type CompanyTier = 'Super Dream' | 'Dream' | 'Core' | 'Mass';

export interface RecruitmentDrive {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  tier: CompanyTier;
  packageCtc: number; // in LPA, e.g. 18.5
  stipend?: string;
  minCgpa: number;
  maxBacklogs: number;
  eligibleDepartments: Department[];
  driveDate: string;
  deadline: string;
  location: string; // e.g. 'Bangalore / Hybrid' or 'On-Campus'
  status: DriveStatus;
  rounds: string[];
  description: string;
  jobType: 'Full-time' | 'Internship + PPO' | 'Direct Hire';
}

export type ApplicationStatus =
  | 'Registered'
  | 'Shortlisted'
  | 'Assessment'
  | 'Interview'
  | 'Selected'
  | 'Offer Received'
  | 'Joined'
  | 'Rejected'
  | 'Withdrawn';

export interface Application {
  id: string;
  studentId: string;
  driveId: string;
  appliedAt: string;
  status: ApplicationStatus;
  currentRound: string;
  feedback?: string;
  offerCtc?: number;
  notes?: string;
  updatedAt: string;
}

export type NoDuesCategory =
  | 'library'
  | 'laboratory'
  | 'department'
  | 'placement'
  | 'accounts'
  | 'hostel';

export type NoDuesStatus = 'Cleared' | 'Pending' | 'Action Required' | 'Not Applicable';

export interface NoDuesItem {
  category: NoDuesCategory;
  categoryLabel: string;
  departmentInCharge: string;
  status: NoDuesStatus;
  remarks: string;
  pendingAmount: number;
  updatedAt: string;
  clearedBy?: string;
}

export interface ApplicationHistory {
  id: string;
  applicationId: string;
  studentId: string;
  driveId: string;
  companyName: string;
  role: string;
  oldStatus: ApplicationStatus | 'None';
  newStatus: ApplicationStatus;
  offerCtc?: number;
  changedBy: string;
  changedAt: string;
  notes?: string;
}

export interface NoDuesCategoryConfig {
  id: string;
  category: NoDuesCategory;
  label: string;
  isMandatory: boolean;
  departmentInCharge: string;
  description: string;
}

export interface StudentWithRelations extends Student {
  applications: Application[];
  noDues: Record<NoDuesCategory, NoDuesItem>;
  overallNoDuesStatus: 'Cleared' | 'Incomplete' | 'Pending' | 'Action Required';
  blockingCategories: string[]; // List of categories blocking clearance if Incomplete
  totalOffers: number;
  isPlaced: boolean;
  highestOfferLpa?: number;
}

export interface PlacementStats {
  totalStudents: number;
  eligibleStudents: number;
  uniquePlacedStudents: number;
  totalOffers: number;
  unplacedStudents: number;
  placementPercentage: number;
  averagePackageCtc: number;
  highestPackageCtc: number;
  activeDrivesCount: number;
  completedDrivesCount: number;
  totalCompaniesCount: number;
  noDuesClearedCount: number;
  noDuesPendingCount: number;
}

export interface DepartmentPlacementReport {
  department: Department;
  totalStudents: number;
  eligibleStudents: number;
  uniquePlacedStudents: number;
  totalOffers: number;
  unplacedStudents: number;
  placementPercentage: number;
  averagePackageCtc: number;
  highestPackageCtc: number;
}

export interface CompanyOutcomesReport {
  driveId: string;
  companyName: string;
  role: string;
  tier: CompanyTier;
  packageCtc: number;
  registeredCount: number;
  shortlistedCount: number;
  interviewedCount: number;
  selectedCount: number;
  offersReceivedCount: number;
  joinedCount: number;
  rejectedCount: number;
  status: DriveStatus;
}

export interface CsvImportError {
  row: number;
  rollNumber?: string;
  name?: string;
  field: string;
  reason: string;
}

export interface CsvImportReport {
  totalProcessed: number;
  imported: number;
  skipped: number;
  failed: number;
  errors: CsvImportError[];
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface OfferLetterDetails {
  companyName: string;
  role: string;
  ctc: number;
  baseSalary: number;
  joiningBonus: number;
  stockUnits: number;
  location: string;
  joiningDate: string;
  letterDate: string;
}
