import React from "react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "indigo" | "rose" | "amber" | "slate";
}

export default function StatsCard({
  label,
  value,
  icon,
  color,
}: StatsCardProps) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-slate-900 leading-none">
          {value}
        </p>
        <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-tight">
          {label}
        </p>
      </div>
    </div>
  );
}
