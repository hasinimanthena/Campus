import React from 'react';
import { Modal } from './Modal';
import { RecruitmentDrive, Student } from '../types';
import {
  Building2,
  Printer,
  Download,
  CheckCircle,
  FileText,
  ShieldCheck,
  Calendar,
  MapPin,
  Award,
} from 'lucide-react';

interface OfferLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  drive: RecruitmentDrive;
  offerCtc: number;
}

export const OfferLetterModal: React.FC<OfferLetterModalProps> = ({
  isOpen,
  onClose,
  student,
  drive,
  offerCtc,
}) => {
  if (!isOpen) return null;

  // Realistic CTC breakdown calculation
  const totalLpa = offerCtc || drive.packageCtc;
  const baseSalary = Number((totalLpa * 0.65).toFixed(2));
  const variablePay = Number((totalLpa * 0.15).toFixed(2));
  const joiningBonus = Number((totalLpa * 0.10).toFixed(2));
  const stockBenefits = Number((totalLpa * 0.10).toFixed(2));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Employment Offer Letter"
      subtitle={`Issued by ${drive.companyName} Campus University Talent Acquisition`}
      maxWidth="3xl"
    >
      <div className="space-y-6 p-6 border-2 border-slate-200 dark:border-navy-800 rounded-2xl bg-white dark:bg-navy-900 shadow-2xs font-serif text-slate-800 dark:text-slate-200 print:border-none print:p-0">
        {/* Company Header */}
        <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900 dark:border-navy-700 font-sans">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-navy-900 dark:bg-navy-800 text-gold-400 border border-gold-500/30 flex items-center justify-center font-bold text-xl shadow-xs">
              {drive.companyName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-navy-900 dark:text-white">
                {drive.companyName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Global Engineering Center • Campus Recruitment Operations
              </p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500 dark:text-slate-400">
            <p className="font-mono font-bold text-navy-900 dark:text-slate-200">REF: {drive.companyName.substring(0, 3).toUpperCase()}-CAMPUS-2025</p>
            <p>Date: March 15, 2025</p>
          </div>
        </div>

        {/* Recipient info */}
        <div className="text-xs font-sans space-y-1 text-slate-700 dark:text-slate-300">
          <p className="font-bold text-navy-900 dark:text-white text-sm">{student.name}</p>
          <p>Roll No: <span className="font-mono font-bold text-navy-900 dark:text-gold-400">{student.rollNumber}</span></p>
          <p>Department of {student.department}</p>
          <p>Apex Institute of Technology, India</p>
        </div>

        {/* Offer Body */}
        <div className="text-xs leading-relaxed space-y-3 font-sans text-slate-700 dark:text-slate-300">
          <p>
            <strong>Dear {student.name},</strong>
          </p>
          <p>
            Following your technical interviews and evaluations during the 2024–2025 Campus Recruitment Drive at Apex Institute of Technology, we are delighted to extend this formal offer of employment for the role of <strong>{drive.role}</strong> at <strong>{drive.companyName}</strong>.
          </p>
          <p>
            You have shown exceptional aptitude and problem-solving skill. We are confident that you will make a profound contribution to our engineering organization.
          </p>
        </div>

        {/* Compensation Schedule Table */}
        <div className="font-sans border border-slate-200 dark:border-navy-800 rounded-xl overflow-hidden text-xs">
          <div className="bg-navy-50 dark:bg-navy-950/80 p-3 font-bold text-navy-900 dark:text-white flex items-center justify-between border-b border-slate-200 dark:border-navy-800">
            <span>ANNEXURE A — ANNUAL COMPENSATION PACKAGE (CTC)</span>
            <span className="text-gold-600 dark:text-gold-400 font-extrabold text-sm">₹{totalLpa} LPA</span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-navy-950/60 text-[11px] text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-navy-800">
              <tr>
                <th className="p-2.5">Salary Component</th>
                <th className="p-2.5">Description</th>
                <th className="p-2.5 text-right">Amount (LPA)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-2.5 font-semibold">Base Annual Salary</td>
                <td className="p-2.5 text-slate-500 dark:text-slate-400">Fixed monthly pay with statutory allowances</td>
                <td className="p-2.5 text-right font-mono font-bold">₹{baseSalary}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Performance Incentive</td>
                <td className="p-2.5 text-slate-500 dark:text-slate-400">Annual milestone and KPI variable bonus</td>
                <td className="p-2.5 text-right font-mono font-bold">₹{variablePay}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Relocation & Joining Bonus</td>
                <td className="p-2.5 text-slate-500 dark:text-slate-400">One-time payment upon first month onboarding</td>
                <td className="p-2.5 text-right font-mono font-bold">₹{joiningBonus}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Stock Grants / RSUs</td>
                <td className="p-2.5 text-slate-500 dark:text-slate-400">Equity allocation vested over initial 4-year schedule</td>
                <td className="p-2.5 text-right font-mono font-bold">₹{stockBenefits}</td>
              </tr>
              <tr className="bg-gold-50/60 dark:bg-gold-950/30 font-bold text-navy-900 dark:text-white">
                <td className="p-2.5">Total Cost to Company (CTC)</td>
                <td className="p-2.5 text-slate-500 dark:text-slate-400">Full annual compensation package</td>
                <td className="p-2.5 text-right font-mono text-gold-600 dark:text-gold-400 text-sm">₹{totalLpa} LPA</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Joining Location and Schedule */}
        <div className="grid grid-cols-2 gap-4 font-sans text-xs bg-slate-50 dark:bg-navy-950/60 p-3.5 rounded-xl border border-slate-200 dark:border-navy-800">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">Reporting Location:</span>
            <strong className="text-navy-900 dark:text-white">{drive.location}</strong>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">Anticipated Joining Date:</span>
            <strong className="text-navy-900 dark:text-white">July 14, 2025</strong>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-6 border-t border-slate-200 dark:border-navy-800 flex items-end justify-between font-sans">
          <div className="text-xs">
            <p className="font-bold text-navy-900 dark:text-white">Sarah Jenkins</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">Head of University Talent Acquisition</p>
            <p className="text-slate-400 dark:text-slate-500 text-[10px]">{drive.companyName}</p>
          </div>

          <div className="text-right text-xs">
            <div className="h-8 flex items-center justify-end">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                ✓ Digitally Accepted & Verified
              </span>
            </div>
            <p className="font-bold text-navy-900 dark:text-white mt-1">{student.name}</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">Candidate Acceptance</p>
          </div>
        </div>

        {/* Modal footer actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-navy-800 font-sans print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-sm border border-gold-500/20"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
