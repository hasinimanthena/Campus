import React from 'react';
import {
  GraduationCap,
  Building2,
  Award,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Users,
  Briefcase,
  FileCheck2,
  CreditCard,
  Sparkles,
  Lock,
  ChevronRight,
  School,
  Star,
  Zap,
  Check,
  Shield,
  Smartphone,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LandingPageProps {
  onEnterPortal: (role?: 'admin' | 'student', studentId?: string) => void;
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortal, onOpenLogin }) => {
  const { stats } = useApp();

  const recruiters = [
    { name: 'Google', ctc: '₹32.5 LPA', role: 'Cloud Platform Engineer', tier: 'Super Dream' },
    { name: 'Microsoft', ctc: '₹28.0 LPA', role: 'Software Development Engineer', tier: 'Super Dream' },
    { name: 'Amazon Web Services', ctc: '₹24.0 LPA', role: 'Cloud Support Associate', tier: 'Super Dream' },
    { name: 'Cisco Systems', ctc: '₹18.5 LPA', role: 'Network Systems Engineer', tier: 'Dream' },
    { name: 'Deloitte USI', ctc: '₹12.0 LPA', role: 'Technology Consultant', tier: 'Dream' },
    { name: 'TCS Innovate', ctc: '₹9.0 LPA', role: 'Systems Engineer Specialist', tier: 'Core' },
    { name: 'Infosys Wings', ctc: '₹7.5 LPA', role: 'Specialist Programmer', tier: 'Core' },
    { name: 'Accenture Strategy', ctc: '₹8.5 LPA', role: 'Associate Software Engineer', tier: 'Core' },
  ];

  const testimonials = [
    {
      name: 'Aarav Sharma',
      dept: 'Computer Science & Engineering',
      offer: 'Google (₹32 LPA) & Microsoft (₹28 LPA)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      quote:
        'CampusPath made interview scheduling and offer acceptance seamless. I downloaded my verified letterhead offer and completed my full campus no-dues in just 10 minutes before joining!',
    },
    {
      name: 'Pooja Hegde',
      dept: 'Electronics & Communication',
      offer: 'Cisco Systems (₹18.5 LPA)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      quote:
        'The PhonePe instant fine settlement feature is phenomenal. I cleared my laboratory apparatus fee using PhonePe UPI QR, and my clearance badge turned green instantly.',
    },
    {
      name: 'Rohan Verma',
      dept: 'Information Technology',
      offer: 'Deloitte USI (₹12 LPA)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      quote:
        'Transparent multi-stage application tracking kept me calm during assessments. Faculty coordinators and recruiters operate on the exact same real-time dashboard.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060B17] text-slate-800 dark:text-slate-100 font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-[#0B132B]/90 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                  CampusPath
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Apex Tech Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Placement & Clearance Governance Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-teal-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Top Institutional Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50 shadow-2xs">
              <Award className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              NAAC A++ Accredited Institution
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              NIRF Top 25 Ranking
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              PhonePe Automated Clearance PG
            </span>
          </div>

          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Empowering Careers.{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                Accelerating Clearance.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              The unified digital operating system for Apex Institute of Technology. Connect student talent with global
              recruiters and settle institutional clearances with 100% paperless PhonePe automation.
            </p>

            {/* Prominent "Get Started" Primary Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenLogin}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onEnterPortal('admin')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-white dark:bg-[#0B132B] text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore Live Portal</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Key Placement & Clearance Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                {stats.placementPercentage}%
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Overall Placement
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{stats.uniquePlacedStudents} of {stats.totalStudents} Placed</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono">
                ₹32.5 <span className="text-base font-bold">LPA</span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Highest CTC
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Offered by Google Cloud</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                ₹{stats.averagePackageCtc} <span className="text-base font-bold">LPA</span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Average CTC
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Verified placement offers</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {stats.noDuesClearedCount}
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Cleared No-Dues
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">93.8% Graduation Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Showcase */}
      <section className="py-16 bg-white dark:bg-[#0B132B] border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Corporate Recruitment Partners
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Leading Employers Hiring on Campus
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recruiters.map((r, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#060B17]/60 hover:border-indigo-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase font-mono ${
                      r.tier === 'Super Dream'
                        ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50'
                        : r.tier === 'Dream'
                        ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {r.tier}
                  </span>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{r.ctc}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {r.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{r.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            Engineered for Placement Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              End-to-End Recruitment Drives
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Create multi-round drives, set automated CGPA criteria, manage assessment shortlists, and issue formal letterhead offer letters.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Instant PhonePe Settlements
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Students view outstanding library, lab, and hostel fines and settle instantly through official PhonePe UPI QR and checkout gateway.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <FileCheck2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              6-Department No-Dues Clearance
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Automated multi-department matrix requiring 100% clearance across Library, Lab, Hostel, Placement, and Accounts before certificate release.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-[#0B132B] border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Student Experiences
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Voices of Placed Graduates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#060B17]/60 flex flex-col justify-between space-y-4"
              >
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{t.offer}</p>
                    <p className="text-[11px] text-slate-400">{t.dept}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Ready to Begin Your Placement Journey?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Access placement drives, application stages, offer downloads, and instant no-dues clearance on CampusPath.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            Sign In with Google or GitHub
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#060B17] py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              CP
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Apex Institute of Technology</p>
              <p>CampusPath Career Services & Institutional Clearance Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span>Helpline: +91 80 2345 6789</span>
            <span>Email: tpo@apextech.edu.in</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">NAAC A++</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
