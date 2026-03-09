import {
  AlertTriangle,
  Brain,
  LayoutDashboard,
  MessageSquareText,
  Plus,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import FeedbackModal from "./components/FeedbackModal";
import FeedbackTable from "./components/FeedbackTable";
import FilterBar from "./components/FilterBar";
import StatsCard from "./components/StatsCard";
import * as api from "./services/api";
import type { Feedback, FeedbackInput, Filters } from "./types";

export default function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    } catch {
      setError("Failed to load feedback from server");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleSubmit = async (input: FeedbackInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const newFeedback = await api.submitFeedback(input);
      setFeedbacks((prev) => [newFeedback, ...prev]);
      setIsModalOpen(false);
    } catch {
      setError("AI analysis failed. Please check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteFeedback(id);
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch {
      setError("Failed to delete the entry.");
    }
  };

  const stats = useMemo(
    () => ({
      total: feedbacks.length,
      bugs: feedbacks.filter((f) => f.category === "Bug").length,
      urgent: feedbacks.filter(
        (f) => f.priority === "High" || f.priority === "Urgent",
      ).length,
      negative: feedbacks.filter((f) => f.sentiment === "Negative").length,
    }),
    [feedbacks],
  );

  const filtered = useMemo(() => {
    return feedbacks.filter((fb) => {
      const matchesSearch =
        filters.search === "" ||
        fb.originalText.toLowerCase().includes(filters.search.toLowerCase()) ||
        fb.userName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === "All" || fb.category === filters.category;
      const matchesPriority =
        filters.priority === "All" || fb.priority === filters.priority;
      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [feedbacks, filters]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Brain size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Feedback Intelligence
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                AI-powered feedback triage
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">New Feedback</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle size={16} /> {error}
            </div>
            <button onClick={() => setError(null)}>
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Feedback"
            value={stats.total}
            icon={<MessageSquareText size={20} />}
            color="indigo"
          />
          <StatsCard
            label="Bug Reports"
            value={stats.bugs}
            icon={<LayoutDashboard size={20} />}
            color="rose"
          />

          <StatsCard
            label="Negative Sentiment"
            value={stats.negative}
            icon={<Users size={20} />}
            color="slate"
          />
        </div>

        <FilterBar filters={filters} onChange={setFilters} />

        <FeedbackTable
          feedbacks={filtered}
          isLoading={isFetching}
          onDelete={handleDelete}
        />
      </main>

      <FeedbackModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
