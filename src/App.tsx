/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // Brain,
  Bug,
  Cpu,
  Frown,
  MessageSquare,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import FeedbackModal from "./components/FeedbackModal";
import {
  categoryColors,
  priorityColors,
  sentimentIcon,
} from "./components/badgeColors";
import * as api from "./services/api";
import type { Feedback, Filters } from "./types";

export default function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "All",
    priority: "All",
  });

  const fetchFeedbacks = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await api.getAllFeedback();
      setFeedbacks(data);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const stats = useMemo(
    () => ({
      total: feedbacks.length,
      bugs: feedbacks.filter((f) => f.category === "Bug").length,
      negative: feedbacks.filter((f) => f.sentiment === "Negative").length,
    }),
    [feedbacks],
  );

  const filtered = useMemo(() => {
    return feedbacks.filter((fb) => {
      // 1. Search Logic
      const matchesSearch =
        fb.originalText.toLowerCase().includes(filters.search.toLowerCase()) ||
        fb.userName.toLowerCase().includes(filters.search.toLowerCase());

      // 2. Category Logic
      const matchesCategory =
        filters.category === "All" || fb.category === filters.category;

      // 3. Priority Logic
      const matchesPriority =
        filters.priority === "All" || fb.priority === filters.priority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [feedbacks, filters]);

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-slate-900 font-sans">
      {/* --- VERTICAL SIDEBAR STATS --- */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col fixed h-full shadow-sm">
        <div className="flex items-center gap-3 mb-12">
          {/* <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200"> */}
          <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-xl shadow-slate-200 rotate-3 hover:rotate-0 transition-transform duration-300">
            {/* <Brain size={24} /> */}
            <Cpu size={22} strokeWidth={2} className="text-cyan-400" />
          </div>
          <span className="font-black tracking-tight text-xl uppercase">
            Nexus AI
          </span>
        </div>

        <nav className="space-y-8 flex-1">
          <VerticalStat
            label="Total Feedback"
            val={stats.total}
            icon={<MessageSquare size={18} />}
            color="bg-indigo-50 text-indigo-600"
          />
          <VerticalStat
            label="Bug Reports"
            val={stats.bugs}
            icon={<Bug size={18} />}
            color="bg-rose-50 text-rose-600"
          />
          <VerticalStat
            label="Negative Sentiment"
            val={stats.negative}
            icon={<Frown size={18} />}
            color="bg-amber-50 text-amber-600"
          />
        </nav>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-auto w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl"
        >
          <Plus size={18} /> Add New Feedback
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex-col lg:flex-row  lg:items-center gap-6 flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Intelligence Feed
            </h2>
            <p className="text-slate-400 font-medium italic">
              Monitoring user behavior via LLM triage
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 ring-indigo-500/5 w-64 shadow-sm"
                value={filters.search}
                placeholder="Filter logs..."
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            {/* Category Dropdown */}
            <select
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:ring-4 ring-indigo-500/5 shadow-sm appearance-none cursor-pointer hover:border-indigo-200 transition-colors"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value as any })
              }
            >
              <option value="All">All Categories</option>
              <option value="Bug">Bug</option>
              <option value="Features">Features</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Performance">Performance</option>
              <option value="General">General</option>
            </select>

            {/* Priority Dropdown */}
            <select
              className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 outline-none focus:ring-4 ring-indigo-500/5 shadow-sm appearance-none cursor-pointer hover:border-indigo-200 transition-colors"
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value as any })
              }
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </header>

        <div className="space-y-4">
          {isFetching ? (
            <div className="text-center py-20 opacity-50 font-bold animate-pulse">
              Syncing Database...
            </div>
          ) : (
            filtered.map((fb) => (
              <div
                key={fb._id}
                className="group flex items-center bg-white border border-slate-200 p-6 rounded-[2rem] hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all"
              >
                <div className="text-3xl mr-6 grayscale group-hover:grayscale-0 transition-all">
                  {sentimentIcon[fb.sentiment]}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-slate-800">
                      {fb.userName}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                      Team: {fb.assignedTeam}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm italic line-clamp-1">
                    "{fb.originalText}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${categoryColors[fb.category]}`}
                  >
                    Category: {fb.category}
                  </div>
                  <div
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${priorityColors[fb.priority]}`}
                  >
                    Priority: {fb.priority}
                  </div>
                  <button
                    onClick={async () => {
                      await api.deleteFeedback(fb._id);
                      setFeedbacks((prev) =>
                        prev.filter((f) => f._id !== fb._id),
                      );
                    }}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <FeedbackModal
        isOpen={isModalOpen}
        isLoading={isSubmitting}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          setIsSubmitting(true);
          try {
            const res = await api.submitFeedback(data);
            setFeedbacks([res, ...feedbacks]);
            setIsModalOpen(false);
          } catch (error) {
            console.error("Submission failed:", error);
            alert("AI analysis failed. Please check backend connection.");
          } finally {
            // Stop loading regardless of success/fail
            setIsSubmitting(false);
          }
        }}
      />
    </div>
  );
}

// --- VERTICAL STAT SUB-COMPONENT ---
function VerticalStat({
  label,
  val,
  icon,
  color,
}: {
  label: string;
  val: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="group cursor-default">
      <div className="flex items-center justify-between mb-2">
        <div
          className={`p-2.5 rounded-xl ${color} transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
        <span className="text-2xl font-black text-slate-800">{val}</span>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
        {label}
      </p>
    </div>
  );
}
