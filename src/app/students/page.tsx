import { Suspense } from "react";
import Link from "next/link";
import { Users, SearchX, Sparkles } from "lucide-react";
import Container from "@/components/Container";
import StudentCard from "@/components/StudentCard";
import StudentFilters from "@/components/StudentFilters";
import Pagination from "@/components/Pagination";
import { departments, students } from "@/data/campus";

const PAGE_SIZE = 9;

type Props = {
  searchParams: Promise<{
    q?: string;
    department?: string;
    year?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function StudentsPage({ searchParams }: Props) {
  const { q = "", department = "", year = "", sort = "", page = "1" } = await searchParams;

  // 1. Filtering
  let filtered = students.filter((s) => {
    const matchesQuery =
      !q ||
      s.name.toLowerCase().includes(q.trim().toLowerCase()) ||
      s.focus.toLowerCase().includes(q.trim().toLowerCase()) ||
      s.about.toLowerCase().includes(q.trim().toLowerCase());

    const matchesDept = !department || s.department === department;
    const matchesYear = !year || String(s.year) === year;

    return matchesQuery && matchesDept && matchesYear;
  });

  // 2. Sorting
  if (sort === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name-desc") {
    filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "year-asc") {
    filtered = [...filtered].sort((a, b) => a.year - b.year);
  } else if (sort === "year-desc") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  }

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, Number(page) || 1), pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="py-10">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Students Directory</h1>
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {filtered.length} {filtered.length === 1 ? "Student" : "Students"}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">
              Explore enrolled undergraduate profiles, specializations, and academic records.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            <span>Campus Registry · Accredited Records</span>
          </div>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-20 rounded-2xl bg-slate-100 animate-pulse" />}>
          <StudentFilters departments={departments.map(({ slug, name }) => ({ slug, name }))} />
        </Suspense>

        {/* Results */}
        {visible.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <SearchX size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-800">No students found</h3>
            <p className="mt-1.5 max-w-sm text-xs text-slate-500">
              We couldn&apos;t find any students matching your active search and filter criteria. Try adjusting or clearing your filters.
            </p>
            <Link
              href="/students"
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Reset all filters
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <Pagination
            page={current}
            pageCount={pageCount}
            shown={visible.length}
            total={filtered.length}
            params={{ q, department, year, sort }}
          />
        )}
      </Container>
    </div>
  );
}
