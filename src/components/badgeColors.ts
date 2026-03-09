import type { AssignedTeam, Category, Priority, Sentiment } from "../types";

export const categoryColors: Record<Category, string> = {
  Bug: "bg-red-50 text-red-600",
  "Feature Request": "bg-violet-50 text-violet-600",
  "UI/UX": "bg-cyan-50 text-cyan-600",
  Performance: "bg-orange-50 text-orange-600",
  General: "bg-slate-50 text-slate-600",
};

export const teamColors: Record<AssignedTeam, string> = {
  "Frontend Team": "bg-blue-50 text-blue-600",
  "Backend Team": "bg-indigo-50 text-indigo-600",
  "Design Team": "bg-pink-50 text-pink-600",
  "DevOps Team": "bg-teal-50 text-teal-600",
  "QA Team": "bg-amber-50 text-amber-600",
  General: "bg-slate-50 text-slate-600",
};

export const priorityColors: Record<Priority, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700",
};

export const sentimentIcon: Record<Sentiment, string> = {
  Positive: "😊",
  Neutral: "😐",
  Negative: "😞",
};

export const sentimentColors: Record<Sentiment, string> = {
  Positive: "bg-emerald-100 text-emerald-800",
  Neutral: "bg-slate-100 text-slate-700",
  Negative: "bg-rose-100 text-rose-800",
};
