import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  accentColor?: 'navy' | 'gold' | 'blue' | 'emerald' | 'amber' | 'rose';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'navy',
  onClick,
}) => {
  const colorConfigs = {
    navy: {
      bar: 'from-blue-600 via-indigo-600 to-navy-900',
      iconBox: 'bg-blue-50 dark:bg-navy-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
      border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-600',
      glow: 'hover:shadow-[0_8px_30px_rgb(14,131,234,0.12)]',
    },
    gold: {
      bar: 'from-amber-400 via-champagne-500 to-amber-600',
      iconBox: 'bg-amber-50 dark:bg-obsidian-950 text-amber-700 dark:text-gold-400 border-amber-200 dark:border-gold-500/40',
      border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-gold-400 dark:hover:border-gold-500',
      glow: 'hover:shadow-[0_8px_30px_rgb(212,175,55,0.15)]',
    },
    emerald: {
      bar: 'from-emerald-400 via-teal-500 to-emerald-600',
      iconBox: 'bg-emerald-50 dark:bg-obsidian-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
      border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-400 dark:hover:border-emerald-500',
      glow: 'hover:shadow-[0_8px_30px_rgb(16,185,129,0.14)]',
    },
    amber: {
      bar: 'from-amber-400 via-orange-500 to-amber-600',
      iconBox: 'bg-amber-50 dark:bg-obsidian-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
      border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500',
      glow: 'hover:shadow-[0_8px_30px_rgb(245,158,11,0.14)]',
    },
    rose: {
      bar: 'from-rose-400 via-rose-500 to-pink-600',
      iconBox: 'bg-rose-50 dark:bg-obsidian-950 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50',
      border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-rose-400 dark:hover:border-rose-500',
      glow: 'hover:shadow-[0_8px_30px_rgb(244,63,94,0.14)]',
    },
    blue: {
      bar: 'from-cyan-500 via-blue-500 to-indigo-600',
      iconBox: 'bg-sky-50 dark:bg-obsidian-950 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/50',
      border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-sky-400 dark:hover:border-sky-500',
      glow: 'hover:shadow-[0_8px_30px_rgb(14,165,233,0.14)]',
    },
  }[accentColor] || {
    bar: 'from-blue-600 via-indigo-600 to-navy-900',
    iconBox: 'bg-slate-100 dark:bg-obsidian-950 text-slate-800 dark:text-gold-400 border-slate-200 dark:border-gold-500/30',
    border: 'border-slate-200/80 dark:border-slate-800/80 hover:border-gold-400',
    glow: 'hover:shadow-card',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white dark:bg-obsidian-900/90 rounded-2xl border ${colorConfigs.border} p-5 shadow-card ${colorConfigs.glow} transition-all duration-300 group ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
    >
      {/* Top ambient color hairline */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorConfigs.bar} transition-opacity duration-300`} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
            {title}
          </p>
          <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-navy-900 dark:text-white font-sans">
              {value}
            </span>
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full border ${
                  trend.isPositive !== false
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300/40'
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300/40'
                }`}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`p-3 rounded-xl border ${colorConfigs.iconBox} shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
