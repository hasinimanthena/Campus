import React from 'react';
import { Modal } from './Modal';
import { Student } from '../types';
import {
  GraduationCap,
  Printer,
  QrCode,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface StudentIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
}

export const StudentIdCardModal: React.FC<StudentIdCardModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Digital Institutional Identity Card"
      subtitle="Apex Institute of Technology • Smart Campus Card"
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* ID Card Card Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-5 shadow-gold-sm border-2 border-gold-400/40">
          {/* Subtle watermark background */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <GraduationCap className="h-56 w-56 text-gold-400" />
          </div>

          {/* Top header */}
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-navy-800 flex items-center justify-center border border-gold-500/30">
                <GraduationCap className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Apex Institute of Technology
                </h4>
                <p className="text-[9px] text-gold-300 uppercase tracking-widest font-semibold">
                  Autonomous Campus • NAAC Grade A++
                </p>
              </div>
            </div>
            <span className="text-[9px] font-mono bg-gold-500/20 text-gold-300 border border-gold-400/30 px-2 py-0.5 rounded-full uppercase font-bold">
              Student Card
            </span>
          </div>

          {/* Card Body */}
          <div className="mt-4 flex items-center gap-4">
            <img
              src={student.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
              alt={student.name}
              className="h-24 w-24 rounded-xl object-cover border-2 border-gold-400/60 shadow-md shrink-0"
            />

            <div className="flex-1 min-w-0 space-y-1 text-xs">
              <h3 className="text-base font-extrabold text-white leading-tight truncate">
                {student.name}
              </h3>
              <p className="font-mono text-gold-400 font-bold text-xs">{student.rollNumber}</p>
              <p className="text-slate-300 text-[11px] leading-tight">
                {student.department}
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-400">
                <span>Batch: <strong className="text-white">{student.batchYear}</strong></span>
                <span>•</span>
                <span>Blood: <strong className="text-white">O+</strong></span>
              </div>
            </div>
          </div>

          {/* Card Bottom: Barcode and Validity */}
          <div className="mt-4 pt-3 border-t border-gold-500/20 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <QrCode className="h-7 w-7 text-gold-400/80" />
              <div className="font-mono text-[9px] text-slate-300 leading-tight">
                <p>VALID THRU: 06/2025</p>
                <p>CARD ID: 8829-1092-AIT</p>
              </div>
            </div>

            <div className="text-right text-[9px] text-gold-300">
              <p className="font-semibold">Dean of Academics</p>
              <p className="opacity-70">Apex Institute</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all"
          >
            <Printer className="h-4 w-4" />
            <span>Print Student Card</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all border border-gold-500/20"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
