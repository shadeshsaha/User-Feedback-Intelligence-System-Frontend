import { Send, X } from "lucide-react";
import { useState } from "react";
import type { FeedbackInput } from "../types";

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: FeedbackInput) => void;
}

export default function FeedbackModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<FeedbackInput>({
    userName: "",
    originalText: "",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            Submit New Feedback
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              User Name
            </label>
            <input
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
              placeholder="e.g. John Doe"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
              Feedback Content
            </label>
            <textarea
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 h-32 resize-none"
              placeholder="Describe the issue or suggestion..."
              value={form.originalText}
              onChange={(e) =>
                setForm({ ...form, originalText: e.target.value })
              }
            />
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              "AI Analyzing..."
            ) : (
              <>
                <Send size={18} /> Process Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
