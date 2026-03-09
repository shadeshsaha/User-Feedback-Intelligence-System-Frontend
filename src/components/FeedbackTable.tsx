import { Trash2 } from "lucide-react";
import type { Feedback } from "../types";
import Badge from "./Badge";
import {
  categoryColors,
  priorityColors,
  sentimentColors,
  sentimentIcon,
  teamColors,
} from "./badgeColors";

interface Props {
  feedbacks: Feedback[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export default function FeedbackTable({
  feedbacks,
  isLoading,
  onDelete,
}: Props) {
  if (isLoading)
    return (
      <div className="p-12 text-center text-slate-500 animate-pulse">
        Loading feedback logs...
      </div>
    );

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-20 text-center">
        <p className="text-slate-400 font-medium">
          No feedback found. Start by adding a new one!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Feedback</th>
              <th className="px-5 py-3 text-center">Category</th>
              <th className="px-5 py-3 text-center">Priority</th>
              <th className="px-5 py-3 text-center">Sentiment</th>
              <th className="px-5 py-3 text-center">Team</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {feedbacks.map((fb) => (
              <tr
                key={fb._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-5 py-4 font-medium text-slate-800">
                  {fb.userName}
                </td>
                <td className="px-5 py-4 text-slate-600 max-w-xs truncate">
                  {fb.originalText}
                </td>
                <td className="px-5 py-4 text-center">
                  <Badge color={categoryColors[fb.category]}>
                    {fb.category}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-center">
                  <Badge color={priorityColors[fb.priority]}>
                    {fb.priority}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-center">
                  <Badge color={sentimentColors[fb.sentiment]}>
                    {sentimentIcon[fb.sentiment]} {fb.sentiment}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-center">
                  <Badge color={teamColors[fb.assignedTeam]}>
                    {fb.assignedTeam}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => onDelete(fb._id)}
                    className="text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
