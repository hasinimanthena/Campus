import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { ToastContainer } from './components/ToastContainer';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudentManagementPage } from './pages/StudentManagementPage';
import { CompaniesDrivesPage } from './pages/CompaniesDrivesPage';
import { ApplicationTrackingPage } from './pages/ApplicationTrackingPage';
import { NoDuesManagementPage } from './pages/NoDuesManagementPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { ReportsPage } from './pages/ReportsPage';
import { LandingPage } from './pages/LandingPage';
import { DuesPaymentsPage } from './pages/DuesPaymentsPage';
import { Lock } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentUser, switchDemoRole } = useApp();
  const [viewMode, setViewMode] = useState<'landing' | 'portal' | 'login'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If user role is student and tab is an admin-only tab, default to student-portal
  const isStudent = currentUser.role === 'student';
  const effectiveTab =
    isStudent && (activeTab === 'students' || activeTab === 'applications' || activeTab === 'reports')
      ? 'student-portal'
      : activeTab;

  const tabTitles: Record<ActiveTab, string> = {
    dashboard: 'Placement Analytics & Dashboard',
    students: 'Student Records Directory',
    drives: 'Corporate Recruitment Drives',
    applications: 'Candidate Application Pipeline',
    nodues: 'Multi-Department No-Dues Clearance',
    dues: 'My Dues & PhonePe Payment Hub',
    'student-portal': 'Student Placement & Clearance Portal',
    reports: 'Institutional Placement & Compliance Reports',
  };

  if (viewMode === 'landing') {
    return (
      <>
        <ToastContainer />
        <LandingPage
          onEnterPortal={(role, studentId) => {
            if (role) switchDemoRole(role, studentId);
            setViewMode('portal');
          }}
          onOpenLogin={() => setViewMode('login')}
        />
      </>
    );
  }

  if (viewMode === 'login') {
    return (
      <>
        <ToastContainer />
        <LoginPage
          onSuccess={() => setViewMode('portal')}
          onBackToHome={() => setViewMode('landing')}
        />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#060B17] font-sans text-slate-800 dark:text-slate-100 transition-colors">
      {/* Toast Alert Feedback */}
      <ToastContainer />

      {/* Navigation on Left Side Only */}
      <div className="hidden lg:flex">
        <Sidebar
          activeTab={effectiveTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onLogout={() => setViewMode('landing')}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative flex w-64 max-w-xs flex-1 flex-col bg-slate-900 border-r border-slate-800">
            <Sidebar
              activeTab={effectiveTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              isCollapsed={false}
              setIsCollapsed={() => {}}
              onLogout={() => {
                setViewMode('landing');
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-[#060B17] transition-colors">
        {/* Slim Top Navigation Bar */}
        <TopNav
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          activeTabTitle={tabTitles[effectiveTab]}
        />

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-[#060B17] transition-colors">
          <div className="max-w-7xl mx-auto space-y-6">
            {effectiveTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
            {effectiveTab === 'students' && <StudentManagementPage />}
            {effectiveTab === 'drives' && <CompaniesDrivesPage />}
            {effectiveTab === 'applications' && <ApplicationTrackingPage />}
            {effectiveTab === 'nodues' && <NoDuesManagementPage />}
            {effectiveTab === 'dues' && <DuesPaymentsPage />}
            {effectiveTab === 'student-portal' && <StudentPortalPage />}
            {effectiveTab === 'reports' && <ReportsPage />}

            {/* Minimalist Institutional Footer */}
            <footer className="pt-6 pb-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Apex Institute of Technology</span>
                <span>•</span>
                <span>Office of Career Services & Governance</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">NAAC A++</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-slate-400" />
                  <span>TLS 256-Bit SSO</span>
                </span>
                <span>v1.2.0</span>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
