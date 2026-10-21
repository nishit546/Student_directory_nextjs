"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function StudentFilters({ departments }: { departments: { slug: string; name: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function update(key: string, value: string, delay = 0) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page"); // go back to page 1 whenever filters change
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, delay);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-2.5">
      <label className="relative min-w-[220px] flex-1 sm:max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search students"
          defaultValue={params.get("q") ?? ""}
          onChange={(e) => update("q", e.target.value, 250)}
          className="w-full rounded border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
        />
      </label>
      <label className="flex items-center gap-2 text-xs text-slate-600">
        Department:
        <select
          defaultValue={params.get("department") ?? ""}
          onChange={(e) => update("department", e.target.value)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500"
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
