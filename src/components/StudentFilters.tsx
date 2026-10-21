"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, Filter, ArrowUpDown } from "lucide-react";

export default function StudentFilters({
  departments,
}: {
  departments: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const query = params.get("q") ?? "";
  const selectedDept = params.get("department") ?? "";
  const selectedYear = params.get("year") ?? "";
  const selectedSort = params.get("sort") ?? "";

  const hasActiveFilters = Boolean(query || selectedDept || selectedYear || selectedSort);

  function update(key: string, value: string, delay = 0) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page"); // reset to page 1 on filter changes
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, delay);
  }

  function clearAll() {
    router.replace(pathname);
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative min-w-[240px] flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search students by name, keywords..."
            defaultValue={query}
            onChange={(e) => update("q", e.target.value, 250)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
          {query && (
            <button
              onClick={() => update("q", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-1.5">
          <label className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 transition-colors">
            <Filter size={13} className="text-slate-400" />
            <span className="hidden sm:inline text-slate-500">Dept:</span>
            <select
              value={selectedDept}
              onChange={(e) => update("department", e.target.value)}
              className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Study Year Filter */}
        <div className="flex items-center gap-1.5">
          <label className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 transition-colors">
            <span className="text-slate-500">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => update("year", e.target.value)}
              className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer"
            >
              <option value="">All Cohorts</option>
              <option value="1">Year 1 (Freshman)</option>
              <option value="2">Year 2 (Sophomore)</option>
              <option value="3">Year 3 (Junior)</option>
              <option value="4">Year 4 (Senior)</option>
            </select>
          </label>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-1.5">
          <label className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 transition-colors">
            <ArrowUpDown size={13} className="text-slate-400" />
            <select
              value={selectedSort}
              onChange={(e) => update("sort", e.target.value)}
              className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer"
            >
              <option value="">Default Order</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="year-asc">Cohort (1st → 4th)</option>
              <option value="year-desc">Cohort (4th → 1st)</option>
            </select>
          </label>
        </div>

        {/* Clear All Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors active:scale-95"
          >
            <X size={13} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-600 font-medium text-[11px]">Active Filters:</span>
          {query && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
              Query: &quot;{query}&quot;
              <button onClick={() => update("q", "")} className="hover:text-blue-900">
                <X size={11} />
              </button>
            </span>
          )}
          {selectedDept && (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700">
              Dept: {departments.find((d) => d.slug === selectedDept)?.name ?? selectedDept}
              <button onClick={() => update("department", "")} className="hover:text-indigo-900">
                <X size={11} />
              </button>
            </span>
          )}
          {selectedYear && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
              Year {selectedYear}
              <button onClick={() => update("year", "")} className="hover:text-emerald-900">
                <X size={11} />
              </button>
            </span>
          )}
          {selectedSort && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
              Sorted
              <button onClick={() => update("sort", "")} className="hover:text-amber-900">
                <X size={11} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
