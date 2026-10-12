import {
  Student,
  RecruitmentDrive,
  Application,
  ApplicationHistory,
  NoDuesCategory,
  NoDuesStatus,
  NoDuesItem,
  NoDuesCategoryConfig,
  PlacementStats,
  DepartmentPlacementReport,
  CompanyOutcomesReport,
  CsvImportReport,
} from '../types';

const API_BASE = '/api';

export const api = {
  // STEP 1: Student records & CSV import
  async getStudents(): Promise<Student[]> {
    try {
      const res = await fetch(`${API_BASE}/students`);
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      return data.students || [];
    } catch (e) {
      console.warn('[API] getStudents fallback to local state:', e);
      return [];
    }
  },

  async addStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add student');
    }
    const data = await res.json();
    return data.student;
  },

  async updateStudent(student: Student): Promise<Student> {
    const res = await fetch(`${API_BASE}/students/${student.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update student');
    }
    const data = await res.json();
    return data.student;
  },

  async deleteStudent(studentId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/students/${studentId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete student');
    }
  },

  async importStudentsCsv(rows: any[]): Promise<CsvImportReport> {
    const res = await fetch(`${API_BASE}/students/import-csv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to import CSV');
    }
    const data = await res.json();
    return data.report;
  },

  // STEP 2: Recruitment drives
  async getDrives(): Promise<RecruitmentDrive[]> {
    try {
      const res = await fetch(`${API_BASE}/drives`);
      if (!res.ok) throw new Error('Failed to fetch drives');
      const data = await res.json();
      return data.drives || [];
    } catch (e) {
      console.warn('[API] getDrives fallback:', e);
      return [];
    }
  },

  async addDrive(driveData: Omit<RecruitmentDrive, 'id'>): Promise<RecruitmentDrive> {
    const res = await fetch(`${API_BASE}/drives`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(driveData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to add drive');
    }
    const data = await res.json();
    return data.drive;
  },

  async updateDrive(drive: RecruitmentDrive): Promise<RecruitmentDrive> {
    const res = await fetch(`${API_BASE}/drives/${drive.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drive),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update drive');
    }
    const data = await res.json();
    return data.drive;
  },

  async cancelDrive(driveId: string, reason = 'Recruiter hiring cancelled'): Promise<RecruitmentDrive> {
    const res = await fetch(`${API_BASE}/drives/${driveId}/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to cancel drive');
    }
    const data = await res.json();
    return data.drive;
  },

  async deleteDrive(driveId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/drives/${driveId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete drive');
    }
  },

  // STEP 3: Student opportunities & backend eligibility registration
  async getApplications(): Promise<Application[]> {
    try {
      const res = await fetch(`${API_BASE}/applications`);
      if (!res.ok) throw new Error('Failed to fetch applications');
      const data = await res.json();
      return data.applications || [];
    } catch (e) {
      console.warn('[API] getApplications fallback:', e);
      return [];
    }
  },

  async registerForDrive(studentId: string, driveId: string, actor = 'Student Portal'): Promise<{ application: Application; historyEntry: ApplicationHistory; message: string }> {
    const res = await fetch(`${API_BASE}/applications/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, driveId, actor }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    return await res.json();
  },

  // STEP 4: Recruitment outcomes & application history
  async updateApplicationStage(applicationId: string, newStatus: string, offerCtc?: number, changedBy = 'Placement In-Charge', notes = ''): Promise<{ application: Application; historyEntry: ApplicationHistory }> {
    const res = await fetch(`${API_BASE}/applications/stage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId, newStatus, offerCtc, changedBy, notes }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Stage update failed');
    }
    return await res.json();
  },

  async bulkUpdateApplicationStages(applicationIds: string[], newStatus: string, changedBy = 'Placement In-Charge', notes = ''): Promise<{ count: number }> {
    const res = await fetch(`${API_BASE}/applications/bulk-stage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationIds, newStatus, changedBy, notes }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Bulk stage update failed');
    }
    return await res.json();
  },

  async getApplicationHistory(studentId?: string): Promise<ApplicationHistory[]> {
    try {
      const url = studentId ? `${API_BASE}/application-history?studentId=${studentId}` : `${API_BASE}/application-history`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      return data.history || [];
    } catch (e) {
      console.warn('[API] getApplicationHistory fallback:', e);
      return [];
    }
  },

  // STEP 5: Live Dashboard Metrics
  async getDashboardMetrics(): Promise<PlacementStats> {
    const res = await fetch(`${API_BASE}/dashboard/metrics`);
    if (!res.ok) throw new Error('Failed to fetch metrics');
    const data = await res.json();
    return data.metrics;
  },

  // STEP 6: No-dues clearance & computed overall status
  async getNoDuesCategories(): Promise<NoDuesCategoryConfig[]> {
    try {
      const res = await fetch(`${API_BASE}/nodues/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      return data.categories || [];
    } catch (e) {
      console.warn('[API] getNoDuesCategories fallback:', e);
      return [];
    }
  },

  async getNoDuesMap(): Promise<Record<string, Record<NoDuesCategory, NoDuesItem>>> {
    try {
      const res = await fetch(`${API_BASE}/nodues`);
      if (!res.ok) throw new Error('Failed to fetch no-dues');
      const data = await res.json();
      return data.noDuesMap || {};
    } catch (e) {
      console.warn('[API] getNoDuesMap fallback:', e);
      return {};
    }
  },

  async updateNoDuesClearance(
    studentId: string,
    category: NoDuesCategory,
    status: NoDuesStatus,
    remarks = '',
    pendingAmount = 0,
    clearedBy = 'Placement In-Charge'
  ): Promise<{ clearances: Record<NoDuesCategory, NoDuesItem>; overall: { overallStatus: string; blockingCategories: string[] } }> {
    const res = await fetch(`${API_BASE}/nodues/${studentId}/${category}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, remarks, pendingAmount, clearedBy }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update clearance');
    }
    return await res.json();
  },

  // STEP 7: Reports
  async getDepartmentPlacementReport(): Promise<DepartmentPlacementReport[]> {
    const res = await fetch(`${API_BASE}/reports/department-placement`);
    if (!res.ok) throw new Error('Failed to fetch department placement report');
    const data = await res.json();
    return data.report || [];
  },

  async getCompanyOutcomesReport(): Promise<CompanyOutcomesReport[]> {
    const res = await fetch(`${API_BASE}/reports/company-outcomes`);
    if (!res.ok) throw new Error('Failed to fetch company outcomes report');
    const data = await res.json();
    return data.report || [];
  },
};
