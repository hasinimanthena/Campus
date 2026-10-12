import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Shield,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle,
  Building,
  Eye,
  EyeOff,
  Github,
  ArrowLeft,
} from 'lucide-react';
import { Modal } from '../components/Modal';

interface LoginPageProps {
  onSuccess: () => void;
  onBackToHome?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onBackToHome }) => {
  const { switchDemoRole, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<'admin' | 'student'>('admin');
  const [email, setEmail] = useState('placement.head@campuspath.edu');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState('stud-1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Google OAuth states
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleSelectedAccount, setGoogleSelectedAccount] = useState<string | null>(null);

  // GitHub OAuth states
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [githubSelectedAccount, setGithubSelectedAccount] = useState<string | null>(null);

  // Forgot password & Magic link modals
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [isMagicLinkOpen, setIsMagicLinkOpen] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState('');
  const [magicLinkSuccess, setMagicLinkSuccess] = useState(false);

  const googleAccounts = [
    {
      id: 'admin',
      name: 'Dr. Rajeshwari Raman',
      email: 'placement.head@campuspath.edu',
      role: 'admin' as const,
      desc: 'Director, Training & Placement Cell',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'stud-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@student.campuspath.edu',
      role: 'student' as const,
      studentId: 'stud-1',
      desc: 'B.Tech CSE (2021CS0101) • Placed: Google & Microsoft',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'stud-2',
      name: 'Diya Patel',
      email: 'diya.patel@student.campuspath.edu',
      role: 'student' as const,
      studentId: 'stud-2',
      desc: 'B.Tech CSE (2021CS0102) • Placed: Goldman Sachs • Library Due ₹250',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'stud-13',
      name: 'Pooja Hegde',
      email: 'pooja.hegde@student.campuspath.edu',
      role: 'student' as const,
      studentId: 'stud-13',
      desc: 'B.Tech ECE (2021EC0201) • Placed: Cisco • 100% Cleared No-Dues',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const githubAccounts = [
    {
      id: 'gh-admin',
      name: 'Dr. Rajeshwari Raman',
      username: 'rajeshwari-raman-ait',
      role: 'admin' as const,
      desc: 'Placement Cell Director • Verified TPO Org Maintainer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'gh-stud-1',
      name: 'Aarav Sharma',
      username: 'aarav-cse-2025',
      role: 'student' as const,
      studentId: 'stud-1',
      desc: 'CSE 2025 • Dual Offer Holder • Top Open Source Contributor',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'gh-stud-2',
      name: 'Diya Patel',
      username: 'diya-patel-dev',
      role: 'student' as const,
      studentId: 'stud-2',
      desc: 'CSE 2025 • Goldman Sachs Placed • Campus Rep',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 'gh-stud-13',
      name: 'Pooja Hegde',
      username: 'pooja-ece-robotics',
      role: 'student' as const,
      studentId: 'stud-13',
      desc: 'ECE 2025 • Cisco Placed • 100% Cleared',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    },
  ];

  const handleRoleToggle = (role: 'admin' | 'student') => {
    setSelectedRole(role);
    setError('');
    if (role === 'admin') {
      setEmail('placement.head@campuspath.edu');
      setPassword('admin123');
    } else {
      setEmail('aarav.sharma@student.campuspath.edu');
      setPassword('student123');
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (selectedRole === 'admin') {
        switchDemoRole('admin');
        showToast('Authenticated', 'Signed in as Placement In-Charge (TPO)', 'success');
      } else {
        switchDemoRole('student', selectedStudentId);
        showToast('Authenticated', 'Signed into Student Self-Service Portal', 'success');
      }
      setIsLoading(false);
      onSuccess();
    }, 450);
  };

  const handleSelectGoogleAccount = (acc: typeof googleAccounts[0]) => {
    setGoogleSelectedAccount(acc.email);
    setIsGoogleLoading(true);

    setTimeout(() => {
      setIsGoogleLoading(false);
      setIsGoogleModalOpen(false);

      if (acc.role === 'admin') {
        switchDemoRole('admin');
        showToast('Google Workspace Login', `Verified institutional identity: ${acc.email}`, 'success');
      } else {
        switchDemoRole('student', acc.studentId);
        showToast('Google Workspace Login', `Verified student identity: ${acc.name}`, 'success');
      }
      onSuccess();
    }, 800);
  };

  const handleSelectGitHubAccount = (acc: typeof githubAccounts[0]) => {
    setGithubSelectedAccount(acc.username);
    setIsGitHubLoading(true);

    setTimeout(() => {
      setIsGitHubLoading(false);
      setIsGitHubModalOpen(false);

      if (acc.role === 'admin') {
        switchDemoRole('admin');
        showToast('GitHub OAuth Login', `Authorized as @${acc.username} (Placement Director)`, 'success');
      } else {
        switchDemoRole('student', acc.studentId);
        showToast('GitHub OAuth Login', `Authorized as @${acc.username} (${acc.name})`, 'success');
      }
      onSuccess();
    }, 800);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
    setTimeout(() => {
      setIsForgotPasswordOpen(false);
      setForgotSuccess(false);
      showToast('Reset Link Dispatched', `Password instructions sent to ${forgotEmail}`, 'info');
    }, 1500);
  };

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMagicLinkSuccess(true);
    setTimeout(() => {
      setIsMagicLinkOpen(false);
      setMagicLinkSuccess(false);
      showToast('Magic Link Sent', `One-click login link sent to ${magicLinkEmail}`, 'success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Ambient background gradients */}
      <div className="absolute top-0 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-48 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top institutional status bar */}
      <div className="border-b border-slate-800 bg-[#060B17]/90 backdrop-blur-md px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-white flex items-center gap-2">
              <Building className="h-4 w-4 text-gold-400" />
              <span>Apex Institute of Technology</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Institutional ID: AIT-BLR-041</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30 text-[10px] font-bold">
              NAAC Grade A++
            </span>
            <span className="text-slate-400 text-[11px] hidden lg:inline">
              Support: tpo@campuspath.edu
            </span>
          </div>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 z-10">
        <div className="w-full max-w-md space-y-6">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
          )}

          {/* Logo & Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 border-2 border-indigo-500/30 text-indigo-500 dark:text-indigo-400 shadow-xl shadow-black/30">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              CampusPath
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Student Placement & Clearance Governance Portal
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            {/* Google & GitHub OAuth Buttons */}
            <div className="space-y-2.5">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(true)}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-gold-500/50 bg-white dark:bg-[#060B17] hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs group"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
                <span className="text-[10px] text-slate-400 font-mono font-normal ml-auto">
                  @campuspath.edu
                </span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={() => setIsGitHubModalOpen(true)}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-[#060B17] hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs group"
              >
                <Github className="h-4 w-4 shrink-0 text-slate-900 dark:text-white" />
                <span>Continue with GitHub</span>
                <span className="text-[10px] text-slate-400 font-mono font-normal ml-auto">
                  OAuth SSO
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-white dark:bg-[#0B132B] px-3 text-slate-400 font-bold tracking-wider">
                  Or Email & Password
                </span>
              </div>
            </div>

            {/* Role Switcher Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-[#060B17] rounded-xl mb-5 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleRoleToggle('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                <span>Placement Head</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('student')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedRole === 'student'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Student Portal</span>
              </button>
            </div>

            {/* Email & Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {selectedRole === 'student' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Select Demo Student Profile
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => {
                      setSelectedStudentId(e.target.value);
                      if (e.target.value === 'stud-1') {
                        setEmail('aarav.sharma@student.campuspath.edu');
                      } else if (e.target.value === 'stud-2') {
                        setEmail('diya.patel@student.campuspath.edu');
                      } else {
                        setEmail('pooja.hegde@student.campuspath.edu');
                      }
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-[#060B17] text-slate-900 dark:text-white"
                  >
                    <option value="stud-1">Aarav Sharma (2021CS0101) — Dual Placed (Google & MS)</option>
                    <option value="stud-2">Diya Patel (2021CS0102) — Placed (Goldman) | Pending Due</option>
                    <option value="stud-13">Pooja Hegde (2021EC0201) — Placed (Cisco) | 100% Cleared</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Institutional Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-[#060B17] text-slate-900 dark:text-white"
                    placeholder="rollnumber@student.campuspath.edu"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setIsForgotPasswordOpen(true);
                    }}
                    className="text-[11px] font-semibold text-gold-600 dark:text-gold-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-9 pr-9 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-[#060B17] text-slate-900 dark:text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Magic Link */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-gold-500 focus:ring-gold-500 h-3.5 w-3.5"
                  />
                  <span>Keep me signed in</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setMagicLinkEmail(email);
                    setIsMagicLinkOpen(true);
                  }}
                  className="text-slate-500 hover:text-gold-400 font-medium"
                >
                  Magic link sign-in
                </button>
              </div>

              {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl shadow-md text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <span>
                  {isLoading
                    ? 'Verifying Credentials...'
                    : `Sign in as ${selectedRole === 'admin' ? 'Placement Head' : 'Student'}`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                One-Click Fast Entry
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    switchDemoRole('admin');
                    showToast('Fast Login', 'Logged in as Placement In-Charge', 'info');
                    onSuccess();
                  }}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060B17] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <Shield className="h-3 w-3 text-gold-500" />
                  <span>Admin Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchDemoRole('student', 'stud-1');
                    showToast('Fast Login', 'Logged in as Aarav Sharma', 'info');
                    onSuccess();
                  }}
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060B17] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <GraduationCap className="h-3 w-3 text-emerald-500" />
                  <span>Student Mode</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div className="text-center text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center justify-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>TLS 256-Bit SSO • Google & GitHub Authenticated</span>
            </p>
            <p>© 2025 Apex Institute of Technology • Directorate of Placement</p>
          </div>
        </div>
      </div>

      {/* Google Account Chooser Modal */}
      {isGoogleModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => {
            if (!isGoogleLoading) setIsGoogleModalOpen(false);
          }}
          title="Sign in with Google Workspace"
          subtitle="Choose an authorized university account to access CampusPath"
          maxWidth="md"
        >
          <div className="space-y-4">
            {isGoogleLoading ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-10 w-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  Authenticating with Google Workspace...
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {googleSelectedAccount}
                </p>
              </div>
            ) : (
              <>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  {googleAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => handleSelectGoogleAccount(acc)}
                      className="w-full p-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors group"
                    >
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {acc.name}
                          </p>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                              acc.role === 'admin'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {acc.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{acc.desc}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Authorized institutional profiles (@campuspath.edu)</span>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* GitHub Account Chooser Modal */}
      {isGitHubModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => {
            if (!isGitHubLoading) setIsGitHubModalOpen(false);
          }}
          title="Sign in with GitHub"
          subtitle="Authorize CampusPath using your verified GitHub profile"
          maxWidth="md"
        >
          <div className="space-y-4">
            {isGitHubLoading ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-10 w-10 border-3 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  Authenticating with GitHub OAuth...
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  @{githubSelectedAccount}
                </p>
              </div>
            ) : (
              <>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  {githubAccounts.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => handleSelectGitHubAccount(acc)}
                      className="w-full p-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors group"
                    >
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-gold-400 transition-colors">
                            {acc.name}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            @{acc.username}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ml-auto ${
                              acc.role === 'admin'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {acc.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{acc.desc}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-gold-400 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center gap-2">
                  <Github className="h-4 w-4 text-slate-900 dark:text-white shrink-0" />
                  <span>Secure OAuth 2.0 institutional student & placement linking</span>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsForgotPasswordOpen(false)}
          title="Reset Institutional Password"
          subtitle="A secure recovery link will be sent to your university email"
          maxWidth="md"
        >
          {forgotSuccess ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recovery Email Dispatched</h4>
              <p className="text-xs text-slate-500">
                Please check your inbox at <strong>{forgotEmail}</strong> to reset your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B17] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="name@student.campuspath.edu"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-navy-950 bg-gold-500 hover:bg-gold-600 rounded-xl shadow-xs"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}

      {/* Magic Link Modal */}
      {isMagicLinkOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsMagicLinkOpen(false)}
          title="Sign in with Magic Link"
          subtitle="Passwordless login delivered straight to your student inbox"
          maxWidth="md"
        >
          {magicLinkSuccess ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Magic Link Sent!</h4>
              <p className="text-xs text-slate-500">
                Click the button inside the email sent to <strong>{magicLinkEmail}</strong> to log in instantly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Enter Your University Email
                </label>
                <input
                  type="email"
                  required
                  value={magicLinkEmail}
                  onChange={(e) => setMagicLinkEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#060B17] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="name@student.campuspath.edu"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsMagicLinkOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-navy-950 bg-gold-500 hover:bg-gold-600 rounded-xl shadow-xs"
                >
                  Send Magic Link
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};
