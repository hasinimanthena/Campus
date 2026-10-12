import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { NoDuesCategory } from '../types';
import {
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Printer,
  Clock,
  Sparkles,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  studentRoll: string;
  category: NoDuesCategory;
  categoryLabel: string;
  amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  studentId,
  studentName,
  studentRoll,
  category,
  categoryLabel,
  amount,
}) => {
  const { payNoDuesFine } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState(`${studentRoll.toLowerCase()}@okhdfcbank`);
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('542');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnRef, setTxnRef] = useState('');

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedTxn = `TXN-2025-AIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTxnRef(generatedTxn);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      payNoDuesFine(studentId, category, amount, generatedTxn);
    }, 1800);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isSuccess ? 'Payment Successful' : 'University Fee & Dues Settlement'}
      subtitle={
        isSuccess
          ? 'Transaction verified & clearance recorded in central registry'
          : `Apex Institute of Technology • Integrated CampusPay Gateway`
      }
      maxWidth="md"
    >
      {isSuccess ? (
        <div className="space-y-5 text-center py-2">
          <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50 dark:ring-emerald-950/30">
            <CheckCircle2 className="h-9 w-9 animate-in zoom-in-50 duration-300" />
          </div>

          <div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              ₹{amount.toLocaleString('en-IN')} Received
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              Transaction ID: <span className="font-bold text-slate-800 dark:text-gold-400">{txnRef}</span>
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-navy-950 p-4 rounded-xl border border-slate-200 dark:border-navy-800 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Student:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{studentName} ({studentRoll})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Department / Fee Category:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{categoryLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Timestamp:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{new Date().toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Clearance Status:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Cleared & Verified</span>
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-navy-750 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs"
            >
              <Printer className="h-4 w-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-950 text-xs font-bold transition-all shadow-sm border border-gold-500/20"
            >
              Back to Portal
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePay} className="space-y-4">
          {/* Bill Overview Banner */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white p-4 rounded-xl flex items-center justify-between border border-gold-500/25 shadow-sm">
            <div>
              <p className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                Outstanding Balance
              </p>
              <h4 className="text-xs font-bold text-slate-100 mt-0.5">{categoryLabel}</h4>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{studentRoll} • {studentName}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white">
                ₹{amount.toLocaleString('en-IN')}
              </span>
              <p className="text-[10px] text-emerald-400 font-medium">0% Gateway Convenience Fee</p>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'upi'
                    ? 'border-navy-900 dark:border-gold-500 bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-gold-400 font-bold shadow-2xs'
                    : 'border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-850'
                }`}
              >
                <Smartphone className="h-4 w-4" />
                <span className="text-xs">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'card'
                    ? 'border-navy-900 dark:border-gold-500 bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-gold-400 font-bold shadow-2xs'
                    : 'border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-850'
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'netbanking'
                    ? 'border-navy-900 dark:border-gold-500 bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-gold-400 font-bold shadow-2xs'
                    : 'border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-850'
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span className="text-xs">NetBanking</span>
              </button>
            </div>
          </div>

          {/* Method Specific Form */}
          {paymentMethod === 'upi' && (
            <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-800 shrink-0">
                  <QrCode className="h-12 w-12 text-slate-800 dark:text-gold-400" />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <p className="font-bold text-slate-800 dark:text-white">Scan via Any UPI App</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Google Pay, PhonePe, Paytm, or BHIM</p>
                  <span className="inline-block mt-1 text-[10px] font-mono bg-navy-100 dark:bg-navy-800 text-navy-900 dark:text-gold-400 px-1.5 py-0.5 rounded border border-navy-200 dark:border-navy-700">
                    VPA: apex.bursar@icici
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Or Enter Your UPI ID (VPA)
                </label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-900 text-slate-900 dark:text-white"
                  placeholder="username@okhdfcbank"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-900 text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Valid Thru (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="space-y-3 p-3.5 bg-slate-50 dark:bg-navy-950 rounded-xl border border-slate-200 dark:border-navy-800 text-xs">
              <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Select Your Financial Institution
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white dark:bg-navy-900 text-slate-900 dark:text-white"
              >
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Canara Bank">Canara Bank</option>
              </select>
            </div>
          )}

          {/* Security guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 justify-center pt-1">
            <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>256-bit SSL encrypted institutional payment session</span>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-navy-800">
            <button
              type="button"
              onClick={handleClose}
              disabled={isProcessing}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white dark:text-navy-950 bg-navy-900 hover:bg-navy-800 dark:bg-gold-500 dark:hover:bg-gold-600 rounded-lg shadow-sm transition-colors disabled:opacity-50 border border-gold-500/20"
            >
              {isProcessing ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-white dark:border-navy-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay ₹{amount.toLocaleString('en-IN')} Now</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
