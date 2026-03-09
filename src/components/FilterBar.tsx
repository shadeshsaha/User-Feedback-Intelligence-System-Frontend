/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import type { Filters } from "../types";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      {/* ... Search Input code ... */}
      <div className="relative flex-1 w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search feedback or user name..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 ring-indigo-500/10 text-sm"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        {/* CATEGORY DROPDOWN */}
        <select
          className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 ring-indigo-500/10 cursor-pointer"
          value={filters.category}
          onChange={(e) =>
            onChange({ ...filters, category: e.target.value as any })
          }
        >
          <option value="All">All Categories</option>
          <option value="Bug">Bug</option>
          <option value="Features">Features</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Performance">Performance</option>
          <option value="General">General</option>
        </select>

        {/* PRIORITY DROPDOWN */}
        <select
          className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 ring-indigo-500/10"
          value={filters.priority}
          onChange={(e) =>
            onChange({ ...filters, priority: e.target.value as any })
          }
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
    </div>
  );
}
